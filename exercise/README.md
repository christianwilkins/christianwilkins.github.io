# Exercise

Interactive full body routine for https://exercise.chriswiki.com.

Uses the main site's shared `src/app/theme.css` tokens, IBM Plex Sans and Newsreader. Built as a separate static Pages application so updates do not redeploy the main site or the existing anatomy guide.

## Development

Install dependencies from the repository root with `npm ci`, then:

```sh
npm --prefix exercise run dev
npm --prefix exercise run typecheck
npm --prefix exercise test
npm --prefix exercise run build
```

The routine data lives in `src/routine.ts`. Working sets, schedule and equipment choices are saved only in the visitor's browser. No account, server database or analytics are used. Set counts default to the original two working sets; duration is an explicit planning estimate, not a measured result.

## Deployment

Cloudflare Pages project: `chriswiki-exercise`.
Custom domain: `exercise.chriswiki.com`.
Build output: `exercise/build`.

With scoped `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in the process environment, run from this directory:

```sh
../node_modules/.bin/wrangler pages deploy build --project-name chriswiki-exercise --branch main
```

Never put credentials in source or command arguments.

## Design

Claude Design brief and canvas: https://claude.ai/artifact/NUQAunM3MSjsnvBobXZGyV
The canvas is private to its owner's Claude account. The website is implemented locally and uses the main site's theme variables directly.

The manual `Deploy Exercise` GitHub Actions workflow validates and publishes this app independently using the repository's existing Cloudflare secrets. It becomes available after the workflow is merged into the default branch.
