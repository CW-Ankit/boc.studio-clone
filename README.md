# Boc.Studio Clone

An exact, pixel-perfect clone of **[boc.studio](https://boc.studio)** reverse-engineered with **REA CLI / MCP**, featuring all routes, interactive animations, smooth scrolling, typography, and self-contained assets.

---

## 🚀 Overview & Features

### 1. Routes & Internationalization
Full support for all site routes across **English (default)**, **Catalan (`/ca`)**, and **Spanish (`/es`)**:
- `/` & `/[locale]`: Signature landing page with full-bleed showreel video overlay, morphing intro preloader, and project catalog.
- `/work` & `/[locale]/work`: Work catalog with category filters and interactive project marquee visual strips.
- `/work/[slug]` & `/[locale]/work/[slug]`: All 9 case studies:
  - `europa`: CE Europa
  - `marmota`: Marmota Audi
  - `chocovic`: Chocovic
  - `alien`: Alien Audi
  - `sport`: Sport
  - `yaba`: Yaba
  - `the-seam`: The Seam
  - `the-champions-burger`: The Champions Burger
  - `incite`: Incite
- `/info` & `/[locale]/info`: Manifesto, founders Jordi Canals & Oriol Bada, services breakdown, client roster, awards, and contact links.
- `/create` & `/[locale]/create`: Service package for new brands.
- `/refresh` & `/[locale]/refresh`: Service package for brand repositioning & identity evolution.
- `/boost` & `/[locale]/boost`: Service package for campaigns, motion design, and generative AI production.

---

### 2. Animations & Effects
- **Intro Preloader Animation**: Signature staggered `Boc.Studio` letter reveal, responsive scaling, and seamless shrinkage into the sticky `BrandBar`.
- **Home Video Showreel Overlay**: Full-screen landing cover playing the showreel video with subtle gradient overlays; dismissed by scrolling down, mouse wheel, swipe, or click to enter the work catalog.
- **Project Marquee Strips**: Continuous horizontal looping marquee strips for every project row, displaying project imagery and assets, with pause-on-hover interaction.
- **Cursor Balloon**: Custom floating glass balloon (`.boc-pill-glass`) that tracks mouse movement, revealing context messages and flashing feedback (e.g., `"Email copied"`).
- **Barcelona Live Clock & Online Status**: Real-time Barcelona CET (`Europe/Madrid`) time display in the header bar with dynamic studio online/offline indicator.
- **Copy Email Interaction**: One-click email copying for `hola@boc.studio` with cursor notification flash.
- **Lenis Smooth Scrolling**: Silk-smooth inertia scrolling across all viewports.
- **Sticky Table of Contents**: Scroll-spy navigation on project case studies tracking `Context`, `Insight`, `Idea`, `Application`, and `Impact`.

---

### 3. Design System & Typography
- **Typography**: Custom `@font-face` setup with authentic **PPMori** (Regular 400 & SemiBold 600).
- **Boc Color Palette**:
  - `boc-orange`: `#ff4421` (Iconic Boc Orange)
  - `boc-canvas`: `#181d21` (Deep dark background)
  - `boc-text-on-canvas`: `#f3f3f3`
  - `boc-muted`: `#adadad`
  - `boc-info-label`: `#85210f`
- **Vector Assets**: Authentic SVG vector paths for the `Boc.Studio ®` wordmark, arrow glyphs, and rings.

---

### 4. Self-Contained Assets
All 220+ high-resolution visual assets have been downloaded and routed locally under `public/`:
- `public/showreel/`: `boc-showreel.mp4`, `boc-showreel.webm`, and poster webp.
- `public/fonts/`: PPMori Regular and SemiBold WOFF2 font files.
- `public/images/sanity/`: All 213 project case study hero, detail, and gallery images.
- `public/icon.png` & `public/apple-icon.png`: Authentic favicon and touch icons.

---

## 🛠️ Running the Project

### Development
```bash
bun run dev
# or: npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
bun run build
bun run start
```
