# WUNIAN — Workflows

## 1. Adding a New Architecture Project

### Step 1: Prepare source files
Source files may be PDFs (diagrams, axonometrics, drawings), PNGs (renders), or JPEGs.

Typical sources:
- `/Volumes/work data/ARCHITECTURE/[year]_[studio]/` — academic work
- `/Volumes/work data/ARCHITECTURE/2024_Lea Architecture/Lea Architecture/[project]/` — Lea work
- `/Volumes/work data/Lea Architecture/` — newer Lea work

### Step 2: Compress and name images

Create destination folder:
```bash
mkdir -p /Users/lesliesheng/wunian.site/image/[slug]
```

**Compression rules:**

| Source type | Orientation | Command |
|-------------|-------------|---------|
| Photo / render | Landscape or square | `--resampleWidth 2000` |
| Photo / render | Portrait | `--resampleHeight 2000` |
| PDF (vector diagrams, axonometrics) | Any | `--resampleWidth 4000` |
| PDF with fine linework (casino-style) | Any | `--resampleWidth 4000` + CSS `max-width: 36rem` |

**Standard compress (photos and renders):**
```bash
sips -s format jpeg -s formatOptions 85 --resampleWidth 2000 \
  "/path/to/source.png" --out "/Users/lesliesheng/wunian.site/image/[slug]/01.jpg"
```

**High-density compress (diagrams and PDFs):**
```bash
sips -s format jpeg -s formatOptions 85 --resampleWidth 4000 \
  "/path/to/source.pdf" --out "/Users/lesliesheng/wunian.site/image/[slug]/01.jpg"
```

**Batch compress from a folder:**
```bash
i=1
for f in /path/to/folder/*.pdf; do
  sips -s format jpeg -s formatOptions 85 --resampleWidth 4000 \
    "$f" --out "$(printf "/Users/lesliesheng/wunian.site/image/[slug]/%02d.jpg" $i)"
  ((i++))
done
```

**Image naming:** Always `01.jpg`, `02.jpg`, `03.jpg` … — sequential, zero-padded to 2 digits.

**When to use `max-width: 36rem`:** When source images are 4000px wide and contain fine linework or dense information. Add to the `<style>` block of the individual project page:
```css
.img-block img { max-width: 36rem; }
```
At 36rem CSS width, a 4000px image renders at ~111px/rem, giving approximately 7× pixel density at standard screen resolution — essentially print quality.

### Step 3: Create the project page

Copy `_docs/PROJECT_TEMPLATE/project.html` to `projects/[slug].html` and fill in:
- `<title>` — "Project Name — WUNIAN"
- `h1` — project name (no all-caps, no hyphens, no em dashes)
- `.project-label` — category ("Projects" or subcategory)
- `.project-meta` — "Location — Context, Year" (e.g., "Lea Architecture — 2025")
- `<p>` — project description (see language rules below)
- `.img-block` + `.caption` — one block per image
- `<a class="return-link">` — always present at bottom

**Slug rules:** lowercase, hyphens between words, no underscores, no special characters.  
Examples: `heights-casino`, `farber-house`, `viva-natatio`

**Project-meta format:**
- Academic: `"Site City, State — Year"` (e.g., "Gowanus, Brooklyn NY — 2023")
- Professional: `"Studio — Year"` or `"Location — Studio, Year"` (e.g., "Lea Architecture — 2025")

### Step 4: Add to the projects index

Open `projects/index.html`. Add a new `<li>` at the correct position (newest year first within each year):

```html
<li class="article-item" data-year="YYYY">
  <span class="article-year">YYYY</span>
  <a class="article-title" href="[slug].html">Project Name</a>
</li>
```

If it's a new year, add a year button in the `.years` div:
```html
<button class="year-btn" data-year="YYYY">YYYY</button>
```
Year buttons should appear in descending order.

---

## 2. Adding a New Text / Reading

### Single text
1. Copy `_docs/PROJECT_TEMPLATE/` and adapt for essay format (max-width 38rem, no images)
2. Add `<a class="return-link" href="./">Return to Texts</a>` at bottom
3. Add entry to `text/index.html`

