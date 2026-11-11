---
title: I built an email tracker because I was tired of being ghosted
date: 2026-10-28
excerpt: How "read receipts" really work, what a 1×1 pixel reveals, and why I rewrote my spy tool into an honest one.
cover: cover-dotspy.png
tags: [Node.js, Privacy, Side project]
---

Here's what I actually learned.

You know the feeling. You send an important email, and then… silence. Did they read it and ignore me? Did it land in spam? Or did they just miss it? I hated not knowing. So I decided to find out how "read receipts" actually work under the hood, and I built a little experiment I called **DotSpy**.

## The trick: a 1×1 invisible pixel

The trick is older than you'd think: a 1×1 invisible pixel. You drop a tiny transparent image into the email. When someone opens it, their mail app quietly downloads that image from my server, and that request tells me the email was opened. No magic, just how the web works.

## Version one was a spy tool

My first version was honestly a bit of a spy tool. It logged everything the open revealed: rough location, device, operating system, which email app they used.

That's when I hit my first real surprise. It depends entirely on the recipient's email client. Gmail hides everything behind Google's own servers, so you learn almost nothing. Older desktop apps like Thunderbird or Outlook expose a lot more. Same pixel, completely different results.

## Learned the hard way

Along the way I collected a pile of "learned it the hard way" moments:

- **Serverless functions don't share memory**, so two of my files couldn't see each other's data until I merged them.
- **HTML-only emails go straight to spam.** You need a plain-text version too.
- **The same technique I built is exactly what Mailchimp, HubSpot and every marketing platform already uses on you**, every day.

## The uncomfortable part

And here's the uncomfortable part I want to be honest about: building the "attack mode" version made it very clear how the same technique can be abused for silent tracking, or for spam. Understanding that wasn't a bonus. It was the whole point. You can't build defenses for something you don't understand.

## So I rewrote it

I threw away all the surveillance data and turned it into a simple, honest business tool. It only answers "was this email opened, yes or no?" No IP, no snooping. Just the one thing I actually needed. That's the real jump: from a proof-of-concept to something you'd actually deploy.

**Built with:** Node.js · Vercel (serverless) · PostgreSQL + Supabase · Nodemailer · Chart.js. No framework, just fundamentals.

## The lesson that stuck

The gap between a spy tool and a useful product isn't the technology. It's the intent, the transparency, and what you choose not to collect.

This is the first of many experiments I want to share publicly.

Code's here: [github.com/DewmithMihisara/dot-spy](https://github.com/DewmithMihisara/dot-spy)

Every time you see a "✓ Seen", now you know exactly how it works.
