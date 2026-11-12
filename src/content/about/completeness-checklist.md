---
title: Documentation coverage checklist
order: 2
audience: Technical administrator, guide maintainers
summary: Every capability found in the application, the page that documents it, and how it was verified.
updated: 2026-11-11
related: about/open-questions, about/screenshot-checklist, about/maintaining-this-guide
---

**Verified** means each instruction was checked against the application’s source code (screens, labels, server rules) on the date shown. **Screenshots** are pending for all pages; see the [screenshot checklist](#/about/screenshot-checklist).

## Member-facing

| Capability | Route / screen | Documented in | Status |
|---|---|---|---|
| Phone sign-in, registration (7 steps) | `/login`, `/register` | [Signing in](#/getting-started/signing-in) | Verified |
| Dashboard links | `/dashboard` | [Finding your way](#/getting-started/finding-your-way) | Verified |
| Top menu, including **Help** (opens this guide) | header, phone **More** | [Finding your way](#/getting-started/finding-your-way) | Verified |
| Profile | `/profile` | [Member self-service](#/members/member-self-service) | Verified |
| Dues, payment history, statement | `/dues` | [Member self-service](#/members/member-self-service), [Tax statements](#/reports/tax-statements) | Verified |
| Online giving (card/ACH) | `/donate` | [Online giving](#/donations/online-giving-stripe) | Verified; recurring gap found |
| Pledge page | `/pledge` | [Member self-service](#/members/member-self-service) | Verified |
| Dependents, self-claim | `/dependents` | [Households](#/members/households-and-dependents) | Verified |
| Departments, meetings, tasks | `/departments/...` | [Departments](#/administration/departments) | Verified (overview level) |
| Calendar, gallery, bylaws, board, survey, merch, privacy, PWA | various | [Other parts](#/administration/other-modules) | Verified (overview level) |

## Treasurer Dashboard

| Tab | Documented in | Status |
|---|---|---|
| Overview (Financial Overview, Sunday Deposit Check) | [Financial Overview](#/dashboard/financial-overview), [Deposit Check](#/dashboard/sunday-deposit-check) | Verified |
| Member Payments (list, details, edit, skipped receipts) | [Correcting a payment](#/donations/correcting-a-payment), [Cash and checks](#/donations/cash-and-check) | Verified |
| Add Payment (cash, check, card, ACH, anonymous, pledge) | [Cash and checks](#/donations/cash-and-check), [Card and ACH](#/donations/card-and-ach-by-treasurer) | Verified |
| Pledges + Pledge Dashboard | [Managing pledges](#/pledges/managing-pledges), [Pledge Dashboard](#/pledges/pledge-dashboard) | Verified |
| Member Dues | [Member financial record](#/members/member-financial-record) | Verified |
| Expenses, skipped checks, voided checks | [Recording expenses](#/expenses/recording-expenses) | Verified |
| Loans | [Member loans](#/donations/member-loans) | Verified; bank-line practice to confirm |
| Bank Integration: upload, Benevity, monthly summary, bank transactions, expense rules | [Reconciliation](#/reconciliation), [Benevity](#/donations/benevity), [Expenses from the bank](#/expenses/expenses-from-the-bank) | Verified; deposit/payout practice to confirm |
| Reports: Weekly, Payment, Expense, Board Summary | [Reports](#/reports) | Verified |
| Employees, Vendors | [Employees and vendors](#/expenses/employees-and-vendors) | Verified |
| Zelle Review | [Zelle](#/donations/zelle) | Verified |
| Square Review | [Square](#/donations/square) | Verified; payout practice to confirm |
| Ledger Backup | [Ledger backup](#/reports/ledger-backup) | Verified |

## Admin Panel and other staff screens

| Screen | Documented in | Status |
|---|---|---|
| Manage Members, Add/Edit Member, dependents, promote | [Managing members](#/members/managing-members), [Households](#/members/households-and-dependents) | Verified |
| Reports (member) | [Member reports](#/reports/member-reports) | Verified |
| Fundraising campaigns | [Pledge drives](#/pledges/pledge-drives) | Verified |
| Merchandise orders and inventory | [Merchandise](#/administration/merchandise) | Verified; tax and cash to confirm |
| Role Management | [Assigning roles](#/administration/roles-and-permissions) | Verified |
| Departments | [Departments](#/administration/departments) | Verified |
| Activity Logs, Website Analytics | [Activity logs](#/administration/activity-logs) | Verified |
| Messages (voicemail, volunteers) | [Voicemail](#/administration/voicemail-and-volunteers) | Verified |
| Survey Report | [Survey report](#/reports/survey-report) | Verified |
| SMS Communications | [SMS](#/administration/sms-communications) | Verified |
| Outreach, announcements, Church TV | [Outreach](#/administration/outreach-and-announcements) | Verified |

## Technical and continuity

| Topic | Documented in | Status |
|---|---|---|
| Architecture, hosting, deployment, configuration, logs, database, repair scripts, maintenance | [Technical Administration](#/technical) | Verified from repository; server specifics to record privately |
| Taking over, integrations, account recovery, backups, onboarding, ownership | [Operational Continuity](#/continuity) | Owners and registrar to confirm |
| FAQ, troubleshooting, incident history, glossary | [FAQ & Troubleshooting](#/help) | From code, repository docs and the developer’s working notes |

## Not documented, and why

| Item | Reason |
|---|---|
| The Java backend (`java` branch, `backendJava/`) | Not deployed and not in use; mentioned in [Architecture](#/technical/architecture) only |
| Individual API endpoints | Developer detail; in the application repository (`backend/API_TESTING_GUIDE.md`, `backend/ZELLE_INGESTION.md`) |
| The “old” payment view in Add Payment (by month) | Present in the code, but every screen opens the new view |
| Demo scripts, historical implementation notes (`docs/`) | Historical; not operational |
