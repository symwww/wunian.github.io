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

Neither font has a true italic. Italics in Akt are slanted by the browser. Do not use italics in Archivo Black.

### Size and Spacing Scale

| Element | Font | Weight | Size | Letter-spacing | Notes |
|---------|------|--------|------|---------------|-------|
| Site wordmark | Archivo Black | 400 | `clamp(5rem, 12vw, 10rem)` | -0.02em | Homepage only |
| W icon | Archivo Black | 400 | 1.2rem desktop, 0.95rem up to 734px | 0.14em | Fixed position, 0.7px optical nudge right |
| W menu items | Archivo Black | 400 | 0.65rem | 0.14em | Uppercase, 0.85rem on hover and keyboard focus |
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
| `0.35` | All metadata, labels, section page titles, series labels, reading-meta, current section in the W menu |
| `0.45` | Reading-nav links |
| `0.7` | Hover state for some reading-nav items |
| `0.9` | White mask over the page while the W menu is open |
| `1.0` | Body text, headings, captions, all content |

The pattern: **content is full opacity, context is at 0.35.** Navigation is the context; the work is the content.

Hover states on full-opacity items typically go to 0.35. Hover states on already-dimmed items may invert (go to 1.0) — see `.w-dropdown a.w-current` which is 0.35 by default and brightens on hover.

---

## Spacing

### Shared Left Edge
W, the W menu and every text column start on one line, the left edge of the 56rem project column. W is always the leftmost element. The homepage is the exception: it stays centered.
```css
left: max(2rem, calc((100% - 56rem) / 2));
```
Columns narrower than 56rem keep their width and start on this line. They are not centered. The rules live in `style.css` under "shared left edge".

### Page Layout
- Body padding (all sub-pages): `8rem 2rem 8rem` (top-right-bottom, using same value for left and right)
- `.page` container: `max-width: 38rem`, on the shared left edge (section index pages)
- `.project` container: `max-width: 56rem; margin: 0 auto` (project detail pages)
- `.essay` container: `max-width: 38rem`, on the shared left edge (text/reading pages)
- `.about` container: `max-width: 38rem` including 2rem side padding, 6rem top and bottom padding, on the shared left edge
- `.content` and `.bottom-bar`: `28rem` wide, on the shared left edge (fragment pages)

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

### W menu (every page except the homepage)
A fixed W at the top left opens a dropdown menu. It replaces the earlier back link and the "W Projects" breadcrumb.
```
W
Home
Texts
Projects
Fragments
About
```
- Click W to go home. Hover or keyboard focus on W opens the menu
- Touch: the first tap on W opens the menu, a second tap goes home
- Moving the cursor away, tapping the mask, or Escape closes it
- Current section carries `class="w-current"` and sits at 0.35
- No lines between items
- Hover: the item's inner `span` scales from 0.65rem to 0.85rem and dims to 0.35. Only the span scales, so rows and hit areas never shift
- All menu motion uses one curve, `cubic-bezier(0.4, 0, 0.6, 1)`: 0.32s to open, 0.24s to close, opacity and scale only. Items fade in 20ms apart. Reference: apple.com
- Hover effects apply only on devices with a cursor. Reduced motion settings turn the motion off
- Hierarchy: W is always larger than the menu items and stays solid black while the menu is open
- Open state: a 90% white mask covers the page so the menu is the focus
- A solid white strip, 5rem tall and full width, sits behind W so content never overlaps it

Markup, for pages one folder deep (root pages drop the `../` and use `index.html` for Home):
```html
<div class="w-nav" id="wNav">
  <a class="w-btn" href="../" aria-label="WUNIAN home and site menu" aria-expanded="false" aria-controls="wMenu">W</a>
  <ul class="w-dropdown" id="wMenu" aria-label="Site navigation">
    <li><a href="../"><span>Home</span></a></li>
    <li><a href="../text/"><span>Texts</span></a></li>
    <li><a href="../projects/" class="w-current"><span>Projects</span></a></li>
    <li><a href="../fragments/"><span>Fragments</span></a></li>
    <li><a href="../about.html"><span>About</span></a></li>
  </ul>
</div>
```
Place it as the first child of `body`, and load `script.js` before `</body>`:
```html
<script src="../script.js" defer></script>
```

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
- Homepage wordmark reveal (max-width animation + opacity fade, ~2.6s). Plays on the first visit only: `localStorage` key `wunian-intro-seen` skips it afterwards
- Navigation link opacity on hover (0.2s ease)
- W menu and its white mask (opacity fade, no movement)
- W menu items scale on hover
- Page edge tension: the browser's native bounce, as on apple.com. Do not imitate it in JavaScript or set `overscroll-behavior` on the page
- Year filter button toggle (instant DOM filter, no animation)

**What does not exist and should not be added:**
- Page transitions or route animations
- Image lightboxes or carousels
- Scroll-triggered animations
- Hover effects that transform, scale, or move elements (the W menu item size change is the only exception)
- Loading spinners or skeleton screens
- Tooltips
- Dropdown menus other than the W menu

The site should feel like a book, not a web application.

---

## Responsive Behavior

The site is not mobile-first but it works at mobile sizes. No breakpoint-driven layout changes except:

- `nav { gap: 1.5rem }` at `max-width: 480px` (homepage)
- Wordmark size: `clamp(5rem, 12vw, 10rem)` (fluid scaling)
- Project containers at 56rem and essay containers at 38rem collapse gracefully at small widths because `max-width` + 2rem side padding gives adequate reading on any screen

Below 60rem (56rem plus 2rem on each side) the shared left edge settles at 2rem.

Touch and phones (reference: apple.com):
- W has an invisible 48px tap area. Year buttons have an enlarged one
- At `max-width: 734px` or on touch screens, menu items are 0.85rem in 48px rows
- At `max-width: 734px` the menu spans the screen and the page behind does not scroll

No complex responsive breakpoints. One menu at every size, only its scale changes. The layout adapts through `max-width` and fluid type.

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
