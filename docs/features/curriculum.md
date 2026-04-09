# Curriculum Engine

## Concept
Sequential unlocking: study units in order, unlock next when current is completed with score ≥ 70%.

## Unlock rules
1. Units below user's starting level → always unlocked (assumed known)
2. First unit at/above user's level → unlocked immediately
3. Subsequent units → unlocked when previous unit score ≥ 70%

## CurriculumEntry fields
- `chapterId` — SQLite chapter id
- `unitNumber` — unit number (1–145)
- `cefrLevel` — unit's CEFR level
- `completed` — bool (best score ≥ 70%)
- `score` — best score (null if never attempted)
- `unlocked` — whether user can access this unit

## Completion trigger
Progress saved via `db:saveProgress` with `exerciseId = null` = chapter-level score.
Score = % of exercises answered correctly in that session.

## Files
- Logic: `src/main/services/curriculum.ts`
- IPC: `src/main/ipc/database.ts` → `db:getCurriculum`
- UI: `src/renderer/pages/Dashboard.tsx`
