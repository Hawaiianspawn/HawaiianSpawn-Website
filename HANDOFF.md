# HawaiianSpawn Website Handoff

Last updated: 2026-06-05

## Project

Personal portfolio website for Aaron Low / HawaiianSpawn.

- Repo root: `C:\Users\Hawaiian_spawn\HawaiianSpawn-Website`
- GitHub remote: `https://github.com/Hawaiianspawn/HawaiianSpawn-Website.git`
- Branch: `main`
- Stack: Astro 5, plain CSS, static output
- Source content reference: `https://hawaiianspawn.wixsite.com/home`
- Project data source of truth: `src/data/projects.json`
- Generated project pages: `src/pages/projects/[slug].astro`
- Project assets: `public/assets/projects/[project-id]/`

## Current Git State

Latest pushed commit:

```text
829485e Refresh A Boy and His Beard project content
```

Recent useful commits:

```text
829485e Refresh A Boy and His Beard project content
45123bb Refresh ThriveVR project media
6b4810a Remove weak portfolio projects
5562d2b Autoplay project videos muted
5e5d7e8 Add web-ready Hogwarts and Play Two Heroes media
535522d Improve project gallery image framing
46852e7 Add recovered Wix project content
```

Important: the working tree is intentionally not fully clean. Do not revert these unless the user asks.

```text
 D public/assets/projects/play-two-heroes/logo.png
 D public/assets/projects/play-two-heroes/logo.webp
?? public/assets/projects/detective-game/vfx-4.webp
?? public/assets/projects/hogwarts-legacy/AvaPets.mkv
?? public/assets/projects/hogwarts-legacy/AvalancheTwitchStream.mp4
?? "public/assets/projects/junkensteins-revenge/Junkensteins New Boss Mod.mp4"
?? "public/assets/projects/play-two-heroes/2) Raw Mocap Side by Side.mp4"
?? "public/assets/projects/play-two-heroes/Play Two Heroes.PNG"
?? public/assets/projects/small_projects/
?? public/assets/projects/thrive-vr/vfx-3.webp
```

These appear to be user/local source assets or new content drops. Treat them as pending inputs, not accidental files.

## Build And Run

Install deps if needed:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Last verified build passed after the A Boy and His Beard update:

```text
npm run build
21 page(s) built
Complete
```

Useful local URL examples:

```text
http://127.0.0.1:4321/
http://127.0.0.1:4321/projects/a-boy-and-his-beard/
http://127.0.0.1:4321/projects/thrive-vr/
http://127.0.0.1:4321/projects/junkensteins-revenge/
```

## Site Architecture

The homepage imports `src/data/projects.json` and groups projects by `section`:

- `wips`
- `games`
- `older`

Each project has this shape:

```json
{
  "id": "project-id",
  "title": "Project Title",
  "slug": "project-slug",
  "section": "games",
  "tag": "Unity",
  "year": "2018",
  "status": "",
  "description": "Short portfolio description.",
  "thumbnail": "/assets/projects/project-id/thumbnail.webp",
  "media": [
    { "src": "/assets/projects/project-id/file.webp", "type": "gif", "caption": "Caption" },
    { "src": "/assets/projects/project-id/file.mp4", "type": "video", "caption": "Caption", "mime": "video/mp4" }
  ],
  "link": ""
}
```

Supported media types in `src/pages/projects/[slug].astro`:

- `image`: rendered as `img`
- `gif`: rendered as `img`; animated WebP works here
- `video`: rendered as autoplaying, looping, muted, inline `video`
- `file`: rendered as a download/open link

Videos already autoplay silently:

```astro
<video autoplay loop muted playsinline preload="metadata">
```

## Current Project List

Current `src/data/projects.json` includes:

- Warhammer: Inquisitor
- Dungeon Crawler
- Unreal Cinematics Practice
- Detective
- Table Flipper
- Escape From Editor
- Time Travelers DropBox
- A Boy and His Beard
- Play Two Heroes
- Hogwarts Legacy
- Junkenstein's New Boss Mod
- The Spare
- ThriveVR
- Low Fruit
- Character Rig
- Hanamikoji
- Cabin Lighting Study

Removed by request:

- Hearthstone Concepts
- South Park Platformer

## Recent Completed Work

### A Boy and His Beard

Pulled content from:

- `https://hawaiianspawn.wixsite.com/home/a-boy-and-his-beard`
- `https://imgur.com/a/boyandhisbeadgif-0VcaZ`

Updated the project with:

- Steam release year: `2018`
- Tag: `PC Steam`
- Steam link: `https://store.steampowered.com/app/708100/A_Boy_and_His_Beard/`
- Stronger description based on the original Wix page
- Tutorial design GIFs converted to WebP
- Enemy variation GIFs converted to WebP
- Cut-content GIF converted to WebP
- Imgur asset added as MP4: `cut-content-imgur.mp4`
- Special thanks/team image converted to WebP

