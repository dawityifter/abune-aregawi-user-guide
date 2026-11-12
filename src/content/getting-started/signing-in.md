---
title: Signing in and registering
order: 2
audience: Everyone
summary: How to sign in with a phone number and text-message code, how new members register, and what to do when signing in fails.
updated: 2026-11-11
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

:::steps
1. Open the application and click **Sign In** in the top bar. On a phone, tap the menu button (☰) first if you don’t see it.
2. Type your **ten-digit phone number**. You don’t need dashes; the site formats it for you.
3. Complete the **“I’m not a robot” check** (reCAPTCHA) if one appears.
4. Click **Send code**. A text message with a six-digit code arrives within a minute.
5. Type the code in **Enter OTP** and confirm. “OTP” means one-time password.
6. You arrive on your **Dashboard**. Your name appears at the top right.
:::

:::screenshot images/getting-started/sign-in.png | The Sign In page: type the phone number, then Send code
1 @ 50,51 Phone number: ten digits; the site formats it
2 @ 50,65 Send code texts a one-time code to the phone
:::

:::success Signed in correctly
Your first name shows in the top bar, and the Dashboard lists **Your church** links: Profile, Dues, Give, and so on. Staff also see a **Church administration** list with links such as **Treasurer** or **Admin Panel**.
:::

## First sign-in: registering as a member

If your phone number is not yet on a member record, a **Complete your registration** window opens after you sign in. You can register, or **Cancel** and browse as a guest.

Registration has these steps:

| Step | What it asks |
|---|---|
| **Personal Information** | Name, gender, date of birth, marital status |
| **Contact & Address** | Email (optional), address |
| **Family Information** | Whether you are the **head of household**, or which household you belong to (found by the head of household’s phone number) |
| **Spiritual Information** | Baptism name, repentance father, interest in serving |
| **Contribution & Giving** | Your yearly pledge for membership dues |
| **Account Information** | Confirms the phone number used for sign-in |
| **Dependents** | Children or other dependents in the household (optional) |

:::warning Joining an existing household
If you are not the head of household, the form asks for the **head of household’s phone number** and checks that it exists. Type it exactly as it is on their record. If the check fails, the head of household is probably registered with a different number. Ask the secretary to look it up before you register a second household by mistake.
:::

:::tip A treasurer or secretary can register someone instead
Staff can add a member from **Admin Panel → Manage Members → Add Member**. That person then signs in with the phone number staff entered. See [Managing members](#/members/managing-members).
:::

## Signing out

Click your name or **Sign Out** in the top bar. On a phone, open **More** at the bottom and choose **Sign Out**. On a shared computer, always sign out when you finish.

## When signing in does not work

| What you see | Likely cause | What to do |
|---|---|---|
| No text message arrives | Wrong number typed, phone has no signal, or carrier filtering | Check the number and try again after a minute. Do not request codes repeatedly; Firebase may block the number for a while. |
| “reCAPTCHA initialization failed” or the robot check never appears | Browser extensions, privacy settings or an outdated browser | Try another browser, or a private window. Turn off ad blockers for the site. |
| You sign in but the Dashboard asks you to complete registration | No member record has this phone number | If you are already a member, the secretary should check which phone number is on your record. Don’t register again; that creates a duplicate. |
| You sign in but can’t see the **Treasurer** or **Admin Panel** link | Your role does not include it | Ask an administrator to check your role. See [Roles and permissions](#/getting-started/roles-and-permissions). |

More detail: [FAQ — Access and sign-in](#/help/faq?h=access-and-sign-in).

:::note There is no email-and-password login
The application signs people in by phone only. An email address on a member record is used for receipts and statements, never for signing in.
:::
