---
title: Maintaining this guide
order: 4
audience: Technical administrator, guide maintainers
summary: How the guide is organized, how to edit a page, add a screenshot, publish an update, and keep it accurate.
updated: 2026-11-11
related: about/screenshot-checklist, about/completeness-checklist
---

The guide is a small React website in its own repository, `abune-aregawi-user-guide`. **All content is Markdown** in `src/content/<section>/<page>.md`. To change the words, you never touch the React code.

## Editing a page

:::steps
1. Open the Markdown file, e.g. `src/content/donations/zelle.md`. On GitHub you can edit it directly in the browser (pencil icon).
2. Change the text. Keep the **front matter** (the block between the `---` lines) and update `updated:` to today’s date **only if you re-checked the page against the application**.
3. Commit to `main`. The site rebuilds and publishes itself within a few minutes (see the README).
:::

## Special blocks

```
:::steps
1. Numbered step cards.
:::

:::warning Optional title
Callouts: tip, note, warning, danger, success, admin, example, confirm, copy
:::

:::screenshot images/zelle/zelle-review.png | Zelle Review: each Zelle email with its payer, memo and matched member
1 @ 88,58 Filter, status, Refresh and Sync Now
2 @ 29,67 Payer name from the email
3 @ 49,67 Matched (suggested) member
4 @ 63,68 Search member, then Save the match
5 @ 61,83 Payment type, receipt and Create transaction
6 @ 61,91 Payer name (required) when the email had none
:::
```

`:::confirm` marks information the church still has to confirm. Also set `status: needs-confirmation` in the front matter so the page shows the badge. `:::copy` adds a **Copy** button.

## Adding a page

Create `src/content/<section>/<new-page>.md` with front matter (`title`, `order`, `audience`, `summary`, `updated`, optional `related`, `status`). It appears in the sidebar and in search automatically. New sections are added in `src/navigation/sections.ts`.

## Before publishing

```bash
npm install
npm run check:content     # broken links, missing headings, secrets, phone numbers
npm run build             # type-check and build
npm run dev               # preview at http://localhost:5173/abune-aregawi-user-guide/
```

## Feedback

Readers send feedback and corrections to **[abune.aregawi.dev@gmail.com](mailto:abune.aregawi.dev@gmail.com)**, which is linked in the footer of every page. Check that mailbox regularly, and fix confirmed errors in the guide the same week. The address and the main site link are set in `src/navigation/site.ts`.

## Updating the architecture diagram

The diagram on [Architecture at a glance](#/technical/architecture) is made with **Archify**. Its source is `diagrams/architecture.archify.json`, a short list of boxes and arrows. After changing it:

```bash
node <archify>/bin/archify.mjs validate architecture diagrams/architecture.archify.json --quality showcase
node <archify>/bin/archify.mjs deliver architecture diagrams/architecture.archify.json public/diagrams/architecture.html --quality showcase
```

Then refresh the still image `public/images/technical/architecture.png` (a screenshot of the diagram), which the page shows and which prints.

## Rules

- **No member data, ever.** Invented names only; phone numbers from 555-0100–0199.
- **No secrets, ever**: no passwords, keys, tokens, connection strings, server IPs or account emails. Name the setting, not its value.
- **Describe what the application actually does.** If unsure, check the code or mark it `:::confirm`. Don’t guess.
- When the application changes, update the affected pages in the **same week**, and their `updated:` date.
