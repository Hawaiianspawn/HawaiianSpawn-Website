# HawaiianSpawn Portfolio — Handoff Document

**Project:** Personal portfolio site for Aaron Low (Technical Artist / Game Designer)
**Repo root:** `C:\Users\Hawaiian_spawn\HawaiianSpawn-Website`
**Reference site:** https://hawaiianspawn.wixsite.com/home (source of truth for content)
**Target hosting:** GitHub Pages (`https://github.com/Hawaiianspawn`) + custom domain (TBD)
**Stack:** Astro 5, plain CSS, no JS framework, GitHub Actions deploy

---

## Current State

The site builds clean (`npm run build` → 20 pages, 0 errors) and the dev server runs on `http://localhost:4321/`.

### What is done
- Astro 5 project scaffolded with GitHub Actions deploy workflow
- Dark theme design system (CSS variables, `--bg: #0f0f0f`, `--accent: #00c9a7`)
- 16 projects fully structured in `src/data/projects.json` (project-glossary format)
- Per-project asset folders under `public/assets/projects/[id]/`
- All Wix CDN assets downloaded and placed in correct folders
- All GIF + image assets converted to WebP via `sharp` (27 files, 22–97% size savings)
- `src/data/projects.json` paths fully updated to `.webp` (40 path references)
- Dynamic detail pages at `/projects/[slug]` for all 16 projects
- Homepage with hero/profile photo, project grid filtered by section (WIPs / Games / Older)
- Project cards link to detail pages and show media-count badge
- Reel page avoids broken embeds until real YouTube/Vimeo video IDs are added
- Resume page avoids a broken PDF iframe until `public/assets/resume.pdf` exists
- Contact page with real social handles and email
- Footer with real social links
- Sticky header with hamburger nav

### What still needs doing

| Task | File(s) to touch | Notes |
|------|-----------------|-------|
| YouTube/Vimeo reel video IDs | `src/pages/reel.astro` | Set `youtubeVideoId` and/or `vimeoVideoId`; page currently shows channel links instead of broken embeds |
| Custom domain | `public/CNAME`, `astro.config.mjs` | Create `public/CNAME` only after a real domain is chosen; keep absent for GitHub Pages default domain |
| Resume PDF | `public/assets/resume.pdf` | Drop file here; `src/pages/resume.astro` auto-detects it and renders the PDF viewer |
| Detective Game GIFs | `public/assets/projects/detective-game/` + `src/data/projects.json` | Aaron is optimizing these himself |
| Push to GitHub | — | `git push origin main`, then enable Pages → Source: GitHub Actions |
| DNS CNAME record | DNS provider | Point custom domain → `Hawaiianspawn.github.io` |

---

## Repository Layout

```
HawaiianSpawn-Website/
├── .github/workflows/deploy.yml      # GitHub Actions: build → upload → deploy-pages
├── astro.config.mjs                  # site: 'https://Hawaiianspawn.github.io' (placeholder)
├── package.json                      # astro ^5.0.0, sharp ^0.34.5 (devDep)
├── public/
│   └── assets/projects/              # 56 files across 18 subfolders
│       ├── profile/                  photo.webp
│       ├── warhammer-inquisitor/     screenshot-1.webp, screenshot-2.webp, vfx-1..4.webp
│       ├── dungeon-crawler/          gameplay.webp
│       ├── unreal-cinematics/        placeholder.svg (no media yet)
│       ├── detective-game/           placeholder.svg (GIFs coming)
│       ├── table-flipper/            splash.webp, gameplay.webp
│       ├── escape-from-editor/       mech.webp, interior.webp, billboard.webp
│       ├── southpark-platformer/     platformer.webp
│       ├── play-two-heroes/          logo.webp, gameplay.webp
│       ├── junkensteins-revenge/     gameplay.webp, roadpull.webp, road-aoe.webp
│       ├── hearthtone-concepts/      carriage.webp, monster.webp
│       ├── the-spare/                cover.webp
│       ├── thrive-vr/                screenshot.webp
│       ├── low-fruit/                render.webp
│       ├── character-rig/            screenshot.webp
│       ├── hanamikoji/               photo.webp
│       └── cabin-render/             render.webp
├── scripts/
│   ├── optimize-media.mjs            # Converts .gif/.png/.jpg → .webp via sharp (re-runnable)
│   └── update-paths.mjs              # Rewrites projects.json paths after conversion (re-runnable)
└── src/
    ├── data/projects.json            # SOURCE OF TRUTH for all project data
    ├── layouts/BaseLayout.astro
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   └── ProjectCard.astro
    ├── pages/
    │   ├── index.astro               # Homepage (hero + 3 project grids)
    │   ├── reel.astro                # Conditional YouTube/Vimeo embeds
    │   ├── resume.astro              # Conditional PDF viewer for public/assets/resume.pdf
    │   ├── contact.astro             # Social links + email
    │   └── projects/[slug].astro     # Dynamic detail page (getStaticPaths from projects.json)
    └── styles/global.css             # Design tokens + shared utility classes
```

