---
title: Signing in and registering
order: 2
audience: Everyone
summary: How to sign in with a phone number and text-message code, how newcomers join the parish in three short screens, and what to do when signing in fails.
updated: 2026-11-15
related: getting-started/finding-your-way, help/faq, members/managing-members
---

The application has **no passwords**. You sign in with your **mobile phone number**, and the site texts you a one-time code. The code proves you hold that phone.

:::note Why phone numbers?
Each member record is tied to a phone number. When you sign in, the application finds your member record by that number. If you sign in with a different phone than the one on your record, the application will not recognize you as that member.
:::

## Opening the application

The application runs in any modern web browser on a computer, tablet or phone. Its address is **[https://abunearegawi.church](https://abunearegawi.church)**. Bookmark it.

On a phone you can also **install** it like an app. Open the site, then use the browser’s *Add to Home Screen* option, or the install offer in the **More** menu at the bottom of the screen.

## How to sign in

Members and newcomers start in the same place. If your phone number is already on a member record you arrive on your Dashboard; if it is not, the site takes you to **Join the parish** (next section).

:::steps
1. Open the application and click **Sign in or join** in the top bar. On a phone, tap **More** at the bottom, or the menu button (☰) at the top. On the home page, newcomers can also tap **Become a member**.
2. Type your **ten-digit phone number**. You don’t need dashes; the site formats it for you.
3. Complete the **“I’m not a robot” check** (reCAPTCHA) when it appears.
4. Click **Text me a code**. A text message with a six-digit code arrives within a minute.
5. Type the code under **Sign-in code** and click **Continue**. Many phones offer to fill the code in for you from the message.
6. You arrive on your **Dashboard**. Your name appears at the top right.
:::

:::screenshot images/getting-started/sign-in.png | The sign-in page: type the phone number, then Text me a code
1 @ 50,51 Phone number: ten digits; the site formats it
2 @ 50,65 Text me a code texts a one-time code to the phone
:::

On the code screen:

- **Send again** becomes available 30 seconds after the code was sent. It takes you back one step with your number still filled in; complete the robot check again and click **Text me a code**.
- **Use a different number** goes back and clears the number.
- “That code didn’t match” means a digit was mistyped. The code can be typed or pasted with or without spaces.

:::success Signed in correctly
Your first name shows in the top bar, and the Dashboard lists **Your church** links: Profile, Dues, Give, and so on. Staff also see a **Church administration** list with links such as **Treasurer** or **Admin Panel**.
:::

## First sign-in: joining the parish

If your phone number is not yet on a member record, **Join the parish** opens as soon as you have signed in. It has three short screens and takes about a minute.

| Step | What it asks |
|---|---|
| **Your name** | First name and last name. Baptismal name is optional. |
| **Your household** | Whether you are **registering your household**, or **joining a household already registered** (found by the head of household’s phone number). Someone registering a household can tick **I’ll add my spouse and children now**. |
| **Your address** | Street address, city, state and ZIP code. Apartment and email are optional. Addresses must be in the United States. |
| **Children and family** | Only if you ticked the box on the household screen: spouse, children or other family members. |

Click **Join** on the last screen. A **Welcome** page shows the next service and three things you can do next: add your family, finish your profile, and add the app to your phone’s home screen. None of them is required.

:::note What is asked later
Joining no longer asks for gender, marital status, an emergency contact or a yearly pledge. A **Finish your profile** card on the Dashboard lists whichever of the first three is still missing and opens the **Profile** page in edit mode with the first missing item selected; all of them can be filled in there. The card goes away when the profile is complete, or when the member chooses **Not now**.
:::

Answers are kept on that device until you click **Join**, so refreshing the page or taking a phone call does not lose them. **Not now** on the first screen leaves without registering; you can come back by signing in again.

:::warning Joining an existing household
If you choose **I’m joining a household already registered**, the form asks for the **head of household’s phone number** and checks that it exists. If you see “We could not find a registered household with that number”, the head of household is probably registered with a different number. Ask the secretary to look it up before you register a second household by mistake.
:::

:::tip A treasurer or secretary can register someone instead
Staff can add a member from **Admin Panel → Manage Members → Add Member**. That person then signs in with the phone number staff entered. See [Managing members](#/members/managing-members).
:::

## Getting help

Use **Help** in the top menu, or in **More** on a phone, to open this guide. It is next to **Sign in or join** / **Sign Out** and works whether or not you are signed in.

## Signing out

Click your name or **Sign Out** in the top bar. On a phone, open **More** at the bottom and choose **Sign Out**. On a shared computer, always sign out when you finish.

## When signing in does not work

| What you see | Likely cause | What to do |
|---|---|---|
| No text message arrives | Wrong number typed, phone has no signal, or carrier filtering | Check the number shown on the code screen (its last four digits), wait 30 seconds, then use **Send again**. Do not request codes repeatedly; Firebase may block the number for a while. |
| “The security check could not load” or the robot check never appears | Browser extensions, privacy settings or an outdated browser | Try another browser, or a private window. Turn off ad blockers for the site. |
| You sign in and **Join the parish** opens, but you are already a member | No member record has this phone number | If you are already a member, the secretary should check which phone number is on your record. Don’t register again; that creates a duplicate. |
| You sign in but can’t see the **Treasurer** or **Admin Panel** link | Your role does not include it | Ask an administrator to check your role. See [Roles and permissions](#/getting-started/roles-and-permissions). |

More detail: [FAQ — Access and sign-in](#/help/faq?h=access-and-sign-in).

:::note There is no email-and-password login
The application signs people in by phone only. An email address on a member record is used for receipts and statements, never for signing in.
:::
