---
title: The Financial Overview
order: 1
audience: Treasurer, finance team, Church Leadership
summary: What each number on the Treasurer Dashboard’s Overview tab means, including the bank balance, dues progress, and the ledger-versus-bank check.
updated: 2026-11-11
related: dashboard/sunday-deposit-check, reconciliation/what-reconciliation-means, reports/payment-reports, members/member-financial-record
---

Open **Dashboard → Treasurer** to arrive on the **Overview** tab. Its heading is **Financial Overview**. It answers three questions:

1. How much has come in and gone out this year?
2. Are members up to date with their dues?
3. Do the church’s books agree with the bank?

:::screenshot images/dashboard/financial-overview.png | The Treasurer Dashboard’s Overview tab (invented example figures)
1 @ 30,25 Sunday Deposit Check bar
2 @ 88,60 Year selector: every figure follows it except the bank balance
3 @ 13,71 Bank Balance and the date it was last updated
4 @ 46,69 Annual Dues Progress
5 @ 78,54 Add Payment and Add Expense
:::

## Choosing the year

Use **Year** at the top right. All figures follow the selected year, **except the Bank Balance**, which is always the latest balance on record (“Balance reflects all transactions on record, not filtered by year”).

## The figures

| Figure | What it means |
|---|---|
| **Bank Balance** (with “Updated” date) | The running balance from the most recent bank statement line uploaded. If the date is old, upload a newer Chase CSV. It **includes money the church owes**, such as member loans. |
| **Total Receipts** | All dues and other income for the year. Excludes member loans. |
| **Total Expenses** | All recorded expenses. Excludes loan repayments. |
| **Net Income** / **Surplus** / **Deficit** | Receipts minus expenses. Loans are not counted. |
| **Annual Dues Progress** | This year’s entire pledged dues total against what has been collected. It won’t reach 100% until every member’s full yearly pledge is paid, whatever the month. |
| **Of dues expected so far** | Dues collected compared with what is expected by this point in the year. Can go above 100% when members pay ahead. |
| **left to collect this year** | The whole year’s remaining gap: full-year pledges minus collected. |
| **Other Income** | Offerings, donations, sales and other gifts. Excludes dues and loans. |

### Membership Health / Dues & Member Status

| Figure | What it means |
|---|---|
| **Active Members** | Up to date + behind + not dues-tracked. The page shows the sum. |
| **Up to Date** | Paid everything expected through the current month |
| **Behind** / **Behind on Dues** | Paid less than expected through the current month |
| **Not Dues-Tracked** | No yearly pledge on file, so the application cannot tell whether they are behind |
| **Membership Dues** (year to date) | Collected against what should have been paid by now. Each pledge is prorated through the current month, so this is smaller than Annual Dues Progress. |
| **Loans received / Loans repaid / Member Loans Owed** | Money lent by members. **Not income and not expenses.** Shown so the bank balance makes sense |

:::note Dues paid for another year
A member may pay next year’s dues in December, or this year’s dues may have arrived last year. The Overview shows notes such as “$X of dues received this year pays 2027 dues”. Up-to-date and behind counts credit each payment to the year it pays for. Dollar totals stay on a cash basis: money is counted in the year it arrived.
:::

## “Doesn’t match the bank statement — reconciliation required”

If the books and the bank disagree, a red message appears, showing **Ledger**, **Bank** and **Difference**.

**What it means:** some money in the bank has not been recorded yet, or something recorded hasn’t reached the bank, or something was recorded twice.

**What to do:**

:::steps
1. Upload the latest Chase CSV. See [Uploading the bank statement](#/reconciliation/uploading-the-bank-statement).
2. Clear every pending bank row. See [Reviewing bank transactions](#/reconciliation/reviewing-bank-transactions).
3. If a difference remains, look for duplicates. See [Duplicates](#/reconciliation/finding-duplicates).
4. Still unexplained? Write down the difference and the date, and escalate to the technical administrator.
:::

:::note Known small inaccuracy
On a day with several bank lines, the Bank Balance picks the line with the highest internal number, which may not be the day’s last line. A small difference from the bank’s own balance on such days is a known limitation, not lost money.
:::

## Buttons on this tab

- **Add Payment** opens the payment form. See [Cash and checks](#/donations/cash-and-check).
- **Add Expense** opens the expense form. See [Recording expenses](#/expenses/recording-expenses).

These buttons appear only for roles that can record money.
