---
title: "bin2: files that never die"
date: 2026-11-07
excerpt: Files stop opening when the software that made them disappears. Why I chose the web browser as the answer, how bin2 seals a file with its own viewer, and what I learned building it in Rust.
cover: cover-bin2.png
tags: [Rust, Digital preservation, File formats]
---

Every year, millions of files stop opening.

**Code:** [github.com/DewmithMihisara/bin2](https://github.com/DewmithMihisara/bin2)

## The problem

Files rarely die because they're deleted. They die because the world around them moves on.

The app that made them is gone. The format is forgotten. The new computer simply can't read them. Old documents, photos from a phone that no longer exists, a project file from fifteen years ago: the bytes are all still there, but nothing knows what to do with them.

The root cause is that **a file depends on something outside itself**. To open it, you need the right app, on the right system, in the right version. Backups don't fix this. A perfect backup of a file nothing can open is still a file nothing can open.

## Why I built this solution

If the problem is that a file depends on an outside app, the fix is to **put the app inside the file**. That's the whole idea of bin2: seal any file together with its own viewer, so it carries everything it needs to open.

The hard question was: *a viewer that runs on what?* Whatever I chose would need to still exist in twenty or thirty years.

### The browser is the most durable runtime we have

Native apps break with every OS generation. Plugins come and go. But a web page from 1995 still opens today, on every device, in every browser.

So **every `.bin2` file is a single, self-contained HTML page**. Inside it:

1. **The original bytes**, byte for byte, compressed when that helps, with a "Download original" button.
2. **A live viewer**, written in JavaScript and embedded inline, so it works offline straight from disk.
3. **A static fallback** that works even with scripts turned off: the image itself, the text itself, or recovery instructions.
4. **A manifest** with the original name, size, type, a SHA-256 fingerprint, the sealing date and the tool version.

If bin2 is installed, a `.bin2` opens in bin2. If it isn't, or bin2 one day stops existing, any web browser still opens it.

### And a last resort below that

The very first lines of every `.bin2` file are **plain text**. Open one in Notepad and it explains what it is and how to recover the original by hand. Even with no software at all, you're never locked out.

### Installed like a normal app

People don't want to run commands to protect a photo, so on Windows bin2 installs like a familiar archive tool: a **"Seal with bin2"** item in the right-click menu, and `.bin2` files that open with a double-click. It installs for the current user only, needs no admin rights, and `bin2 uninstall` removes exactly what it added.

The core is written in **Rust**: one crate for type detection, sealing, unsealing and the manifest, and one for the command-line tool and the Windows integration.

## What I learned

### Pick the platform that will outlive you

The biggest decision in bin2 wasn't technical cleverness. It was choosing something boring and universal. HTML isn't the most efficient container, but it's the one most likely to still open in 2050. For preservation, durability beats elegance.

### Always have a layer below the last layer

Every layer of bin2 assumes the one above it might fail. No bin2 app? Use the browser. JavaScript disabled? Show the static fallback. Browser won't render it? Read the plain-text notice. Designing for "what if this part is gone?" at every level is what makes "files that never die" a real promise rather than a slogan.

### Integrity has to be checked, not assumed

Silent damage is how archives rot. Every `.bin2` carries a fingerprint of the original and checks itself each time it opens, so you find out about damage while you can still do something about it.

### Small details decide whether people use it

Some lessons came from the operating system, not the format:

- Registering the file type with an HTML content type makes browsers render a `.bin2` as a page instead of showing raw text.
- On Windows 11, classic right-click items sit under "Show more options". Getting into the top-level menu needs a packaged app, which is now on the roadmap.
- A helper that never shows a console window, stays silent on success and shows a message box on errors makes the whole thing feel native.

### Write down the risks honestly

The architecture doc has a section called *"Realistic risks"*:

- Encoding adds about a third to the file size, and future decoders will add more.
- Browsers struggle with files above 1–2 GB, so bin2 targets documents, photos and saves, not movies.
- Embedded decoders bring licensing duties.
- Browsers could restrict local HTML one day.

Writing these down early shaped real decisions, like preferring permissively licensed decoders and keeping the plain-text recovery notice as insurance against browser changes.

## Where it stands

bin2 is in **early development**.

**Working now:** sealing and recovering any file, with viewers for common images, PDF, audio, video, text and Markdown, plus the Windows right-click menu and double-click opening.

**Next:** a full desktop app, and decoders for HEIC photos, camera RAW, Photoshop and Word documents.

**Later:** viewers for long-dead document formats, and emulation for old programs and games. That's where bin2 really earns its name: making *"a file from 2003 opens in 2050"* true.

## The name

bin2 reads as *"bin to"*: turning a file into something that lasts.
