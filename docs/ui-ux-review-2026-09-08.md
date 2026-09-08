# Site UI/UX review

September 8, 2026 · Branch: `feature/dev-ui-ux-release`

## Verdict

The existing editorial identity is coherent and worth preserving. The main defects were hidden or unavailable interactions, inconsistent personal positioning, and insufficient contrast. This release repairs those behaviors and adds a canonical personal brand and ForgePeak experience entry.

The review covers the active Vite site. It does not claim that the archived portfolios, independently hosted lab apps, paused backend features, or external account profiles received a full audit.

## Health assessment

These are qualitative engineering scores, not a WCAG certification or a Lighthouse score.

| Dimension | Before | After | Evidence |
| --- | --- | --- | --- |
| Accessibility | 1/4 | 3/4 | Hidden focus targets, missing dialog behavior, labels, and dark contrast repaired; automated matrix and keyboard tests pass for the checked surfaces |
| Performance | 2/4 | 3/4 | Default fonts now self hosted as WOFF2; Filters Studio deferred; main bundle remains about 137 KB gzip |
| Responsive behavior | 2/4 | 3/4 | Project actions now work on touch; menu scrolls at short heights; small controls and footer clearance improved |
| Theming | 2/4 | 3/4 | Default dark contrast corrected; all eight preset light/dark switching tests pass; arbitrary combinations remain a larger test space |
| Implementation integrity | 2/4 | 3/4 | One identity source, explicit preview deployment, real FAQ behavior, safe unknown routes |
| Total | 9/20 | 15/20 | Good, with the remaining limits below |

## Findings and fixes

No P0 issue was found in the active public site's primary contact flow. The list contains seven P1 findings and eight P2 findings. All listed UI fixes are included in this branch.

