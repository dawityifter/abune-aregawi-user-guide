---
title: Uploading the Chase bank statement
order: 2
audience: Treasurer, Bookkeeper, Admin
summary: Downloading the activity CSV from Chase, uploading it, reading the upload summary, and why overlapping downloads are safe.
updated: 2026-11-11
related: reconciliation/reviewing-bank-transactions, dashboard/sunday-deposit-check, reconciliation/finding-duplicates
---

## Download the CSV from Chase

:::steps
1. Sign in to Chase online banking for the church’s account.
2. Open the account’s **activity**, choose a date range, and **download** it as a **CSV** file. Chase’s menus change from time to time; look for “Download account activity”.
3. Save the file on the church computer.
:::

:::tip Overlap is fine; gaps are not
Download a range that **starts a few days before** the last upload. Lines already uploaded are recognized and skipped, so overlapping is safe. A gap means missing lines.
:::

## Upload it

:::steps
1. **Treasurer → Bank Integration** (“Bank Reconciliation — Upload Chase CSVs and match transactions to members.”).
2. Under **Upload Bank Statement**, click **Select Chase CSV File** and choose the file.
3. Click **Upload & Process**. It shows “Uploading...”. Large files can take up to a minute.
4. Read the **Upload Successful!** summary.
5. Delete the CSV from your Downloads folder.
:::

:::screenshot images/reconciliation/bank-upload.png | Upload Bank Statement, and the summary after a successful upload
1 @ 13,67 Choose the Chase CSV file
2 @ 85,66 Upload & Process
3 @ 20,83 Imported, Skipped, Auto-reconciled and Left for review
:::

## Reading the summary

| Line | Meaning |
|---|---|
| **Imported: {n} new transactions** | New bank lines added |
| **Skipped: {n} duplicates** | Lines already uploaded before. This is normal with overlapping downloads |
| **Auto-reconciled: {n} of {m} pending** | Handled automatically, broken down as: |
| — **Linked to existing payments** | e.g. a Zelle payment already created from its email |
| — **Member payments created from learned payers** | Non-Zelle credits from a sender the application knows (ACH from a regular giver) |
| — **Expenses recorded from learned payees** | Regular bills, such as utilities, filed by a saved rule |
| **Left for review: {n}** | What you need to work through next. See [Reviewing bank transactions](#/reconciliation/reviewing-bank-transactions) |
| **Errors: {n}** | Lines that couldn’t be processed. Tell the technical administrator |

“**Large import: automatic reconciliation was skipped to keep the upload fast.**” means the file was big. Click **Auto-reconcile pending** in Bank Transactions to finish it.

## Things the upload handles for you

- **Pending versus posted copies.** Chase writes a still-pending transaction differently from the final posted one: Zelle in capitals, short ACH text, no balance. The upload recognizes the posted version of a line it already has and updates it instead of adding a second line. This protection was added in October 2026 after overlapping downloads had created doubles. See [Incident history](#/help/incident-history).
- **Genuinely repeated charges.** Two identical charges on the same day (same payee, same amount) are both kept. Before this was fixed, the second one silently disappeared.
- **Bounced checks** are recognized and never matched against the church’s own checks.

## After uploading

- Work through **Left for review** lines. See [Reviewing bank transactions](#/reconciliation/reviewing-bank-transactions).
- Look at the **Sunday Deposit Check** bar on the Overview tab. It uses the new bank data.
- The **Bank Balance** on the Overview now shows the latest balance.
