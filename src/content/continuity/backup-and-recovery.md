---
title: Backup and disaster recovery
order: 4
audience: Church leadership, technical administrator
summary: The nightly database dump on the API server, what it does not cover, the recommended routine, and how to recover from data loss or an outage.
updated: 2026-11-11
status: needs-confirmation
related: reports/ledger-backup, technical/database-and-migrations, continuity/taking-over
---

## What exists today

| Backup | What it covers | Status |
|---|---|---|
| **Nightly database dump on the API server** | The **whole database**: every member, payment, pledge, expense and reconciliation record | **Running.** A cron job on the Oracle Cloud API server, every day at 15:45 server time. Keeps about the **last 4 days**. See [The nightly database dump](#/continuity/backup-and-recovery?h=the-nightly-database-dump) |
| **Ledger backup in Google Sheets** | The **ledger only** (income and expense entries), one tab per year, weekly by default | Built into the application. See [Ledger backup](#/reports/ledger-backup). Not enough to restore the application, but it is kept off the server and goes back years |
| **Supabase’s own backups** | Depends on the Supabase plan; free-tier projects get little or no restorable backup | **Unverified.** Check the Supabase dashboard → Database → Backups |
| **Manual dumps** | Everything | Before a data correction or a risky deploy, run the backup script by hand (below), or `pg_dump` from a trusted machine |
| **Source code** | GitHub, plus the developer’s local copies | Safe as long as GitHub access is kept |

## The nightly database dump

The API server’s crontab runs this every day at **15:45 server time**:

```
45 15 * * * /bin/bash /var/www/scripts/backup_script.sh
```

| | |
|---|---|
| **What it does** | `pg_dump` of the production Supabase database, as a plain SQL file, then compresses it with gzip |
| **Where the files are** | `/var/www/backup/` on the API server, named `abune_aregawi_db_YYYY-MM-DD_HHMMSS.sql.gz` |
| **Log** | `/var/www/backup/backup_YYYY-MM-DD.log`, one per day. A good run ends with “Backup process completed successfully” |
| **Retention** | Dumps older than 3 days are deleted, so about 4 are on hand. Logs are kept 7 days |
| **Deploys** | Deploying the backend only touches `/var/www/repo`, so the backups are not affected |
| **Who can reach it** | Anyone who can sign in to the API server. The files are not encrypted |

The script itself lives only on the server, not in the code repository. It holds the database credentials, so treat it like the `.env` file: never copy it into GitHub or this guide.

### Checking that it ran

Sign in to the API server and run:

```
ls -lh /var/www/backup/
tail -3 /var/www/backup/backup_$(date +%F).log
```

You should see a `.sql.gz` file from today (after 15:45) of roughly the same size as the days before, and the log ending in “completed successfully”. A file much smaller than usual, a missing day, or an `ERROR:` line in the log means the dump failed. **Nothing alerts anyone when it fails**, so this check is the only way to know.

### Taking a backup by hand

Before a data correction or a risky deploy, sign in to the server as the user whose crontab holds the job, and run `/bin/bash /var/www/scripts/backup_script.sh`. Copy the new file somewhere safe if the change is significant, because the nightly job deletes it after 3 days.

:::danger What the nightly dump does not cover
- **It lives on the same server it protects.** If the API server or the Oracle Cloud account is lost, the backups go with it. No copy is kept anywhere else.
- **Only about 4 days are kept.** A mistake noticed a week later can’t be undone from these files.
- **A failure is silent.** Nobody is told if a night’s dump fails.
- **It has not been confirmed that a restore works.** A backup that has never been restored isn’t proven.

**Closing these gaps, starting with an off-server copy, is the most important continuity task.**
:::

## Recommended backup routine

:::steps
1. **Keep the nightly job** running, and check it **weekly** (above).
2. **Weekly or at least monthly, copy the latest dump off the server** to a **church-owned** location that two administrators can open, for example the church’s Google Drive with restricted sharing, or Oracle Cloud Object Storage. **Encrypt** it first. Never in GitHub; never on one personal laptop alone.
3. Keep at least the last **12 monthly** copies off the server.
4. **Add a failure alert** to the script (an email or text when the dump fails), so a silent failure can’t run on for weeks.
5. **Consider a paid Supabase plan** with daily backups and point-in-time recovery, as a second, independent backup.
6. **Once a year**, test a restore (below).
:::

## Restoring the database

:::steps
1. **Stop and decide.** Restoring replaces data. **Who authorizes:** the treasurer and a member of church leadership must both agree before any restore of financial records, and the decision is minuted.
2. Take a dump of the **current** state first, even if it is damaged (run the backup script by hand), and copy it off the server.
3. Create a new empty Postgres database: a new Supabase project, or as the provider advises.
4. Pick the dump to restore: the newest one from **before** the problem began. Restore it with `psql` (the nightly files are plain SQL, so `pg_restore` won’t read them): `gunzip -c abune_aregawi_db_YYYY-MM-DD_HHMMSS.sql.gz | psql "<new database url>"`. The dump covers the whole Supabase database, so messages about objects that already exist in Supabase’s own schemas (such as `auth` or `storage`) are expected in a new Supabase project. What matters is that the application’s tables restore without errors.
5. From `backend/`: `DATABASE_URL='<new url>' npx sequelize-cli db:migrate:status`. Every migration should be “up”.
6. Update the `DATABASE_URL` GitHub secret and **Run workflow → Deploy Backend**.
7. **Validate** (below).
8. Everything recorded **after** the backup date is missing. The treasurer re-enters it from receipts, Zelle Review (**Sync Now**), Square (**Sync from Square**) and the bank statement (re-upload; already-known lines are skipped).
:::

## Accidental deletion of data

- **A member deleted**: deleting only deactivates. Edit the member and set **Active**.
- **A payment, expense or other record really deleted**: act within 3 days, before the nightly job deletes the older dumps. Restore the dump from before the deletion into a scratch database, and have a developer copy the single record back. Don’t restore the whole database for one record.

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
