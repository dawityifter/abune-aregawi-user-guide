---
title: The Sunday Deposit Check
order: 2
audience: Treasurer, Bookkeeper, Admin
summary: The warning bar that compares each week’s recorded cash and checks with the bank deposit made the following Monday to Wednesday.
updated: 2026-11-11
related: donations/cash-and-check, reconciliation/uploading-the-bank-statement, reports/weekly-collection-report
---

Cash and checks collected on Sunday are recorded in the application, then carried to the bank. The **Sunday Deposit Check** confirms that what was recorded is what the bank received. It is an anti-loss and anti-error control.

## How it works

- Each **week** runs Monday to Sunday.
- The application adds up every **cash** and **check** payment recorded for that week.
- It then looks for the bank’s **DEPOSIT** lines, plus any **CASH DEPOSIT ADJUSTMENT** lines, posted on the **following Monday, Tuesday or Wednesday**.
- If the two totals are not **exactly** equal, the bar warns you. There is no tolerance: in normal circumstances the difference is zero.
- Checking started with the week ending **Sunday 1 November 2026**. Earlier weeks are not checked.

The check only appears for roles that can edit financial records. It changes nothing; it only reports.

:::screenshot images/dashboard/sunday-deposit-check.png | The Sunday Deposit Check’s Review window, one card per Sunday
1 @ 66,19 Waiting for bank data: upload a newer statement after Wednesday
2 @ 69,34 Matched: recorded and deposited amounts agree
3 @ 67,55 Doesn’t match: the difference is shown
:::

## Reading the bar

| Message | Meaning |
|---|---|
| **Sunday {date} matched the bank deposit** | All good |
| **1 Sunday doesn’t match a bank deposit — {date}** / **{n} Sundays don’t match…** | Investigate each listed Sunday |
| **Sunday {date}: {deposited} deposited so far of {recorded} recorded — final once bank data reaches {Thursday}** | The bank data uploaded doesn’t cover Monday to Wednesday yet. Upload a newer CSV after Wednesday. |

Click **Review** to see, for each Sunday: **Recorded (cash + check)**, **Bank deposit (Mon–Wed)**, any deposit **Posted after Wednesday (not counted)**, and the **Difference** (“bank received more than recorded” or “bank received less than recorded”).

## When a Sunday doesn’t match

:::steps
1. **Make sure the bank data is current.** Look at **Bank data through** in the Review window. If it is before Thursday, upload a newer Chase CSV first.
2. **“No deposit Mon–Wed”**: was the deposit late? A deposit posted on Thursday or later is shown but not counted. Confirm with whoever made the deposit.
3. **Bank received less than recorded**: a check may have been recorded but not deposited, or recorded twice. Compare the [Weekly Collection Report](#/reports/weekly-collection-report) for that week with the deposit slip.
4. **Bank received more than recorded**: a cash or check gift was deposited but not recorded. Find the receipt and use **Add Payment**.
5. A payment recorded with the wrong **date** lands in the wrong week. Check the payment dates on the Weekly Collection Report.
6. **Cash paid out of the collection** (for example a cash expense paid before depositing) makes the deposit smaller than what was recorded. The check compares *payments received* with the deposit; it does not subtract cash expenses. The Weekly Collection Report’s **Net to Deposit** does subtract them, so compare the two.
:::

:::warning A flag cannot be dismissed yet
There is currently no button to explain or clear a mismatch. The flag stays until the numbers agree. If a mismatch is genuinely correct (for example two Sundays deposited together), note the explanation in the treasurer’s records. This feature was deliberately left for later and is listed in [open questions](#/about/open-questions).
:::
