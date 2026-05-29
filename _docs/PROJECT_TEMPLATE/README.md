# WUNIAN — Project Template Guide

## Files in this directory

| File | Purpose |
|------|---------|
| `project.html` | Copy-paste HTML template for architecture project pages |
| `content.md` | Markdown content scaffold (fill in, then convert to HTML) |
| `README.md` | This file |

---

## When to use these templates

Use `project.html` when adding any new entry to `projects/`. Use the essay structure in `content.md` when adding a new text to `text/`.

---

## Folder structure convention

```
wunian.site/
├── projects/
│   └── [slug].html          ← copy from project.html, fill in
├── text/
│   └── [slug].html          ← build from essay pattern
└── image/
    └── [slug]/
        ├── 01.jpg
        ├── 02.jpg
        └── ...
```

**Slug rules:**
- Lowercase letters and hyphens only
- No underscores, no numbers at start, no special characters
- Match the HTML filename: `heights-casino.html` → `image/heights-casino/`
- Match the index href: `href="heights-casino.html"`

**Examples of correct slugs:**
```
heights-casino
viva-natatio
farber-house
redhook-rain-story
halophilic-island
idle-village
```

---

## Image naming convention

Images in each project folder are named sequentially:
```
01.jpg   ← first image (cover / primary)
02.jpg
03.jpg
...
```

- Always 2-digit zero-padded
- Always `.jpg` (JPEG format via sips)
- Order matches display order on the project page
- Do not skip numbers
- Do not use descriptive filenames (use alt text in HTML for description)

---

## Compression reference

```bash
# Standard render or photo (landscape)
sips -s format jpeg -s formatOptions 85 --resampleWidth 2000 SOURCE --out 01.jpg

# Standard render or photo (portrait)
sips -s format jpeg -s formatOptions 85 --resampleHeight 2000 SOURCE --out 01.jpg

# Technical diagram or PDF (high density, fine linework)
sips -s format jpeg -s formatOptions 85 --resampleWidth 4000 SOURCE --out 01.jpg
# → also add to <style>: .img-block img { max-width: 36rem; }
```

---

## Adding to the index

After creating the page, add to `projects/index.html`:

```html
<!-- Inside <ul class="article-list">, newest first within each year -->
<li class="article-item" data-year="2025">
  <span class="article-year">2025</span>
  <a class="article-title" href="your-slug.html">Your Project Title</a>
</li>
```

If this is a new year, add to the `.years` div:
```html
<button class="year-btn" data-year="2025">2025</button>
```

---

## Project-meta format reference

| Context | Format |
|---------|--------|
| Lea Architecture | `Lea Architecture — 2025` |
| Academic + location | `Gowanus, Brooklyn NY — 2023` |
| Academic + specific site | `Dead Sea — 2024` |
| Professional + location | `Colebrookdale Railroad, PA — Lea Architecture, 2025` |

---

## Caption format reference

Captions use a colon to separate the label from the description:

```
Label: brief description of content. Additional note if needed.
```

Examples:
```
Public A: reception and dispatch. Workstations, filing storage, and a private office alcove.
Site plan: halfway house cluster (North), standard housing (center), and artist foundation (South).
Building section: vertical layers of program through the Grain Terminal.
Water movement: rainwater collection, filtration system integration, and renewable energy recovery.
```

**Never use:**
- Hyphens (including compound adjectives)
- Em dashes (use colon or new sentence)
- Parenthetical dashes

---

## Essay / reading page structure (text/)

```html
<p class="series-label">Series Name — Author</p>   ← omit if standalone
<h2>Title</h2>
<p class="reading-meta">Context, Date</p>

<p>Body paragraph...</p>
<p>Body paragraph...</p>

<blockquote>
  <p>"Quoted passage." (Author, p. XX)</p>
</blockquote>

<p>Body paragraph...</p>

<!-- For series: -->
<div class="reading-nav">
  <a href="prev.html">← II. Previous Title</a>
  <a href="next.html">IV. Next Title →</a>
</div>

<a class="return-link" href="./">Return to Texts</a>
```

Reading-nav edge cases:
- First entry: `<span></span>` on the left (no prev link)
- Last entry: `<span></span>` on the right (no next link)
