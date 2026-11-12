---
title: Benevity (employer giving and matches)
order: 7
audience: Treasurer, Admin
summary: Importing the Benevity donation report, matching donors to members, choosing Donation or Pledge Drive, linking the bank deposit, and why employer matches never appear on a member’s tax statement.
updated: 2026-11-11
related: members/member-financial-record, reports/tax-statements, pledges/payments-and-pledges, reconciliation/reviewing-bank-transactions
---

Some members give through their employer’s giving program, run by **Benevity**. Many employers also **match** the employee’s gift. Benevity sends the church one bank deposit per report, and publishes a **donation report** (CSV) in the **Benevity Causes Portal**.

## The rule that matters most

One line of the Benevity report can contain **two gifts from two different givers**:

| Gift | Given by | Recorded as | GL code | On the member’s tax statement |
|---|---|---|---|---|
| Personal donation | The employee (member) | Donation | INC004 | **Yes** |
| Personal pledge gift | The employee | Pledge Drive | INC011 | **Yes** |
| **Employer match** | **The employer** | Employer match | INC013 | **Never** |

**Why:** a tax statement lists what *the member* gave. The match was given by the company, so the member cannot claim it. Listing it would overstate their deductible giving.

:::example $100 donation with a $100 company match
| Where | Personal | Match | Total |
|---|---|---|---|
| Member’s financial view (Member Dues) | $100 | $100 | $200 |
| Member’s tax statement | $100 | not shown | **$100** |
| Church totals and reports | $100 | $100 | $200 |
:::

The application enforces this itself. Matches are separate records, the statement excludes them, and a payment **cannot be changed to or from the employer-match type**. No one can put a match on a statement by mistake.

:::admin
Only **Treasurer** and **Admin** can import Benevity reports.
:::

## Before you start

:::steps
1. Upload the **Chase bank statement** that contains the Benevity deposit first, if you have it. The deposit then links in the same import. If you don’t, you can link it later.
2. In the **Benevity Causes Portal**, download the **donation report** as a CSV file. The portal and its download steps belong to Benevity. If unsure, see Benevity’s help pages or contact Benevity support.
:::

:::warning The CSV contains donors’ personal details
Real reports include donor names, emails and sometimes home addresses. Keep the file on a church computer, delete it from Downloads after importing, and never email it to a personal address.
:::

## Importing the report

:::steps
1. **Treasurer → Bank Integration**. Below the bank upload, find **Import Benevity Donations** (“Nothing is recorded until you confirm.”).
2. Click **Select Benevity CSV file**, choose the file, and click **Preview**. Nothing is saved yet.
3. Check the totals: **Personal donations to import** and **Employer matches to import**. If you see “These rows do not add up to the report’s own Totals line…”, stop and check the file before importing.
4. Go through every row. Each shows **Date**, **Donor**, **Comment**, **Source**, **Employer**, **Donation**, **Company match**, **Church member**, **Purpose** and **Status**.
5. For each row marked **Needs review**, choose the member: **Use {name}** for a suggestion, **Find member** to search, or **No member (anonymous)**. Rows left undecided are skipped: “{n} row(s) have no member yet and will be skipped.”
6. Check the **Purpose** of each row: **Donation** or **Pledge Drive**. The application suggests Pledge Drive when the member has an open pledge in the live drive, or the comment mentions the drive, with a note saying why. Use **Set all to Donation** or **Set all to Pledge Drive** to change every row. Read each comment before accepting a suggestion.
7. Click **Import {n} row(s)**.
8. Read the summary: **Personal donations**, **Employer matches**, **Already imported**, **Skipped**, **Could not be read**, **Failed**, and the **Bank deposit** result.
:::

:::screenshot images/benevity/benevity-preview.png | Benevity preview: totals, the bank deposit, and each row’s member, purpose and status
1 @ 18,50 Personal donations to import
2 @ 37,50 Employer matches to import, kept off tax statements
3 @ 31,57 The bank deposit this report will be linked to
4 @ 59,78 Church member: suggested, changed, or No member
5 @ 71,77 Purpose: Donation or Pledge Drive
6 @ 85,79 Status: Ready or Needs review
:::

### Row statuses

| Status | Meaning |
|---|---|
| **Ready** | Exactly one member found |
| **Needs review** | No member, or more than one possibility; you must choose |
| **Already imported** | Every gift on the row is already in the books |
| **Cannot import** | The row is unreadable (missing ID, bad date or amount, non-USD, negative, under $1). The reason is shown; record reversals by hand. |

### How members are matched

In order: a member already chosen for part of this gift earlier, then a choice an administrator made on an earlier import, then the exact email of an active member, then exact first and last name. If more than one member fits, the row goes to review; it is never guessed. Anonymous donors (“Not shared by donor”) are never matched or remembered. When you choose a different member than the suggestion, the choice is remembered for next time.

## Pledge Drive rows

| Donor | What happens |
|---|---|
| Member with an open pledge | Credited to that pledge, in full (even if it overpays) |
| Member with no pledge | A new pledge is created, already paid |
| Named donor, not a member | A new pledge in their name, already paid |
| Anonymous donor | An anonymous pledge, already paid, named “Benevity &lt;Transaction ID&gt;” |

The **match** on a Pledge Drive row is never pledge credit. It is shown on the drive dashboard’s **Employer matches** line.

## The bank deposit

Benevity pays each report as **one deposit**. The import finds it by the report’s **Disbursement ID** and checks the amount against the report’s net total.

| Message | Meaning / action |
|---|---|
| “Will be linked to this report once every gift in it is recorded.” | Found; it links after import |
| “Linked to this report.” | Done. The bank line is matched |
| “No bank deposit for this report yet…” | Upload the bank statement, then upload the report again. Gifts are skipped as duplicates and the button becomes **Link bank deposit**. |
| “… the report’s net total is {net}. It was not linked.” | Amounts differ; investigate |
| “… was already recorded another way. Check it was not also recorded as a payment…” | Someone handled the deposit separately. If it was approved as a payment, the money is counted twice. Escalate. |

:::danger Never approve a Benevity deposit as a payment
The gifts in the report *are* the money. Recording the deposit as income as well doubles it. The application blocks this, but if you ever see a Benevity deposit (“AMER ONLINE GIV”) recorded as a member payment, report it.
:::

## Duplicate imports are safe

Each gift has its own ID, so uploading the same file twice creates nothing new (“Already imported”). If a match appears later under the same Transaction ID, only the match is added.

## After the first import of each year — check one member

:::steps
1. Open a member who gave through Benevity on **Member Dues**. Their history shows both the personal gift and the match.
2. Print their statement for a past year with Benevity gifts. It shows **only** the personal amount.
3. For a Pledge Drive gift, the member’s pledge shows only the personal amount; the drive dashboard shows the match on its own line.
:::

## Known limits

- Benevity **fees** are not recorded. So far reports have had none.
- There is **no undo** for an import, and a gift’s Purpose can’t be changed afterwards. Corrections need the technical administrator.
- Gifts with **Source: My Rewards** may be funded by the employer; the Source is shown so you can decide.
- Benevity may issue its own receipts to donors. Whether the church statement should also list Benevity gifts is a question for a **tax advisor**. See [open questions](#/about/open-questions).
