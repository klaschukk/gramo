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

### TODO
- [ ] `npm install` — install all dependencies
- [ ] Test PDF import with actual Murphy Blue PDF
- [ ] Seed static exercises for first 10–20 units
- [ ] `tailwind.config.js` setup
- [ ] `postcss.config.js` setup
- [ ] Test full onboarding flow (placement → import → dashboard)
- [ ] Test exercise scoring and progress tracking
- [ ] App icon (assets/icon.icns, assets/icon.ico)

## Phase 2 — AI Layer
- [ ] Claude API integration (explanation + exercise generation)
- [ ] Settings screen (API key input)
- [ ] Adaptive difficulty

## Phase 3 — Polish
- [ ] UI refinements
- [ ] Package as .dmg
- [ ] GitHub Releases
