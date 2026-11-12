---
title: Integration inventory
order: 2
audience: Church leadership, technical administrator
summary: Every outside service the application depends on — what it does, what breaks without it, how to check it, and how to restore it. No secrets.
updated: 2026-11-11
status: needs-confirmation
related: continuity/account-recovery, technical/configuration-and-secrets, continuity/ownership-matrix
---

:::danger No passwords or keys belong here
This list says **where** access is managed. Logins and keys belong in the **church’s password manager**, with at least **two** church administrators able to open each entry.
:::

**Account owner** is “to be confirmed” throughout. When this guide was written, the developer set up and held most accounts. Leadership should fill in the real owner for each, and make sure the church, not an individual, controls it.

## Critical: the application stops without these

| Service | Used for | If it is unavailable | How to check | Restore or reconfigure | Vendor docs |
|---|---|---|---|---|---|
| **GitHub** | Source code; automatic deployment (Actions); deployment secrets | Can’t change or redeploy the app. The running site keeps working | Repository opens; Actions runs are green | Recover the account owner, or transfer the repo to a church organization; secrets live in repo Settings → Secrets | docs.github.com |
| **Supabase** (PostgreSQL) | The database: every member, payment and pledge | **The whole application fails** | `/api/ready`; Supabase dashboard | Restore from backup; update `DATABASE_URL`; redeploy | supabase.com/docs |
| **Oracle Cloud (OCI)** | The virtual machine running the API (nginx + Node + pm2) | Website loads, but nothing works after sign-in | `/api/ready`; OCI console → Instances | Restart the instance; or rebuild a server and point DNS at it ([guide](#/continuity/backup-and-recovery?h=rebuilding-the-api-server)) | docs.oracle.com/iaas |
| **Firebase** (Google) | Website hosting; phone-number sign-in | Website down, or nobody can sign in | Website loads; Firebase console → Authentication | Firebase console; deploy with `FIREBASE_TOKEN`; service account key for the server (`FIREBASE_SERVICE_ACCOUNT_BASE64`) | firebase.google.com/docs |
| **Domain registrar / DNS** | `abunearegawi.church` and the `api.` / `analytics.` subdomains | API and analytics unreachable once DNS lapses | Domain resolves; registrar shows renewal date | Renew; the DNS `A` record for `api` points to the OCI server | Registrar’s help — **registrar to be confirmed** |

## Money: payments stop or go unrecorded without these

| Service | Used for | If it is unavailable | How to check | Restore or reconfigure | Vendor docs |
|---|---|---|---|---|---|
| **Stripe** | Online giving (card and ACH), treasurer card payments, merchandise checkout | Online giving fails; or gifts are taken but not recorded (webhook failures) | Stripe dashboard → Payments and Webhooks | Keys: `STRIPE_SECRET_KEY` (server), `REACT_APP_STRIPE_PUBLISHABLE_KEY` (website, must be live). Webhooks: `/api/donations/webhook` (`STRIPE_WEBHOOK_SECRET`), `/api/merch/webhook` (`STRIPE_MERCH_WEBHOOK_SECRET`) | stripe.com/docs |
| **Square** | In-person card reader; sends completed payments to Square Review | Square payments stop appearing (**Sync from Square** can catch up later) | Square Developer dashboard → Webhooks | `SQUARE_ACCESS_TOKEN`, `SQUARE_ENV`, webhook to `/api/square/webhook` with `SQUARE_WEBHOOK_SIGNATURE_KEY` and `SQUARE_WEBHOOK_URL` (must exactly match the URL in Square) | developer.squareup.com |
| **Chase** (bank) | The church account; CSV downloads; Zelle notifications | No reconciliation | — | Managed by the church’s bank signatories, not by this application | chase.com |
| **Gmail** (church account receiving Zelle emails) | Zelle Review reads the Zelle notification emails | Zelle gifts must be entered by hand or approved from the bank | Zelle Review receives new rows | OAuth app in Google Cloud; refresh token via `backend/scripts/get-gmail-token.js` → `GMAIL_*` secrets | developers.google.com/gmail |
| **Benevity** | Employer giving reports and deposits | Nothing breaks; reports can be imported later | Benevity Causes Portal | The church’s Causes Portal login | Benevity Causes Portal help |

## Supporting: features degrade without these

| Service | Used for | If it is unavailable | Restore |
|---|---|---|---|
| **Google Drive / Sheets** | Photo gallery; ledger backup spreadsheet | Gallery empty; backup stops | New refresh token via `backend/scripts/setup-drive-auth.js` → `GALLERY_DRIVE_*` / `LEDGER_SHEETS_*` |
| **Gmail (mailer)** | Sending emails (meeting minutes, statements) | Emails fail | `MAILER_GMAIL_*` secrets |
| **Twilio** | SMS to members; church phone line voicemail | No SMS or voicemail | Twilio console: balance, phone number, `TWILIO_*` secrets; voice webhook to `/api/twilio/voice` |
| **YouTube** | Live-stream banner | Banner doesn’t show | `YOUTUBE_*` secrets (API key from Google Cloud) |
| **Umami** (self-hosted) | Website analytics | Analytics stop; the app is unaffected | Runs on the church’s server (`analytics.abunearegawi.church`); see `docs/ANALYTICS_SETUP.md` in the app repository |
| **Sentry** | Error reports | Errors still happen, unseen | `SENTRY_DSN`, `REACT_APP_SENTRY_DSN` |
| **Chatbase** | The chat assistant bubble on the website | Bubble disappears | Chatbase account; the bot ID is set in the frontend code |
| **reCAPTCHA** (Google) | Robot check at sign-in | Sign-in can fail | `REACT_APP_RECAPTCHA_SITE_KEY`; Firebase / Google Cloud console |

## Credentials that expire

| Credential | Expires when | Symptom |
|---|---|---|
| Gmail and Drive **refresh tokens** | The Google password changes, access is revoked, or the Google Cloud OAuth app is left in “testing” mode (tokens then expire after 7 days) | Zelle Review stops filling; gallery/backup fail |
| **HTTPS certificate** for `api.` | Usually every 90 days with Let’s Encrypt; renewal must be automatic | Browser security warnings; app stops working |
| **Domain** registration | Yearly | Everything on `abunearegawi.church` stops |
| **Twilio balance** | When spent | SMS stop |
| **FIREBASE_TOKEN** (CI deploy token) | If revoked | Frontend deploy fails in Actions |
| Stripe / Square keys | When rotated or revoked | Payments or webhooks fail |
