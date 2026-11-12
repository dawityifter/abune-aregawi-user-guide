---
title: Logs, monitoring and common errors
order: 4
audience: Technical administrator
summary: Checking whether the system is up, where the logs are, and how to read the errors that have actually happened.
updated: 2026-11-11
related: technical/hosting-and-deployment, help/troubleshooting, help/incident-history
---

## Is it up?

| Check | Healthy answer |
|---|---|
| Website `https://abunearegawi.church` (Firebase Hosting; also reachable at the project address `abune-aregawi-church-app.web.app`) | The home page loads |
| `https://api.abunearegawi.church/api/ready` | `"status":"ready"`. This **really checks the database**; a timeout or error means the API can’t reach Supabase |
| `https://api.abunearegawi.church/api/health` | `"status":"OK"`. This only shows that the Node process answers; its `"database":"connected"` is **not** a real check |
| Status pages | Firebase, Supabase, Oracle Cloud, Stripe, Square and Twilio each publish a status page. Check them during an outage |

:::tip Set up an uptime monitor
No uptime monitoring is configured in the repository. A free external monitor polling `/api/ready` every few minutes, emailing two people, would catch outages early. See [open questions](#/about/open-questions).
:::

## Where the logs are

| Log | How to read it |
|---|---|
| Backend application log | On the server: `pm2 logs abune-aregawi-backend` (live), or `pm2 logs abune-aregawi-backend --lines 500` |
| nginx (gateway) errors | `/var/log/nginx/error.log` on the server |
| Deployments | GitHub → Actions → the workflow run |
| Frontend errors | Sentry, if `REACT_APP_SENTRY_DSN` is set |
| Backend errors | Sentry, if `SENTRY_DSN` is set |
| Stripe webhook deliveries | Stripe dashboard → Developers → Webhooks |
| Square webhook deliveries | Square Developer dashboard → Webhooks |
| Who changed what | Admin Panel → Activity Logs |
| Ledger backup runs | Treasurer → Ledger Backup → Last Run; or `pm2 logs … \| grep -i "ledger sheets"` |

## Errors that have actually happened

### “CORS error” / “Failed to fetch” on one screen in production

**Cause:** nginx gives up on any request taking longer than **60 seconds** and returns a gateway error **without** the CORS headers. The browser then reports it as a CORS problem, so it looks like configuration when it is really a slow request. Seen in July 2026 on large bank uploads.

**Diagnose:** `grep -i "upstream timed out\|too large" /var/log/nginx/error.log`.

**Fix:** make the slow operation faster or batch it. Bank upload auto-reconciliation is now batched, with `UPLOAD_AUTO_RECONCILE_LIMIT` (default 200) capping the work done during upload. Raising nginx’s timeout is a last resort.

### The whole site shows errors everywhere

1. `/api/ready`: if the database check fails, check the Supabase dashboard (project paused, quota exceeded, password changed?).
2. `pm2 status`: is `abune-aregawi-backend` **online**? If it keeps restarting, read `pm2 logs`. A missing setting or a failed migration at start-up is typical.
3. Was there a deploy just now? Check GitHub Actions.

### Sign-in fails for everyone

Check the Firebase console (Authentication) and its status page. Firebase phone sign-in has SMS quotas and a list of authorized domains. If the site moved to a new domain, add it under **Authentication → Settings → Authorized domains**.

### Zelle emails stopped arriving in Zelle Review

The Gmail access token has probably expired or been revoked (common when the Google account’s password changes). `pm2 logs` shows Gmail authentication errors. Create a new refresh token (`backend/scripts/get-gmail-token.js`), update `GMAIL_REFRESH_TOKEN`, redeploy. If emails arrive but the **payer name** is empty on every row, Chase changed its email layout and the parser needs a developer.

### Online gifts not appearing

Stripe dashboard → Webhooks → failed deliveries. A changed or wrong `STRIPE_WEBHOOK_SECRET` makes every delivery fail with a signature error. Stripe retries for about 3 days; once fixed, resend failed events from the dashboard.

## Local development only (for developers)

- “Network error” locally, though the frontend code looks fine: check the backend is actually running (`lsof -nP -iTCP:5001 -sTCP:LISTEN`). At start-up, `sequelize.sync()` can crash on a database that is behind on migrations. Run `npx sequelize-cli db:migrate` from `backend/`.
- A runtime 500 on a **new** table while all tests pass: `sync()` never alters an existing table, so a dev database may hold an old shape. Compare with `information_schema.columns`.
- “reCAPTCHA initialization failed” locally: stale `REACT_APP_*` values injected into the terminal by the editor can override `frontend/.env.local`. Check the dev server’s real environment. The Firebase key only allows `localhost:3000` / `127.0.0.1:3000`.
