---
title: Open questions and known gaps
order: 1
audience: Church leadership, technical administrator, treasurer
summary: Everything this guide could not confirm, the application’s known gaps, and decisions waiting for the church — in priority order.
updated: 2026-11-11
status: needs-confirmation
related: continuity/taking-over, continuity/developer-onboarding, about/completeness-checklist
---

Where this guide says **Needs confirmation**, the item is listed here. Each one should be answered by a named person and the guide updated. Nothing here is a guess presented as fact.

## High priority

| # | Item | Why it matters | Who should answer |
|---|---|---|---|
| 1 | **The nightly database backup stays on the API server only**, keeps about 4 days, alerts no one when it fails, and has no confirmed restore. Supabase’s own backups unverified. See [Backup and recovery](#/continuity/backup-and-recovery) | If the server or the Oracle Cloud account is lost, every backup goes with it | Technical administrator (off-server copy, alert, restore test); leadership (cost of a paid Supabase plan) |
| 2 | **“Recurring” online giving charges only once.** No Stripe subscription is created, although the page offers Weekly/Monthly/Quarterly/Yearly | Members may believe they give monthly when they don’t | Developer to fix or hide the option; treasurer to tell affected members |
| 3 | **The code repository belongs to a personal GitHub account** | The church can’t control the code or deployments without that person | Leadership + developer: create a church organization and transfer |
| 4 | **Account owners for every outside service** (Supabase, Oracle Cloud, Firebase/Google, Stripe, Square, Twilio, Gmail, domain registrar, Chatbase, Sentry) | Recovery is hard or impossible without them | Leadership; fill in the [ownership matrix](#/continuity/ownership-matrix) |
| 5 | **Domain registrar and renewal date** for `abunearegawi.church` | A lapsed domain stops the API | Leadership |
| 6 | **Production clean-ups handed over but not confirmed as run**: pending/posted bank duplicates (two type decisions open); multi-payment deposits (type decisions open); undoing one wrongly learned Zelle sender; one duplicate-member merge; the dues-year mismatch report; the ACH expense-rule migration | Double-counted money may still be in the books | Developer/technical administrator with the treasurer |
| 7 | **Refunds and disputes** (Stripe and Square) are not recorded automatically | Refunded gifts stay on statements and in income | Developer (feature); treasurer (manual process meanwhile) |

## Practices to confirm with the treasurer

| # | Item |
|---|---|
| 8 | How Sunday cash **DEPOSIT** lines, **Stripe/Square payouts** and **loan deposits** are cleared on Bank Integration (assumed: **Mark Reconciled**) |
| 9 | How **Stripe and Square fees** (payout smaller than the gifts) are booked |
| 10 | How the **cash** from merchandise cash sales is recorded in the books |
| 11 | Policy for **bounced checks**: mark refunded, or a reversing entry |
| 12 | Whether the first **Benevity** production import has been done and checked |

## Decisions for leadership and advisors

| # | Item |
|---|---|
| 13 | Tax advisor: should Benevity personal gifts also appear on church statements if Benevity issues its own receipts? |
| 14 | A past religious item sale categorized as a donation still appears on a statement. Keep or correct? |
| 15 | Is **Texas sales tax** due on merchandise or religious item sales? |
| 16 | Board Summary: whether one category is a building project; whether personnel monthly figures may appear in the wider version; sign-off on the extra tie-out line; a real-data print check in English and Tigrigna |
| 17 | Whether this handbook should be **publicly** readable. GitHub Pages sites are public on standard plans. The guide contains no secrets or member data, but it does describe how the church’s systems are set up |

## Application gaps for a developer

| # | Gap |
|---|---|
| 18 | Frontend permissions broader than the server: Church Leadership and Relationship see member-edit; AR Team sees SMS; Bookkeeper, AR Team and Auditor are described as viewing all members. Saves or loads are refused |
| 19 | Secretary can use `/admin` but has no Dashboard link to it |
| 20 | Zelle Review: no **Ignore** button (the server supports it); much of the screen is untranslated |
| 21 | Sunday Deposit Check: no way to explain or clear a flag |
| 22 | No screen to email a statement (the server can) |
| 23 | No uptime monitoring; `/api/health` reports “connected” without checking the database |
| 24 | Several Tigrigna strings written during development await native-speaker review (`tigrigna-translation-review.md` in the app repository) |
| 25 | HTTPS certificate renewal method on the server, and the server’s OS and Node versions, are undocumented |
| 26 | Department **Request to Join** is not implemented |
