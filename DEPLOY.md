# Deploying the site

Static site built with **Hugo + Blowfish**. Source lives in this repo
(`barry-oc/blog`, branch `main`). The theme is vendored into
`themes/blowfish/` (no submodules), so no `git submodule` step is needed.

---

## Option 1 — Cloudflare Pages (recommended)

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the `barry-oc/blog` repository and the `main` branch.
3. Build configuration:
   - **Framework preset:** `Hugo` (auto-fills the two fields below)
   - **Build command:** `hugo --minify`
   - **Build output directory:** `public`
   - **Environment variable (optional):** `HUGO_VERSION` = `0.139.0`
4. **Save and Deploy.**
5. **Custom domains** → add `barryocallaghan.com`.

Every push to `main` triggers a new deploy automatically.

---

## Option 2 — GitHub Pages

Create `.github/workflows/hugo.yaml`:

```yaml
name: Deploy Hugo site to Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-hugo@v3
        with:
          hugo-version: "0.139.0"
      - uses: actions/configure-pages@v5
      - run: hugo --minify
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then: GitHub → **Settings → Pages → Source = GitHub Actions**, and add the
custom domain `barryocallaghan.com`.

---

## Writing posts

```bash
hugo new posts/my-new-tool/index.md
```

The archetype pre-fills front matter. Edit the file:

```yaml
---
title: "My New Tool"
date: 2026-10-21
draft: false
description: "One-line summary."
tags: ["python", "tooling"]
categories: ["tools"]
# series: ["ship-a-tool-a-week"]
# externalUrl: "https://github.com/barry-oc/repo"  # card links straight to GitHub
# featureimage: "img/covers/foo.svg"
---
```

- **Regular post:** write the body normally, link GitHub repos inline.
- **Link post:** set `externalUrl` — the card title jumps straight to the repo.
- **Tags / categories:** auto-generate `/tags/<tag>/` and `/categories/<cat>/` pages.

## Local preview

```bash
hugo server -D
```

Open http://localhost:1313. Drafts show only with `-D`.
