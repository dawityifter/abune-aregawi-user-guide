---
title: Pledge drives (fundraising campaigns)
order: 1
audience: Admin (create and change); finance and leadership (view)
summary: Creating, activating, closing and reactivating a pledge drive, and what members see.
updated: 2026-11-11
related: pledges/managing-pledges, pledges/pledge-dashboard, pledges/payments-and-pledges
---

A **pledge drive** (the application also calls it a **campaign**) is a fundraising period with a name, dates and an optional goal, for example “2026 Pledge Drive”. While a drive is **live**, members can pledge online and the treasurer’s Pledges tab shows its pledges.

## Where to find it

**Admin Panel → Fundraising** shows **Fundraising Campaigns**.

:::admin Permission
Everyone in finance, leadership and the secretary can **see** drives and their totals. Only **Admin** can create, edit, activate or close one.
:::

## A drive’s life

| Status | Meaning | Visible to members? |
|---|---|---|
| **Draft** | Being set up | No |
| **Active** | Switched on. It is **live** only while today is between its start and end dates | Yes, while live |
| **Closed** | Finished; kept as history with its totals | No |

Only **one** drive can be active for any given dates. The application refuses an overlap (“… is already active for these dates”).

## Creating a drive

:::steps
1. **Admin Panel → Fundraising → New Campaign**.
2. Fill in **Name** and **Name (Tigrigna)**, **Description** and **Description (Tigrigna)**, **Start date**, **End date** and **Goal amount**.
3. Click **Save**. The drive is created as a draft.
4. When ready, click **Activate**. From its start date, members see it on the **Make a Pledge** page.
:::

:::warning Fill in the Tigrigna fields
The pledge page shows the drive’s name and description from these fields. If the Tigrigna ones are blank, Tigrigna readers see English. No translation can fix this; it is data entry.
:::

:::screenshot images/pledges/fundraising-campaigns.png | Fundraising Campaigns: each drive with Pledged, Collected, Outstanding and Donors
1 @ 85,29 New Campaign
2 @ 62,41 Drive totals and goal progress
3 @ 85,57 View donors, Edit, Activate / Close campaign
:::

## Each drive’s card

Shows **Pledged**, **Collected**, **Outstanding** (or “over by {amount}”), number of **Donors**, and “of goal collected”. **View donors** lists every pledge with filters for status and payment. A pledge marked **legacy record** dates from before payment-level tracking: its figure comes from the pledge’s saved status, not from matched payments.

## Closing and reactivating

- **Close campaign**: stops new pledges and hides the drive from the website. Payments toward existing pledges can still be recorded. An admin can reactivate it while its dates still cover today.
- **Reactivate**: makes the drive live again. If its end date has passed, **Edit** it to extend the end date first, or create a new campaign to keep the totals separate.
- Closing a **draft** that was never shown to members simply files it away.

:::tip One drive per year keeps reports clean
Create a new campaign for each year rather than extending last year’s. The Pledge Dashboard compares each drive with the previous one.
:::
