# Playwright testing

## Goal
Give the agent a reliable browser test path for responsiveness and visual taste checks.

## What is included
- `playwright.config.ts`
- `tests/playwright/style-taste.spec.ts`
- responsive Chromium projects for desktop and mobile
- automatic Next dev server boot during tests
- screenshot attachments on visual smoke runs

## Commands
- `npm run test:e2e`
- `npm run test:e2e:headed`
- `npm run test:e2e:debug`

## Agent workflow
1. Run `npm run test:e2e`
2. Open `playwright-report/index.html` if a visual pass needs review
3. Inspect screenshots attached to the report for desktop and mobile
4. If the site changes in a meaningful visual way, rerun and compare the screenshots

## Notes
- Set `PLAYWRIGHT_BASE_URL` to point at an already running deployment or local server if needed
- The test suite checks the homepage, the style drawer, and the featured presets for quick taste review
- Screenshot artifacts are meant for review, not as brittle pixel snapshots
