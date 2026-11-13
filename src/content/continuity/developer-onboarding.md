---
title: Developer onboarding checklist
order: 5
audience: Replacement developer, technical administrator
summary: A practical checklist for a new developer taking over the application — access, local setup, reading list, business rules and known limitations.
updated: 2026-11-13
related: technical/architecture, technical/database-and-migrations, technical/data-corrections, about/open-questions
---

## Week 1 — access and orientation

- [ ] GitHub access to the `abune-aregawi` repository (Write, not owner, at first)
- [ ] Read `README.md`, the root `CLAUDE.md`, `frontend/CLAUDE.md`, `backend/CLAUDE.md`. These are short, current maps of the code
- [ ] Read this guide’s [Architecture](#/technical/architecture), [Hosting and deployment](#/technical/hosting-and-deployment) and [Configuration](#/technical/configuration-and-secrets)
- [ ] Read in the application repository: `backend/ZELLE_INGESTION.md`, `docs/BENEVITY_IMPORT.md`, `.claude/skills/payment-reconciliation/SKILL.md`, `.claude/skills/db-migrations/SKILL.md`, `.claude/skills/ledger-sheets-export/SKILL.md`
- [ ] Read [Incident history](#/help/incident-history): most business rules exist because of one of these
- [ ] Agree with leadership: which accounts you get access to, and that production data is never copied to personal devices

## Week 1 — local setup

```bash
git clone <repository>
cd abune-aregawi
# Backend
cd backend && npm install
cp env.example .env        # fill in LOCAL values only; never the production DATABASE_URL
npx sequelize-cli db:migrate
npm run dev                 # API on http://localhost:5001
# Frontend (new terminal)
cd ../frontend && npm install
# create .env.local with REACT_APP_API_URL=http://localhost:5001 and the Firebase web config
npm start                   # http://localhost:3000 (the Firebase key only allows port 3000)
```

- Tests: `npm test` in each folder. Backend tests run on in-memory SQLite: `DATABASE_URL=sqlite::memory: NODE_ENV=test npx jest <file>`. A few backend tests fail at random under full-suite load; re-run before treating a failure as real.
- A **pre-commit hook** (`scripts/pre-commit.sh`, `scripts/check-staged-sensitive.sh`) blocks commits that look like member data. Test fixtures must use the fictional phone range **555-0100 to 555-0199**. **Never bypass it with `--no-verify`.**
- **Demo mode** (`ENABLE_DEMO_MODE=true`, local only) lets you act as an admin without Firebase. It is refused in production.

## Business rules you must not break

1. **One payment = one `transactions` row + one `ledger_entries` row.** Bank rows link to payments; they never create a second one.
2. **Zelle credits are never auto-created from the bank.** They are linked when certain and otherwise wait for a treasurer. `ZELLE_GMAIL_CREATE_ENABLED` stays false.
3. **“Remembering” a sender is separate from crediting a payment** (`decideSenderLearning`). An on-behalf payment must not re-point a learned sender.
4. **Employer matches** (`employer_match`, INC013) never appear on tax statements and can’t be reclassified. Personal totals exclude them; church totals include them.
5. **Benevity deposits are linked to their report, never recorded as income.**
6. **Tax statements go by payment date.** `for_year` only shifts which year’s **dues** a payment credits.
7. **Receipt numbers are unique** except `000`. Cash and check require one.
8. **Loans are liabilities**, never income, never on statements.
9. **Member PII never enters the service worker cache** (`frontend/src/sw/cachePolicy.ts`).
10. **Roles are changed only by admins.** Never trust a role sent by the client.

## Deploying your first change

- [ ] Work on a branch; run both test suites
- [ ] If there is a migration: run it locally on Postgres (not just SQLite), and make it idempotent
- [ ] Get the change reviewed and tested by the treasurer locally if it touches money
- [ ] Push/merge to `main`. This **deploys and migrates production**. Watch both Actions runs and check `/api/ready`

## Known technical limitations (as of November 2026)

- No recurring online giving. The option was hidden on the Give page (`DonatePage.tsx`) because no Stripe subscription was ever created; the backend still accepts `donation_type`/`frequency`. See [Online giving](#/donations/online-giving-stripe)
- Stripe and Square **refunds and disputes** are not processed
- No UI for deleting or re-pointing payments; scripts only
- The nightly database dump keeps about 4 days on the server and one encrypted copy in Google Drive, with no failure alert. See [Backup and recovery](#/continuity/backup-and-recovery)
- Bounced checks are flagged but not reversed; the accounting policy is undecided
- Sunday Deposit Check flags can’t be explained or cleared
- Some frontend role flags are broader than the server allows (Leadership and Relationship member edit, AR Team SMS, member list for Bookkeeper, AR Team and Auditor)
- Zelle Review is largely untranslated; several Tigrigna strings await native review (`tigrigna-translation-review.md`)
- `/api/transactions/member-summaries` selects a non-existent attribute (documented in `docs/BENEVITY_IMPORT.md`)
- The Financial Overview’s bank balance picks the highest-id row on a multi-row day
- The Java backend (`java` branch) is not at parity and not deployed. Don’t treat it as stale; it is an intentional long-term option

The full list of open items is in [Open questions](#/about/open-questions).
