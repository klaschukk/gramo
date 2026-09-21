<div align="center">

<img src="assets/icon.svg" alt="Gramo" width="96">

# Gramo

**Learn English grammar the Cambridge way — from your own textbook.**

Import a textbook PDF, take a placement test and work through it chapter by chapter, offline.

</div>

## Features

- **Placement test** — 30 Cambridge-style questions, A1 to C2, scored to a starting level
- **PDF textbook import** — parses the structure of Murphy's *English Grammar in Use* into units
- **Auto-built curriculum** — chapters unlock as you progress
- **Grammar explanations and exercises** — 80 static exercises for units 1–20 out of the box
- **Progress tracking** with adaptive difficulty
- **Light and dark themes**
- **Works offline**; AI-generated explanations are optional and need your own LLM API key

## Stack

Electron · React · TypeScript · SQLite (better-sqlite3) · pdf.js · Tailwind CSS · Vite

```
src/main/       Electron main process: IPC handlers, PDF parser, database services
src/renderer/   React UI: onboarding, placement test, dashboard, chapters, exercises, progress
src/shared/     types shared by both sides
docs/           architecture, feature specs, design system, roadmap
```

## Development

```bash
npm install
npm run dev            # start the dev servers
npm run electron:dev   # launch Electron
```

## Build

```bash
npm run package:mac    # → release/*.dmg
npm run package:win    # → release/*.exe
```

## Docs

[Architecture](docs/architecture/overview.md) · [Placement test](docs/features/placement-test.md) · [PDF import](docs/features/pdf-import.md) · [Curriculum](docs/features/curriculum.md) · [Design system](docs/design/design-system.md) · [Roadmap](docs/progress/roadmap.md)