### Series (e.g., Deleuze reading notes)
Use the `reading-nav` pattern:
```html
<div class="reading-nav">
  <a href="prev-slug.html">← II. Previous Title</a>
  <a href="next-slug.html">IV. Next Title →</a>
</div>
```
- First entry: left side is `<span></span>` (empty, for alignment)
- Last entry: right side is `<span></span>`
- Series label: `<p class="series-label">Series Name — Author</p>`

**Text page structure:**
```
series-label (if series)
h2 (title)
reading-meta (date/context, always at 0.35 opacity)
[content paragraphs]
[blockquotes for citations]
reading-nav (if series)
return-link
```

---

## 3. GitHub Deployment

### Typical commit workflow
```bash
# Stage specific files only — never git add -A (may include large binaries or PDFs)
git add projects/new-project.html image/new-project/
git add projects/index.html   # if index was modified
git commit -m "Add [Project Name] to projects"
git push origin add-section-pages
```

### Branch strategy
- Working branch: `add-section-pages`
- Push to `origin` (remote is `git@github.com:symwww/wunian.github.io.git`)
- GitHub Pages deploys from `main`; merge `add-section-pages` → `main` when ready for public release

### Commit message format
```
Add [Project Name] to projects/texts

Brief description of what changed and why.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

---

## 4. How Claude Should Assist with Imports

When the user says "add [project]" or "make a page for [project]", Claude should:

1. **Ask or confirm:**
   - Project name (as it should appear on site)
   - Year and context (academic vs. professional)
   - Source file locations (folder path on disk)
   - Which files to include and in what order
   - Whether any section headers (h2) are needed between images
   - Brief description and caption text (if user doesn't provide, draft one and confirm)

2. **Determine image type:** renders → 2000px; diagrams/PDFs → 4000px; mixed → handle per file

3. **Do not assume:** always confirm the order and selection of images with the user before compressing. Renaming images after compression is tedious.

4. **Draft captions:** use the colon structure ("Area: content description. Additional note."). Confirm with user.

5. **Write description:** 2–4 sentences, no hyphens, no em dashes, architectural but readable. Confirm before finalizing.

6. **When the user provides a docx for texts:** extract the cohesive student/author response writing; ignore class logistics, assignment prompts, and scheduling notes; correct grammar minimally; do not rewrite voice; remove all hyphens (including compound adjectives).

---

## 5. Editing Existing Pages

### Changing captions or descriptions
Edit the HTML directly. Follow language rules:
- No hyphens (compound adjectives become open compounds or are restructured)
- No em dashes (use colon or new sentence)
- Captions: "Label: description."

### Adding images to an existing project
1. Place new image in `image/[slug]/` with next sequential number
2. Add `<div class="img-block">` + optional `.caption` at the correct position in the HTML

### Renaming images (to insert new ones before existing ones)
1. Rename existing images to new numbers first (highest number first to avoid conflicts):
   ```bash
   mv image/[slug]/02.jpg image/[slug]/03.jpg
   mv image/[slug]/01.jpg image/[slug]/02.jpg
   ```
2. Then add new image as `01.jpg`
3. Update HTML `src` attributes to match

---

## 6. Asset Management

### Image folder location
`/Users/lesliesheng/wunian.site/image/[project-slug]/`

### Source file locations (reference)
| Context | Path |
|---------|------|
| Lea Architecture 2024 | `/Volumes/work data/ARCHITECTURE/2024_Lea Architecture/Lea Architecture/` |
| Lea Architecture 2025 | `/Volumes/work data/Lea Architecture/` |
| Columbia academic | `/Volumes/work data/ARCHITECTURE/[year]_[studio]/` |

### Do not commit to git
- Large source PDFs in `image/`
- Font source files (already in repo via `Akt,Archivo_Black/`)
- `.DS_Store` files
- Portfolio PDFs (the two in `image/` root are pre-existing and should be managed separately)

### File size targets
| Type | Target size |
|------|-------------|
| Standard render (2000px) | 300–800 KB |
| High-density diagram (4000px) | 800 KB–2 MB |
| Avoid exceeding | 3 MB per image |
