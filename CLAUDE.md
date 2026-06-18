# WUNIAN — Claude Context

**Owner:** Leslie Sheng  
**Site (production):** wuniancollective.com  
**Local repo:** /Users/lesliesheng/wunian.site/  
**Repo:** github.com/symwww/wunian.github.io  
**Branch:** `add-section-pages` → merged to main for deploy  
**Hosting:** GitHub Pages (CNAME: wuniancollective.com)

---

## What This Site Is

WUNIAN is a personal archive and publication platform — not a conventional portfolio. It accumulates work honestly over time: architecture projects, written texts, and eventually music and other media. The site functions like a physical archive: you can browse by year, navigate by section, and read individual entries at depth. It is not optimized for recruiters or social sharing.

**Owner background:** Columbia University MSAAD graduate. Currently working at Lea Architecture in New York. Projects span academic work (2022–2024), professional work at Lea Architecture (2025–), and personal writing.

---

## Site Structure

```
wunian.site/
├── index.html              ← homepage (wordmark reveal animation)
├── style.css               ← global stylesheet, shared by all pages
├── script.js               ← homepage JS only
├── about.html
├── projects/
│   ├── index.html          ← project archive list (year-filtered)
│   └── [slug].html         ← individual project pages
├── text/
│   ├── index.html          ← text archive list (year-filtered)
│   └── [slug].html         ← individual reading/essay pages
├── image/
│   └── [project-slug]/     ← 01.jpg, 02.jpg … (sequential)
├── music/
├── Akt,Archivo_Black/      ← font files (self-hosted)
└── _docs/                  ← this documentation
```

**Sections currently active:** Projects, Texts  
**Sections in progress:** Fragments, Archive, Music

---

## Technical Stack

- Pure HTML + CSS + vanilla JS (no frameworks, no build step)
- Self-hosted fonts: **Archivo Black** (labels/nav/meta) + **Akt variable** (body/editorial)
- No external dependencies, no npm, no bundler
- Images: JPEG only, compressed with `sips` (macOS)
- GitHub Pages for hosting; deploy by pushing to `origin`

---

## Design Rules (critical — enforce always)

### Typography
| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|---------|
| Wordmark/nav | Archivo Black | 400 | clamp / 0.85rem | 0.14em |
| Labels/meta | Archivo Black | 400 | 0.65–0.68rem | 0.08–0.14em |
| Body text | Akt | 100 | 1rem | — |
| Subheadings (h2) | Akt | 300 | 1rem–1.15rem | — |
| Captions | Akt | 100 | 0.65rem | 0.05em |

### Opacity System
- **0.35** — metadata, labels, year tags, section titles (always dim)
- **0.45** — reading-nav links
- **1.0** — body text, headings, captions (always full)
- Hover: typically 0.35 on items that are normally full-opacity; items normally dim may invert

### Layout
- Project pages: `max-width: 56rem`, body padding `8rem 2rem`
- Essay/text pages: `max-width: 38rem`, same padding
- Image blocks: `margin: 3rem 0 0.4rem` | Captions: `margin-top: 0; margin-bottom: 3rem`
- Standard image width: 100% of container
- High-density diagrams/axonometrics (4000px source): add `max-width: 36rem` on `.img-block img`

### Language Rules
- **No hyphens** in any text (not in compound words, not as em dashes)
- **No em dashes** — use a colon or a new sentence instead
- Captions use colon structure: "Label: description. Additional note."
- Do not rewrite authors' original prose — grammar corrections only

### What to Avoid
- Color accents of any kind (site is pure black and white)
- `border-radius` on anything
- `box-shadow` / `drop-shadow`
- Animations beyond homepage wordmark reveal and opacity transitions
- Hover states that move or transform elements
- Any SaaS/portfolio-template aesthetic (cards, grid thumbnails, tags, CTAs)

---

## Adding a New Project — Quick Reference

1. **Prepare images** → compress with `sips`, name `01.jpg`, `02.jpg` … → place in `image/[slug]/`
2. **Create** `projects/[slug].html` using the template in `_docs/PROJECT_TEMPLATE/project.html`
3. **Add entry** to `projects/index.html` — newest year first, correct `data-year` attribute
4. **Add year button** to `projects/index.html` if year doesn't exist yet

### Image compression commands
```bash
# Photos and renders (landscape/square)
sips -s format jpeg -s formatOptions 85 --resampleWidth 2000 input.png --out output.jpg

# Photos and renders (portrait)
sips -s format jpeg -s formatOptions 85 --resampleHeight 2000 input.png --out output.jpg

# Vector diagrams / PDFs / axonometrics (high density)
sips -s format jpeg -s formatOptions 85 --resampleWidth 4000 input.pdf --out output.jpg
# Then add CSS: .img-block img { max-width: 36rem; } in the page's <style> block
```

---

## Adding a New Text / Reading

1. **Create** `text/[slug].html` using `_docs/PROJECT_TEMPLATE/` as reference (essay format)
2. **Add entry** to `text/index.html` — newest year first, correct `data-year`
3. For multi-part series: add `<div class="reading-nav">` with prev/next links

---

## Git Workflow

**Follow `_docs/GIT_SAFETY.md` before any git operation** (verify repo root +
remote `symwww/wunian.github.io`, never push automatically, stage named files
only after confirmation, show a summary before commit, stop if context is unclear).

```bash
git add [specific files]    # never git add -A (avoids accidentally committing PDFs/fonts)
git commit -m "description"
git push origin add-section-pages
```

---

## Full Documentation

See `_docs/` for detailed references:
- `PROJECT_OVERVIEW.md` — identity, positioning, long-term vision
- `WORKFLOW.md` — step-by-step import and publish workflows
- `DESIGN_LANGUAGE.md` — complete design system specification
- `PROJECT_SCHEMA.json` — structured data model for projects
- `PROJECT_TEMPLATE/` — copy-paste HTML and markdown templates
- `CLAUDE_CONTEXT.md` — extended onboarding for new Claude sessions
- `GIT_SAFETY.md` — git safety protocol (this repo + reusable template)
