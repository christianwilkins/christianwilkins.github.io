# Christian Wilkins brand guide

Version 1.0 · September 8, 2026

## Canonical identity

**Christian Wilkins**

**Technical founder, consultant, engineer**

Use this name and role, in this order, across the personal website, professional profiles, speaker bios, proposals, and introductions. Christian supplied the positioning for this release. The public name omits the middle initial; legal documents can retain the legal name.

The machine readable source is [identity.json](../public/brand/identity.json). The site imports it through `src/data/personalBrand.ts`, and the Vite build uses it for the HTML metadata. The build also synchronizes the manifest, `ai.txt`, and `llms.txt`. Change the source first when updating identity copy. The profile kit is generated from that source.

## Relationship to ForgePeak

Christian Wilkins is the person. ForgePeak Ventures is the company he founded and through which he consults and engineers products. ChrisWiki is the personal site's domain and lab identity, not a second professional name.

Use **Founder, consultant, engineer** as the ForgePeak role. Link to [the company website](https://www.forgepeakventures.com). Use **Forgepeak Ventures LLC** on legal documents. The company repository currently uses “Forgepeak Ventures”; the personal site uses the “ForgePeak” styling selected for this kit. Do not silently change the legal name or the independent company brand.

Describe the work in concrete terms: technical direction, product delivery, hands on engineering, design systems, and AI workflows. Keep project contributions tied to the named project. Do not infer client metrics, dates, titles such as CEO or CTO, or company wide results from the founder role.

## Copy to reuse

### Short descriptor

Technical founder, consultant, engineer

### Profile headline

Technical founder, consultant, engineer. Founder of ForgePeak Ventures.

### First person bio

I'm a technical founder, consultant, and engineer. I build products, design systems, and AI workflows through ForgePeak Ventures.

### Third person bio

Christian Wilkins is a technical founder, consultant, and engineer. He builds products, design systems, and AI workflows through ForgePeak Ventures.

### Longer introduction

I'm Christian Wilkins, a technical founder, consultant, and engineer based in the United States. I founded ForgePeak Ventures, where I work with founders on technical direction and software delivery. My work spans product design, front end architecture, design systems, and AI workflows. I also write about what I'm building and learning at chriswiki.com.

### Company experience

ForgePeak Ventures — Founder, consultant, engineer

I work with founders on technical direction, product delivery, and hands on engineering. I also design and develop the company website, which brings together our services and project work.

## Voice

Direct: start with what happened, what you built, or what you believe. Use familiar words and concrete examples.

Curious: show the question, experiment, or observation behind an idea. Keep uncertainty visible where the evidence is incomplete.

Practical: describe a decision and its consequence. Name the tool only when it helps someone understand the work.

Personal: use “I” for personal work and opinions. Use “we” only for work attributable to the company or a real team. Personal writing can be informal and opinionated; service descriptions should make scope and next steps easy to understand.

Example: “I work with founders to turn prototypes into shipped products.” Avoid unsupported claims such as “I transform businesses with revolutionary solutions.”

Preserve technical capitalization: AI, API, ATS, LLM, NLP, ROS 2, and QA. Write prose in sentence case. Project and product names retain their official capitalization.

## Visual identity

Preserve the site's editorial system: serif headlines, plain sans serif body text, quiet neutral surfaces, and clear underlined links. The full name is the primary identifier. The existing outlined hexagon is a secondary mark for small avatars, favicons, and constrained spaces.

| Use | Canonical value |
| --- | --- |
| Heading and wordmark | Newsreader, weight 700 |
| Body and descriptors | IBM Plex Sans, weights 400–600 |
| Light surface | `#f3f3f3` |
| Primary ink | `#161616` |
| Secondary ink on light surfaces | `#636363` |
| Existing mark ground | `#121211` |
| Existing mark stroke | `#f1efe8` |
| Default dark surface | Black, with light primary text and the corrected muted token in `src/app/theme.css` |

The self hosted font files and licenses are in `public/brand/fonts`. Exported PNGs embed the rendered type, so profile artwork does not depend on fonts installed on the viewing device. The site now uses Newsreader explicitly instead of preferring locally installed Plantin variants.

Keep the mark square. Leave at least one stroke width of clear space and use a larger margin for circular avatar crops. Do not stretch it, add effects, or substitute the company logo for the personal mark. Use the full wordmark whenever the person needs to be identified without surrounding profile text.

No canonical headshot was selected in this task. The provided avatar is the existing geometric mark. A future real headshot should use one consistent crop across personal accounts and retain the person's actual appearance.

Visitor selected site presets are optional presentation settings; exported profiles and share images use the canonical look. A preset must never rewrite identity copy. Keep body text at least 16px, paragraphs comfortably readable, and ordinary text contrast at least 4.5:1.

## Platform kit

| Surface | Copy | Asset |
| --- | --- | --- |
| LinkedIn | Profile headline and longer introduction above; ForgePeak experience entry | `profile-banner.png`, `avatar.png` |
| GitHub | “Technical founder, consultant, engineer. Founder of ForgePeak Ventures.” | `avatar.png` |
| X | “Technical founder, consultant, engineer. Founder of ForgePeak Ventures. Building products, design systems, and AI workflows.” | `avatar.png`; adapt the supplied banner to the current uploader crop |
| Website and link previews | Canonical name, role, and short bio | `social-card.png` |
| Email signature | Christian Wilkins / Technical founder, consultant, engineer / Founder, ForgePeak Ventures / chriswiki.com | Text first |
| Speaker and author bios | Third person bio above | Existing mark or a separately selected real headshot |

The public asset URLs will resolve at `/brand/` on the deployment. The banner is 1584 × 396; the social card is 1200 × 630; the avatar is 1024 × 1024. These are the delivered artwork sizes, not a claim about every platform's current upload requirements. Preview the crop in each platform before saving.

## Keeping it consistent

1. Update `public/brand/identity.json` for any identity change.
2. Update the matching copy in this guide, including platform variants.
3. Run `PLAYWRIGHT_CHANNEL=chrome node scripts/render-brand.cjs` with local Chrome, or omit the environment variable when Playwright Chromium is installed.
4. Run the site checks and build. Inspect the social card and banner.
5. Apply the matching copy and artwork to each owned account. Record the date and URL in the rollout record below.

| Surface | This release |
| --- | --- |
| Personal website | Applied on the dev branch |
| ForgePeak entry on personal site | Applied on Home, About, and Projects |
| Website metadata and share image | Applied on the dev branch |
| LinkedIn, GitHub, X, email signature | Copy and artwork prepared; account profiles were not edited |
| ForgePeak company website | Used as a factual source; unchanged |

Future agents should load this guide and the identity source before creating public profile material. Prefer this source over older portfolio exports or archived Next.js metadata.