---

## Data Model — `src/data/projects.json`

Each project is one object. The gallery shows `thumbnail`; the detail page renders all `media[]`.

```jsonc
{
  "id": "play-two-heroes",           // kebab-case, unique, matches folder name
  "title": "Play Two Heroes",
  "slug": "play-two-heroes",         // same as id (used in URL: /projects/[slug])
  "section": "games",                // "wips" | "games" | "older"
  "tag": "Overwatch Workshop",       // shown as chip on card and detail page
  "year": "2019",                    // empty string if unknown
  "status": "",                      // "In Progress" or empty
  "description": "...",
  "thumbnail": "/assets/projects/play-two-heroes/logo.webp",
  "media": [
    { "src": "/assets/projects/play-two-heroes/logo.webp",     "type": "image", "caption": "..." },
    { "src": "/assets/projects/play-two-heroes/gameplay.webp", "type": "gif",   "caption": "..." }
  ],
  "link": "https://..."              // external link shown as button on detail page; empty string if none
}
```

**`type` field values:**
- `"image"` — static WebP (rendered as `<img>`)
- `"gif"` — animated WebP (still uses `type: "gif"` so the detail page applies the `is-gif` CSS class for sizing; the file extension is `.webp`)

**Sections and current project count:**
- `wips` — 4 projects (Warhammer: Inquisitor, Dungeon Crawler, Unreal Cinematics, Detective Game)
- `games` — 6 projects (Table Flipper, Escape From Editor, South Park Platformer, Play Two Heroes, Junkenstein's, ...)
- `older` — 7 projects (Hearthtone Concepts, The Spare, ThriveVR, Low Fruit, Character Rig, Hanamikoji, Cabin Render)

---

## Key Design Decisions

### No JS framework — plain Astro + CSS
All interactivity (mobile nav toggle) is vanilla JS in `<script>` tags. No React/Vue/Svelte. Keeps bundle tiny and build fast.

### Animated WebP, not GIF
All GIFs were converted to animated WebP with `sharp`. The `type: "gif"` field in `projects.json` marks animated content — it doesn't mean the file is a `.gif`. Do not change this field back; the detail page CSS depends on it.

### Assets are committed, not fetched at build time
`public/assets/` is in the repo. This is intentional: no CDN dependency, offline dev works, GitHub Pages serves them directly. The tradeoff is a larger repo (~200MB estimated at full scale).

### Privacy constraint
Aaron's Wix contact page contains a home address and phone number. These are **intentionally excluded** from the site. Do not add them.

---

## How to Add a New Project

1. Create folder: `public/assets/projects/[id]/`
2. Drop assets in — then run `node scripts/optimize-media.mjs` to convert to WebP
3. Run `node scripts/update-paths.mjs` to rewrite any `.gif/.png/.jpg` refs in `projects.json` to `.webp`
4. Add the project object to `src/data/projects.json`
5. `npm run build` to verify, then push

---

## How to Add Detective Game GIFs (when ready)

1. Drop optimized WebP files into `public/assets/projects/detective-game/`
2. Update the `detective-game` entry in `projects.json`:
   - Change `thumbnail` from `placeholder.svg` to the first media file
   - Add entries to `media[]` with `type: "gif"`

---

## Deploy Checklist

- [ ] If using a custom domain, create `public/CNAME` with the real domain
- [ ] If using a custom domain, update `astro.config.mjs` `site:` to `https://yourdomain.com`
- [ ] Add `public/assets/resume.pdf`
- [ ] Set `youtubeVideoId` and/or `vimeoVideoId` in `src/pages/reel.astro`
- [ ] `git init` (if not already) → `git remote add origin https://github.com/Hawaiianspawn/HawaiianSpawn-Website.git`
- [ ] `git push -u origin main`
- [ ] GitHub repo → Settings → Pages → Source: **GitHub Actions**
- [ ] DNS: add CNAME record pointing custom domain → `Hawaiianspawn.github.io`
- [ ] GitHub repo → Settings → Pages → Custom domain: enter domain, enable HTTPS

---

## Local Dev Commands

```powershell
cd C:\Users\Hawaiian_spawn\HawaiianSpawn-Website

npm install          # first time only
npm run dev          # dev server → http://localhost:4321
npm run build        # production build → dist/
npm run preview      # preview prod build locally

node scripts/optimize-media.mjs   # convert new assets to WebP
node scripts/update-paths.mjs     # sync projects.json after conversion
```

---

## Contact & Social (Aaron Low)

| Platform | Handle / URL |
|----------|-------------|
| Email | Hawaiian_spawn@live.com |
| Twitter / X | @hawaiian_spawn |
| Instagram | @hawaiian_spawn |
| YouTube | @hawaiian_spawn |
| Vimeo | user8051156 |
| GitHub | https://github.com/Hawaiianspawn |
