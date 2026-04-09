# Gramo

English learning desktop app using Cambridge methodology. Import your textbook PDF, take a placement test, and learn grammar chapter by chapter.

## Features
- Cambridge-style placement test (A1–C2)
- PDF textbook import (Murphy's English Grammar in Use)
- Auto-built curriculum with structured chapters
- Grammar explanations + exercises
- Progress tracking and adaptive difficulty
- Works offline (Claude API optional)

## Stack
Electron + React + TypeScript + SQLite

## Development

```bash
npm install
npm run dev          # start dev servers
npm run electron:dev # launch Electron
```

## Build

```bash
npm run package:mac  # → release/*.dmg
npm run package:win  # → release/*.exe
```

## Docs
See [docs/](docs/) for architecture, feature specs, and progress.
