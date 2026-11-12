---
title: Hosting and deployment
order: 2
audience: Technical administrator
summary: How a change reaches production, what each GitHub Actions workflow does, how to redeploy, and how to roll back.
updated: 2026-11-11
related: technical/configuration-and-secrets, technical/database-and-migrations, continuity/backup-and-recovery
---

## How deployment works

**Pushing to the `main` branch on GitHub deploys to production.** There are two workflows in `.github/workflows/`:

| Workflow | Runs when | What it does |
|---|---|---|
| **Deploy Backend** (`deploy-backend.yml`) | A push to `main` changes something under `backend/`, or it is started by hand | Connects to the OCI server by SSH; fetches `main`; **writes `backend/.env` from GitHub secrets**; `npm ci --production`; **runs database migrations** (`sequelize-cli db:migrate`) and seeders **against production**; restarts pm2 `abune-aregawi-backend` |
| **Deploy to Firebase Hosting** (`firebase-deploy.yml`) | A push to `main` changes something under `frontend/`, or by hand | Builds the React app with secrets as `REACT_APP_*` variables; **checks the build is a production build** (live Stripe key, production API URL, analytics present); deploys to Firebase Hosting |

:::danger A push to main is a production release
It deploys **and** changes the production database (migrations). The developer’s practice has been to work locally, test, and push only when ready. Local `main` is often many commits ahead of GitHub on purpose. Never push “just to save work”.
:::

## Checking a deployment

:::steps
1. GitHub → repository → **Actions**. Both workflows should show a green tick for the latest push.
2. Open `https://api.abunearegawi.church/api/ready`. It should answer `"status":"ready"` (it checks the database).
3. Open the website, sign in, open **Treasurer → Overview**, and check the figures load.
4. If you changed the frontend, phones that installed the app show an **update** notice; tapping **Refresh** loads the new version.
:::

## Redeploying without a code change

Both workflows can be run by hand: **Actions → (workflow) → Run workflow**, on `main`. Use this after changing a **GitHub secret**, because secrets reach the server only when the backend workflow writes the `.env`.

## Rolling back

| What broke | Roll back by |
|---|---|
| Backend code | `git revert` the bad commit on `main` and push. The workflow redeploys the previous behaviour. |
| A database migration | Migrations are **not** undone automatically. A developer must write and test a reversing migration. Check backups first. See [Backup and recovery](#/continuity/backup-and-recovery) |
| Frontend | Revert and push. Firebase Hosting can also roll back to an earlier release in the Firebase console (Hosting → release history) |
| The installable app (service worker) | A broken service worker stays on phones even after a revert. The application repository has a kill-switch procedure in `docs/PWA_ROLLBACK.md`. Read it **before** rolling back a release that touched the service worker |

## The server

- Provider: Oracle Cloud Infrastructure, always-free compute VM.
- Application folder: `/var/www/repo` (the backend runs from `backend/`).
- Process manager: **pm2**, process name `abune-aregawi-backend`.
- Web server: **nginx**, which holds the HTTPS certificate for `api.abunearegawi.church` and forwards to `127.0.0.1:10000`.
- Logs: see [Logs and monitoring](#/technical/logs-and-monitoring).

:::confirm Server details to record privately
Record these in the church’s password manager, **not here**: the OCI account (tenancy) owner and admins, the VM’s public IP, how the SSH key is held and by whom, how the HTTPS certificate is renewed (commonly certbot/Let’s Encrypt; confirm), and the server’s operating system and Node versions.
:::

:::warning Oracle “always free” resources
Oracle may reclaim always-free compute instances it considers idle, and free accounts can be limited. The church should know who receives Oracle account emails, so a warning isn’t missed.
:::
