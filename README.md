# Abune Aregawi Handbook

The user guide and operations handbook for the Debre Tsehay Abune Aregawi church
management application: how treasurers, administrators and members use it, and how a
technical administrator keeps it running, including what to do if the original
developer is unavailable.

- The church application: https://abunearegawi.church
- Feedback and corrections to this guide: abune.aregawi.dev@gmail.com
  (both are set in `src/navigation/site.ts` and shown in the site footer)

It is a small React + TypeScript site (Vite), published with GitHub Pages. **All content
is Markdown** in `src/content/`, so editing the guide never requires touching React code.

> This repository contains **no member data and no secrets**. Every name, number and
> amount in the text and screenshots is invented. Keep it that way: the site is public.

## Quick start

```bash
npm install
npm run dev            # http://localhost:5173/abune-aregawi-user-guide/
npm run check:content  # broken links, missing headings, secrets, real-looking phone numbers
npm run build          # type-check + production build into dist/
npm run preview        # serve dist/ locally to check the production build
```

Node 18 or newer.

## Project layout

```
src/
  content/<section>/<page>.md   ← the guide's text (edit these)
  navigation/sections.ts        ← section order, names, icons
  components/                   ← layout, sidebar, search, article, home page
  lib/markdown.ts               ← Markdown + callouts, steps, annotated screenshots
  lib/content.ts                ← loads pages and front matter
  lib/search.ts                 ← full-text search
  styles/global.css             ← design tokens, light/dark, mobile, print
public/images/<section>/        ← screenshots
diagrams/architecture.archify.json ← source of the architecture diagram (Archify)
public/diagrams/architecture.html  ← the generated interactive diagram
scripts/
  check-content.mjs             ← content checks (run in CI)
  capture-app.mjs               ← screenshot capture from a SYNTHETIC demo environment
  shot.mjs                      ← screenshot of any URL (for previewing the guide)
  postbuild.mjs                 ← GitHub Pages helpers (404.html, .nojekyll)
.github/workflows/deploy.yml    ← build + deploy to GitHub Pages
```

## Writing content

Each page starts with front matter:

```markdown
---
title: Zelle payments
order: 5
audience: Treasurer, Admin
summary: One sentence for search results and section lists.
updated: 2026-11-11          # date the page was last checked against the application
related: donations/square, help/faq
status: needs-confirmation   # optional: shows a badge
---
```

Special blocks: `:::steps`, `:::tip`, `:::note`, `:::warning`, `:::danger`, `:::success`,
`:::admin`, `:::example`, `:::confirm`, `:::copy`, and annotated screenshots:

```markdown
:::screenshot images/zelle/zelle-review.png | Caption under the image
1 @ 70,8 A numbered marker 70% across and 8% down, with this label
:::
```

Internal links use hash routes: `[Zelle](#/donations/zelle)`, or to a heading
`[...](#/help/faq?h=access-and-sign-in)`. A missing screenshot shows a placeholder
naming the file to capture. Full guidance is in the guide itself: **About This Guide →
Maintaining this guide**.

## Screenshots

Screenshots must never come from the live application or from a copy of real data. The
procedure, using an isolated database built from the application's schema only and filled
with invented data, is described in **About This Guide → Screenshot checklist**. With such
an environment running locally:

```bash
APP_URL=http://127.0.0.1:3055 DEMO_FILES=/path/to/synthetic-csvs node scripts/capture-app.mjs
# or just some scenes:  node scripts/capture-app.mjs zelle square
```

The script refuses to run against the production site.

## Deploying to GitHub Pages

The site is built for the project URL `https://<owner>.github.io/abune-aregawi-user-guide/`.

**One-time setup**

1. Create the GitHub repository `abune-aregawi-user-guide`, ideally under a
   church-owned organization, and push this folder to its `main` branch.
2. Repository → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or **Actions → Deploy handbook to GitHub Pages → Run workflow**).
4. When the run is green, the site URL appears on the workflow run and in Settings → Pages.

**Custom domain (optional)**: Settings → Pages → Custom domain; then add the repository
variable `GUIDE_BASE` with value `/` (Settings → Secrets and variables → Actions →
Variables) and re-run the workflow.

**Updating the guide**: edit Markdown, commit, push to `main`. The workflow runs
`check:content` (which fails the deploy on broken links or anything secret-looking),
builds, and publishes within a few minutes.

**Why deep links and refreshes work**: the site uses hash routes
(`…/abune-aregawi-user-guide/#/donations/zelle`), so every URL loads `index.html` and
GitHub Pages never needs server rewrites. `404.html` is a copy of `index.html` as a
safety net. Images are referenced relative to the configured base path, so they load
the same locally and on Pages.

**Checking a deployment**

- Open the home page, then a deep link such as `#/donations/zelle`, and **refresh**.
- Check a page with screenshots, e.g. `#/reconciliation/uploading-the-bank-statement`.
- Try search (press `/`), and the Print button.

## Privacy note

GitHub Pages sites are publicly readable on standard GitHub plans, even when the
repository is private. The guide is written to be safe in public: no member data, no
credentials, no server addresses or account emails. Church leadership should still
decide whether a public operations handbook is acceptable (see *Open questions* in the
guide).
