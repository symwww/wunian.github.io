# WUNIAN — Design Language

## Core Principle

The site is a **publication**, not an application. Every design decision serves legibility and restraint. The visual language is derived from print — specifically from the kind of architecture journal that respects its reader's intelligence: no icons, no color coding, no navigational scaffolding beyond what is strictly necessary.

If a design element could be described as "interactive," "animated," "card-based," "responsive grid," or "modern portfolio," it probably does not belong here.

---

## Typography

### Fonts
Two fonts only. Both self-hosted. No web font services.

**Archivo Black** — display and metadata  
Path: `Akt,Archivo_Black/Archivo_Black/ArchivoBlack-Regular.ttf`  
Used for: site name, navigation, section titles, labels, year tags, captions (in `text/` pages), reading-nav  
Weight: 400 (only weight available)  
Style: uppercase, tracked

**Akt** — editorial and body  
Path: `Akt,Archivo_Black/Akt/Akt-VariableFont_wght.ttf`  
Used for: body text, project descriptions, essay paragraphs, captions (in `projects/`)  
Weights used: 100 (body), 200 (blockquote italic), 300 (h2 subheadings)  
This is a variable font — the weight axis is continuous from 100 to 900.

### Size and Spacing Scale

| Element | Font | Weight | Size | Letter-spacing | Notes |
|---------|------|--------|------|---------------|-------|
| Site wordmark | Archivo Black | 400 | `clamp(5rem, 12vw, 10rem)` | -0.02em | Homepage only |
| Back / top-nav W | Archivo Black | 400 | 0.85rem | 0.14em | Fixed position |
| Page section title | Archivo Black | 400 | 0.85rem | 0.14em | "PROJECTS", "TEXTS" |
| Year buttons | Archivo Black | 400 | 0.65rem | 0.10em | |
| Project/article list items | Archivo Black | 400 | 0.95rem | — | Not tracked |
| Series label | Archivo Black | 400 | 0.65rem | 0.10em | Uppercase |
| Reading meta / project meta | Archivo Black | 400 | 0.65rem | 0.08em | |
| Body paragraph | Akt | 100 | 1rem | — | |
| h2 subheading | Akt | 300 | 1rem–1.15rem | — | No transform |
| Caption | Akt | 100 | 0.65rem | 0.05em | |
| Blockquote | Akt | 200 | 1rem | — | Italic |
| Return link | Archivo Black | 400 | 0.68rem | 0.14em | Uppercase |

### Line Height
- Body paragraphs: `line-height: 1.8`
- Headings: `line-height: 1.2`
- Navigation: tight, single line

---

## Color

The site is **monochrome without exception.**

- Background: `#ffffff` pure white
- Text: `#000000` pure black
- No grays in the color palette — gray is achieved only through opacity on black

```css
color: #000;
background: #fff;
/* gray = rgba(0,0,0,X) or opacity: X on a black element */
```

Do not introduce any tinted backgrounds, any colored accents, any highlight colors.

---

## Opacity System

Opacity is the only way the site creates visual hierarchy (besides size). It must be used consistently.

| Value | Used for |
|-------|---------|
| `0.08` | Hairline borders (list separators) |
| `0.2` | Blockquote left border |
| `0.25` | Return link underline |
| `0.3` | Year filter buttons (inactive) |
| `0.35` | All metadata, labels, section page titles, series labels, reading-meta |
| `0.45` | Reading-nav links |
| `0.7` | Hover state for some reading-nav items |
| `1.0` | Body text, headings, captions, all content |

The pattern: **content is full opacity, context is at 0.35.** Navigation is the context; the work is the content.

Hover states on full-opacity items typically go to 0.35. Hover states on already-dimmed items may invert (go to 1.0) — see `.top-nav a + a` which is 0.35 by default and brightens on hover.

---

## Spacing

### Page Layout
- Body padding (all sub-pages): `8rem 2rem 8rem` (top-right-bottom, using same value for left and right)
- `.page` container: `max-width: 38rem; margin: 0 auto` (section index pages and text pages)
- `.project` container: `max-width: 56rem; margin: 0 auto` (project detail pages)
- `.essay` container: `max-width: 38rem; margin: 0 auto` (text/reading pages)

### Image Rhythm
This is the most important spacing rule in project pages:
```css
.img-block {
  margin: 3rem 0 0.4rem;  /* 3rem above, only 0.4rem below (caption follows) */
}
.caption {
  margin-top: 0;          /* sits tight under the image */
  margin-bottom: 3rem;    /* 3rem before next image block */
}
```
Result: images and their captions are visually coupled; the 3rem gap appears between caption and next image.

