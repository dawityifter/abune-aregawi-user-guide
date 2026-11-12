---
title: Data corrections (repair scripts)
order: 6
audience: Technical administrator
summary: The prepared scripts for fixing payments, members, pledges and duplicates, and the safe procedure for running them on production.
updated: 2026-11-11
related: donations/correcting-a-payment, reconciliation/finding-duplicates, members/duplicate-and-incorrect-records
---

The application deliberately has no screen for changing a payment’s member, amount or date, deleting payments, or merging members. Those corrections are made with **scripts** in `backend/scripts/` of the application repository. Every one of them **reports only (a dry run) unless you add `--apply`**.

## The procedure (always)

:::steps
1. **Get a written request** from the treasurer: what is wrong, what it should be, evidence. Use the [correction request template](#/donations/correcting-a-payment?h=what-you-cannot-correct-on-screen). A second person approves.
2. **Reproduce on a local copy** of the data. Confirm the script does exactly what is intended.
3. **Fix the cause first.** If a bug caused it, fix and deploy the code before cleaning up, or the problem will return.
4. **Confirm the production row IDs.** Local and production IDs differ. Look them up on production with a read-only query.
5. **Take a backup** of production (see [Backup and recovery](#/continuity/backup-and-recovery)).
6. **Dry run on production.** From `backend/`, with the production URL as a prefix for this one command only:
   `DATABASE_URL='<production url>' node scripts/<script>.js <arguments>`
   Read the output carefully.
7. **Apply:** the same command with `--apply`.
8. **Verify** on screen (Member Dues, Member Payments, Overview), then ask the treasurer to click **Sync Now** on Ledger Backup.
9. **Record** what was done, by whom, and why, in the correction request.
:::

:::warning Where the shell prefix matters
The scripts read `backend/.env` but **do not override** a `DATABASE_URL` given in the shell, so the prefix decides which database is changed. Before running any script, check which database you are pointed at: `echo "$DATABASE_URL"; grep '^DATABASE_URL' backend/.env`.
:::

## The scripts

`--by <member id>` is the member ID of the person making the correction; it is recorded.

| Problem | Script and arguments |
|---|---|
| Payment under the wrong member | `rematch-payment-member.js --transaction <id> --to <member> --by <id> [--remember-sender]` |
| One payment held two members’ money | `split-payment.js --transaction <id> --amount <n> --to-member <id> --to-pledge <id> --by <id>` |
| Pledge credit on the wrong pledge | `move-pledge-credit.js --transaction <id> --from-pledge <id> --to-pledge <id> --amount <n> --by <id>` |
| Same person registered twice | `merge-duplicate-member.js --from <duplicate id> --to <correct id> --by <id>`. Refuses if the duplicate has dependents, heads a household, holds a loan, or collected payments |
| A plain duplicate payment | `delete-duplicate-transaction.js --transaction <id> --reason "…"` |
| Bank line stored as pending **and** posted | `resolve-pending-posted-duplicates.js` (report), `--all`, or `--bank <id> --type <type>` |
| Zelle recorded from email **and** bank | `resolve-zelle-bank-duplicates.js` (report), `--bank <id>`, `--apply` |
| One deposit recorded as several payments | `resolve-bank-deposit-duplicates.js` (report, then per-deposit with `--type` when types clash) |
| A sender wrongly “remembered” for another member | `report-learned-sender-mismatches.js` (read-only), then `unlearn-on-behalf-payment.js --transaction <id> --sender <member> --by <id>` |
| Dues credited to an impossible year | `report-dues-year-mismatches.js [--year <y>]` (read-only) |
| Old ACH expense rules after the Nov 2026 change | `migrate-ach-expense-rules.js` (dry run), review, then `--apply` |
| Zelle rows missing the email time | `backfill-zelle-email-received-at.js` |

The application repository has a fuller procedure for diagnosing reconciliation problems in `.claude/skills/payment-reconciliation/SKILL.md`.

:::danger There is no working production-to-local import script
`scripts/import-prod-backup.js` is empty. Getting a local copy of production data is a manual, sensitive step. Agree with leadership who may hold such a copy and where. It contains every member’s personal data.
:::
