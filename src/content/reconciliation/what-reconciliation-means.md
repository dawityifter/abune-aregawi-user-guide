---
title: What reconciliation means
order: 1
audience: Treasurer, Bookkeeper, Auditor, Church Leadership
summary: Why every bank line is matched to the books, what the three bank statuses mean, and what “reconciled” proves.
updated: 2026-11-11
related: reconciliation/uploading-the-bank-statement, reconciliation/reviewing-bank-transactions, reconciliation/finding-duplicates
---

**Reconciliation** means checking that the church’s books and the bank agree, line by line:

- every amount the **bank** received or paid out is explained by something in the **books**; and
- everything in the **books** really happened at the **bank**.

It is the church’s main protection against lost money, mistakes and double counting. It is also what an auditor checks first.

## How it works in this application

:::steps
1. The treasurer downloads the account activity from **Chase** as a CSV file and uploads it on **Treasurer → Bank Integration**.
2. Every line becomes a **bank transaction** with a status.
3. The application matches what it safely can by itself: checks to recorded expenses, Zelle payments already created from their email, known regular bills.
4. The treasurer works through the rest: approving gifts, linking to existing entries, recording expenses.
5. When nothing is **pending** for a month, the **Monthly Summary** shows the month as **Reconciled**, and the Overview’s ledger and bank figures agree.
:::

## The three statuses

| Status shown | Meaning |
|---|---|
| **PENDING REVIEW** (amber) | Not yet explained. It needs the treasurer. |
| **MATCHED** | Linked to exactly **one** payment or expense in the books |
| **RECONCILED** | Explained without linking to a single record. Set with **Mark Reconciled**, for lines whose money is already accounted for in another way |

“Reconciled” on a month means **no line is still pending**.

## Credits and debits

- **Credits** (money in, shown in green): Zelle gifts, ACH gifts, cash/check **DEPOSIT** lines, Stripe and Square payouts, Benevity deposits, loans received.
- **Debits** (money out, shown in red): checks written, ACH bills, card purchases, transfers, returned (bounced) checks.

## The questions to ask about every line

| Line looks like | Ask | Usually |
|---|---|---|
| A Zelle credit | Was it already created from Zelle Review? | Link it; if not, approve it to the member |
| A **DEPOSIT** (cash and checks) | Were that Sunday’s receipts all entered? | They were recorded with Add Payment; the deposit itself is not a new payment. Check its **DEPOSIT MATCHED** label from the [Sunday Deposit Check](#/dashboard/sunday-deposit-check). |
| A Stripe or Square payout | Are those gifts already recorded? | Yes, automatically or through Square Review. The payout is not a new payment. |
| A Benevity deposit (“AMER ONLINE GIV”) | Has the report been imported? | Linked by the [Benevity import](#/donations/benevity) |
| A check debit | Was the expense recorded when the check was written? | Matched automatically by check number and amount |
| An ACH bill or card purchase | Is it a known payee? | Record as an expense; regular bills can be remembered |

:::warning The most common and most costly mistake
**Approving a line whose money is already in the books.** That records the money twice, inflates income, and can put a gift twice on a donor’s statement. When a line is “already accounted for elsewhere”, don’t approve it as a new payment. See [Finding duplicates](#/reconciliation/finding-duplicates).
:::

:::confirm Clearing deposit and payout lines
Deposits of Sunday cash, Stripe and Square payouts, and loan deposits cover money recorded elsewhere. On screen, such a line is cleared with **Mark Reconciled**, which records nothing and shows **RECONCILED**. Confirm this is the current treasurer’s practice before relying on it, and note any exceptions here.
:::
