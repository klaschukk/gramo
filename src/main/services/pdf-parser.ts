// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfjs = require('pdfjs-dist/build/pdf.js') as typeof import('pdfjs-dist')
import type { Chapter, CEFRLevel } from '../../shared/types'

const UNIT_LEVEL_MAP: Record<string, CEFRLevel> = {
  '1-20': 'A2',
  '21-50': 'B1',
  '51-90': 'B1',
  '91-120': 'B2',
  '121-145': 'B2',
}

function getCEFRForUnit(unitNumber: number): CEFRLevel {
  for (const range of Object.keys(UNIT_LEVEL_MAP)) {
    const [min, max] = range.split('-').map(Number)
    if (unitNumber >= min && unitNumber <= max) {
      return UNIT_LEVEL_MAP[range]
    }
  }
  return 'B1'
}

export interface ParsedPdf {
  title: string
  author: string
  chapters: Omit<Chapter, 'id' | 'bookId' | 'createdAt'>[]
}

export async function parseMurphyPdf(filePath: string): Promise<ParsedPdf> {
  const loadingTask = pdfjs.getDocument(filePath)
  const doc = await loadingTask.promise

  const pages = await extractPages(doc)
  const chapters = buildChapters(pages)

  return {
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    chapters,
  }
}

async function extractPages(doc: import('pdfjs-dist').PDFDocumentProxy): Promise<string[]> {
  const pages: string[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
    pages.push(text)
  }
  return pages
}

function buildChapters(pages: string[]): Omit<Chapter, 'id' | 'bookId' | 'createdAt'>[] {
  // Murphy Blue: each unit = 2 pages (lesson + exercises).
  // Find first occurrence of each "Unit N" across all pages.
  // Skip exercise pages and cross-references.
  const chapters = new Map<number, { title: string; rawText: string }>()

  for (const text of pages) {
    const matches = [...text.matchAll(/Unit\s+(\d{1,3})\b/g)]
    if (matches.length === 0) continue

    for (const match of matches) {
      const unitNumber = parseInt(match[1], 10)
      if (unitNumber < 1 || unitNumber > 145 || chapters.has(unitNumber)) continue

      const pos = match.index ?? 0

      // Skip exercise pages: "Exercises" + "N.1" pattern early
      const exercisePattern = new RegExp(`\\b${unitNumber}\\.1\\b`)
      const isExercisePage = exercisePattern.test(text.slice(0, 200))
      if (isExercisePage && text.slice(0, 50).includes('Exercises')) continue
      if (isExercisePage && !text.slice(0, 50).includes('Unit')) continue

      // Skip cross-references: "➜ Unit N", "Units N-M"
      const before = text.slice(Math.max(0, pos - 15), pos)
      if (/[➜→]\s*$/.test(before)) continue
      if (/Units\s+$/.test(before)) continue

      // Extract title from text before "Unit N"
      let title = text.slice(0, pos).trim()
      title = title.replace(/^[A-D]\s+/, '').replace(/[➜→].*$/, '').trim()
      title = title.replace(/Unit\s+\d+.*$/, '').trim()

      if (title.length < 3) {
        const after = text.slice(pos + match[0].length, pos + match[0].length + 200)
        const m = after.match(/^\s*(.{5,80}?)(?:\s{3,}|\.\s|$)/)
        title = m ? m[1].trim() : `Unit ${unitNumber}`
      }

      title = title.replace(/\s+/g, ' ').trim().slice(0, 80)

      const rawText = text.slice(pos + match[0].length).trim()
      chapters.set(unitNumber, { title, rawText: formatRawText(rawText) })
      break
    }
  }

  // Unit 3 special case: shares page 18 with Unit 11 reference
  // If Unit 3 is missing, try to find it more aggressively
  if (!chapters.has(3)) {
    for (const text of pages) {
      const m = text.match(/Present continuous and present simple 1.*?Unit\s+3\b/i)
      if (m) {
        const after = text.slice((m.index ?? 0) + m[0].length).trim()
        chapters.set(3, {
          title: 'Present continuous and present simple 1 (I am doing and I do)',
          rawText: formatRawText(after),
        })
        break
      }
    }
  }

  const result: Omit<Chapter, 'id' | 'bookId' | 'createdAt'>[] = []
  for (const [unitNumber, data] of chapters) {
    result.push({
      unitNumber,
      title: data.title,
      topic: data.title,
      cefrLevel: getCEFRForUnit(unitNumber),
      rawText: data.rawText,
      notes: null,
    })
  }

  result.sort((a, b) => a.unitNumber - b.unitNumber)
  return result
}

function formatRawText(raw: string): string {
  // Clean up PDF extraction artifacts
  let text = raw
    .replace(/ {3,}/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
    .trim()

  // Detect and format sections (A, B, C, D headers in Murphy)
  text = text.replace(/\n([A-D])\s+([A-Z])/g, '\n\n## $2')

  // Format example sentences: lines with italics markers or quoted speech
  text = text.replace(/([''][^'']+[''])/g, '• $1')

  // Limit to ~2000 chars for readability
  if (text.length > 2000) {
    text = text.slice(0, 2000) + '…'
  }

  return text
}