### Section Headings (h2 in project pages)
```css
h2 {
  margin: 4rem 0 1.8rem;  /* generous space above to open a new section */
}
```

### Paragraph Spacing
```css
p {
  margin: 0 0 1.2rem;
}
```

### Reading Navigation
```css
.reading-nav {
  margin-top: 4rem;
}
```

---

## Navigation

### Fixed top-left nav (detail pages)
```
W · Texts         ← section pages
W · Projects
```
- "W" at full opacity, dims on hover
- Section label at 0.35, brightens to full on hover
- `gap: 1.5rem` between items
- `font-size: 0.85rem`, letter-spacing `0.14em`, uppercase

### Back link (section index pages)
Single "W" fixed top-left. Same styling as above. No breadcrumb.

### Return link (bottom of detail pages)
```html
<a class="return-link" href="./">Return to Texts</a>
```
Styled with a thin underline border (`border-bottom: 1px solid rgba(0,0,0,0.25)`), uppercase, Archivo Black 0.68rem.

### Year filter
Horizontal row of year buttons. Clicking a year filters the list. Only one year can be active at a time. Clicking the active year again shows all. Built in ~10 lines of vanilla JS.

---

## Image Display

### Standard project images
Full width of the `.project` container (56rem max):
```css
.img-block img {
  display: block;
  width: 100%;
}
```

### High-density diagrams
When source is 4000px (PDF-derived axonometrics, technical diagrams):
```css
/* In the page's local <style> block */
.img-block img {
  max-width: 36rem;
}
```
This creates a very high apparent pixel density — suitable for fine linework. Add only to pages where the source images are 4000px wide.

### Image display philosophy
Images are not thumbnails. They are not previews. Each image in a project page is shown at the appropriate reading size for its content — never cropped, never rounded, never shadowed.

---

## Interaction

The site has almost no interaction. This is intentional.

**What exists:**
- Homepage wordmark reveal (max-width animation + opacity fade, ~2.6s, triggers on load)
- Navigation link opacity on hover (0.2s ease)
- Year filter button toggle (instant DOM filter, no animation)

**What does not exist and should not be added:**
- Page transitions or route animations
- Image lightboxes or carousels
- Scroll-triggered animations
- Hover effects that transform, scale, or move elements
- Loading spinners or skeleton screens
- Tooltips
- Dropdown menus

The site should feel like a book, not a web application.

---

## Responsive Behavior

The site is not mobile-first but it works at mobile sizes. No breakpoint-driven layout changes except:

- `nav { gap: 1.5rem }` at `max-width: 480px` (homepage)
- Wordmark size: `clamp(5rem, 12vw, 10rem)` (fluid scaling)
- Project containers at 56rem and essay containers at 38rem collapse gracefully at small widths because `max-width` + 2rem side padding gives adequate reading on any screen

No complex responsive breakpoints. No mobile-specific navigation. The layout adapts through `max-width` and fluid type.

---

## Language and Copy

### Rules
- **No hyphens** in any text on the site (including compound adjectives like "open floor" not "open-floor")
- **No em dashes** — use a colon or rephrase as two sentences
- **No ellipses** in captions or headings
- **Captions** follow the pattern: "Category or zone: description. Additional notes."
- **Descriptions** are concise and precise: 2–4 sentences, architectural vocabulary, no marketing language
- **Headings** (h2) in project pages are used sparingly — only when a genuine section change occurs

### Tone
- Descriptive and factual, not promotional
- The work speaks for itself; the caption explains context, not quality
- Academic writing in the text section preserves the author's voice — grammar only, never rewritten

### What to avoid in copy
- "Innovative," "sustainable," "state of the art," "cutting edge"
- Hyphens used as em dashes
- Passive voice where active is natural
- Jargon without context

---

## Things to Avoid (Summary)

| Avoid | Instead |
|-------|---------|
| Card grid layouts | Simple vertical list |
| Thumbnail hovers with overlays | Plain text link |
| Colored tags or category badges | Year label at 0.35 opacity |
| border-radius on images or containers | Hard edges only |
| box-shadow / drop-shadow | No shadow |
| Animated page transitions | Instant navigation |
| External font services (Google Fonts, etc.) | Self-hosted only |
| CMS or dynamic routing | Static HTML files |
| npm packages or build steps | Plain CSS and JS |
| Any visual element that says "SaaS" or "portfolio template" | Archive aesthetic |
