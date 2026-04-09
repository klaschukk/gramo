# Design System

## Philosophy
Clean, minimal, no distractions. Focus on content.
Inspired by Duolingo (gamification) + Notion (clean typography).

## Colors
| token | value | usage |
|-------|-------|-------|
| blue-600 | #2563EB | primary buttons, progress, active states |
| green-500 | #22C55E | completed, correct, progress fill |
| red-400 | #F87171 | wrong answers, errors |
| gray-900 | #111827 | headings, body text |
| gray-500 | #6B7280 | secondary text |
| gray-100 | #F3F4F6 | backgrounds, dividers |

## Typography
- Font: system-ui (Tailwind default) — looks native on macOS/Windows
- Headings: font-bold, text-xl/2xl/3xl/4xl
- Body: text-sm/base, text-gray-700
- Captions: text-xs, text-gray-400

## Spacing
- Page padding: px-6 py-4
- Card padding: px-4 py-3
- Gap between items: space-y-2 / space-y-3

## Components (Phase 2 — extract to components/)
- `Button` — primary/secondary/ghost variants
- `ProgressBar` — animated fill
- `Badge` — CEFR level chip
- `Card` — unit card in dashboard

## Window
- Min size: 900×600
- Default: 1200×800
- No custom titlebar (use native)
