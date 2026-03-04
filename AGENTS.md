# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Glossary for Journalists is a free, open-source glossary of AI terms for journalists, built for the NICAR 2026 session. It's a fork of [moneyinpolitics.wtf](https://github.com/palewire/moneyinpolitics.wtf) adapted for AI concepts.

It is built by Ryan Serpico, Jon Keegan and Libby Seline.

Live site: [aiglossary.news](https://aiglossary.news/)

## Commands

- **Dev server:** `npm start` (runs at localhost:3000 with hot reload)
- **Production build:** `npm run build`
- **Pre-commit:** lint-staged runs Prettier on staged `.js`, `.md`, `.scss` files automatically

There are no test commands configured.

## Architecture

**Stack:** Baker static site generator (`@datagraphics/baker`) + Svelte 4 components + TypeScript + SCSS

### Data Flow

1. Glossary terms are stored as individual YAML files in `_data/dictionary/` (one file per term)
2. `baker.config.js` reads all YAML files at build time and generates:
   - Individual detail pages from `_layouts/word-detail.html`
   - A JSON API at `/api/dictionary.json`
   - `sitemap.xml` and `robots.txt`
3. The index page fetches `/api/dictionary.json` client-side and renders a searchable card list via Svelte

### Key Directories

- `_data/dictionary/` — YAML term definitions (the core content)
- `_data/meta.aml` — Site metadata (name, bylines, dates, social image)
- `_layouts/` — Nunjucks HTML templates (`base.html`, `word-detail.html`, etc.)
- `scripts/` — TypeScript entrypoints (`index.ts`, `detail.ts`, `about.ts`)
- `scripts/components/` — Svelte components (`CardList.svelte`, `Card.svelte`)
- `styles/` — SCSS organized by component, with variables for colors/fonts
- `baker.config.js` — Build config, Nunjucks filters, dynamic page generation

### YAML Term Format

```yaml
word: machine learning
type: noun
tags:
  - Foundational concepts
  - Using AI as a tool
definition_list:
  - text: plain language definition with [markdown](links)
    image:
      src: assets/images/definition/example.png
      alt: Description of the image
      caption: Credit or caption text
      credit_url: https://source-url.com
    in_use:
      - text: quoted example with _italicized_ term
        source: Publication Name
        url: https://source-url.com
```

Tags are optional. Valid values: `Foundational concepts`, `Reporting on AI`, `Using AI as a tool`. A term can have multiple tags.

The `image` field is optional. When present, `src` and `alt` are required; `caption` and `credit_url` are optional. Images go in `/assets/images/definition/`.

File naming: lowercase, hyphens for spaces (e.g., `machine-learning.yaml`).

## Deployment

GitHub Actions deploys to GitHub Pages on push to `main`. The build workflow generates a CNAME file and `.nojekyll` marker.
