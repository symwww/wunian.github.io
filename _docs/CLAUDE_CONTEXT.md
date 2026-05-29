# WUNIAN — Extended Claude Onboarding

This document is the comprehensive reference for any Claude session working on the WUNIAN site. Read this at the start of a session. `CLAUDE.md` at the project root is the quick-reference version; this file contains the full reasoning behind each convention.

---

## Who Is This Site For

Leslie Sheng operates WUNIAN as a long-term personal archive. It is not updated seasonally or optimized for job applications. Work is added when it is ready. The site accumulates; it does not refresh. Claude should treat every interaction with this site as a contribution to a permanent record, not a sprint deliverable.

---

## The File System as CMS

There is no database, no CMS, no content API. The "database" is the file system:
- Each project is one HTML file in `projects/`
- Each text is one HTML file in `text/`
- Each project's images are in `image/[slug]/`
- The index pages (`projects/index.html`, `text/index.html`) are hand-maintained HTML lists

Adding content = creating a file + editing two lines in an index. There is no other system. Claude should not propose migrating to a CMS, a static site generator, or a JavaScript framework. The simplicity is a feature.

---

## Section-by-Section Reference

### Homepage (`index.html`)
The homepage is a centered wordmark "WUNIAN" with a reveal animation. Below it are navigation links. There are currently: Projects, Texts, and placeholder links. The homepage has no content of its own. Do not add project thumbnails, featured items, or any dynamic content to the homepage.

### Projects (`projects/index.html` + `projects/[slug].html`)
Archive of design work. Year-filtered list. Each project page is self-contained. Projects currently live:

| Year | Slug | Title | Context |
|------|------|-------|---------|
| 2026 | wunian-night-01 | Wunian Night 01 | Event |
| 2025 | colebrookdale | Colebrookdale | Lea Architecture |
| 2025 | heights-casino | Heights Casino | Lea Architecture |
| 2025 | farber-house | Saint Ann's School Farber Building | Lea Architecture |
| 2025 | melrose | Melrose | Lea Architecture |
| 2025 | education-competition | Education Competition | Lea Architecture |
| 2024 | redhook-rain-story | Redhook Rain Story | Columbia |
| 2024 | halophilic-island | Halophilic Island | Columbia |
| 2023 | viva-natatio | Viva Natatio | Columbia |
| 2022 | hinge-house | Hinge House | Columbia |
| 2022 | idle-village | Idle Village | Columbia |

### Texts (`text/index.html` + `text/[slug].html`)
Reading notes, essays, critical writing. Year-filtered list. Currently:

| Year | Slug | Title |
|------|------|-------|
| 2026 | founding_wunian | What is Wunian? |
| 2021 | deleuze-movement | On Cinema — I. Movement and Duration |
| 2021 | deleuze-frame | On Cinema — II. The Frame and the Shot |
| 2021 | deleuze-perception | On Cinema — III. Solid, Liquid, Gaseous |
| 2021 | deleuze-affection | On Cinema — IV. The Affection Image |
| 2021 | deleuze-action | On Cinema — V. The Action Image |
| 2021 | deleuze-crisis | On Cinema — VI. Crisis of the Action Image |
| 2021 | deleuze-crystals | On Cinema — VII. Crystals of Time |
| 2021 | deleuze-false | On Cinema — VIII. The Powers of the False |

### Fragments, Archive, Music
Not yet publicly linked. Pages and assets may exist as files (`about.html`, `music/WN_01.mp3`, `archive/`, `fragments/`) but are not surfaced in navigation.

---

## CSS Architecture

One global stylesheet (`style.css`) handles:
- Font loading (Archivo Black + Akt)
- Base reset
- Homepage layout and animation
- Shared components: `.back`, `.top-nav`, `.page`, `.page-title`, `.years`, `.year-btn`, `.article-list`, `.article-item`, `.article-year`, `.article-title`, `.return-link`

