# Christian Wilkins

The source for [chriswiki.com](https://chriswiki.com), built with Vite and deployed through Cloudflare Pages.

## Local development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Vite prints the local URL when the development server starts.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Deployment

Pushing to `main` runs [the Cloudflare Pages deployment workflow](.github/workflows/deploy-cloudflare-pages.yml). It installs dependencies, runs the checks above, builds the Vite site, and deploys the `dist` directory to the `chriswiki` Cloudflare Pages project.

Cloudflare logs also show an immutable `*.pages.dev` deployment URL. That is the deployment alias, not a separate environment: the production deployment is served at [chriswiki.com](https://chriswiki.com).

### GitHub Actions secrets

The repository requires these GitHub Actions secrets:

| Secret | Purpose |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account that owns the Pages project. |
| `CLOUDFLARE_API_TOKEN` | Token used by Wrangler to deploy the Pages project. |

For a repository that only deploys an existing Cloudflare Pages project, those two secrets are sufficient. The API token needs Cloudflare Pages deployment access for the target account/project.

Managing DNS, custom domains, or Workers is separate from a Pages deploy. Extend the API token with the relevant zone DNS, zone/domain, or Workers permissions only when the automation must perform those actions. Keep token values in GitHub Secrets or a local untracked `.env` file; never commit or paste them into source files.

### Provision another Pages app

Use the **Provision Cloudflare Pages Project** workflow from the Actions tab when a new repository needs its own subdomain. Provide the Pages project name (for example, `chriswiki-photos`) and its fully qualified hostname (for example, `photos.chriswiki.com`). The workflow is safe to rerun: it creates the Pages project only when it does not already exist, then attaches the domain only when it is not already attached.

The token needs **Pages: Edit** access to create the project and attach the custom domain, plus **Zone: DNS: Edit** access for the `chriswiki.com` zone. The workflow creates the required proxied CNAME record pointing at `<project>.pages.dev`. A newly attached hostname can remain in `initializing` state while DNS and certificate provisioning complete.

For local Wrangler commands, this repository's untracked `.env` uses `CLOUDFLARE_TOKEN`; Wrangler expects the same value in `CLOUDFLARE_API_TOKEN`.

## Manual deploy

With `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` available in the environment:

```bash
npm run build
npm run deploy:cloudflare
```
