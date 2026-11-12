---
title: Finding and correcting a payment
order: 9
audience: Treasurer, finance team; Admin for corrections that need a developer
summary: Searching Member Payments, what you can edit yourself, and what needs the technical administrator (wrong member, amount, date, deletion, refunds).
updated: 2026-11-11
related: donations/cash-and-check, technical/data-corrections, reconciliation/finding-duplicates
---

## Finding a payment

**Treasurer → Member Payments** lists every recorded payment. Filters:

| Filter | Use it for |
|---|---|
| **Member Search** | Type at least 3 characters of the name |
| **Receipt Number** | Find the payment for a paper receipt |
| **Payment Type**, **Payment Method** | e.g. all checks, all building fund |
| **Card Source** | Card payments from **Stripe**, **Square** or **Manual** entry |
| **Min Amount** / **Max Amount** | Find a specific amount |
| **Date Range** | Today, Last 7 Days, Last 30 Days, Last Year, Custom Range |

Click **Apply Filters**. Click **Details** on a row to open **Payment Details**: source, classification (GL code, assigned automatically), the year it applies to, who collected it, when it was created, and notes.

:::screenshot images/donations/member-payments.png | Member Payments: filters, the payment list, and the Payment Details panel
1 @ 30,64 Filters
2 @ 14,82 Apply Filters
3 @ 84,30 Payment Details for the selected payment
4 @ 93,6 Edit: payment type, receipt number, notes, year
:::

## What you can correct yourself

In **Payment Details**, click **Edit**. You can change:

| Field | Notes |
|---|---|
| **Payment Type** | e.g. Tithe → Building Fund. The GL code follows. A payment can’t be changed to or from **Employer Match**. |
| **Receipt Number** | Must stay unique |
| **Notes** | — |
| **Applies To Year** | For membership dues only: “Use this when the payment pays a different year’s dues.” **Default (from payment date)** clears it. |

Click **Save**. The change is recorded in the activity log.

:::admin
Editing needs **Admin, Treasurer, Bookkeeper** or **AR Team**.
:::

## What you cannot correct on screen

The screens deliberately do **not** allow changing the **member**, **amount**, **date** or **method** of a recorded payment, or **deleting** one. These change money totals, deposit checks and tax statements, so they are done by the **technical administrator** with prepared, logged scripts, after the treasurer confirms exactly what is wrong.

| Problem | What the technical administrator does |
|---|---|
| Recorded under the **wrong member** | Moves it to the right member (`rematch-payment-member.js`) |
| **One payment held two members’ money** (e.g. a couple’s check) | Splits it (`split-payment.js`) |
| Credited to the **wrong pledge** | Moves the pledge credit (`move-pledge-credit.js`) |
| **Recorded twice** | Removes the duplicate, keeping the bank-confirmed one (`delete-duplicate-transaction.js` and the duplicate reports) |
| Wrong amount or date | Corrected in the database. There is no script, so it needs a developer. |
| **Refunded** by Stripe or Square | Marks it refunded or removes it |
| Bounced (returned) check | A policy decision first: mark refunded, or a reversing entry. See below |

See [Data corrections](#/technical/data-corrections) for how these are run.

**What the treasurer sends the technical administrator:**

:::copy Correction request — template
Payment to correct: (member name, amount, date, receipt number or Zelle/Square reference)
What is wrong: (e.g. recorded under the wrong member / recorded twice / refunded)
What it should be: (e.g. belongs to member #___ / keep the bank-confirmed copy)
Evidence: (receipt book page, bank statement line, email)
Requested by: (name, date)    Approved by: (second person, date)
:::

:::warning Deleting a payment that is credited to a pledge
A payment credited to a pledge can’t be deleted until that credit is reversed. The application refuses: “This payment is allocated to a pledge. Reverse the allocation before deleting it.” This protects pledge totals.
:::

## Bounced checks (returned deposited items)

When a donor’s check bounces, Chase shows a debit such as “DEPOSITED ITEM RETURNED … CHK SER# 1397”. The application recognizes it as a **returned item**. It uses the donor’s check number, recorded in **Check Number (on the donor’s check)**, to point to the receipt it reverses.

**It is not reversed automatically.** The gift still counts as received until it is corrected. How to book a bounced check (mark refunded, or a reversing entry) is an accounting decision the church has not yet made. See [open questions](#/about/open-questions). Meanwhile, tell the donor, and ask the technical administrator to correct the record once leadership decides.
