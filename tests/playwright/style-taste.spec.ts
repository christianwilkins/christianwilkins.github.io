import { expect, test, type Page } from "@playwright/test";

const STARRED_PRESET_LABELS = ["★ Amodei Minimal", "★ Chimero Noir"] as const;
const DRAWER_LABEL = "Style settings";

async function visitHome(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.clear();
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
}

async function openStyleDrawer(page: Page) {
  const openButton = page.getByRole("button", { name: "Open style settings" });
  await expect(openButton).toBeVisible();
  await openButton.click();
  await expect(page.getByRole("dialog", { name: DRAWER_LABEL })).toBeVisible();
}

async function openPresetsSection(page: Page) {
  const presetsToggle = page.getByRole("button", { name: /presets/i });
  await expect(presetsToggle).toBeVisible();
  const expanded = await presetsToggle.getAttribute("aria-expanded");
  if (expanded !== "true") {
    await presetsToggle.click();
  }
  const presetGrid = page.locator("#style-presets");
  await expect(presetGrid).toBeVisible();
  await expect(presetGrid.getByRole("button", { name: /chimero noir/i })).toBeVisible();
}

test.describe("style system smoke", () => {
  test("homepage keeps good responsive structure", async ({ page }, testInfo) => {
    await visitHome(page);

    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Open style settings" })).toBeVisible();

    await testInfo.attach("home-viewport", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });

  test("style drawer surfaces starred presets and agent screenshots", async ({ page }, testInfo) => {
    await visitHome(page);
    await openStyleDrawer(page);
    await openPresetsSection(page);

    await expect(page.getByText("Style system")).toBeVisible();

    for (const label of STARRED_PRESET_LABELS) {
      await expect(page.locator("#style-presets").getByText(label)).toBeVisible();
    }

    await testInfo.attach("style-drawer", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });

  test("preset scoped taste pass covers featured looks", async ({ page }, testInfo) => {
    await visitHome(page);
    await openStyleDrawer(page);
    await openPresetsSection(page);

    const presetGrid = page.locator("#style-presets");
    const snapshots = [
      { name: "amodei-minimal", label: /amodei minimal/i },
      { name: "chimero-noir", label: /chimero noir/i },
      { name: "barbie", label: /barbie/i },
    ] as const;

    for (const snapshot of snapshots) {
      await presetGrid.getByRole("button", { name: snapshot.label }).click();
      await page.waitForTimeout(250);
      await testInfo.attach(snapshot.name, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }
  });
});
