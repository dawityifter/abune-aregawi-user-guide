---
title: Frequently asked questions
order: 1
audience: Everyone
summary: Answers to the questions treasurers, administrators and members actually ask, each with the cause, how to check, the fix, how to confirm it worked, and when to escalate.
updated: 2026-11-11
related: help/troubleshooting, help/incident-history, help/glossary
---

Each answer has the same parts: **Likely cause**, **Check**, **Fix**, **Confirm**, and **Escalate when**. “Escalate” means contacting the technical administrator. Use the [correction request template](#/donations/correcting-a-payment?h=what-you-cannot-correct-on-screen) for anything involving money.

## Donations and payments

### Why is a donation not showing up?

- **Likely cause:** not recorded yet (cash/check waiting for Add Payment; Zelle waiting in Zelle Review; Square waiting in Square Review); recorded under someone else; or an online payment whose notice from Stripe failed.
- **Check:** Member Payments → filter by amount and date range. Then Zelle Review or Square Review for an unrecorded row. For online gifts, the Stripe dashboard.
- **Fix:**
  1. Cash/check with a receipt: record it with **Add Payment**.
  2. Zelle: match and **Create transaction** in Zelle Review.
  3. Square: **Confirm** it in Square Review (or **Sync from Square** first).
  4. Found under the wrong member: see the next question.
- **Confirm:** it appears on the member’s Dues page.
- **Escalate when:** Stripe shows it succeeded but there is no record after a day, or Square Review shows nothing after a sync.

### How do I correct a payment recorded under the wrong member?

- **Likely cause:** a wrong suggestion was accepted, or the wrong one of two similar names was picked.
- **Check:** open the payment (Member Payments → Details); note the member ID and receipt or reference.
- **Fix:** there is no on-screen way to change the member. Send a correction request; the technical administrator moves it with `rematch-payment-member.js`. If it came from Zelle and the sender was “remembered”, say so.
- **Confirm:** the payment is on the correct member’s Dues page and gone from the other.
- **Escalate:** always (this needs the technical administrator).

### How do I tell if a payment is a duplicate?

- **Likely cause:** the same money recorded two ways (email and bank, pending and posted copy, hand entry and bank).
- **Check:** same member, same amount, dates within a few days; one bank-confirmed and one not. The Overview’s ledger higher than the bank. The Sunday Deposit Check showing “bank received less”.
- **Fix:** don’t delete anything. Collect both entries and the bank line, and send a correction request. See [Finding duplicates](#/reconciliation/finding-duplicates).
- **Confirm:** only one remains; Overview ledger and bank agree.
- **Escalate:** always.

### Money is in the bank but not in the application — what do I do?

- **Likely cause:** the bank line is still pending; a gift arrived by a route nobody recorded (ACH from an employer, a vendor refund); or the CSV wasn’t uploaded.
- **Check:** Bank Integration → filter **Pending Review** for that date and amount.
- **Fix:** follow [Reviewing bank transactions](#/reconciliation/reviewing-bank-transactions): approve it to a member, link it, or for non-gifts ask how it should be booked.
- **Confirm:** the line shows **MATCHED** or **RECONCILED**; the month moves toward **Reconciled**.
- **Escalate when:** you can’t identify what the money is.

### A check bounced. What now?

- **Likely cause:** the donor’s bank refused it. The bank list shows **RETURNED ITEM**.
- **Check:** the line names the receipt it reverses (it uses the donor’s check number recorded with the payment).
- **Fix:** contact the donor. Ask the technical administrator to correct the original payment, according to the church’s policy. The application doesn’t reverse it automatically, and the policy is still to be decided.
- **Confirm:** the gift no longer counts in the donor’s totals.
- **Escalate:** always.

## Zelle

### Why didn’t a Zelle payment get imported?

- **Likely cause:** the email reader hasn’t run yet (hourly outside Sunday mornings); the notification went to another mailbox; the Gmail connection expired.
- **Check:** click **Sync Now**. Look for the Chase notification in the church Gmail.
- **Fix:** if the email exists but never appears after Sync Now, the Gmail connection needs renewing. Meanwhile, approve the gift from its bank line when the statement arrives.
- **Confirm:** new rows appear after **Sync Now**.
- **Escalate when:** no new Zelle emails appear for a week that had Zelle gifts.

### The sender’s name is different from the member’s name

- **Likely cause:** a spouse, child or friend paid for the member.
- **Fix:**
  1. Choose the **member** the gift is for.
  2. At **Who is the sender?**, choose **This payment only** unless this account always pays for that member, such as a shared household account. Then choose **Remember**.
- **Confirm:** the gift is on the right member; next time, this sender is still suggested for their own record.
- **Escalate when:** a sender is consistently suggested for the wrong person (the learned link needs undoing).

### I associated a Zelle payment with the wrong person

- **Fix:** if you only **saved the match** and haven’t created the transaction, search the correct member and **Save** again. If the transaction was created, send a correction request (`rematch-payment-member.js`). Mention whether you chose **Remember**.
- **Escalate when:** the transaction was already created.

### How do I avoid recording a Zelle payment twice?

Create it **once**: either from Zelle Review (**Create transaction**) or from the bank line (**Approve**), never both. When the bank line arrives for an email-created payment, it links automatically or shows **Possible Existing Entry → Link to this entry**. **Never** click “create anyway” unless you are sure it is a separate gift.

## Square

### Why does a Square payment show no member?

- **Likely cause:** card readers don’t know the buyer, unless Square has an email that belongs to exactly one member.
- **Fix:** ask the cashier (time, amount, last four card digits). Pick the member, or tick **Non-member donor** with a descriptive name.
- **Escalate when:** Square Review stays empty though the reader was used. Try **Sync from Square** first.

### Can I change the member on a Square payment I already confirmed?

Not on screen. Send a correction request.

## Benevity

### How do I import a Benevity CSV?

See [Benevity](#/donations/benevity): **Bank Integration → Import Benevity Donations → Preview**, resolve each row, then **Import**.

### Why wasn’t a Benevity donation matched to a member?

- **Likely cause:** the donor’s Benevity email or name doesn’t exactly match a member record, or matches more than one; or the donor chose to stay anonymous.
- **Fix:** **Find member** and choose them. Your choice is remembered for next time. Update the member’s email on their record to help future matches.

### Why are company matches not on members’ tax statements?

Because the **employer** gave that money, not the member. The member can claim only their own gift. Matches are recorded separately, appear in church totals and the member’s history, but are never on the statement. The application enforces this.

## Pledges

### Why does a member still show an outstanding pledge after paying?

- **Likely cause:** the payment was recorded with a type other than **Pledge Drive**; it was Pledge Drive but no pledge was open at the time; it was recorded under a household member; or there are two pledges for them.
- **Check:** Member Dues (payment type) and Pledges (how many pledges).
- **Fix:** wrong type: **Edit → Payment Type → Pledge Drive**. Then ask the technical administrator to credit it to the pledge (`move-pledge-credit.js`). For two pledges, **Cancel pledge** on the duplicate with a reason.
- **Confirm:** Pledges shows the right **Paid** and **Outstanding**.
- **Escalate:** for crediting a payment to the pledge.

### How do I verify pledge fulfilment or investigate a discrepancy?

Compare the pledge’s **Paid** with the member’s Pledge Drive payments on Member Dues. The Pledge Dashboard’s **Received** is the sum of payments credited to pledges; **Employer matches** are shown separately and never count.

## Access and sign-in

### I can’t sign in

- **Likely cause:** wrong number; text message delayed or blocked; too many code requests; the reCAPTCHA check blocked by the browser.
- **Fix:**
  1. Type the ten-digit number again carefully.
  2. Wait a minute before asking for a new code.
  3. Try another browser or a private window; disable ad blockers for the site.
  4. On a phone without signal, connect to Wi-Fi.
- **Confirm:** you reach your Dashboard.
- **Escalate when:** nobody at all can sign in (a system problem), or one person still can’t after trying another browser.

### I signed in, but it asks me to register again

Your phone number isn’t on any member record, or it changed. **Don’t register again.** Ask the Secretary to look you up and correct the phone number on your existing record.

### Why can’t I see a particular menu or tab?

Your role doesn’t include it. See [Roles](#/getting-started/roles-and-permissions). Secretaries open the Admin Panel by typing `/admin` after the site address. After a role change, sign out and in again.

### The application shows an error

- **Check:** does it happen on one screen or everywhere? Does reloading fix it? Is a red message describing a specific problem (e.g. “Receipt number … has already been used”)? That is a normal validation message; correct the field.
- **Fix:** reload. On a phone, if an **update** notice appears, tap **Refresh**.
- **Escalate when:** an error says something like “Failed to fetch”, “Network error” or “CORS”, or it persists. Include the screen, time and exact message.

### The application is unavailable

See [Troubleshooting → the site is down](#/help/troubleshooting?h=the-website-or-the-api-is-down). Keep paper receipts as usual and enter them when it is back. Nothing is lost while it’s down.
