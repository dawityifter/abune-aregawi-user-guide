---
title: Recording cash and check payments
order: 2
audience: Treasurer, Bookkeeper, AR Team
summary: Using Add Payment for cash and checks, receipt numbers, anonymous gifts, and the skipped-receipt check.
updated: 2026-11-11
related: donations/correcting-a-payment, dashboard/sunday-deposit-check, reports/weekly-collection-report, pledges/payments-and-pledges
---

Use **Add Payment** for every cash or check gift, as soon as possible after it’s counted, with the number from the **paper receipt book**.

:::admin Who can record payments
Admin, Treasurer, Bookkeeper, AR Team.
:::

## Recording a payment from a member

:::steps
1. Open **Treasurer** and click **Add Payment**. It is on the Overview tab and the Member Payments tab. You can also open a member on **Member Dues** and click **Add Transaction**, which pre-selects the member.
2. Under **Payment Mode**, keep **Member Payment**.
3. In **Member**, type part of the name, email or phone in *Search by name, email, or phone*, then pick the person from **Select a member**. Each name shows the member ID in brackets, so you can tell two people with the same name apart.
4. Set the **Payment Date** to the day the money was given, usually the Sunday, not the day you are typing it in. The date decides which week, month and tax year the gift belongs to.
5. Choose the **Payment Type**, for example *Membership Fee* or *Tithe*. See the [type table](#/donations/how-money-arrives?h=payment-types-what-the-money-is-for). **Income Category (GL Code)** fills itself in from the type.
6. For **Membership Fee**, leave **Year (Optional)** on **Default (Auto)** unless the member is paying a **different** year’s dues, for example in December paying next year. Then choose that year.
7. Choose the **Payment Method**: **Cash** or **Check**.
8. For a check, enter **Check Number (on the donor’s check)**. It lets a bounced check be traced back to this payment.
9. Enter the **Receipt Number** from the receipt book. It is required for cash and check, digits only.
10. Enter the **Amount**. **Collected By** shows your own name automatically. Add **Notes (Optional)** if useful.
11. Click **Add Payment**.
:::

:::screenshot images/donations/add-payment.png | The Add Payment form
1 @ 27,22 Payment Mode: Member Payment or Anonymous / Non-Member Payment
2 @ 50,34 Search for the member, then choose them in Select a member
3 @ 35,48 Payment Date: the day the money was given
4 @ 64,48 Payment Type
5 @ 64,57 Payment Method
6 @ 35,68 Receipt Number (required for cash and check)
7 @ 35,79 Amount
:::

:::success How you know it worked
The form closes and the payment appears at the top of **Member Payments**. It also shows on that week’s [Weekly Collection Report](#/reports/weekly-collection-report) and on the member’s Dues page.
:::

## Gifts from visitors, organizations or anonymous donors

:::steps
1. Under **Payment Mode**, choose **Anonymous / Non-Member Payment**.
2. Choose **Donor Type**: **Individual** or **Organization / Group**.
3. Optionally fill in **Donor Name (Optional)**, **Email (Optional)**, **Phone (Optional)** and **Memo (Optional)**.
4. Enter amount, type, method and receipt number as above. **Membership Fee** is not offered, because only members pay dues.
5. Click **Add Payment**.
:::

## Pledge Drive gifts

Choose **Pledge Drive / Fundraising (ወፈያ)** as the type. The form shows the member’s open pledge and credits it, or offers **Also record this as a pledge**. See [How payments credit pledges](#/pledges/payments-and-pledges).

## Receipt numbers and the skipped-receipt check

The paper receipt book is numbered in sequence, and the application watches the sequence:

- **Every receipt number can be used only once.** A repeat is refused: “Receipt number "1234" has already been used. Please use a unique receipt number.”
- **`000` means “no receipt was issued”.** It may be used many times and is not part of the sequence. Use it only when no paper receipt exists.
- **Skipping ahead is flagged.** When you leave the Receipt Number field, the application compares it with the last receipt recorded. If numbers were skipped, it warns you and you must **confirm the skip** before saving. A skipped number usually means a receipt was written and never entered.

### Reviewing skipped receipts

On **Member Payments**, click **Show Skipped Receipt Numbers**. The **Missing Receipt Numbers** window lists every gap in the checked range.

:::steps
1. For each number, find the paper receipt in the book.
2. If the receipt exists, record the payment with **Add Payment** using that number.
3. If the receipt was **spoiled** (torn, misprinted, cancelled), tap the number, enter a **Reason** such as “torn”, and click **Void selected**. It moves to **Voided receipt numbers**, and **Undo** is available.
4. Repeat until the window says “No skipped receipt numbers found in this range!”.
:::

:::warning Don’t void a receipt just to make the warning go away
A voided number tells an auditor “this receipt was never issued”. Void only receipts you can show were spoiled. Keep the spoiled paper copy with the receipt book.
:::

## Common mistakes

| Mistake | How you notice | Fix |
|---|---|---|
| Wrong member chosen | The member says it’s missing from their Dues page | Needs a technical correction: see [Correcting a payment](#/donations/correcting-a-payment) |
| Wrong payment type | Shows in the wrong category on reports | **Member Payments → Details → Edit → Payment Type** |
| Wrong receipt number | Skipped-receipt warning, or a duplicate refused | **Edit → Receipt Number** |
| Wrong amount or date | Weekly report or deposit check doesn’t match | Not editable on screen: see [Correcting a payment](#/donations/correcting-a-payment) |
| Cash recorded twice | Sunday Deposit Check shows “bank received less than recorded” | Find the twin on Member Payments (same receipt? same amount and member?) and ask the technical administrator to remove one |
| Recorded with today’s date instead of the Sunday | The deposit check flags two weeks | Not editable on screen: see [Correcting a payment](#/donations/correcting-a-payment) |
