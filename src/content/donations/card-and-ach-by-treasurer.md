---
title: Card and ACH payments taken by the treasurer
order: 3
audience: Treasurer, Bookkeeper, AR Team
summary: Charging a member’s card or bank account from Add Payment, for example for membership dues, which members cannot pay online themselves.
updated: 2026-11-11
related: donations/online-giving-stripe, donations/cash-and-check, continuity/integrations
---

Members can’t pay **membership dues** online themselves; the Give page is for donations and pledges. When a member wants to pay dues by card or bank account, the treasurer takes the payment through **Add Payment**. It is processed by **Stripe**, the same card processor as online giving.

:::steps
1. **Add Payment** → **Member Payment** → choose the member.
2. Enter the **Amount**, choose the **Payment Type** and, for dues, the **Year**.
3. In **Payment Method**, choose **Debit/Credit Card** or **ACH**.
4. A secure Stripe form appears inside the window. Enter the card details, or the bank account details for ACH, **with the member present or on the phone**.
5. Enter a **Receipt Number** if you issued one (optional for card and ACH).
6. Click **Pay $&lt;amount&gt;**. The button shows “Processing...”.
7. When Stripe confirms, the payment is recorded and the window closes.
:::

:::note If you don’t see the card form
The form needs member, amount and payment type first: “Please select a member, enter an amount, and choose a payment type to proceed.” If it still doesn’t load, Stripe isn’t set up for this site. Tell the technical administrator.
:::

:::warning Limits
- **Religious Item Sales** can’t be paid by card or ACH here. The option is hidden on purpose, so sales don’t end up recorded as donations on tax statements. Use cash, check, or the Square reader.
- The **Also record this as a pledge** option isn’t available with card or ACH in this form. Record the pledge first under **Pledges**, then take the payment as **Pledge Drive**.
- **ACH takes days.** A bank-account payment can be reported as successful by Stripe before the money actually clears, and can still fail. See [Online giving](#/donations/online-giving-stripe?h=failed-and-refunded-payments).
:::
