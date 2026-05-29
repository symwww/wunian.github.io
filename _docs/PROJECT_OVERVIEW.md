# WUNIAN — Project Overview

## Identity

**WUNIAN** (无念, *wú niàn*) is a personal archive and publication platform operated by Leslie Sheng. The name refers to a state of non-thought — awareness without grasping — which positions the site philosophically against the anxiety of self-presentation. The site accumulates work, it does not perform it.

The site is not a portfolio. It functions more like an archive or an independent publication: a place where work is deposited honestly, made available to anyone who wants to read it, and organized so that the full shape of a practice becomes visible over time. Individual projects and texts are treated as entries in a running record rather than selected highlights.

---

## Owner Background

- **Name:** Leslie Sheng
- **Education:** Columbia University GSAPP, M.S. Advanced Architectural Design (MSAAD), graduated 2024
- **Current role:** Lea Architecture, New York (2025–)
- **Practice interests:** ecological systems, water infrastructure, adaptive reuse, urban idleness, materiality in representation

---

## Sections

### Projects
Architecture and design work. Organized by year, newest first. Currently spans:
- **2026** — Wunian Night 01 (event documentation)
- **2025** — Professional work at Lea Architecture: Colebrookdale train station, Heights Casino interiors, Saint Ann's School Farber Building, Melrose rowhouse, Education Competition
- **2024** — Columbia thesis-adjacent work: Redhook Rain Story (biowall facade), Halophilic Island (Dead Sea salt architecture)
- **2023** — Viva Natatio (Gowanus bathhouse/water filtration center)
- **2022** — Hinge House, Idle Village (BQE cap masterplan)

### Texts
Written work: reading notes, essays, criticism. Currently spans:
- **2026** — "What is Wunian?" (founding essay)
- **2021** — "On Cinema — Deleuze" series (8 reading notes from Fall 2021 film theory course on Cinema 1 and Cinema 2)

### Planned / In Progress
- **Fragments** — shorter notes, observations, sketches
- **Archive** — pre-2022 work, older projects
- **Music** — audio work (WN 01 already uploaded, not yet published on site)

---

## Aesthetic Direction

The site is built around a single visual logic: **the printed page at rest.** Black text on white. No color. No decoration. The only visual hierarchy is weight, size, and opacity. Images are the primary content — the design is engineered to get out of their way.

This is a deliberate rejection of the dominant portfolio aesthetic: no card grids, no thumbnail hovers, no call-to-action buttons, no project count badges. The site does not try to be impressive. It tries to be honest.

Editorial precedents: Perspecta, Daidalos, Log, San Rocco, Dogma publications. The kind of architecture publication that is designed to be read, not browsed.

---

## Publishing Philosophy

1. **Completeness over curation.** Work is published in full, including its awkwardness.
2. **Chronological accumulation.** The archive grows forward. Nothing is hidden or removed.
3. **Discipline-agnostic.** Architecture, writing, music, and other media coexist without hierarchy.
4. **No audience capture.** The site has no analytics, no social sharing, no SEO optimization beyond basic meta tags. It is findable but not optimized for finding.
5. **No vendor lock-in.** Everything is in plain HTML and can be opened, edited, or migrated without any tool.

---

## Technical Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Markup | HTML5, hand-coded | Direct control, no abstraction |
| Styling | CSS3, one global file + per-page overrides | Minimal footprint |
| Scripting | Vanilla JS (only year-filter and homepage animation) | No dependencies |
| Fonts | Self-hosted (Akt variable + Archivo Black) | No external requests |
| Images | JPEG via `sips` compression | Fast, compatible |
| Hosting | GitHub Pages (CNAME: wunian.site) | Free, reliable, version-controlled |
| Deployment | Git push to `origin` (symwww/wunian.github.io) | Simple, traceable |

No CMS. No build pipeline. No npm. No framework. The site is edited as files.

---

## Current Goals (2025–2026)

- Complete the Lea Architecture professional work section (2025 projects)
- Grow the Texts section with more critical writing
- Publish WN 01 audio to the Music section
- Build out Fragments as a lighter-weight publication format
- Consolidate the Archive section with pre-2022 student work

---

## Long-Term Vision

WUNIAN is intended to function as a durable record of a creative practice over decades, not a snapshot of current work. The archive model means it never needs to be "relaunched" or "refreshed" — it simply grows. The goal is that in ten years, the full arc of a practice is visible in one place, in a form that still renders perfectly in any browser without modification.

The site should eventually support at minimum four channels: built/designed work, critical writing, music/sound, and documentation of events and collaborations. All channels coexist under the same visual logic and the same publishing philosophy.
