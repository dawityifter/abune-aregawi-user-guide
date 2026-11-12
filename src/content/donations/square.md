---
title: Square card-reader payments
order: 6
audience: Treasurer, Admin
summary: How payments taken on the church’s Square reader appear in Square Review, how to credit them to a member or a non-member donor, and what Square does not tell the application.
updated: 2026-11-11
status: needs-confirmation
related: donations/how-money-arrives, reconciliation/reviewing-bank-transactions, continuity/integrations
---

The church takes card payments in person with a **Square** reader paired to a phone, for example for gifts at the door and religious item sales. Square knows the card and amount, but usually **not who the person is**. Square Review is where the treasurer supplies that.

:::admin
**Square Review** is for **Treasurer** and **Admin** only.
:::

## How Square payments arrive

- Each time a card payment **completes** on the reader, Square notifies the application through a secure webhook, and the payment appears in **Square Review**. Only **completed** payments are stored.
- If a notice was missed, **Sync from Square** with a **From** and **To** date fetches payments for that period. Syncing twice is safe; nothing is duplicated.
- The application tries to **suggest a member**: first by the buyer’s email, if Square has one and it belongs to exactly one member, then by the buyer’s name and payment history. A confident suggestion shows as **Auto-matched**; otherwise **Needs review**.
- **Nothing is recorded as money until you Confirm.** Even **Auto-matched** payments wait for you.

:::screenshot images/square/square-review.png | Square Review: payments from the card reader awaiting review
1 @ 85,60 From / To dates and Sync from Square
2 @ 15,68 To review and Ignored tabs
3 @ 15,80 Amount, time and status
4 @ 84,80 Card brand and last four digits
5 @ 80,88 Member or Non-member donor, payment type, Confirm or Ignore
:::

## Confirming a payment

:::steps
1. **Treasurer → Square Review**. The **To review** tab lists everything waiting (“{n} awaiting review”).
2. For each payment, look at the amount, time, card (e.g. “Visa ••4242”), buyer name and note.
3. Choose who gave it:
   - a **member**: use the **Suggested** member, or *Search member…* and **Select member**; or
   - someone who isn’t a member: tick **Non-member donor** and enter the **Donor name**, for example “Walk-in visitor” or the name they gave.
4. Choose the **Payment type**, for example *Religious Item Sales*, *Offering* or *Pledge Drive*, and for dues the **Year**.
5. Optionally enter a **Receipt #** if a paper receipt was written.
6. Click **Confirm**. “Transaction created.”
:::

:::tip Many walk-in payments at once
Tick the payments (or **Select all**), type one **Donor name**, and click **Confirm {n}**. All selected payments are recorded under that donor name. Use this for a day of candle sales, for example “Religious item sales — Sunday 8 Nov”.
:::

### When you don’t know who paid

Ask the cashier who ran the reader, using the time, amount and the card’s last four digits. If nobody can identify the buyer, record it as a **Non-member donor** with a descriptive donor name, so the money is still in the books. **Ignore** is only for payments that are not church income.

## Ignore and Restore

- **Ignore** moves a payment to the **Ignored** tab. Use it only for payments that should never be church income, for example a test charge that was refunded.
- **Restore** puts it back for review.

## Protection against duplicates

Each Square payment can be recorded **once**. Confirming the same payment again (for example after a re-sync) gives “This payment was already recorded; the row has been linked to its existing transaction.”

## What Square does not tell the application

:::warning Refunds and disputes are not handled
Square refunds and disputes are received but not acted on. A refunded Square payment stays recorded as income. Record the refund with the technical administrator, as for Stripe. See [Online giving — refunds](#/donations/online-giving-stripe?h=failed-and-refunded-payments).
:::

## The Square payout on the bank statement

Square pays out the day’s card money, minus fees, as one credit on the Chase statement. Those payments are already recorded through Square Review, so **the payout line must not be approved as a new member payment**. That would count the money twice.

:::confirm How payout lines are cleared
The application has no automatic link between a Square payout and the payments it contains. The established practice for clearing payout lines on **Bank Integration** (usually **Mark Reconciled**, which records nothing) should be confirmed with the current treasurer and written here. Square **fees** (payout smaller than the sales) are not recorded automatically either.
:::
