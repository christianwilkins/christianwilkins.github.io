import { expect, test, type Page } from "@playwright/test";

const STARRED_PRESET_LABELS = ["★ Amodei Minimal", "★ Chimero Noir"] as const;
const DRAWER_LABEL = "Style settings";
const PRESET_SNAPSHOTS = [
  { id: "signal-focus", label: /signal focus/i },
  { id: "amodei-minimal", label: /amodei minimal/i },
  { id: "chimero-noir", label: /chimero noir/i },
  { id: "studio-calm", label: /studio calm/i },
  { id: "gallery-crisp", label: /gallery crisp/i },
  { id: "atelier-editorial", label: /atelier editorial/i },
  { id: "barbie", label: /barbie/i },
  { id: "legacy-original", label: /legacy original/i },
] as const;

async function waitForHomeReady(page: Page) {
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Open style settings" })).toBeVisible();
}

async function visitHome(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await waitForHomeReady(page);
  await page.evaluate(() => {
    window.localStorage.clear();
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForHomeReady(page);
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

async function ensureTheme(page: Page, mode: "light" | "dark") {
  await page.evaluate((nextMode) => {
    window.localStorage.setItem("theme", nextMode);
  }, mode);
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForHomeReady(page);

  const html = page.locator("html");
  await expect
    .poll(async () => ((await html.getAttribute("class"))?.includes("dark") ?? false) === (mode === "dark"))
    .toBeTruthy();
}

async function readBackgroundToken(page: Page) {
  return page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--background").trim());
}

async function readHeadingFontFamily(page: Page) {
  return page.locator("h1").first().evaluate((element) => getComputedStyle(element).fontFamily);
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

      if (snapshot.name === "barbie") {
        await expect.poll(async () => (await readHeadingFontFamily(page)).toLowerCase()).toContain("parisienne");
      }

      await testInfo.attach(snapshot.name, {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    }
  });

  test("theme mode stays independent when presets change and every preset has distinct light and dark tokens", async ({ page }) => {
    test.setTimeout(60_000);

    await visitHome(page);

    const modeBackgrounds = {
      light: new Map<string, string>(),
      dark: new Map<string, string>(),
    };

    await ensureTheme(page, "light");
    await openStyleDrawer(page);
    await openPresetsSection(page);
    let presetGrid = page.locator("#style-presets");

    for (const preset of PRESET_SNAPSHOTS) {
      await presetGrid.getByRole("button", { name: preset.label }).click();
      await expect(page.locator("html")).not.toHaveClass(/dark/);
      modeBackgrounds.light.set(preset.id, await readBackgroundToken(page));
    }

    await ensureTheme(page, "dark");
    await openStyleDrawer(page);
    await openPresetsSection(page);
    presetGrid = page.locator("#style-presets");

    for (const preset of PRESET_SNAPSHOTS) {
      await presetGrid.getByRole("button", { name: preset.label }).click();
      await expect(page.locator("html")).toHaveClass(/dark/);
      modeBackgrounds.dark.set(preset.id, await readBackgroundToken(page));
    }

    for (const preset of PRESET_SNAPSHOTS) {
      expect(modeBackgrounds.light.get(preset.id)).not.toBe(modeBackgrounds.dark.get(preset.id));
    }
  });
});