Committed and pushed as:

```text
829485e Refresh A Boy and His Beard project content
```

### ThriveVR

Pulled content from:

- `https://hawaiianspawn.wixsite.com/home/thrive`

Downloaded and converted Wix media into:

- `thrive-overview.webp`
- `daruma-goal.webp`
- `physician-cannon.webp`
- `foot-tracking.webp`
- `balance-coconuts.webp`
- `games-for-health-award.webp`

Updated the ThriveVR project description, thumbnail, media captions, and link:

```text
https://hawaiianspawn.wixsite.com/thrivevr
```

Committed and pushed as:

```text
45123bb Refresh ThriveVR project media
```

### Hogwarts Legacy And Play Two Heroes

Added web-ready MP4/WebP media and updated pages.

Hogwarts media currently referenced:

- `scene-rig.webp`
- `71798f30-054b-4368-941f-67c22638159e_73_Capture_3.webp`
- `raw-mocap-side-by-side.mp4`
- `action-in-volume.mp4`
- `ik-in-unreal.mp4`
- `wizard-phd-brush-sounds.mp4`

Play Two Heroes media currently referenced:

- `logo.webp`
- `gameplay.webp`
- `jr-get-away.mp4`
- `where-did-the-bastion-come-from.mp4`
- `your-destiny-is-your-own.mp4`

Note: `logo.webp` is referenced in JSON, but local status currently shows it deleted. This needs cleanup before changing Play Two Heroes further.

### Junkenstein's Revenge Research

User asked whether old Gfycat URLs could be found through Archive.org.

Findings:

- Current Wix page did not include literal `gfycat.com` URLs.
- Exact Wayback CDX query for the page returned no saved 200 snapshots at that time.
- ArchiveTeam did archive Gfycat generally, but original Gfycat slugs are needed for targeted recovery.
- Best immediate route is to use available Wix-hosted media or any local source videos the user drops.

There is now an untracked local file:

```text
public/assets/projects/junkensteins-revenge/Junkensteins New Boss Mod.mp4
```

Likely next task: convert/compress this to a website-friendly muted autoplay MP4 or WebP preview and add it to `src/data/projects.json`.

## Media Workflow

Prefer website assets as:

- Static images: `.webp`
- Animated loops without sound: animated `.webp` or muted `.mp4`
- Long or large video: compressed `.mp4`

Existing FFmpeg executable:

```text
C:\Users\Hawaiian_spawn\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe
```

Example GIF to animated WebP:

```powershell
& "C:\Users\Hawaiian_spawn\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe" `
  -y -i input.gif `
  -vf "fps=15,scale='min(960,iw)':-1:flags=lanczos" `
  -loop 0 -q:v 75 output.webp
```

Example source video to muted web MP4:

```powershell
& "C:\Users\Hawaiian_spawn\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe" `
  -y -i input.mp4 `
  -an -vf "scale='min(1280,iw)':-2" `
  -c:v libx264 -pix_fmt yuv420p -crf 24 -preset medium `
  output.mp4
```

The `.gitignore` already ignores several known large source originals for Hogwarts and Play Two Heroes. If new large local source videos are meant to stay local, add specific ignore entries after producing web assets.

## Known Issues / Cautions

- Some text has mojibake in existing source files from older encoding, for example `â€”` where an em dash was intended. Avoid broad formatting churn unless intentionally fixing copy.
- Do not revert local dirty files unless explicitly asked. Several are user-provided source assets.
- Play Two Heroes currently references `logo.webp`, but local status shows `logo.webp` and `logo.png` deleted. Resolve deliberately before the next commit touching Play Two Heroes.
- `public/assets/projects/small_projects/GameDesign.PNG` is currently untracked and probably needs a new project entry or to be folded into an existing page.
- `public/assets/projects/detective-game/vfx-4.webp` is untracked and probably belongs on the Detective page.
- `public/assets/projects/thrive-vr/vfx-3.webp` is untracked; compare against the current ThriveVR media before adding.

## Good Next Steps

1. Start local server with `npm run dev` and visually review:
   - `/projects/a-boy-and-his-beard/`
   - `/projects/thrive-vr/`
   - `/projects/play-two-heroes/`
   - `/projects/junkensteins-revenge/`

2. Process pending local user assets:
   - Convert `Junkensteins New Boss Mod.mp4` into a compressed web MP4.
   - Decide whether `detective-game/vfx-4.webp` belongs on Detective.
   - Decide whether `thrive-vr/vfx-3.webp` is a duplicate or a missing Thrive asset.
   - Decide where `small_projects/GameDesign.PNG` should appear.

3. Resolve Play Two Heroes logo deletion:
   - If logo should stay: restore/regenerate `logo.webp`.
   - If logo should go: remove it from `src/data/projects.json` and pick another thumbnail/media item.

4. Run `npm run build`.

5. Commit only the scoped files for the completed content pass.

