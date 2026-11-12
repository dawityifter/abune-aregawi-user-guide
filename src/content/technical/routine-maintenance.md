---
title: Routine maintenance calendar
order: 7
audience: Technical administrator
summary: What to check weekly, monthly, quarterly and yearly to keep the system healthy.
updated: 2026-11-11
related: technical/logs-and-monitoring, continuity/backup-and-recovery, continuity/account-recovery
---

## Weekly (10 minutes)

- `/api/ready` answers “ready”; the website loads; sign-in works.
- Zelle Review is receiving new emails (if there were Zelle gifts).
- No failed GitHub Actions runs.
- The **nightly database dump** ran: a new file in `/var/www/backup/` on the API server, a normal size, and a log ending “completed successfully”, and the Google Drive copy dated today. Nothing alerts anyone if it fails. See [Checking that it ran](#/continuity/backup-and-recovery?h=checking-that-it-ran).

## Monthly

- **Ledger Backup → Last Run** succeeded recently.
- Download the **Google Drive copy** of the database to a trusted computer, check it decrypts, then delete the download. See [Backup and recovery](#/continuity/backup-and-recovery).
- Stripe and Square dashboards: no failing webhooks.
- Twilio balance is sufficient.
- Glance at `pm2 logs` for repeated errors, and check server disk space (`df -h`).

## Quarterly

- Apply operating-system security updates on the OCI server (`sudo apt update && sudo apt upgrade` or equivalent), then check the site.
- Check the HTTPS certificate expiry date for `api.abunearegawi.church`.
- Review GitHub repository collaborators and secrets: remove anyone who no longer needs access.
- Run the application’s test suites before and after dependency updates (`npm test` in `backend/` and `frontend/`). Some backend tests fail at random under load; a single failure needs a re-run before you treat it as a real problem.

## Yearly

- **Restore test**: restore the latest nightly dump into a scratch database and open it. A backup that has never been restored isn’t proven.
- Review **roles** in the application (Admin Panel → Role Management).
- Review **account owners** for every outside service. At least two church administrators each. See [Integrations](#/continuity/integrations).
- Renew the **domain** `abunearegawi.church` (confirm the registrar and renewal date).
- Update this guide’s “checked against the application” dates after re-checking each page.
