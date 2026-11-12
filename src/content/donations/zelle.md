---
title: Zelle payments
order: 5
audience: Treasurer, Admin
summary: How Zelle emails enter Zelle Review, matching each to a member, creating the payment, payments sent on someone else’s behalf, and how the bank statement confirms them without duplicates.
updated: 2026-11-11
related: reconciliation/reviewing-bank-transactions, reconciliation/finding-duplicates, help/incident-history, pledges/payments-and-pledges
---

Members send Zelle gifts to the church’s Zelle email address, which is shown on the Give page. Each time, Chase sends a **notification email** (“… sent you money”) to that mailbox, and later the payment appears on the **bank statement**. The application uses both: the **email** to record the gift quickly, and the **bank line** to confirm it.

:::admin
**Zelle Review** is for **Treasurer** and **Admin** only.
:::

## How Zelle emails arrive

- The application reads the church’s Gmail inbox automatically: **every 5 minutes on Sundays from 9:00 AM to 12:30 PM (Central)**, and **every hour** at other times.
- Each Zelle email becomes a row in **Zelle Review**, with amount, date, the sender’s name (the **payer**), the memo, and a **suggested member**.
- **Nothing is recorded as money at this stage.** A row becomes a payment only when a treasurer creates it, or when the bank line is approved on the Bank Integration tab.
- **Sync Now** fetches new emails immediately.

:::screenshot images/zelle/zelle-review.png | Zelle Review: each Zelle email with its payer, memo and matched member
1 @ 88,58 Filter, status, Refresh and Sync Now
2 @ 29,67 Payer name from the email
3 @ 49,67 Matched (suggested) member
4 @ 63,68 Search member, then Save the match
5 @ 61,83 Payment type, receipt and Create transaction
6 @ 61,91 Payer name (required) when the email had none
:::

## Statuses

| Status | Meaning | What to do |
|---|---|---|
| **NEEDS_REVIEW** | New email; no member confirmed | Match it |
| **MATCHED** | A member is chosen, but no payment exists yet | Create the transaction, or let the bank line do it |
| **CREATED** | A treasurer created the payment from this email. Shown as **Created · awaiting bank**, then **Bank-confirmed** once the bank line links | Nothing, unless it stays “awaiting bank” for more than 10 days |
| **BANK_POSTED** | The bank line was recorded first, and the email was linked to it (**Posted by bank**) | Nothing |
| **AUTO_CREATED** | Created automatically by an older version of the system | Nothing |
| **IGNORED** | Marked as not a gift (set by the system or a technical administrator; there is no button for it) | — |
| **ERROR** | The email couldn’t be read | Tell the technical administrator |

## Reviewing a Zelle payment

