---
title: Architecture at a glance
order: 1
audience: Technical administrator, developers
summary: The parts of the system, where each runs, how a request flows, and the technology stack.
updated: 2026-11-11
related: technical/hosting-and-deployment, continuity/integrations, continuity/developer-onboarding
---

## The pieces

:::diagram diagrams/architecture.html | How the church application fits together | images/technical/architecture.png
Click the diagram to open the interactive version. There you can click a box to highlight what it connects to, use **Guided views** (member request path, sign-in, money coming in), zoom, switch to dark mode, or export it.
:::

| Part | Technology | Where it runs |
|---|---|---|
| **Frontend** | React 19 + TypeScript (Create React App), Tailwind CSS, installable as an app (PWA) | **Firebase Hosting**, project `abune-aregawi-church-app`, served at **https://abunearegawi.church** |
| **Backend API** | Node.js + Express, Sequelize ORM | An **Oracle Cloud Infrastructure (OCI)** compute VM (always-free tier): **nginx** handles HTTPS and forwards to Node, kept running by **pm2** as `abune-aregawi-backend` on port 10000 |
| **Database** | PostgreSQL (Supabase, free tier), reached through Supabase’s connection pooler | **Supabase** |
| **Sign-in** | Firebase Authentication, phone numbers only | Google Firebase |
| **Analytics** | Umami, self-hosted, cookieless | On the church’s own server (`analytics.abunearegawi.church`) |
| **Error tracking** | Sentry (frontend and backend), only when configured | Sentry |
| **Source code** | Git repository `abune-aregawi` | **GitHub** |
| **Deployment** | GitHub Actions workflows | GitHub |

## Inside the backend

`routes → controllers → services → models`. Every route checks the Firebase sign-in token, then the caller’s **roles**. Scheduled jobs run inside the same Node process:

| Job | What it does | Switched on by |
|---|---|---|
| Zelle Gmail sync | Reads Zelle notification emails into Zelle Review (every 5 min on Sunday mornings, hourly otherwise) | `ZELLE_SYNC_ENABLED=true` + Gmail OAuth settings |
| Ledger Sheets export | Copies the ledger to Google Sheets on the configured schedule | `LEDGER_SHEETS_EXPORT_ENABLED=true` |

Webhooks (outside services calling in):

| Endpoint | Caller |
|---|---|
| `POST /api/donations/webhook` | Stripe (donations) |
| `POST /api/merch/webhook` | Stripe (merchandise checkout) |
| `POST /api/square/webhook` | Square (card-reader payments) |
| `POST /api/twilio/voice`, `/voice/recording` | Twilio (voicemail) |

## Key data

About 42 database models; the main ones:

| Area | Tables |
|---|---|
| Members | `members`, `dependents`, `titles` |
| Money in | `transactions` (one per payment), `ledger_entries` (the accounting record), `income_categories` (GL codes), `donations` (Stripe’s view) |
| Pledges | `pledge_campaigns`, `pledges`, `pledge_allocations` |
| Money out | `ledger_entries` (type expense), `expense_categories`, `vendors`, `employees` |
| Reconciliation | `bank_transactions`, `bank_memo_matches`, `expense_memo_matches`, `zelle_email_queue`, `zelle_memo_matches`, `square_payments` |
| Other | `member_loans`, `merch_orders`, `sms_logs`, `announcements`, `voicemails`, `church_settings`, `activity_logs` |

**The central rule:** every payment is one `transactions` row plus its `ledger_entries` row. A bank row **links** to a payment; it must never create a second one for the same money.

## A second backend that is not in use

A Java (Spring Boot) re-implementation of the backend exists on the repository’s `java` branch, with a `backendJava/` folder on `main`. It is **not deployed** and is behind the Node backend in features. It is an option for the future, not part of the running system. Don’t deploy it without a deliberate decision.
