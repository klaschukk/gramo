# Project Status

Last updated: 2026-04-09

## Phase 1 — MVP (current)

### Done
- [x] Project scaffold (Electron + React + TypeScript + SQLite)
- [x] Shared types
- [x] SQLite schema + migrations
- [x] Placement test questions seeded (30 questions, A1–C2)
- [x] Placement test scoring logic
- [x] PDF parser (pdfjs-dist, Murphy Blue structure)
- [x] Curriculum engine (unlock logic)
- [x] IPC layer (pdf, database, claude handlers)
- [x] Preload bridge (window.api)
- [x] All renderer pages (Onboarding, PlacementTest, Dashboard, Chapter, Exercise, Progress)
- [x] Tailwind CSS setup
- [x] `npm install` — all dependencies installed
- [x] `tailwind.config.js` + `postcss.config.js` setup
- [x] Design system: Cyan+Green (light) / Mono+Blue (dark) palettes
- [x] Dark mode toggle (persisted to settings)
- [x] Fonts: Poppins + Open Sans via Google Fonts
- [x] vite-plugin-electron for unified dev/build
- [x] Fix ELECTRON_RUN_AS_NODE breaking main process
- [x] Fix pdfjs-dist ESM/worker compatibility
- [x] electron-rebuild for better-sqlite3
- [x] Seed static exercises for units 1–20 (80 exercises)
- [x] .claude/settings.json + skills

### TODO
- [ ] Test PDF import with actual Murphy Blue PDF
- [ ] Test full onboarding flow (placement → import → dashboard)
- [ ] Test exercise scoring and progress tracking
- [ ] Seed exercises for units 21–50
- [ ] App icon (assets/icon.icns, assets/icon.ico)
- [ ] Push to GitHub + GitLab

## Phase 2 — AI Layer
- [ ] Claude API integration (explanation + exercise generation)
- [ ] Settings screen (API key input)
- [ ] Adaptive difficulty

## Phase 3 — Polish
- [ ] UI refinements
- [ ] Package as .dmg
- [ ] GitHub Releases
