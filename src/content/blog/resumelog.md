---
title: "Building ResumeLog: a job-search tracker, end to end"
date: 2026-11-11
excerpt: A Chrome extension, a NestJS API, a résumé editor, an ATS checker and plan-based billing. What I built for ResumeLog, and the design decisions behind it.
cover: cover-resumelog.png
tags: [NestJS, PostgreSQL, React, Chrome extension, SaaS]
---

Job hunting creates a surprising amount of data. Postings you saved, companies you're watching, people you've contacted, a slightly different CV for every application, follow-ups you meant to send. Most of it ends up scattered across browser tabs, spreadsheets and folders full of `CV_final_v3.docx`.

**ResumeLog** is my answer to that. It's a job-search tracker that saves job postings straight from your browser and helps you tailor your résumé to each one. I designed and built it end to end, and in this post I want to walk through what it does and how it's put together.

## What it does

- **One-click capture.** A Chrome extension saves job postings, companies and people from LinkedIn and Indeed. It keeps them locally first and syncs them to your account.
- **A dashboard for every application.** Track each application, attach a tailored CV to each job, and record follow-ups and outcomes.
- **A built-in résumé editor** that publishes Word documents as PDFs.
- **An ATS checker** that scores a résumé against a job description, finds missing keywords and suggests fixes.
- **Subscriptions:** Free, Pro and Enterprise plans, billed through Paddle.

## The browser extension

The extension is built with **Plasmo, React and TypeScript**. Each job board gets its **own scraper**: LinkedIn and Indeed structure their pages very differently, and keeping the scrapers separate means a change on one site doesn't break the other.

Saving is **local-first**: a posting is stored in the extension immediately, then synced to the account. Capturing a job should never wait on the network.

The extension also needs to know who you are. Rather than a separate login, it uses **secure pairing with the dashboard** to share the login, so you sign in once.

## The backend

The API is a **NestJS** REST service using **TypeORM** and **PostgreSQL**. It handles:

- **Google sign-in** with JWTs.
- **File storage** on Google Cloud Storage for résumés and documents.
- **Word-to-PDF conversion** using headless **LibreOffice**, which keeps the output faithful to the original document.

## Plan-based features without code changes

The part of ResumeLog I'm most pleased with is how it handles plans.

Subscription products tend to accumulate `if (plan === 'pro')` checks all over the codebase. Every new plan or limit then means touching code in several places.

In ResumeLog, plans live in the database instead. **Every feature has an on/off switch and a usage limit for each plan**, such as a daily quota of ATS scans. **Postgres triggers** keep these settings complete, so a plan can't end up with a missing feature row. The API enforces the limits, and the UI reads the same settings to show what's available.

The result: **adding a new plan needs no code changes**. It's a data change.

## The dashboard and the website

The dashboard is built with **React 19, Vite, Tailwind and shadcn/ui**. Alongside it there's a marketing website: a React single-page site with product and pricing pages.

## Deployment without stored keys

Deploys run through **GitHub Actions** to **Firebase Hosting**, authenticated with **Workload Identity Federation**. That means **no service-account keys are stored anywhere**: GitHub proves its identity to Google Cloud for each run instead of holding a long-lived secret that could leak.

## What I took away

Building every layer myself, from the extension and API to the database rules, billing and CI, made the connections between them very visible. The decisions I'd repeat are the ones that move complexity into the right place: local-first capture in the extension, plan rules in the database, and short-lived credentials in the pipeline.

ResumeLog is in active development, and I'll share more as it grows.
