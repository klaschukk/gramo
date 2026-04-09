# Progress Tracking

## What is tracked
- Per chapter: best score, number of attempts, last completed date
- Per exercise: individual scores (optional, Phase 2)
- Placement test results: level, score, breakdown

## user_progress table
- `exercise_id = null` → chapter-level attempt
- `exercise_id = N` → individual exercise result

## Progress display
- Dashboard: green checkmark + score on completed units
- Dashboard: progress bar at top (completed / total)
- Chapter page: progress history (date + score per attempt)

## Stats (Phase 2 ideas)
- Streak (days studied)
- Daily goal progress (target: 30 min)
- Weak areas by CEFR level (levels with lowest scores)
- Total exercises completed

## Files
- IPC: `db:saveProgress`, `db:getProgress`
- UI: `src/renderer/pages/Progress.tsx`
- Dashboard: `src/renderer/pages/Dashboard.tsx`
