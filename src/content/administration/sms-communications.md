---
title: Sending SMS (text messages)
order: 3
audience: Admin, Church Leadership, Secretary
summary: Texting an individual, a department, pledge donors or all members, personalized messages, and cost.
updated: 2026-11-11
related: administration/departments, pledges/managing-pledges, continuity/integrations
---

**Dashboard → Communications** opens **SMS Communications**. Messages are sent through **Twilio**, a paid text-message service. Each message costs money.

:::admin
Sending is allowed for **Admin**, **Church Leadership** and **Secretary**. AR Team also sees the link, but the server refuses its messages.
:::

## Sending a message

:::steps
1. Under **Select Recipient Type**, choose **Individual**, **Department**, **Pending Pledges**, **Fulfilled Pledges** or **All Members**.
2. Choose the member or department, if asked. For pledges, the live drive is targeted automatically (“Targeting {campaign}”). Use **Show member list** to check who will receive it.
3. Type the **Message**. Use template variables to personalize it: `{firstName}`, `{lastName}`, `{fullName}`, `{amount}` (pledge amount), `{totalAmount}`, `{pledgeCount}`, `{dueDate}`. The exact variable names are listed on screen under **Available Template Variables**.
4. Watch the counter: characters remaining, **segments**, and **Est. Cost**.
5. Send. A summary reports “Success: {n} / {total}”.
:::

:::screenshot images/administration/sms.png | SMS Communications: recipient type, message and cost estimate
1 @ 41,17 Select Recipient Type
2 @ 50,25 Choose the department (or member)
3 @ 30,38 Available template variables
4 @ 50,51 The message
5 @ 76,62 Characters, segments, recipients and estimated cost
6 @ 78,79 Send SMS
:::

## Cost and length

- One SMS **segment** holds about 160 English characters. Tigrigna and other non-English text uses **Unicode Encoding**, with only about 70 characters per segment, so it costs more.
- **Est. Cost** = recipients × segments × the per-message price. Sending to **All Members** can cost noticeably. Check the estimate first.

:::warning Before sending to many people
- Send a test to yourself (**Individual**) first.
- Re-read names and amounts. A mistake goes to everyone and can’t be recalled.
- Pledge reminders reveal amounts. Make sure the list is right (**Show member list**).
:::

:::note If messages stop sending
Usual causes: the Twilio account balance ran out, the Twilio phone number lapsed, or the account credentials changed. The technical administrator checks the Twilio console. See [Integrations](#/continuity/integrations).
:::
