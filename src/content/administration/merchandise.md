---
title: Event merchandise (t-shirts)
order: 7
audience: Admin, Treasurer, Bookkeeper, Church Leadership, Secretary
summary: Online t-shirt orders, fulfilling them, recording cash sales, and the inventory count.
updated: 2026-11-11
status: needs-confirmation
related: donations/how-money-arrives, reports/tax-statements
---

The public **/merch** page sells event shirts online through **Stripe Checkout**. Stripe hosts the payment page. **Admin Panel → Merchandise** manages orders and stock.

> “Event merchandise sales. These are purchases, not donations — they are booked to Event Merchandise Sales (INC012) and never appear on a giving statement.”

## Orders

**Merchandise Orders** lists shirts sold online: **Ordered**, **Purchaser**, **Sizes**, **Payment**, **Fulfillment**, and the total including any tax. Filter by payment status and by fulfillment (**Unfulfilled** / **Fulfilled**). When a shirt is handed over, click **Mark fulfilled**.

Orders are recorded automatically when Stripe confirms payment. An order that is never paid expires, and its shirts go back on sale after 30 minutes.

## Inventory

“Shirts left to sell. Online orders come off automatically; record cash sales here. A size at 0 can no longer be ordered online.”

- **Sold for cash**: enter how many of a size were sold for cash and click **Subtract**.
- **Set count**: type the number actually on the shelf and **Save**.
- **Awaiting payment**: shirts in someone’s unfinished online checkout. They are already off the count.
- **Sold out — off sale**: that size can’t be ordered online.

:::confirm Sales tax and cash-sale money
- Whether the church must collect **Texas sales tax** on merchandise, and file it with the Texas Comptroller, is unconfirmed. Ask the church’s accountant. Tax settings are on the server (`MERCH_TAX_MODE`, `MERCH_TAX_RATE_BPS`).
- Recording a cash sale here updates the **count only**. Confirm how the cash itself is recorded in the books, for example with Add Payment or another agreed method.
:::
