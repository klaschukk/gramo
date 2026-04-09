# Architecture Overview

## Process model

Gramo is an Electron app with two processes:

```
┌─────────────────────────────────────────┐
│  Main Process (Node.js)                 │
│  src/main/index.ts                      │
│                                         │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ IPC Handlers │  │    Services     │  │
│  │  pdf.ts      │  │  pdf-parser.ts  │  │
│  │  database.ts │  │  database.ts    │  │
│  │  claude.ts   │  │  curriculum.ts  │  │
│  └──────────────┘  │  placement.ts   │  │
│                    │  ai.ts          │  │
│                    └─────────────────┘  │
└─────────────────┬───────────────────────┘
                  │ IPC (contextBridge)
┌─────────────────▼───────────────────────┐
│  Renderer Process (React + TypeScript)  │
│  src/renderer/                          │
│                                         │
│  App → Onboarding → PlacementTest       │
│      → Dashboard → Chapter → Exercise   │
└─────────────────────────────────────────┘
```

## Data flow

1. User action in Renderer (e.g., click "Import PDF")
2. Renderer calls `window.api.importPdf(path)` (preload bridge)
3. IPC handler in main process receives the call
4. Handler calls service layer (pdf-parser, database, etc.)
5. Result returned to renderer

## Key constraints

- Node.js APIs (fs, sqlite, pdfjs) only available in main process
- Renderer is sandboxed — never import Node modules in renderer files
- All cross-process data must be serializable (JSON-compatible)
- SQLite is synchronous (better-sqlite3) — called only from main process
