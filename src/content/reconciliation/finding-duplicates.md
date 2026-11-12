---
title: Finding and fixing duplicates
order: 4
audience: Treasurer, Bookkeeper, Technical administrator
summary: The four ways the same money has been recorded twice in this application, how to recognize each, and how each is cleaned up safely.
updated: 2026-11-11
related: reconciliation/reviewing-bank-transactions, donations/zelle, help/incident-history, technical/data-corrections
---

Most financial problems in this application’s history were **duplicates**: the same money recorded twice. They inflate income, make the ledger disagree with the bank, and can put a gift twice on a member’s tax statement. All four kinds below have happened. Each now has a protection and a clean-up tool.

## Signs of a duplicate

- The Overview says **Doesn’t match the bank statement** and the ledger is **higher** than the bank.
- A member’s Dues page shows the same amount twice a few days apart.
- The Sunday Deposit Check says “bank received **less** than recorded”.
- Two bank lines with the same date and amount, one in capital letters or with no balance.

## The four kinds

| Kind | What happened | Protection now | Clean-up tool (technical administrator) |
|---|---|---|---|
| **1. Pending and posted copies of one bank line** | Chase lists a still-pending transaction differently from the posted one. An overlapping download imported both | Upload recognizes the posted copy and updates the existing line (since Oct 2026) | `resolve-pending-posted-duplicates.js` |
| **2. Zelle recorded from the email *and* from the bank** | A payment created on Zelle Review, then a separate Approve on the bank line, especially when the email had no payer name | Bank Approve is refused (“LINK_EXISTING”) when an email-created payment of that amount is within the date window, even without a name; **Link to this entry** offered | `resolve-zelle-bank-duplicates.js` |
| **3. One deposit recorded as several payments** | Older entries from the email era, Add Payment receipts and an automatic pass over an old backlog all recorded the same deposit | Possible-duplicate checks on Add Payment, Zelle and bank screens | `resolve-bank-deposit-duplicates.js` (keeps the entry with a real receipt, else the first one) |
| **4. A plain duplicate payment** | Entered twice by hand, or by two people | Receipt numbers must be unique; skipped-receipt check | `delete-duplicate-transaction.js` |

Duplicate **member records** are a related problem; see [Duplicate member records](#/members/duplicate-and-incorrect-records).

## What the treasurer does

:::steps
1. **Don’t delete or “fix” anything by hand.** There is no delete button, and that is deliberate.
2. Collect the evidence: both entries (member, amount, date, receipt or reference), and the bank line.
3. Decide which entry is the real one. Usually it is the one confirmed by the bank, or the one with the real receipt number.
4. Send it to the technical administrator using the [correction request template](#/donations/correcting-a-payment?h=what-you-cannot-correct-on-screen).
5. After the fix, check the member’s Dues page, and whether the Overview’s ledger and bank now agree.
:::

## What the technical administrator does

1. **Fix the cause first.** If a new kind of duplicate appeared, the code that should have prevented it must be fixed and deployed before cleaning up. Otherwise the next upload recreates it.
2. Run the matching report on a **copy** of the data. Each script reports and changes nothing unless given `--apply`.
3. Have the church’s production data changed only by the agreed person, dry run first. See [Data corrections](#/technical/data-corrections).
4. After the clean-up, click **Sync Now** on the Ledger Backup so the Google Sheets copy matches.

:::note A recorded type clash needs a person
When two duplicates disagree on payment type, for example one says *Membership Fee* and the other *Tithe*, the scripts stop and list them. The treasurer must say which is correct. Don’t assume Membership Fee.
:::
