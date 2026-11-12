---
title: Incident history — problems we solved
order: 3
audience: Treasurer, technical administrator, leadership
summary: Real problems from the application’s history — what happened, why, how it was diagnosed, what was fixed, and what to do if it happens again.
updated: 2026-11-11
status: needs-confirmation
related: help/faq, reconciliation/finding-duplicates, technical/data-corrections
---

These are taken from the developer’s working notes and the application’s own documentation. Member names, IDs and exact amounts have been removed. Where a clean-up on the live system was handed over but not confirmed as done, it says so. Those items are in [open questions](#/about/open-questions).

## Zelle and bank

### 1. Zelle payments recorded twice — email without a payer name (Oct 2026)

- **What happened:** Bank lines stayed **pending** for Zelle gifts that were already recorded from their email. Approving them created a second payment.
- **Cause:** The check that recognizes “this bank line is that email’s payment” worked only by the exact reference number (which Chase shares only for Chase-to-Chase senders) or an identical payer name. Emails with **no payer name** (from July–August 2026) were invisible to it.
- **Diagnosis:** Comparing email-created payments with bank-approved ones of the same amount within a few days found about seventeen affected emails and several real duplicates.
- **Fix:** The bank check now finds candidates by **amount and date window alone**, refuses a plain **Approve** (“LINK_EXISTING”), and offers **Link to this entry**. Linking fills in the missing payer name. A clean-up script removed the existing duplicates, keeping the bank-confirmed payment.
- **Next time:** Never click past a “possible existing entry”. If duplicates appear, see [Finding duplicates](#/reconciliation/finding-duplicates), kind 2.

### 2. One bank line imported twice — pending and posted copies (Oct 2026)

- **What happened:** The bank list showed **MATCHED** and **PENDING** copies of the same payments.
- **Cause:** Chase writes a still-**pending** transaction differently (Zelle in capitals, short ACH text, no balance). Overlapping downloads imported the posted version as a new line. Dozens of pairs existed, and about ten had been approved on both sides, recording money twice.
- **Fix:** The upload now recognizes a posted line it already holds as pending, and updates it instead. A clean-up script resolves stored pairs. Pairs whose two copies were given **different payment types** need the treasurer to decide which is right.
- **Next time:** Overlapping downloads are safe now. If pairs appear again, Chase has probably changed its format; tell the technical administrator.
- **Status:** the production clean-up of the stored pairs, and two type decisions, were pending. Confirm.

### 3. One deposit recorded as several payments (Oct 2026)

- **What happened:** About twenty-five bank deposits each had more than one payment recorded for the same money, from older email-era entries, hand-entered receipts, and an automatic pass over an old CSV backlog in July 2026.
- **Fix:** A clean-up script keeps the entry with a real receipt (otherwise the first recorded) and moves the deposit onto it; type clashes go to the treasurer.
- **Status:** handed over for the live system; several type decisions were deferred. Confirm.

### 4. Restoring “Create transaction” on Zelle Review without duplicates (Sep 2026)

- **What happened:** Treasurers wanted to record Zelle gifts straight from the email instead of waiting for the bank statement. Earlier automatic creation from email had caused duplicates once the bank line also arrived.
- **Design:** Creating from Zelle Review checks first for the same money already recorded (by the bank, another email, or by hand) and offers **Attach** instead. When the bank line arrives, it **links** to the email-created payment rather than creating one. The payment keeps the donor’s date.
- **Key fact:** the email’s “Transaction number” equals the bank’s reference only for Chase-to-Chase senders. Most pairing relies on payer name + amount + date, and must be unique both ways.
- **Next time:** Emails older than this change, keyed the old way, don’t confirm automatically. Link them by hand from the bank line.

### 5. “Paid on behalf of” changed future matching (Sep 2026)

- **What happened:** A member paid another member’s pledge once by Zelle. The system “learned” that all of that sender’s payments belonged to the other person, so their own later gifts were suggested for the wrong member.
- **Fix:** **Who is the sender?** now asks whether to remember the sender or treat it as **this payment only**. A remembered sender is never re-pointed without an explicit “Remember”. Scripts report and undo wrongly learned senders.
- **Status:** undoing the specific wrong link on the live system, and reviewing the mismatch report, were pending. Confirm.

### 6. Zelle payer names came through blank

- **What happened:** Every queued email had amount and reference but no payer name, so treasurers had to type every name.
- **Cause:** The email parser expected the amount right after “sent you”. Chase’s template puts the name on its own line (“JANE DOE sent you money”) with the amount further down.
- **Fix:** The parser now recognizes the real layout, anchored to the start of the line so it can’t swallow the subject line into the name.
- **Next time:** If names go blank again, Chase changed the template. Type names meanwhile; a developer updates the parser.

### 7. Identical charges silently dropped

- **What happened:** Two genuinely identical charges on one day (same payee, same amount) were imported as one; the second vanished, counted as “skipped”.
- **Fix:** Identical lines in one file are numbered, so both are kept. Re-uploading the same file is still safe.

### 8. A bounced donor check could have matched a church check

- **What happened (prevented):** Chase reports a bounced deposited check with the **donor’s** check number (e.g. “CHK SER# 1397”), which could collide with the church’s own check 1397.
- **Fix:** Returned items are recognized, never matched to church expenses, and traced to the receipt using the donor’s check number recorded on the payment.
- **Still open:** how to book the reversal. See [Correcting a payment](#/donations/correcting-a-payment?h=bounced-checks-returned-deposited-items).

## Members and pledges

### 9. A member registered twice (Sep 2026)

- **What happened:** One person had two records, with an old phone and with the right phone and family. Their pledge and payments were split.
- **Fix:** A merge script moves everything to the correct record and removes the duplicate. After merging, **two hidden duplicates** appeared: a hand-entered payment duplicating a bank-confirmed Zelle payment, and a second unpaid pledge in the same drive. The first was deleted and the pledge cancelled.
- **Next time:** See [Duplicate records](#/members/duplicate-and-incorrect-records). Always review the merged record.
- **Status:** the live-system merge was pending confirmation of the record IDs. Confirm.

### 10. Dues paid for next year (Nov 2026)

- **What happened:** From 1 January, dues paid in December for the coming year would have been hidden, and December prepayments couldn’t be recorded properly.
- **Fix:** Each dues payment can carry the year it pays (**Year** / **For year**, chosen from a dropdown), checked on the server. Dues pages show amounts applied from or to other years. Tax statements still go by **payment date**. Members with no pledge are credited in the year they pay; there is no automatic carry-forward for them.
- **Status:** a read-only report of dues credited to unusual years was to be run on the live system. Confirm.

## Production operations

### 11. “CORS errors” that were really timeouts (Jul 2026)

- **What happened:** One screen failed in production with a CORS error while others worked.
- **Cause:** nginx stops waiting after 60 seconds and answers without CORS headers; a large bank upload took longer.
- **Fix:** Bank processing was batched. See [Logs and monitoring](#/technical/logs-and-monitoring).

### 12. Staff screens showing raw labels (Sep 2026)

- **What happened:** Zelle Review showed text like “ZelleReview CreateTransaction”.
- **Cause:** its translation entries were filed in the wrong place. Fixed.
- **Next time:** Odd capitalized labels mean a missing translation key; report the screen.

## Not a problem — but it looks like one

- **Salary missing one month, doubled the next.** Two months’ pay at once is common at the church. The Expense Report dates salary by the check date.
- **A Sunday flagged as not deposited when the bank data stops on Monday.** Upload a newer statement after Wednesday.
