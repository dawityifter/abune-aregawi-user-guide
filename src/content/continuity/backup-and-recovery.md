---
title: Backup and disaster recovery
order: 4
audience: Church leadership, technical administrator
summary: What is actually backed up today, the gaps, the recommended backup routine, and how to recover from data loss or an outage.
updated: 2026-11-11
status: needs-confirmation
related: reports/ledger-backup, technical/database-and-migrations, continuity/taking-over
---

## What exists today

| Backup | What it covers | Status |
|---|---|---|
| **Ledger backup in Google Sheets** | The **ledger only** (income and expense entries), one tab per year, weekly by default | Built into the application. See [Ledger backup](#/reports/ledger-backup). Not enough to restore the application |
| **Supabase’s own backups** | Depends on the Supabase plan; free-tier projects get little or no restorable backup | **Unverified.** Check the Supabase dashboard → Database → Backups |
| **Manual database dumps** (`pg_dump`) | Everything | Described in the app repository for migrations (`docs/MIGRATION_QUICK_START.md`), but **no regular schedule exists** |
| **Source code** | GitHub, plus the developer’s local copies | Safe as long as GitHub access is kept |

:::danger The gap
**There is no verified, regular, complete backup of the database** documented in the application. If the Supabase project were deleted, corrupted or lost through an account problem, member records, pledges and bank reconciliation could be lost. Only the ledger copy in Google Sheets would remain. **Closing this gap is the most important continuity task.**
:::

## Recommended backup routine

:::steps
1. **Monthly** (and before any data correction or risky deploy), the technical administrator takes a full dump on a machine already trusted with `DATABASE_URL`: `pg_dump "$DATABASE_URL" --no-owner --format=custom -f abune-aregawi-YYYY-MM-DD.dump`
2. **Encrypt** the file, and store it in a **church-owned** location that two administrators can open, for example the church’s Google Drive with restricted sharing. Never in GitHub; never on one personal laptop alone.
3. Keep at least the last **12 monthly** dumps.
4. **Consider a paid Supabase plan** with daily backups and point-in-time recovery. For a database holding all the church’s financial history, the cost is usually justified.
5. **Once a year**, test a restore (below).
:::

## Restoring the database

:::steps
1. **Stop and decide.** Restoring replaces data. **Who authorizes:** the treasurer and a member of church leadership must both agree before any restore of financial records, and the decision is minuted.
2. Take a dump of the **current** state first, even if it is damaged.
3. Create a new empty Postgres database: a new Supabase project, or as the provider advises.
4. Restore: `pg_restore --no-owner --dbname "<new database url>" abune-aregawi-YYYY-MM-DD.dump`
5. From `backend/`: `DATABASE_URL='<new url>' npx sequelize-cli db:migrate:status`. Every migration should be “up”.
6. Update the `DATABASE_URL` GitHub secret and **Run workflow → Deploy Backend**.
7. **Validate** (below).
8. Everything recorded **after** the backup date is missing. The treasurer re-enters it from receipts, Zelle Review (**Sync Now**), Square (**Sync from Square**) and the bank statement (re-upload; already-known lines are skipped).
:::

## Accidental deletion of data

- **A member deleted**: deleting only deactivates. Edit the member and set **Active**.
- **A payment, expense or other record really deleted**: restore the latest dump into a scratch database, and have a developer copy the single record back. Don’t restore the whole database for one record.

## Recovering from an outage

| Outage | Steps |
|---|---|
| API down (`/api/ready` fails) | Check pm2 and the logs ([Logs](#/technical/logs-and-monitoring)); restart the instance in the OCI console; check Supabase |
| Database down | Supabase status page and dashboard; a free project may be **paused**. Resume it from the dashboard |
| Website down | Firebase status; run the frontend deploy workflow again |
| Server lost entirely | Rebuild (below) |

### Rebuilding the API server

:::steps
1. Create a new Ubuntu VM (OCI or any provider) with a public IP.
2. Install Node.js (the version the backend uses), `git`, `nginx`, `pm2` and a Let’s Encrypt client such as `certbot`.
3. Clone the repository to `/var/www/repo`.
4. Configure nginx: HTTPS for `api.abunearegawi.church`, forwarding to `http://127.0.0.1:10000`, with `client_max_body_size` large enough for CSV uploads.
5. Point the DNS `A` record for `api.abunearegawi.church` at the new IP, then obtain the certificate.
6. Update the GitHub secrets `OCI_HOST`, `OCI_USERNAME`, `OCI_SSH_KEY`, and run **Deploy Backend**. It writes `.env`, installs, migrates and starts pm2.
7. Update the **Stripe**, **Square** and **Twilio** webhook settings if the hostname changed.
8. Validate.
:::

## Validating after any recovery

:::steps
1. `/api/ready` answers ready. Sign in as a treasurer.
2. **Overview**: totals look like the last known figures (compare with the Google Sheets ledger backup).
3. **Member Dues**: open three members you know; their history is right.
4. **Bank Integration**: Monthly Summary statuses are as before.
5. Make a $1 test donation online, check it appears, then refund it in Stripe and have it corrected.
6. Ask the treasurer to click **Sync Now** on Ledger Backup.
:::
