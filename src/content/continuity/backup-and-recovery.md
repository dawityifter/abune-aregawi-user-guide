---
title: Backup and disaster recovery
order: 4
audience: Church leadership, technical administrator
summary: The nightly database dump and its encrypted copy in the church’s Google Drive, what they do not cover, the recommended routine, and how to recover from data loss or an outage.
updated: 2026-11-11
status: needs-confirmation
related: reports/ledger-backup, technical/database-and-migrations, continuity/taking-over
---

## What exists today

| Backup | What it covers | Status |
|---|---|---|
| **Nightly database dump on the API server** | The **whole database**: every member, payment, pledge, expense and reconciliation record | **Running.** A cron job on the Oracle Cloud API server, every day at 15:45 server time (3:45 p.m. Central; the server runs on Central time). Keeps about the **last 4 days**. See [The nightly database dump](#/continuity/backup-and-recovery?h=the-nightly-database-dump) |
| **Encrypted copy in the church’s Google Drive** | The same dump, encrypted | **Running** since 2026-11-11. The same job replaces **one file** in the church Google account’s **Database Backups** folder every night. See [The Google Drive copy](#/continuity/backup-and-recovery?h=the-google-drive-copy) |
| **Ledger backup in Google Sheets** | The **ledger only** (income and expense entries), one tab per year, weekly by default | Built into the application. See [Ledger backup](#/reports/ledger-backup). Not enough to restore the application, but it is kept off the server and goes back years |
| **Supabase’s own backups** | Depends on the Supabase plan; free-tier projects get little or no restorable backup | **Unverified.** Check the Supabase dashboard → Database → Backups |
| **Manual dumps** | Everything | Before a data correction or a risky deploy, run the backup script by hand (below), or `pg_dump` from a trusted machine |
| **Source code** | GitHub, plus the developer’s local copies | Safe as long as GitHub access is kept |

## The nightly database dump

The API server’s crontab runs this every day at **15:45 server time**, which is **3:45 p.m. Central** (the server runs on Central time):

```
45 15 * * * /bin/bash /var/www/scripts/backup_script.sh
```

| | |
|---|---|
| **What it does** | `pg_dump` of the production Supabase database, as a plain SQL file, compressed with gzip; then an encrypted copy replaces the one in Google Drive (below) |
| **Where the files are** | `/var/www/backup/` on the API server, named `abune_aregawi_db_YYYY-MM-DD_HHMMSS.sql.gz` |
| **Log** | `/var/www/backup/backup_YYYY-MM-DD.log`, one per day. A good run ends with “Backup process completed successfully” |
| **Retention** | Dumps older than 3 days are deleted, so about 4 are on hand. Logs are kept 7 days |
| **Deploys** | Deploying the backend only touches `/var/www/repo`, so the backups are not affected |
| **Who can reach it** | Anyone who can sign in to the API server. The files on the server are not encrypted |

The script itself lives only on the server, not in the code repository. It holds no passwords. Three private files, readable only by the server user that runs the job, hold what it needs: `~/.pgpass` (the database password), `~/.backup-passphrase` (the encryption passphrase) and `~/.config/rclone/rclone.conf` (the Google Drive sign-in). Treat them like the `.env` file: never copy them into GitHub or this guide.

### The Google Drive copy

| | |
|---|---|
| **Where** | The church Google account’s Drive, folder **Database Backups**, file `abune_aregawi_db_latest.sql.gz.gpg` |
| **How many** | **One.** Each night’s upload replaces it. Drive usually keeps earlier versions for about 30 days under the file’s **Manage versions** |
| **Encryption** | `gpg`, with a passphrase. **The passphrase must be kept with the church’s records**, outside the server: without it the file can’t be opened, and if the server is lost its copy of the passphrase goes too |
| **How it gets there** | `rclone`, signed in to the church Google account with access to the files it created only, not the rest of the Drive |
| **Who can open it** | Share the folder with no more than two church administrators |
| **Checked** | On 2026-11-11 the Drive copy was downloaded and decrypted on another computer, and it opened as a valid database dump (only its start was read) |
| **Safety check** | The script won’t upload a dump that is damaged or under half the size of a recent one, so a bad night can’t overwrite the last good copy. The Drive file then stays as it was, and the log shows an `ERROR:` line |

If the church’s Google password changes, or rclone’s access is removed in the Google account’s security settings, uploads stop with an error in the log. Reconnect on the server with `rclone config reconnect churchdrive:`.

### Checking that it ran

Sign in to the API server and run:

```
ls -lh /var/www/backup/
grep -E "ERROR|Off-server|completed" /var/www/backup/backup_$(date +%F).log
```

You should see a `.sql.gz` file from today (after 15:45) of roughly the same size as the days before, and the log showing “Off-server copy replaced in Google Drive” and “completed successfully”. In Drive, the file’s **Last modified** should be today. A file much smaller than usual, a missing day, an `ERROR:` line, or “completed WITH ERRORS” means something failed. **Nothing alerts anyone when it fails**, so this check is the only way to know.

### Taking a backup by hand

Before a data correction or a risky deploy, sign in to the server as the user whose crontab holds the job, and run `/bin/bash /var/www/scripts/backup_script.sh`. It also replaces the Google Drive copy. Copy the new file somewhere safe as well if the change is significant: the server deletes it after 3 days, and the next night replaces the Drive copy.

:::danger What the nightly backup does not cover
- **Only a few days of history.** The server keeps about 4 days and Drive keeps one file (plus whatever earlier versions Drive holds, usually about 30 days). A mistake noticed later than that can’t be undone from these files.
- **A failure is silent.** Nobody is told if a night’s dump or upload fails.
- **Losing the passphrase makes the Drive copy useless.** Keep it with the church’s records, and check that two people know where.
- **A full restore has not been tested.** The Drive copy has been decrypted and opened, but not yet restored into a database. A backup that has never been restored isn’t proven.
:::

## Recommended backup routine

:::steps
1. **Keep the nightly job** running, and check it **weekly** (above).
2. **Monthly**, open the Drive copy on a trusted computer to prove it decrypts (below), then delete the downloaded file.
3. **Keep the passphrase** with the church’s records, and review at each annual meeting who can find it.
4. **Add a failure alert** to the script (an email or text when the dump fails), so a silent failure can’t run on for weeks.
5. **Consider a paid Supabase plan** with daily backups and point-in-time recovery, as a second, independent backup.
6. **Once a year**, test a restore (below).
:::

## Restoring the database

:::steps
1. **Stop and decide.** Restoring replaces data. **Who authorizes:** the treasurer and a member of church leadership must both agree before any restore of financial records, and the decision is minuted.
2. Take a dump of the **current** state first, even if it is damaged (run the backup script by hand), and copy it off the server.
3. Create a new empty Postgres database: a new Supabase project, or as the provider advises.
4. Pick the dump to restore: the newest one from **before** the problem began. If the server is gone, use the Google Drive copy: download it to a trusted computer and decrypt it with `gpg -d abune_aregawi_db_latest.sql.gz.gpg > abune_aregawi_db_latest.sql.gz` (it asks for the passphrase). If the latest copy is already damaged, look under **Manage versions** in Drive for an earlier one. Restore it with `psql` (the nightly files are plain SQL, so `pg_restore` won’t read them). Use **`psql` 17.6 or newer**: the dumps begin with a `\restrict` line that older versions stop on. `gunzip -c abune_aregawi_db_YYYY-MM-DD_HHMMSS.sql.gz | psql "<new database url>"`. The dump covers the whole Supabase database, so messages about objects that already exist in Supabase’s own schemas (such as `auth` or `storage`) are expected in a new Supabase project. What matters is that the application’s tables restore without errors.
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
