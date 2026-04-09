# Placement Test

Cambridge-style diagnostic to determine user's CEFR level before starting the curriculum.

## Flow
1. User sees welcome screen → clicks "Take Placement Test"
2. 30 questions shown one by one (5 per CEFR level: A1–C2)
3. No feedback during test — answer and move on
4. Result screen shows level, score, per-level breakdown
5. Level saved to settings → used to unlock curriculum

## Scoring logic
- 5 questions per level, 30 total
- Final level = highest level where user scored ≥ 60% (≥ 3/5 correct)
- If user scores < 60% at A1 → level is A1 (start from beginning)

## Questions
Seeded in `src/main/services/database.ts` → `seedPlacementQuestions()`.
5 questions per level covering:
- A1: to be, articles, present simple
- A2: past simple, past continuous, present perfect, comparatives
- B1: conditionals, gerunds, passive, wish, past perfect
- B2: verb patterns, third conditional, future passive, adverbs
- C1: inversion, reporting structures, phrasal verbs, as if/though
- C2: near-synonyms, formal register, collocations

## Files
- Questions seeded: `src/main/services/database.ts`
- Scoring: `src/main/services/placement.ts`
- IPC: `src/main/ipc/database.ts` → `db:savePlacementResult`
- UI: `src/renderer/pages/PlacementTest.tsx`