Each project and text page has a local `<style>` block that:
- Re-declares the Akt `@font-face` (necessary since it's not in `style.css`)
- Sets `body { display: block; ... }` to override the homepage's flex centering
- Defines local elements: `.project`, `.project-label`, `.project-meta`, `h1`, `h2`, `p`, `.img-block`, `.caption`

The local `<style>` block may also add page-specific overrides, such as:
```css
/* Heights Casino: high-density diagram display */
.img-block img { max-width: 36rem; }
```

### Why Akt is re-declared per page
`style.css` only declares Archivo Black globally. The Akt font-face must be declared in each page's local style block because Akt is used exclusively in sub-pages (projects and texts), not on the homepage. This is a slightly fragile pattern — if you're adding Akt to a new page type, copy the `@font-face` block exactly from an existing page.

---

## Critical Language Rules

These rules are absolute. They apply to all new text written for the site.

### No hyphens
- Compound adjectives: "open floor plan" not "open-floor plan"
- Compound nouns: "cine eye" not "cine-eye", "object oriented" not "object-oriented"
- Never use a hyphen as an em dash substitute

### No em dashes
- Instead of "The building — a renovation of a 1920s rowhouse — retains the original facade", write: "The building is a renovation of a 1920s rowhouse. The original facade is retained."
- Or use a colon: "The building: a renovation of a 1920s rowhouse that retains the original facade."

### Caption structure
`Label: description. Additional note.`
- The label names the zone, view, or drawing type
- The description gives specific content
- Capitalize only the first word of the full caption (plus proper nouns)

### Author voice in texts
When processing `.docx` files or other source writing:
- Correct grammar only (subject-verb agreement, tense consistency, article usage)
- Do not rephrase, reorder, or rewrite for style
- Remove hyphens from compound words
- The writing should still sound like the original author after editing

---

## How New Projects Come In

Projects from Lea Architecture typically arrive as:
- PDFs from Rhino/Revit exports (diagrams, axonometrics, floor plans, elevations)
- PNG renders from Enscape or similar

The user will specify which files to include and will often indicate an ordering. If not, ask. Do not assume ordering from file modification dates — ask.

Academic projects typically arrive as:
- Presentation PDFs (extract pages individually)
- Renders from prior submissions
- Hand-drafted or modeled imagery

### When the user says "upload all files"
Compress every file in the specified folder, name them sequentially in alphabetical or modification-date order, and ask the user to confirm the sequence before committing. It is much easier to change order before compressing than after.

---

## Common Operations Reference

### Create a project page
1. `mkdir -p image/[slug]`
2. Compress images with `sips` → `image/[slug]/01.jpg, 02.jpg …`
3. Copy `_docs/PROJECT_TEMPLATE/project.html` → `projects/[slug].html`
4. Fill in: title, meta, description, img src and alt, captions
5. Add `<li>` to `projects/index.html`
6. Add year button if new year
7. Commit specific files

### Edit captions or descriptions
- Open the HTML file directly
- Find the text, edit inline
- No build step required

### Add a text to an existing series
- Create new HTML file in `text/`
- Update the `reading-nav` links on the adjacent pages (prev and next)
- Add to `text/index.html`

### Check what's on the current branch
```bash
git log --oneline origin/main..HEAD
git status
```

### Deploy (merge to main)
```bash
git checkout main
git merge add-section-pages
git push origin main
git checkout add-section-pages
```

---

## Things That Should Never Change

- The font stack (Archivo Black + Akt only)
- The color scheme (pure black and white)
- The opacity system (especially 0.35 for all metadata)
- The image naming convention (01.jpg, 02.jpg …)
- The lack of a build system or framework
- The caption structure (colon separator, no hyphens)

If a future conversation proposes changing any of these, check with the user before proceeding.

---

## File Paths Quick Reference

```
Site root:         /Users/lesliesheng/wunian.site/
Projects:          /Users/lesliesheng/wunian.site/projects/
Texts:             /Users/lesliesheng/wunian.site/text/
Images:            /Users/lesliesheng/wunian.site/image/
Global CSS:        /Users/lesliesheng/wunian.site/style.css
Docs:              /Users/lesliesheng/wunian.site/_docs/
Template:          /Users/lesliesheng/wunian.site/_docs/PROJECT_TEMPLATE/

Source files (Lea Architecture 2024):
  /Volumes/work data/ARCHITECTURE/2024_Lea Architecture/Lea Architecture/
Source files (Lea Architecture 2025):
  /Volumes/work data/Lea Architecture/
Source files (Columbia academic):
  /Volumes/work data/ARCHITECTURE/[year]_[studio]/
```

---

## Schema and Documentation

| File | Contents |
|------|---------|
| `CLAUDE.md` | Quick-reference card — start here |
| `_docs/PROJECT_OVERVIEW.md` | Identity, philosophy, vision |
| `_docs/WORKFLOW.md` | Step-by-step import and publish procedures |
| `_docs/DESIGN_LANGUAGE.md` | Full design system (typography, spacing, color, interaction) |
| `_docs/PROJECT_SCHEMA.json` | Structured data model for a project |
| `_docs/PROJECT_TEMPLATE/project.html` | Copy-paste HTML template |
| `_docs/PROJECT_TEMPLATE/content.md` | Content drafting scaffold |
| `_docs/PROJECT_TEMPLATE/README.md` | Template usage guide |
| `_docs/CLAUDE_CONTEXT.md` | This file |
