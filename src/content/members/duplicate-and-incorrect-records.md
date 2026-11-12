---
title: Duplicate and incorrect member records
order: 3
audience: Secretary, Treasurer, Technical administrator
summary: How to recognize a member registered twice, why it matters for the books, and how it is merged safely.
updated: 2026-11-11
related: members/managing-members, technical/data-corrections, help/incident-history
---

## How duplicates happen

- Someone registers again with a **new phone number** after changing phones.
- A spouse registers as their own **head of household** instead of joining the existing household.
- Staff use **Add Member** for someone who already registered themselves.
- A name is spelled two ways, for example with and without a family name.

## Why it matters

Payments are attached to a member record. With two records, the person’s giving is **split**: each record looks as if they are behind on dues, their statement is incomplete, and some duplicates of *payments* stay hidden until the records are combined.

:::example A real case (details changed)
A member was registered twice: once with an old phone number, and once with the correct phone and their family. Their pledge and several payments sat on the old record. When the two were merged, two hidden problems appeared: a cash payment entered by hand that duplicated the same Zelle payment confirmed by the bank, and a second unpaid pledge for the same drive. The first was removed and the second cancelled. **Lesson: after any merge, look at the combined record for doubled payments and pledges.**
:::

## How to spot one

- Search **Manage Members** by first name, then by last name, then by phone.
- On **Treasurer → Member Dues**, a member who “should” be up to date but shows little giving may have a twin record.
- Zelle or bank suggestions repeatedly pointing to an unexpected member can mean the sender is linked to the wrong twin.

## How to fix it

:::danger Do not simply deactivate the duplicate
Deactivating hides the record but leaves its payments and pledges attached to it, so they disappear from the person’s real record.
:::

Merging is a **technical administrator** task. The application has no merge button. It is done with a prepared script, `merge-duplicate-member.js`, which:

- moves **all** of the duplicate’s payments, pledges and learned Zelle/bank sender links onto the correct record;
- then removes the duplicate;
- refuses to run if the duplicate has dependents, heads another household, has a member loan, or is recorded as the collector of a payment, because those need a person to decide.

**What the Secretary or Treasurer does:**

:::steps
1. Identify both records: names, member IDs (shown in the member search and in brackets in Add Payment’s member list), and phone numbers.
2. Decide which record is correct. Usually it’s the one with the right phone and the family attached.
3. Send the two IDs to the technical administrator with a short explanation.
4. After the merge, open the correct member on **Member Dues** and check for **doubled payments or pledges**. Report any you find.
:::

The technical steps are in [Data corrections](#/technical/data-corrections).

## Other incorrect records

| Problem | Who fixes it | How |
|---|---|---|
| Wrong name, address, email | Secretary/Admin | **Edit Member** |
| Wrong phone (person can’t sign in) | Secretary/Admin | **Edit Member → Contact Info**. Tell the person to sign in with the corrected number. |
| Wrong Date Joined Parish or Yearly Pledge | Secretary/Admin | **Edit Member**. Dues recalculate automatically. |
| Payment recorded under the wrong person | Treasurer + technical administrator | See [Correcting a payment](#/donations/correcting-a-payment) |