| ID | Severity | Location | Finding and impact | Fix and validation |
| --- | --- | --- | --- | --- |
| 1 | P1 | `src/components/hamburger-menu.tsx`, `style-settings-drawer.tsx`, `terminal/terminal-window.tsx` | Visually hidden overlays retained focus targets. Style settings lacked protected focus and Escape behavior. Terminal declared a modal without a name. | Native named dialogs remove closed content from interaction, make background content inert, support Escape and restore focus. Shared scroll lock; keyboard regressions cover close, reopen, and mobile resize. Relevant criteria: WCAG 2.1.1, 2.4.3, 4.1.2. |
| 2 | P1 | `src/components/projects/project-card.tsx` | Live links and project details existed only in a desktop hover card. Touch visitors could not open the work; the apparent card button had no click behavior. | Visible destination links and native expandable details on every device. Keyboard and mobile regressions cover the ForgePeak card. WCAG 2.1.1. |
| 3 | P1 | `src/app/theme.css`, Lab and Learning pages | Default dark muted text was too dim. Opacity further reduced contrast on badges and planned cards. One light Learning label measured 4.42:1 against its background. | Brighter dark muted token, full opacity status text and planned cards, explicit foreground label. Default light/dark axe scans and targeted final recheck. WCAG 1.4.3. |
| 4 | P1 | `src/App.tsx` | Unknown learning arc URLs called a compatibility `notFound()` function that throws, producing an application error. | Validate arc slugs before rendering. Unknown paths display the recovery page without a runtime error. |
| 5 | P1 | `src/components/faq-chat.tsx`, `src/data/faqData.ts` | Free text silently repeated the previous answer. Hiring branches contained “You'll add your own content here” placeholders. Fake streaming delayed access to controls. | Explicit topic search, authored answers, useful no results response, direct project/contact paths, visible input label, and answer focus. Existing opinion content is preserved. |
| 6 | P1 | `src/data/projectsData.ts`, `src/app/lab/page.tsx` | Public project buttons led to four GitHub 404s and three domains with no DNS resolution during the review. | Removed broken public actions, retained project details, and labeled unavailable destinations. See link evidence below. |
| 7 | P1 | `.github/workflows/deploy-cloudflare-pages.yml` | Manual workflow dispatch from a feature branch still invoked a script hardcoded to deploy as `main`. | Branch preview path now passes the actual branch explicitly; only `main` uses the production script. Per branch concurrency prevents preview runs from cancelling production. |
| 8 | P2 | `src/components/layout-shell.tsx`, `sidebar.tsx`, `mobile-header.tsx` | No skip link or route focus reset; site role was an extra h1; header content lacked landmarks. Mobile offset used a different breakpoint from CSS. | Skip link, focusable main, scroll reset, one page h1, header landmarks, and CSS based mobile offset. |
| 9 | P2 | `src/app/globals.css`, style controls | Small touch targets, inconsistent focus outlines, and a floating style control could cover footer links. | Shared focus indicators, minimum touch target treatment, larger drawer controls, and bottom clearance. Additional 320, 768, and 1024 pixel checks show no page overflow. |
| 10 | P2 | `src/app/lab/page.tsx`, `src/routes/CloudflarePendingPage.tsx` | Paused tools were advertised as Beta/New and sent users to implementation details without a useful next step. | Paused status shown before navigation, plain availability message, proper page heading, Learning Hub recovery link. Backend functionality remains paused. |
| 11 | P2 | Learning activity panel | Draft textarea had no associated label, completion buttons did not expose state, clipboard failures were silent, and drafts appeared saveable. | Visible label, pressed state, copy error/status feedback, explicit unsaved draft note, and activity reset when changing arcs. |
| 12 | P2 | `src/App.tsx` | Insight and learning pages retained generic browser titles. Route metadata was mutated during React rendering. | Per article/arc browser titles and metadata updates in an effect. Static social metadata uses canonical identity. |
| 13 | P2 | Home, About, Projects, identity data | ForgePeak and the founder role were absent from the personal site's main story. Role strings differed across surfaces. | Canonical “Technical founder, consultant, engineer” identity. ForgePeak appears as company experience and project work, with role and verified site URL. |
| 14 | P2 | Brand assets and typography | Metadata, share artwork, and installed font preferences could produce different personal representations. | Shared JSON identity, generated profile kit, canonical Newsreader/IBM Plex Sans fonts, self hosted WOFF2 files with licenses, and reusable platform copy. |
| 15 | P2 | Playwright configuration | Test server used Next.js's `--hostname` flag although the project runs Vite. | Correct `--host` flag, optional installed Chrome and video setting. Added behavior regressions for the repaired flows. |

## Coverage and evidence

- 42 routes checked at 390 and 1440 pixels in light and dark mode: 168 route/theme/viewport combinations. Includes 14 Insights, one Thought, five learning arcs, all main pages, paused feature routes, and unknown route recovery.
- No runtime errors, missing main headings, broken rendered images, or document horizontal overflow in that matrix.
- The matrix's only remaining axe finding was the light Learning label. A targeted recheck after its correction reported no axe violations. Automated checks cover WCAG A/AA tags and best practices; they do not replace a screen reader audit.
- An additional 320, 768, and 1024 pixel homepage check found no horizontal overflow.
- 15 applicable interaction regressions passed; the desktop instance of the mobile resize test is intentionally skipped. The terminal tests were repeated after removing a redundant mobile scroll lock and passed.
- All eight existing style tests passed, including every preset's distinct light/dark tokens. This validates switching, not the contrast of every custom style combination.
- Lint, TypeScript, and Vite production build passed. `npm test` exits successfully because its current configuration excludes the old backend tests and discovers no runnable unit tests.
- The Impeccable detector returned two existing advisories: Geist in optional styles and a grid in Filters Studio. The grid belongs to the visual measuring workspace; neither finding warrants changing the current personal brand.
- Main JavaScript is approximately 466 KB uncompressed / 137 KB gzip. No field performance or real device Core Web Vitals result is claimed.

