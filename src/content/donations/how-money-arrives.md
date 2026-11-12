---
title: How money arrives — the big picture
order: 1
audience: Treasurer, finance team, leadership
summary: Every way money reaches the church, how each one gets into the books, and the one rule that keeps them from being counted twice.
updated: 2026-11-11
related: donations/cash-and-check, donations/zelle, donations/square, donations/benevity, reconciliation/what-reconciliation-means
---

Each gift is recorded as **one payment** (a *transaction*) with its **ledger entry**. Later, the matching line on the Chase bank statement is **linked** to that payment, which proves the money really arrived. A bank line must never create a second payment for money that is already recorded.

## The ways money arrives

| How it’s given | How it gets into the application | Who acts | Then confirmed by | Guide |
|---|---|---|---|---|
| **Cash** in the offering or to the treasurer | Treasurer uses **Add Payment** with the paper receipt number | Treasurer | The Monday–Wednesday bank **DEPOSIT** line ([Sunday Deposit Check](#/dashboard/sunday-deposit-check)) | [Cash and checks](#/donations/cash-and-check) |
| **Check** | Same as cash, plus the donor’s check number | Treasurer | The bank deposit | [Cash and checks](#/donations/cash-and-check) |
| **Card or bank account (ACH) online**, by the member on the **Give** page | Automatically, when **Stripe** reports the payment succeeded | Nobody; it’s automatic | Stripe payout on the bank statement | [Online giving (Stripe)](#/donations/online-giving-stripe) |
| **Card or ACH taken by the treasurer** (for example dues by card) | **Add Payment** → *Debit/Credit Card* or *ACH*, processed through Stripe | Treasurer | Stripe payout | [Card and ACH by the treasurer](#/donations/card-and-ach-by-treasurer) |
| **Zelle** to the church’s email | The bank’s Zelle notification email is read automatically into **Zelle Review**; the treasurer matches and creates the payment | Treasurer | The Zelle line on the bank statement, linked automatically or by **Link to this entry** | [Zelle](#/donations/zelle) |
| **Square card reader** at church | Square tells the application about each completed payment; it waits in **Square Review** | Treasurer | Square payout on the bank statement | [Square](#/donations/square) |
| **Benevity** (employer giving and matching) | Treasurer imports the Benevity CSV report | Treasurer | The single Benevity deposit, linked to the report | [Benevity](#/donations/benevity) |
| **ACH or check credits** that appear only on the bank statement | Approved from **Bank Integration** (pending bank rows) | Treasurer | It *is* the bank line | [Reviewing bank transactions](#/reconciliation/reviewing-bank-transactions) |
| **Member loan** | **Loans** tab. Not income | Treasurer | Bank deposit | [Member loans](#/donations/member-loans) |
| **Event merchandise** (t-shirts) online | Automatic via Stripe Checkout. Not a donation | Nobody | Stripe payout | [Merchandise](#/administration/merchandise) |

## Payment types (what the money is for)

Every payment has a type. It decides the accounting category (GL code) and whether it appears on the member’s tax statement.

| Type shown in Add Payment | GL code | On tax statement? |
|---|---|---|
| Membership Fee (ናይ አባልነት ኽፍሊት) | INC001 Membership | Yes |
| Tithe (አስራት) | INC002 Weekly Offering | Yes |
| Offering (መባእ) | INC002 Weekly Offering | Yes |
| Building Fund (ንሕንጻ ቤተክርስቲያን) | INC003 Fundraising | Yes |
| Other Donation / ካልእ | INC004 Special Donation | Yes |
| Vow (ስእለት) | INC008 Vow (Selet) & Tselot | Yes |
| Tigray Hunger Fundraiser (ረድኤት ንጥሙያት ትግራይ) | INC010 | Yes |
| Pledge Drive / Fundraising (ወፈያ) | INC011 Pledge Drive | Yes |
| Religious Item Sales (Bibles, candles, etc.) | INC009 Religious Item Sales | No, it’s a purchase |
| *Event merchandise* (online only) | INC012 Event Merchandise Sales | No, it’s a purchase |
| *Employer match* (Benevity only) | INC013 Employer Matching Contributions | **Never**; it’s the employer’s gift |
| *Loan received / repaid* (Loans tab) | Not income | No |

:::danger The one rule: every dollar is recorded once
The application has several doors for the same money. A Zelle gift arrives as an **email** *and* later as a **bank line**. Chase sometimes lists a transaction twice: once as **pending**, once as **posted**. A cash deposit shows on the bank as one **DEPOSIT** line covering many receipts. Each door has protections, which are the warnings you will see, but they work only if you read them. **When the screen says “possible duplicate” or “may already be recorded”, stop and check before you click past it.** See [Finding duplicates](#/reconciliation/finding-duplicates).
:::
