# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The actual app lives in `portfolio-app/` — the repo root only holds planning docs (`requirement.md`, `SETUP_GUIDE.md`, `EMAILJS_SETUP.md`) that describe an earlier version of the site and are **out of date** (see "Docs vs. reality" below). All commands below are run from `portfolio-app/`.

## Commands

```bash
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # tsc -b (typecheck) then vite build
npm run lint      # eslint .
npm run preview   # preview the production build
```

There is no test suite configured — don't invent test commands.

## Architecture

This is a single-page portfolio built as a **long scrolling Home page with anchor sections**, plus a couple of separate routed pages — not the multi-page structure (About/Experience/Skills/Contact) described in `requirement.md`/`SETUP_GUIDE.md`, which was superseded.

- `src/App.tsx` — routes: `/` → `Home`, `/projects` → `Projects`, `/projects/:slug` → `ProjectCaseStudy`, plus `/research`, `/album`, `/credentials` (all lazy-loaded except Home). Wrapped in `ThemeProvider`, `MotionConfig reducedMotion="user"` and `Router`, with a shared `Footer` and `ScrollManager`.
- `src/data/` — typed content (projects, work, research, credentials, album, site links). Pages render from these files; edit copy there rather than in JSX.
- The Navbar intentionally has only two links (Work → `/projects`, My Story → `/album`) plus Connect. Other pages are reached via `RelatedLinks` cards and the footer; do not add them back to the nav.
- `src/pages/Home.tsx` — the bulk of the site. A sequence of `<section id="...">` blocks rendered on one page: `hero`, `now`, `how-i-got-here`, `community` (renders `CommunityLeadership` from `pages/Community.tsx`), `life-album` (teaser), `contact`. Home deliberately avoids repeating CV content (titles, dates, bullet points); it shows stories and demos instead. Job history and hackathons live on the Work page (`/projects#work`, `/projects#hackathons`). The LAR simulator runs inline on `/projects/lar-framework` (via `caseStudy.liveSimulation`). Canva decks go in a project's `slides` array.
- `src/pages/Projects.tsx` — the Work page. Tabs driven by the URL hash (`#work`, `#ai`, `#backend`, `#frontend`, `#research`, `#hackathons`, `#open-source`); only the active tab renders. Unknown hashes (old `#impact`, story ids like `#follow-the-data`) fall back to Work. Job cards (`src/data/work.ts`) use the same concise card as every other tab: role, dates, a two-sentence summary, stack and link. No stories; the CV has the detail. Cards use `ShowcaseCard`, which shows a placeholder when no image is supplied; links marked `placeholder: true` render as "link coming soon".
- `src/pages/Community.tsx` — community/speaking content, embedded into Home's `community` section rather than routed directly.
- `src/components/Navbar.tsx` — fixed header, `mix-blend-difference` styling so it inverts over dark/light sections. Nav links are `/projects` (Work) and `/album` (My Story), plus the `/#contact` and `/#hero` anchors. `handleAnchorClick` smooth-scrolls if already on `/`, otherwise navigates first. When adding/renaming a section `id` in `Home.tsx`, update the corresponding anchor in `navItems` here too.
- `src/contexts/ThemeContext.tsx` — light/dark theme via a class (`light`/`dark`) on `<html>`, persisted to `localStorage`, defaulting to `prefers-color-scheme`. Tailwind's `darkMode: 'class'` (see `tailwind.config.js`) relies on this.
- `src/index.css` — Tailwind directives, Google Fonts import (Inter, Poppins, JetBrains Mono for code, Caveat for album captions), global focus ring and reduced-motion rules.

- `src/components/album/` — the Life Album book (`/album`). Content lives in `src/data/album.ts` (prologue, parts, chapters with `hook` and `next` teaser). Photos are real and shown as they are, in manga-style panels. An image can carry an optional `illustrated` version; the "Show illustrated" switch appears only once one exists. Page numbers come from `chapterPhotoPage` in `albumContext.ts`.

### Styling conventions

- Tailwind CSS only — no CSS modules or styled-components. Dark mode is done with `dark:` variants driven by the `class` strategy above.
- Visual language leans on `stone` neutrals with `amber` as the accent color, generous tracking/uppercase for labels, and Framer Motion for scroll/hover animation.
- Fonts: `font-sans` = Inter (body), `font-display` = Poppins (headings), configured in `tailwind.config.js`.

## Docs vs. reality — do not trust blindly

- `requirement.md`, `SETUP_GUIDE.md`, and `portfolio-app/README.md` describe a larger app (separate About/Experience/Skills/Contact pages, EmailJS-powered contact form, blog, testimonials). Most of that does not exist in the current `src/` — the contact form and `@emailjs/browser` integration referenced in `EMAILJS_SETUP.md` are not currently wired up in the code. Treat these files as historical/aspirational context, not a spec of current behavior — verify against `src/` before relying on them.
- The repo is mid-restructure (see the "Baseline before Negra-style structural restructure" commit and the deleted `Profile.tsx`); expect the page/route set to keep consolidating toward the single-page `Home.tsx` + anchor-section pattern described above.
