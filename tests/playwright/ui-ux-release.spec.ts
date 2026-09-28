import { expect, test } from "@playwright/test";

test("project links and details work with touch and keyboard", async ({ page }) => {
  await page.goto("/projects");
  const card = page.getByRole("article").filter({ has: page.getByRole("heading", { name: "ForgePeak Ventures", exact: true }) });
  await expect(card.getByRole("link", { name: /Visit ForgePeak/ })).toHaveAttribute("href", "https://www.forgepeakventures.com");
  const summary = card.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(card.getByRole("heading", { name: "Scope" })).toBeVisible();
});

test("closed overlays are hidden and style dialog contains focus", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const trigger = page.getByRole("button", { name: "Open style settings" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Style settings" });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    // Native dialogs allow Tab to browser chrome; background page controls remain inert.
    expect(await dialog.evaluate((element) => element.contains(document.activeElement) || document.activeElement === document.body)).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("mobile navigation closes on Escape and desktop resize", async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto("/projects");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Navigation menu" });
  await expect(dialog.getByRole("link", { name: "Projects", exact: true })).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("route changes reset reading position and focus", async ({ page }) => {
  await page.goto("/projects");
  await page.locator("main").getByRole("link", { name: "Services", exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator("main")).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("FAQ search answers known topics and handles no results", async ({ page }) => {
  await page.goto("/lab/faq");
  await page.getByLabel("Search FAQ topics").fill("projects");
  await page.getByRole("button", { name: "Search topics" }).click();
  await expect(page.getByRole("region", { name: "FAQ answer" })).toContainText("Choose a matching topic.");
  await page.getByRole("button", { name: "Projects", exact: true }).click();
  await expect(page.getByRole("region", { name: "FAQ answer" })).toContainText("Visit Projects");
  await page.getByLabel("Search FAQ topics").fill("zzzzzzz");
  await page.getByRole("button", { name: "Search topics" }).click();
  await expect(page.getByRole("region", { name: "FAQ answer" })).toContainText("No matching FAQ topics");
});

test("invalid learning links show the recovery page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/lab/learning/vibe-coders-guide/not-a-real-arc");
  await expect(page.locator("main h1")).toContainText("Page not found");
  expect(errors).toEqual([]);
});

test("learning controls expose labels and completion state", async ({ page }) => {
  await page.goto("/lab/learning/vibe-coders-guide/systems-thinking-over-syntax");
  const step = page.locator('button[aria-pressed]').first();
  await step.click();
  await expect(step).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Your concise output draft").fill("An accessible draft");
});

test("terminal is named, dismissible, and returns focus", async ({ page }) => {
  await page.goto("/terminal");
  const dialog = page.getByRole("dialog", { name: "Terminal window" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "Open Terminal Window" }).click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open Terminal Window" })).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});
