# Gramo — CLAUDE.md

English learning desktop app (Cambridge methodology + Murphy's Grammar in Use).
Communicate in Russian. Write code/comments/commits in English.

## Stack
- Electron 29 + React 18 + TypeScript 5
- SQLite via better-sqlite3 (local, no cloud)
- pdfjs-dist (PDF text extraction)
- @anthropic-ai/sdk (optional Claude API, user's own key)
- Tailwind CSS + shadcn/ui
- electron-builder → .dmg (macOS) + .exe (Windows)

## Commands
```bash
npm run dev          # start dev (main + renderer in parallel)
npm run electron:dev # launch Electron in dev mode
npm run build        # compile main + renderer
npm run package:mac  # build .dmg
npm run package:win  # build .exe (Windows)
npm test             # run jest tests
npm run lint         # eslint
```

## Project structure
```
src/main/           Electron main process (Node.js, IPC handlers)
src/main/ipc/       IPC channel handlers (pdf, database, claude)
src/main/services/  Business logic (pdf-parser, curriculum, placement, ai)
src/renderer/       React UI (pages + components)
src/shared/         Shared TypeScript types
data/               SQLite DB (gitignored)
docs/               Architecture, features, design, deploy, progress
assets/             App icons
scripts/            Build/utility scripts
tests/              Jest tests
```

## Key docs (read before touching a feature)
- Architecture overview → docs/architecture/overview.md
- Database schema → docs/architecture/database.md
- IPC API reference → docs/architecture/ipc-api.md
- Placement test → docs/features/placement-test.md
- PDF import → docs/features/pdf-import.md
- Curriculum engine → docs/features/curriculum.md
- Exercises → docs/features/exercises.md
- Progress tracking → docs/features/progress.md
- Design system → docs/design/design-system.md
- Packaging & distribution → docs/deploy/packaging.md
- Current status → docs/progress/status.md
- Roadmap → docs/progress/roadmap.md

## IPC pattern
Main process exposes handlers via `ipcMain.handle('channel:action', ...)`.
Renderer calls via `window.api.channelAction(args)` (preload bridge).
Never expose Node.js APIs directly to renderer — always go through preload.

## Database
Single SQLite file at `data/gramo.db`. Schema in docs/architecture/database.md.
Use better-sqlite3 synchronous API in main process only.

## PDF parsing
Murphy Blue (English Grammar in Use, 5th Ed.) — 145 units, TEXT-BASED.
pdfjs-dist extracts text. Unit detection regex: /^Unit\s+(\d+)/i
Parsed data stored in `chapters` table, exercises in `exercises` table.

## Claude API
Completely optional — user provides own API key in Settings.
If no key → app works offline (static exercises only).
If key set → enhanced explanations + generated exercises.
Model: claude-haiku-4-5-20251001 (cheapest, fastest).

## Phases
Phase 1 (MVP): placement test, PDF import, curriculum, static exercises, progress
Phase 2 (AI): Claude API integration, adaptive difficulty, generated exercises
Phase 3 (Polish): UI polish, packaging, distribution

## Critical notes
- All user data stays local (SQLite). Never send data to external servers without explicit consent.
- Placement test uses Cambridge CEFR levels: A1, A2, B1, B2, C1, C2.
- Murphy Blue Unit numbers are 1–145. Part X units are bonus/appendix.
- Commit style: feat:, fix:, docs:, refactor:, test: (conventional commits)
