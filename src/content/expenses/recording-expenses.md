---
title: Recording expenses and checks
order: 1
audience: Treasurer, Bookkeeper, AP Team
summary: Add Expense for checks and cash paid out, check numbers, voided checks, the skipped-check report, and correcting an expense.
updated: 2026-11-11
related: expenses/expenses-from-the-bank, expenses/employees-and-vendors, reports/expense-report
---

Every amount the church pays out must be recorded as an **expense** with a **category** (GL code), so reports show what the money was spent on.

- **Checks and cash payments**: record with **Add Expense** when the check is written or the cash is paid. The bank statement then confirms the check automatically.
- **ACH bills, card purchases and other bank debits**: record from the bank line. See [Expenses from the bank](#/expenses/expenses-from-the-bank).

:::admin
Recording and editing expenses: **Admin, Treasurer, Bookkeeper, AP Team**. Viewing: also Church Leadership, Secretary, Auditor, Budget Committee.
:::

## Adding an expense

:::steps
1. **Treasurer → Expenses → Add Expense** (or **Add Expense** on the Overview tab).
2. **Payment Method**: **Cash** or **Check**.
3. For a check, enter the **Check Number**, digits only, e.g. 1593. Every check number can be used only once.
4. **Category**: the expense category (GL code), e.g. utilities, salary, supplies.
5. **Payee**: choose an **Employee** or **Vendor** from the lists, or type the name of the person or organization being paid.
6. **Amount** and **Date**. The date can’t be in the future.
7. Optional: **Receipt Number**, **Invoice Number** (the vendor’s bill number), **Memo**.
8. Click **Save Expense**.
:::

:::screenshot images/expenses/add-expense.png | The Add Expense form
1 @ 33,18 Payment Method: Cash or Check
2 @ 50,29 Check Number (unique, digits only)
3 @ 50,40 Category (GL code)
4 @ 50,49 Amount
5 @ 50,59 Date (not in the future)
:::

:::success
The expense appears in the **Expenses** list. When the check clears, the bank line is matched to it automatically, and the expense shows **Reconciled**.
:::

## Voided checks

A spoiled or cancelled check still uses up its number. Record it so the checkbook sequence has no gap:

:::steps
1. **Add Expense**, method **Check**, the voided **Check Number**.
2. **Amount: 0.00**.
3. **Memo** must contain the word **void**, e.g. “Void — misprinted, reissued as 1594”. A $0 expense is refused without it.
4. Save.
:::

## Skipped check numbers

On the **Expenses** tab, click **Show Skipped Check Numbers**. **Missing Check Numbers** lists every number in the checked range that has no expense. For each: find the check stub, then record the expense, or record it as a voided check.

## Finding and editing an expense

Filter the **Expenses** list by **Start Date**/**End Date**, **Category**, **Payment Method** and **Payee**. Click **Details** to see the expense, who recorded it, and its **Bank Reconciliation** (the statement line, posting date and bank amount it was matched to).

Click **Edit** to correct the method, check number, receipt or invoice number, memo, category, amount or date, then **Save Changes**. The **payee cannot be changed** after an expense is recorded (“Payee cannot be changed after an expense is recorded.”). If the payee is wrong, ask the technical administrator.

Deleting an expense is **Admin only**, and there is no delete button on screen. Ask the technical administrator.

## Common mistakes

| Mistake | Effect | Fix |
|---|---|---|
| Check amount typed wrong | The bank line stays pending, shown red **NOT RECONCILED** with both amounts | **Edit** the expense amount; then **Auto-reconcile pending** |
| Check not recorded before it cleared | Pending check debit on the bank; check appears as skipped | Record the expense with **Add Expense**; the bank line then matches |
| Same check recorded twice | Refused: “This check number has already been used.” | Find the existing one |
| Expense in the wrong category | Wrong figures in the Expense Report and Board Summary | **Edit → Category** |

:::note Two months of salary at once is normal
The church often pays two months of salary together. The Expense Report dates salary by when the check was written, so one month may show nothing and the next month double. This is not an error or a missed payroll.
:::
