---
title: How payments credit pledges
order: 3
audience: Treasurer, finance team
summary: The rules that connect a Pledge Drive payment to a pledge, from every payment screen, and what to do when the pledge part fails.
updated: 2026-11-11
related: pledges/managing-pledges, donations/zelle, donations/benevity, technical/data-corrections
---

A pledge is a promise; a payment is money. They are linked by an **allocation**: the part of a payment credited to a pledge. The drive’s **Received** figure is the sum of allocations.

## The rule

When a payment’s type is **Pledge Drive** (“Pledge Drive / Fundraising (ወፈያ)”):

| Situation | What happens |
|---|---|
| The member has an **open pledge** in the live drive | The payment is credited to it. The form shows “Creating credits {amount} to this pledge.” |
| The member has **no open pledge** | The form shows “No open pledge in this drive”. Tick **Also record this as a pledge** to open a pledge credited with this payment. A pledge larger than the payment stays open for the balance: “Paying {paid} now — leaves {remaining} outstanding.” |
| Not ticked | The payment is recorded as Pledge Drive income but is not credited to any pledge |

This works the same on **Add Payment**, **Zelle Review**, **Square Review**, **Bank Reconciliation** and the **Benevity import**.

## Members paying online

When a member gives online on **Give** and ticks **Apply to my pledge**, the payment is credited to their open pledge automatically once Stripe confirms it.

## “Payment recorded, pledge was not”

The payment is always saved first. If the pledge part fails, for example because the drive closed, you see a red notice **“Payment recorded, pledge was not”** with the reason.

**What to do:** the money is safely recorded. Fix the reason, then ask the technical administrator to credit the payment to the pledge. See `move-pledge-credit.js` in [Data corrections](#/technical/data-corrections). Do **not** record the payment again.

## Employer matches never count toward a pledge

A company match through Benevity is the employer’s gift. It is never pledge credit, even on a Pledge Drive row. The dashboard shows it on its own **Employer matches** line. See [Benevity](#/donations/benevity).

## Fixing a payment credited to the wrong pledge

There is no button for this. The technical administrator moves the credit with a script, keeping the payment itself unchanged. See [Data corrections](#/technical/data-corrections).
