---
title: Ledger backup (Google Sheets)
order: 8
audience: Treasurer, Admin, Technical administrator
summary: The automatic copy of the ledger in Google Sheets — what it contains, its schedule, running it by hand, and what it is not.
updated: 2026-11-11
related: continuity/backup-and-recovery, technical/logs-and-monitoring
---

**Treasurer → Ledger Backup** controls a copy of the church’s ledger in a **Google Sheets** spreadsheet: “Export ledger entries to Google Sheets, sync the current year on demand, and control the recurring schedule.”

:::admin
**Treasurer** and **Admin** only.
:::

## What it contains

- One spreadsheet for production, normally named **Abune Aregawi Ledger Backup - Prod**, in a church Google Drive folder.
- **One tab per year.** Each export **clears the year’s tab and rewrites it completely**.
- Every **ledger entry**: income and expenses, with member names and phone numbers. **Treat the spreadsheet as confidential.**

## The panel

| Item | Meaning |
|---|---|
| **Environment**, **Spreadsheet**, **Open spreadsheet** | Which spreadsheet is used, and a link to it |
| **Google Access** | Whether the connection to Google is working |
| **Last Run** | When the last export ran, and whether it succeeded |
| **Scheduled Sync** | **Enable scheduled sync**, **Frequency** (Weekly or Daily), **Day of week**, **Time (America/Chicago)**, and **Also sync the previous year tab**. The default is weekly, Sunday 2:00 AM Central. |
| **Run Full Export** | Rewrites every year’s tab |
| **Sync Now** | Rewrites the current year (and the previous year, if ticked) |

:::screenshot images/reports/ledger-backup.png | The Ledger Backup panel (this example environment shows Dev, with Google access not configured)
1 @ 82,57 Run Full Export and Sync Now
2 @ 40,68 Spreadsheet in use
3 @ 78,68 Last Run
4 @ 15,83 Scheduled Sync settings
:::

## Routine

- Once a month, check **Last Run** is recent and succeeded.
- After any correction by the technical administrator, click **Sync Now** so the copy matches.

## What it is — and is not

:::warning This is not a full backup of the application
The sheet holds the **ledger** only: income and expense entries. It does **not** contain member records, households, pledges, bank lines, Zelle or Square queues, or settings. A payment without a ledger entry never reaches the sheet. It is a readable safety copy of the books for the treasurer and an auditor. It **cannot** be used to restore the application. See [Backup and recovery](#/continuity/backup-and-recovery).
:::

## If it fails

| Symptom | Likely cause | Who fixes |
|---|---|---|
| **Last Run** shows an error mentioning Google or authorization | The Google access token expired or was revoked | Technical administrator: create a new token (see [Integrations](#/continuity/integrations)) |
| **Last Run** is weeks old, with no error | The schedule is off, or the server setting `LEDGER_SHEETS_EXPORT_ENABLED` is not true | Check **Enable scheduled sync**; otherwise the technical administrator |
| Rows are missing for some payments | Those payments have no ledger entry | Technical administrator |
