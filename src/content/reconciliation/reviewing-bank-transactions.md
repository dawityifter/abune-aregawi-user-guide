---
title: Reviewing bank transactions
order: 3
audience: Treasurer, Bookkeeper, Admin
summary: Working through pending bank lines — approving a gift to a member, linking to an existing entry, marking reconciled, recording expenses, bulk actions, and undoing automatic matches.
updated: 2026-11-11
status: needs-confirmation
related: reconciliation/what-reconciliation-means, donations/zelle, expenses/expenses-from-the-bank, reconciliation/finding-duplicates
---

Below the upload area on **Bank Integration** is the **Bank Transactions** list, and above it the **Monthly Summary**.

## The Monthly Summary

For each month: **Total Income**, **Total Expense**, **Net Surplus/(Deficit)**, **Ending Balance**, and **Status**: **Reconciled**, or “{n} pending”. Switch between **Show last 6 months** and **Show last 12 months**. Aim for every past month to say **Reconciled**.

## The Bank Transactions list

Filter by status (**All Statuses**, Pending Review, Matched, Reconciled) and type (**All Types**, e.g. ZELLE, ACH, CHECK, DEPOSIT). Pending lines are highlighted in amber. Labels you may see on a line:

| Label | Meaning |
|---|---|
| **Possible existing entry** | Something already recorded may be this money. Open it before doing anything |
| **Auto** | Reconciled automatically; **Undo** is available |
| **DEPOSIT MATCHED** / **DEPOSIT DOESN’T MATCH** / **DEPOSIT CHECK WAITING** / **DEPOSIT POSTED LATE** | The Sunday Deposit Check result for a cash/check deposit |
| **RETURNED ITEM** | A bounced donor check. See [Correcting a payment](#/donations/correcting-a-payment?h=bounced-checks-returned-deposited-items) |
| **NOT RECONCILED** (red, checks) | A check number matches a recorded expense but the **amounts differ**; one side was mistyped |

Click a line to open its **Transaction Details**.

:::screenshot images/reconciliation/bank-transactions.png | Bank Integration: Monthly Summary, bank balance and the Bank Transactions list
1 @ 15,10 Monthly Summary with each month’s status
2 @ 84,50 Auto-reconcile pending
3 @ 45,66 A pending Zelle line with a suggested member
4 @ 76,66 PENDING REVIEW
:::

## A credit (money in) that is a gift

:::steps
1. Open the pending line. Read the **Description** and **Payer Name**.
2. **Check “Possible Existing Entry” first.** If it lists a recorded payment that is this money (same member, amount, a few days apart), click **Link to this entry**. You’re done; nothing new is created.
3. Otherwise, pick the member under **Suggested Members**, or search for them. The suggestion source is shown, e.g. “Suggested from bank transaction history”.
4. Choose the **Payment Type**, optionally **Year (Optional)** for dues, and the **Receipt Number** if there is one.
5. For Pledge Drive: the open pledge is credited, or tick **Record a pledge with this payment** with a **Pledge amount**.
6. Answer **Who is the sender?** if it appears. See [Paid on behalf of](#/donations/zelle?h=paid-on-behalf-of-someone-else).
7. Click **Approve** (Zelle) or **Confirm Selected Member** (other credits). The line becomes **MATCHED** and the payment appears in Member Payments.
:::

:::danger If Approve is refused with “already recorded” / LINK_EXISTING
The application found that this Zelle payment was already created from its email. **Use Link to this entry instead.** Don’t look for ways around the warning. This protection exists because of real duplicates in 2026; see [Incident history](#/help/incident-history).
:::

## A credit that is already accounted for

For a Sunday cash **DEPOSIT**, a **Stripe** or **Square payout**, or a **loan** deposit: the money is already in the books through Add Payment, Stripe, Square Review or the Loans tab. **Don’t approve it to a member.** Use **Mark Reconciled**: the line shows **RECONCILED** and nothing is recorded.

:::warning “Mark Reconciled” records nothing
Despite its name, **Mark Reconciled** doesn’t check or link anything. It simply sets the line aside as explained. Use it only when you know where the money is recorded. Never use it to make a difficult gift line go away; that leaves a real gift unrecorded.
:::

:::confirm Confirm with the current treasurer
That deposit and payout lines are cleared with **Mark Reconciled** is inferred from how the application works. Confirm it is the agreed practice, and add any exceptions, for example how Stripe or Square fees are booked.
:::

## A debit (money out)

- **Checks** are matched automatically to the expense recorded when the check was written (same check number **and** amount). A check that stays pending means the expense wasn’t recorded, or its amount differs. Fix the expense, then the match follows on the next **Auto-reconcile pending**.
- **Other debits** (ACH bills, card purchases): open the line and use **Record as Expense**. Choose the **Category**, **Payee (optional)**, **Memo (optional)** and **Expense Date**, then **Record Expense**. Details: [Expenses from the bank](#/expenses/expenses-from-the-bank).

## Bulk actions

- Tick several **credits** from the same giver → **Link {n} Transactions** → choose the member (a **Shared Suggested Member** is offered when they agree) → **Link Transactions to Member**. Bulk approval never overrides a duplicate warning; those lines come back as errors to handle one by one.
- Tick several **debits** → **Record {n} Debits as Expenses** (or **Categorize {n} Expenses**) with one category and payee.
- **Auto-reconcile pending** re-checks all pending lines against known payers, payees and Zelle references, in small batches. Run it after recording missing expenses or Zelle payments.

## Undoing

- **Undo** appears on lines marked **Auto** (reconciled automatically). It returns the line to pending. If the automatic step created a payment from a learned sender, that payment is removed. For an automatic expense you can choose **Undo this charge only** or **Undo and forget this rule**.
- A line **you** approved or marked reconciled has **no Undo button**. If you approved the wrong member or type, use [Correcting a payment](#/donations/correcting-a-payment). If you need the line put back to pending, ask the technical administrator.

## When you’re stuck

| Situation | What to do |
|---|---|
| You can’t tell who sent an ACH or Zelle credit | Leave it pending. Ask in the church office; check Zelle Review for an email of the same amount and date |
| A credit looks like a refund *to* the church (vendor refund) | It’s not a member gift. Ask the technical administrator how it should be booked before clearing it |
| The same bank line appears twice | See [Finding duplicates](#/reconciliation/finding-duplicates) |
| A month won’t reach **Reconciled** | Filter that month’s **Pending Review** lines. Each one needs one of the actions above |
