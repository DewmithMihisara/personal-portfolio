---
title: 'womm: putting "works on my machine" bugs on trial'
date: 2026-11-08
excerpt: Why "it works on my machine" is so hard to debug, why I built a CLI that compares two setups and gives every difference a verdict, and what building it taught me.
cover: cover-womm.png
tags: [TypeScript, CLI, Developer tools, Open source]
---

Every developer has said it, and every developer has heard it: *"It works on my machine."*

**Code:** [github.com/DewmithMihisara/womm](https://github.com/DewmithMihisara/womm)

## The problem

The code is the same. The repository is the same. Yet it runs on your teammate's laptop and fails on yours.

What follows is always the same conversation. *Which Node version are you on? Did you install that globally? Is your `.env` the same as mine? Are you on a Mac?* Two people compare notes in a chat window, one setting at a time, until someone finally spots the difference.

The frustrating part is that the cause is usually something boring and **already known**:

- The project's `.nvmrc` asks for Node 22, and you're on Node 16.
- You upgraded to Python 3.12, which removed `distutils`.
- Since Node 17, `localhost` can resolve to IPv6 first and miss a server that only listens on IPv4.
- macOS ships BSD `sed`, so a script written for GNU `sed -i` behaves differently.
- Git on one machine converts line endings, and a shell script breaks.

None of these are mysteries. They're documented in changelogs and release notes. The problem is that nobody remembers all of them, and nobody has a quick way to check two machines against them.

## Why I built this solution

I wanted the comparison itself to be a tool, not a conversation. That gave me three requirements.

### 1. Compare the machines, not just list them

A plain list of installed versions doesn't help much. You need *two* setups side by side: the one where it works and the one where it fails. So womm starts with a **snapshot** of the working machine:

```bash
womm snapshot -o works.womm.json
```

You send that file to your teammate, and they run a **trial** against it from the project folder:

```bash
womm trial --against works.womm.json
```

### 2. A diff is not a diagnosis

My first instinct was to show every difference. That's useless in practice: two machines differ in dozens of patch versions, and almost none of them matter. What you actually want to know is **which differences are likely to be the cause**.

That's where the courtroom idea came from. Every difference gets a verdict:

| Verdict | Meaning |
| --- | --- |
| **Guilty** | Breaks a requirement your project states, or matches a known issue with a package your project uses |
| **Suspicious** | A meaningful difference or a known issue that may affect you, such as a major version gap or a missing environment variable |
| **Acquitted** | Differs, but is unlikely to matter |

And every verdict shows its evidence and a suggested fix:

```text
THE PEOPLE v. YOUR MACHINE

GUILTY     node 16.20.0
           .nvmrc requires node 22.11.0
           Fix: Install a node version matching 22.11.0.

SUSPICIOUS Python 3.12 removed distutils
           Code or packages importing distutils fail on Python 3.12.
           Fix: Install setuptools, or update the package that imports distutils.

ACQUITTED  Git 2.47.0
           Theirs: 2.52.0

1 guilty, 1 suspicious, 1 acquitted.
The court recommends dealing with the guilty parties first.
```

### 3. Turn known issues into data

The "boring, already known" causes needed somewhere to live. In womm they're **rules**: small YAML files, one known cause each, with the reason, the fix and a link to the source. This is the real one for the Node DNS change:

```yaml
id: node-17-dns-order
title: localhost may resolve to IPv6 first
why: Since Node.js 17, DNS results keep the system's order, so localhost can
  resolve to ::1 and miss a server listening only on IPv4.
fix: Connect to 127.0.0.1 explicitly, or call dns.setDefaultResultOrder('ipv4first').
source: https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder
when:
  - finding: node
    range: ">=17"
```

There are **94 rules** so far, covering Python, Java, Node, Go, GCC, Ruby, PHP, Git, Docker, Gradle and more. Teams can add their own with `--rules`, and adding one rule is the easiest way to contribute.

The same check runs in CI too: commit a snapshot from a working machine, and the pipeline compares itself against it and writes the report into the job summary.

## What I learned

### Say what you can't prove

womm compares setups. It never runs your code, so it can't *prove* which difference caused a failure. I could have hidden that and made the output sound confident. Instead, the docs have a section called *"What this can't tell you"*, and an empty report says nothing *known* was found, not that the machines are identical.

A tool that's honest about its limits gets trusted. One that overclaims gets ignored after the first wrong answer.

### A file meant to be shared is a privacy decision

Snapshots exist to be sent to other people, so every field had to justify itself. womm records as little as it can: OS, tool versions, a few Git and filesystem settings. It records whether a proxy is set, but never its address. It records whether variables like `NODE_OPTIONS` are set, but never their values. Hostnames are dropped, and usernames and home paths become `<user>` and `<home>`. From `.env` files it keeps only key names, never values. It also makes no network requests.

Deciding what *not* to collect turned out to be as much work as deciding what to collect.

### Treat everything from someone else as untrusted

A snapshot comes from another machine. A rule might come from another team. A project file comes from a repository. None of these can be trusted, so snapshots are size-limited and validated, rules are pure data checked against a strict schema, project files are parsed but never executed, and every report format escapes what it prints. On Windows, commands don't run from the current folder, so a repository can't swap in its own version of a tool.

### Knowledge as data scales better than knowledge as code

Because rules are YAML with a source link, adding knowledge doesn't need a code change or deep knowledge of the codebase. That makes womm easier to grow, and much easier for someone else to contribute to.

### Humour helps, if the content is serious

The courtroom framing is a joke, and so is `womm certify`, which issues a certificate when your machine meets the project's requirements. But the joke works because it maps to something real: guilty, suspicious, acquitted is genuinely a clearer way to rank causes than a list of diffs.

## Try it

womm is MIT-licensed and isn't on npm yet. To run it from source:

```bash
npm ci
npm run build
node dist/cli.js --help
```

The next time someone tells you it works on their machine, ask them for a snapshot.
