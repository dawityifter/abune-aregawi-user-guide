---
title: Online giving (Stripe)
order: 4
audience: Treasurer, Admin; members giving online
summary: How members give by card or bank account on the Give page, how those gifts appear automatically, and the important limits on recurring, failed and refunded payments.
updated: 2026-11-11
status: needs-confirmation
related: donations/card-and-ach-by-treasurer, reconciliation/reviewing-bank-transactions, continuity/integrations
---

**Stripe** is the company that processes card and bank-account (ACH) payments for the church. Members never give card details to the church itself; the card form on the Give page belongs to Stripe.

## What the member does

:::steps
1. Open **Give**, from the Dashboard or the **Give** button at the bottom of a phone screen. The page is titled **Support Our Church**. Members don’t have to be signed in, but if they are, their details are filled in from their profile.
2. Choose a **Donation Amount** or type an **Other amount** (minimum $1.00).
3. Choose **One-Time** or **Recurring** (read the warning below).
4. If they have an open pledge, they can tick **Apply to my pledge**.
5. Choose **Credit/Debit Card** or **Bank Account (ACH)**, and fill in **Donor Information**: name is required; email, phone and billing address are optional.
6. Read the authorization text and click **Give $&lt;amount&gt;**.
7. The page shows “Payment successful! Thank you for your donation.”
:::

The page also lists **Other ways to give**, including Zelle: the church’s Zelle QR code and email address, with how-to steps.

## How it reaches the books

1. Stripe takes the payment.
2. Stripe sends the application a secure notice, called a **webhook**, saying the payment **succeeded**.
3. The application then records the **payment** and its ledger entry by itself. Card gifts appear in **Member Payments** within seconds. ACH can take several days to be reported as successful.
4. If the member ticked **Apply to my pledge**, the payment is credited to their pledge.
5. Stripe later pays the money out to the Chase account. Those payout lines are reconciled on the **Bank Integration** tab.

Nobody needs to enter online gifts by hand. **Don’t** record them again with Add Payment.

## Payment status

| Status | Meaning |
|---|---|
| **Succeeded** | Stripe confirmed the money. It counts in all totals. |
| **Pending** | Started but not yet confirmed (common for ACH) |
| **Failed** | Stripe reported the payment failed. If a payment record exists, it is marked failed. |

:::danger “Recurring” does not currently repeat the gift
The Give page offers **Recurring** with **Weekly**, **Monthly**, **Quarterly** or **Yearly**, and its authorization text mentions recurring payments. **In the current application, choosing Recurring charges the member once.** The chosen frequency is saved with the gift, but no repeating charge is ever set up with Stripe. This was confirmed by reading the application code on 11 November 2026.

Until a developer fixes this:
- Tell members who want to give every month to give **one-time** each month, or to use Zelle’s own scheduled payments from their bank.
- If a member asks why their monthly gift stopped, this is why.

Recorded in [open questions](#/about/open-questions) as a high priority.
:::

## Failed and refunded payments

:::warning Refunds are not recorded automatically
The application listens only for **payment succeeded** and **payment failed** from Stripe. A **refund** or **dispute** made in the Stripe dashboard is **not** reflected in the application. The gift stays recorded as received.
:::

**When a refund is needed:**

:::steps
1. An authorized person issues the refund in the **Stripe dashboard**. It is never done from this application.
2. Write down the amount, date, donor and reason.
3. Ask the technical administrator to mark the payment **refunded** (or remove it). Otherwise it stays on the donor’s tax statement and in church income.
4. When the bank statement shows the refund deducted from a Stripe payout, make sure the bank line is explained. See [Reviewing bank transactions](#/reconciliation/reviewing-bank-transactions).
:::

**A failed ACH payment** (for example, insufficient funds) is reported by Stripe as failed, and the payment is marked **Failed**. Check **Member Payments** with the status filter **Failed** after any ACH gift you expected.

## When an online gift is missing

| Check | Where |
|---|---|
| Did the payment succeed in Stripe? | Stripe dashboard → Payments |
| Did the webhook reach the application? | Stripe dashboard → Developers → Webhooks → recent deliveries. A failed delivery means the gift was never recorded. Stripe retries for about 3 days. |
| Is it recorded under a different member or as non-member? | Member Payments, search by amount and date |

If Stripe shows success but the application has nothing after a day, escalate to the technical administrator. See [Logs and monitoring](#/technical/logs-and-monitoring).
