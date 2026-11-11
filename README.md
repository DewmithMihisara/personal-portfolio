# Dewmith Mihisara

Software Engineer · Colombo, Sri Lanka

This is the source for my personal portfolio and blog at [dewmithmihisara.vercel.app](https://dewmithmihisara.vercel.app/).

## About Me

I'm an enthusiastic and detail-oriented software engineer who builds reliable backends, full-stack products and scalable cloud solutions. I bridge robust backend engineering with collaborative product delivery: designing performant APIs, optimizing service reliability, and deploying solutions that scale confidently in the cloud.

I'm passionate about writing clean, efficient code and thrive in agile, collaborative environments where technical delivery is closely aligned with business outcomes.

## What I Do

- **Backend Engineering**: Designing resilient services and APIs with event-driven patterns that scale gracefully.
- **Solution Architecture**: Translating complex domain logic into modular, cloud-ready architectures that remain easy to evolve.
- **Cloud & Automation**: Automating CI/CD workflows and infrastructure to deliver features faster without sacrificing reliability.
- **Team Collaboration**: Mentoring teams, facilitating agile rituals, and aligning technical delivery with business outcomes.

## Featured Work

- **ResumeLog**: A job-search tracker. A Chrome extension saves job postings from LinkedIn and Indeed in one click, a dashboard tracks every application with a tailored CV, and an ATS checker scores résumés against job descriptions. Built end to end with NestJS, PostgreSQL, React and Plasmo.
- **[womm](https://github.com/DewmithMihisara/womm)**: A courtroom for "works on my machine" bugs. It compares two machine setups, checks the project's requirements against 94 known-issue rules, and gives each difference a verdict: guilty, suspicious or acquitted.
- **[bin2](https://github.com/DewmithMihisara/bin2)**: Files that never die. It seals any file together with its own viewer as a self-contained HTML page, so the file opens anywhere, offline, even without bin2 installed.
- **[DotSpy](https://github.com/DewmithMihisara/dot-spy)**: An email open tracker built on the classic 1×1 pixel, rewritten from a proof-of-concept "spy" tool into an honest one that only answers "was this email opened?"
- **Marketplace**: A multi-vendor marketplace platform enabling seamless product discovery, secure payments, and automated vendor onboarding.
- **ProveIt**: A digital evidence management system with secure file ingestion, validation workflows, and real-time audit trails.
- **Swarnavahini Election 2025**: A high-traffic election coverage experience with live results, analytics dashboards, and resilient cloud infrastructure.
- **PetMedi.lk**: A telehealth platform connecting pet owners with vets, featuring appointment scheduling, video consults, and prescriptions.
- **Pilisaru**: A waste management system for collection, processing and recycling operations, built by Team Zyko. Winner of the **Best Teamwork Trophy at Innovesta 2023** (IJSE).

## Writing

- [Building ResumeLog: a job-search tracker, end to end](https://dewmithmihisara.vercel.app/blog/resumelog)
- [womm: putting "works on my machine" bugs on trial](https://dewmithmihisara.vercel.app/blog/womm)
- [bin2: files that never die](https://dewmithmihisara.vercel.app/blog/bin2)
- [I built an email tracker because I was tired of being ghosted](https://dewmithmihisara.vercel.app/blog/dotspy-email-tracker)

## Education

- **Wrexham University**: BSc, Computer Software Engineering (2025 – 2026)
- **IJSE (Institute of Software Engineering)**: Higher National Diploma, Computer Software Engineering (2022 – 2025)
- **St. Aloysius' College**: GCE Ordinary Level

## Let's Connect

- Email: [mihisaralokuhewage@gmail.com](mailto:mihisaralokuhewage@gmail.com)
- LinkedIn: [linkedin.com/in/dewmith-mihisara](https://www.linkedin.com/in/dewmith-mihisara/)
- GitHub: [github.com/DewmithMihisara](https://github.com/DewmithMihisara)
- Website: [dewmithmihisara.vercel.app](https://dewmithmihisara.vercel.app/)

Whether it's architecting resilient backend systems, launching full-stack products, or scaling cloud services, I'm always excited to collaborate on the next challenge.

---

## About This Site

A multi-page React site with a white, ink-and-watercolor look: IBM Plex type, hairline borders, one indigo accent, and ink-and-watercolor illustrations in indigo and lavender washes.

| Page | Route |
| --- | --- |
| Home: intro, portrait, featured projects, latest posts | `/` |
| Projects, with category filters | `/projects` |
| About, education and testimonials | `/about` |
| Blog list and posts | `/blog`, `/blog/:slug` |
| Contact form | `/contact` |

### Tech stack

- **React 19**, **TypeScript** and **Vite**
- **Tailwind CSS v4**, with design tokens in [`src/index.css`](src/index.css)
- **React Router** for pages, **Framer Motion** for animation
- **react-markdown** and **remark-gfm** for blog posts
- **MediaPipe** hand-gesture navigation (optional, asks for camera access)
- **Vercel** for hosting, plus a serverless function ([`api/contact.ts`](api/contact.ts)) that sends contact-form messages with Nodemailer

### Run it locally

```bash
npm install
npm run dev        # front end at http://localhost:5173
npm run build      # type-check and production build into dist/
npm run preview    # serve the production build
```

To try the contact form locally, copy `.env.example` to `.env`, set `GMAIL_USER` and `GMAIL_APP_PASSWORD` (a Gmail app password), and run `npm run dev:api`. This uses the Vercel CLI.

### Project structure

```text
api/                  Serverless contact-form endpoint
public/
  illustrations/      Page and blog-cover artwork (.png plus lighter .webp)
  profile-ink.jpg     Portrait
  og-image.png        Social preview image
src/
  pages/              One component per route
  sections/           Page sections (hero, projects, about, testimonials…)
  components/         Layout, Navbar, Footer, Illustration, PageHeader…
  content/blog/       Blog posts as Markdown
  data/projects.ts    Project list
  seo/                Page titles and descriptions, head tags, useSeo hook
  lib/                Blog loader and frontmatter parser
```

### Writing a blog post

Add a Markdown file to [`src/content/blog/`](src/content/blog/). The file name becomes the URL (`my-post.md` becomes `/blog/my-post`).

```md
---
title: My post title
date: 2026-11-11
excerpt: One or two sentences shown in the blog list and in search results.
cover: cover-my-post.png
tags: [Tag one, Tag two]
---

Post body in Markdown…
```

Put the cover image in `public/illustrations/`, ideally with a `.webp` copy next to it. If there's no cover, the default one is used.

### Adding a project

Add an entry to [`src/data/projects.ts`](src/data/projects.ts). Optional fields add a date range (`period`), an award badge (`award`), a repository link (`link`) and a "Read the story" link to a blog post (`article`).

### SEO

- Every page and post gets its own title, description, canonical URL, Open Graph and Twitter tags, and JSON-LD structured data (Person, WebSite, BlogPosting, BreadcrumbList).
- At build time, a small Vite plugin in [`vite.config.ts`](vite.config.ts) writes a pre-filled HTML file for each route. Link-preview bots that don't run JavaScript still see the right title and image.
- The same plugin generates `sitemap.xml` and `robots.txt`.
- Page titles and descriptions are in [`src/seo/site.ts`](src/seo/site.ts). Blog posts use their frontmatter automatically.