### Link review

24 distinct HTTPS destinations from rendered main content were checked. Fifteen returned successful HEAD responses. Imagine Software rejected the initial HEAD probe but returned 200 for GET. LinkedIn rejected HEAD with 405; its verified profile URL is retained.

Removed actions:

- `easyclaw.chriswiki.com`, `rekive.ai`, and `recycleme.app`: DNS resolution failed in two independent command probes.
- GitHub repositories `christianwilkins/recycleme`, `christianwilkins/rekive`, `christianwilkins/resume-tailor`, and `christianwilkins/ros2-car`: public 404. This does not establish whether they are private or renamed; replacement URLs should be verified before restoring buttons.

ForgePeak's live URL resolves successfully: https://www.forgepeakventures.com.

## Remaining work and limits

- Library and Supabase Tester need backend migration work to become usable. Their unavailable status is now clear; this release does not implement the backend.
- Legacy archived portfolios and separate subdomain applications retain their own UI. Only links from the personal site were checked.
- The Now page is explicitly dated January 25, 2026. Refresh its personal activity details when Christian supplies current content; this review does not invent updates.
- Older project claims, technologies, and contribution dates need owner confirmation if they have changed. This release corrects known site stack wording and acronym capitalization, without inventing client outcomes.
- Optional font presets still request external font services. Default brand fonts are local. Arbitrary combinations of all style controls are not exhaustively audited.
- Vite serves shared initial HTML across dynamic article URLs. Browser metadata updates correctly, but per article crawler previews would benefit from a separate prerendering task.
- External LinkedIn, GitHub, and X profiles and email signatures have ready to use copy/artwork in the brand guide; those accounts were not edited.

## Release

### Homepage visual revision

The first pass improved usability but left the homepage reading like a biography document. Christian requested a stronger visual pass. Applied the Redesign Existing Projects and Design Taste skills to the existing React implementation.

- Replaced the repeated role headline and focus list with a concise introduction, existing personal portrait, selected work, latest writing, and a contact invitation.
- Added an actual screenshot of the ForgePeak website, captured September 8, 2026. Paired it with the company role and a clear external link. Paira and Resume Tailor AI have compact project entries.
- Used IBM Plex Sans for homepage headings and default navigation, with a wider content measure and a compact header. Newsreader remains available for editorial pages and exported brand artwork.
- Changed the root navigation label to Home so it is distinct from the full About page.
- Moved the homepage style control into the footer after visual review showed the floating trigger covering mobile content. Its native dialog, focus behavior, and presets are retained.
- Checked the homepage at 320, 390, 768, 1024, and 1440 pixels in both themes. No horizontal overflow, broken rendered images, or axe violations across these 10 combinations. Visually reviewed desktop and mobile captures in light and dark mode.
- Lint, TypeScript, and production build passed. All 23 applicable existing browser tests passed before the footer adjustment; all 10 affected style and dialog tests passed again after it. The existing desktop instance of the mobile resize test remains intentionally skipped.

Screenshot source: `https://www.forgepeakventures.com`. The portrait is the existing `public/assets/pfp.jpg`. No generated portraits or simulated product screenshots were introduced.

### Sticky navigation correction

The Amodei preset left the sticky header transparent, allowing page text to show through while scrolling. Its header also repeated the role already shown in the homepage introduction. Desktop top navigation and the mobile header now use a solid theme background. The role remains in the page introduction and sidebar layouts, and is hidden in top navigation across presets. Added desktop and mobile regressions for the scrolled Amodei header in both themes. All 10 style tests, lint, and TypeScript checks passed.

This branch uses Cloudflare Pages preview deployment. The production branch is unchanged. The workflow log records the immutable deployment URL; the stable preview alias is `https://feature-dev-ui-ux-release.chriswiki.pages.dev`.

For brand copy and rollout rules, see [brand-guidelines.md](brand-guidelines.md).
