# PDF Import

## Supported textbook
Murphy's English Grammar in Use, 5th Edition (Blue) — 145 units, TEXT-BASED PDF.
Confirmed: text is extractable via pdfjs-dist without OCR.

## Flow
1. Onboarding step 2: user clicks "Select PDF"
2. Electron `dialog.showOpenDialog` opens file picker
3. `parseMurphyPdf(filePath)` extracts text page by page
4. Text split into units by regex: `/Unit\s+(\d+)\s+([^\n]+)/gi`
5. Each unit stored as a chapter in SQLite
6. Book set as `active_book_id` in settings

## Unit → CEFR level mapping (Murphy Blue approximate)
| Units | Level |
|-------|-------|
| 1–20 | A2 |
| 21–90 | B1 |
| 91–145 | B2 |

This is approximate. Refinement: manually map specific units in `UNIT_LEVEL_MAP` in `pdf-parser.ts`.

## Parser limitations
- Regex-based unit detection — works for Murphy's structure, may miss edge cases
- First 145 matches taken as units; appendix/reference pages ignored
- `rawText` includes all text between unit headers (including exercises text from PDF)

## Files
- Parser: `src/main/services/pdf-parser.ts`
- IPC handler: `src/main/ipc/pdf.ts`
- UI: `src/renderer/pages/Onboarding.tsx` → `ImportBook`