:::steps
1. **Treasurer → Zelle Review**. Use the status filter **NEEDS_REVIEW** to see what’s new.
2. Read the **Payer** and **Memo**. The memo often names the member or purpose, for example “dues for my mother” or “building fund”.
3. Check the suggested member. If it’s wrong or missing, search with *Search member by name or phone…* and select the right person.
4. If the payer name is empty, type it in **Payer name (required)**, **exactly as it appears on the bank statement**. Bank matching depends on it.
5. Answer **Who is the sender?** if asked. See [Paid on behalf of someone else](#paid-on-behalf-of-someone-else) below.
6. Click **Save** to save the match.
7. Choose the **Payment type**, **For year** (for dues) and optionally **Receipt # (optional)**.
8. Click **Create transaction**. You’ll see “Transaction created.” The row becomes **Created · awaiting bank**.
:::

:::tip You may stop after step 6
If you prefer, match the member (step 6) and leave the rest for bank reconciliation. When the Chase CSV is uploaded, the bank line arrives with the member already suggested. Approving it creates the payment, and the email shows **Posted by bank**. Either way, the payment is recorded once.
:::

### Pledge Drive payments

If the type is **Pledge Drive**, the screen shows the member’s open pledge and credits it, or offers **Also record this as a pledge**. See [How payments credit pledges](#/pledges/payments-and-pledges).

## “This payment may already be recorded”

When you click Create transaction, the application first checks for the same money recorded another way. If it finds something, it shows **This payment may already be recorded** with the candidates and where each came from: **Bank reconciliation**, **Zelle email** or **Entered manually**.

| You see | Do this |
|---|---|
| A candidate that is clearly this payment (same member, same amount, within a few days) | Click **Attach to this entry**. The email is linked; nothing new is created. |
| The candidates are a *different* gift, for example the member really gave twice | Click **It’s a separate payment — create anyway** and confirm |
| “Bank reconciliation had already recorded this payment; the email is now linked to it.” | Nothing; it was handled for you |

:::danger When in doubt, don’t create
Creating “anyway” when it was the same gift records the money twice. Check the member’s Dues page and the bank statement first.
:::

## Paid on behalf of someone else

Often the sender is not the member, for example a son paying his mother’s dues, or a friend paying someone’s pledge. The application separates two questions:

1. **Whose gift is it?** Credit it to the member you choose.
2. **Should the application remember that this sender’s future Zelle payments belong to that member?**

When the payer and the member differ, **Who is the sender?** asks:

| Choice | Effect |
|---|---|
| **This payment only — {payer} paid on behalf of {member}** | This gift is credited to the member. The sender is **not** remembered, so their future payments are suggested as before. |
| **Remember — future payments from {payer} are {member}’s** | From now on, payments from this sender are suggested for this member |

Choose **Remember** only when this account *always* pays for this member, for example a shared household account. If the sender is already remembered as someone else, the screen says so and pre-selects “This payment only”.

:::example Why this matters (what happened before)
In September 2026, a member paid another member’s pledge once, by Zelle. The old system silently “learned” that all of the sender’s future payments belonged to the other person, and their own later gifts were suggested for the wrong member. The **Who is the sender?** question was added so that one-off gifts on someone’s behalf never change future matching.
:::

## How the bank statement confirms a Zelle payment

When the Chase CSV is uploaded:

- If a Zelle payment was **created from its email** and the application is certain the bank line is the same payment, it **links** them automatically. The email shows **Bank-confirmed**. Certain means same amount, same payer name, and the bank posted it between 1 day before and 5 days after the email, with no other possible match either way.
- If it’s **plausible but not certain**, for example a different name spelling or two same-amount gifts that week, the bank line stays **pending** and shows **Possible Existing Entry** with **Link to this entry**. Plain **Approve** is refused, so it can’t be recorded twice.
- If **nobody created it** from the email, the bank line is pending with the member suggested. **Approve** creates the payment and links the email.

The date given by the donor (the email date) is kept as the payment date, which matters for year-end statements.

## Problems and fixes

| Problem | Likely cause | What to do |
|---|---|---|
| A Zelle gift isn’t in Zelle Review | The email hasn’t been read yet, went to another mailbox, or Chase changed its email layout | Click **Sync Now**. If still missing, check the church Gmail for the notification. If the email exists but never appears, escalate. |
| Payer name is blank on many rows | Chase changed its email template | Type names by hand meanwhile, and tell the technical administrator, because it affects bank matching |
| A row stays **Created · awaiting bank** for more than 10 days | Bank CSV not uploaded, names differ, or the Zelle was reversed | Upload a newer CSV; open the pending bank line and use **Link to this entry**; if no bank line ever appears, check with the donor |
| The same Zelle gift is recorded twice | Created from the email **and** approved separately from the bank | See [Finding duplicates](#/reconciliation/finding-duplicates). Don’t delete anything yourself |
| Wrong member | Wrong suggestion accepted | See [Correcting a payment](#/donations/correcting-a-payment) |
| An email isn’t a gift (e.g. a refund paid to the church) | — | Don’t create a transaction from it. Zelle Review has **no Ignore button** (the server supports one, but the screen doesn’t offer it), so the row simply stays unmatched. Handle the money on the bank side. |

:::note Mixed language
Most of the Zelle Review screen is in English even when the app is set to Tigrigna. This is a known gap.
:::
