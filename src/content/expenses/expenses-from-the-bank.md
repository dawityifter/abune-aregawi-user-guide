---
title: Expenses from the bank (ACH bills and card purchases)
order: 2
audience: Treasurer, Bookkeeper
summary: Recording a bank debit as an expense, the “Always file … under this category” rule for recurring ACH bills, recording older charges, and undoing an automatic expense.
updated: 2026-11-11
status: needs-confirmation
related: reconciliation/reviewing-bank-transactions, expenses/recording-expenses, reports/expense-report
---

Bills paid by ACH (utilities, insurance, loan payments) and card purchases appear only on the bank statement. They are recorded as expenses from the **Bank Integration** tab.

## Recording one debit

:::steps
1. **Bank Integration** → open the pending debit (red amount).
2. Under **Record as Expense**: choose the **Category**, enter the **Payee (optional)** and **Memo (optional)**, and check the **Expense Date**. A previous charge from the same company may pre-fill these (“Suggested from a previous charge”).
3. For a regular **ACH** bill, consider ticking **Always file {company} under this category and payee**. See below.
4. Click **Record Expense**.
:::

## Rules for recurring ACH bills

When you tick **Always file {company} under this category and payee**, later charges from that company are recorded **automatically** when the CSV is uploaded (“Later charges from this company will be recorded automatically.”). Rules apply to **ACH** bills only:

- **Card purchases** are remembered as suggestions but never recorded automatically.
- **Checks** are never recorded automatically. They match the expense you entered when writing the check.

### “Record older {company} charges?”

When you save a new rule, the application looks for **earlier pending charges** from the same company and offers to record them too, grouped by **Year** with **Charges** and **Total**.

- Untick any you don’t want (“{selected} of {count} charges selected”), or **See each charge**.
- Some are **Left out** with a reason: **Possible duplicate of another charge**, **Possible duplicate of a recorded expense**, **The category is no longer active**, or **Undone earlier**. These stay pending for you to check.
- “This adds expenses to the totals of earlier years.” Only record older years if those books are still open.
- Click **Record {n} charges**, or **Only future charges** to skip the old ones.

### Changing or undoing a rule

- To change a company’s rule, record its next charge with a different category and tick **Change the {company} rule to this category and payee**.
- On an automatically recorded expense, click **Undo**. Choose **Undo this charge only**, or **Undo and forget this rule**: “Later charges from this company will wait for you. Expenses already recorded stay.”

:::confirm Production status of the ACH rule change
The ACH rule matching was reworked in November 2026 (rules keyed by the ACH originator). After that change reached production, a one-off migration of the old rules had to be run (`migrate-ach-expense-rules.js`, dry run first). Until it runs, old ACH rules stop matching and their charges simply stay pending. Confirm with the technical administrator that it was done.
:::

## Bulk recording

Tick several pending debits and click **Record {n} Debits as Expenses**. Choose one category and payee for all. If some may be the same charge twice, you’ll see “{count} of these may be the same charge listed twice. Check before recording.”
