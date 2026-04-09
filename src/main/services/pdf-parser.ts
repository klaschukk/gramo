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

  const fullText = await extractFullText(doc)
  const chapters = splitIntoUnits(fullText)

  return {
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    chapters,
  }
}

async function extractFullText(doc: import('pdfjs-dist').PDFDocumentProxy): Promise<string> {
  const pages: string[] = []
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
    pages.push(pageText)
  }
  return pages.join('\n')
}

function splitIntoUnits(
  fullText: string
): Omit<Chapter, 'id' | 'bookId' | 'createdAt'>[] {
  // Match only unit headers at the start of a line/section, not inline references.
  // Murphy Blue format: "Unit 1 " followed by a title (capitalized).
  // Avoid matching "Unit 19 A" inside body text or cross-references like "→ Unit 3".
  const unitPattern = /(?:^|\n)\s*Unit\s+(\d{1,3})\s+([A-Z][^\n]{3,80})/g
  const allMatches = [...fullText.matchAll(unitPattern)]

  // Deduplicate: keep only the first occurrence of each unit number
  const seen = new Set<number>()
  const matches = allMatches.filter((m) => {
    const num = parseInt(m[1], 10)
    if (num < 1 || num > 145) return false
    if (seen.has(num)) return false
    seen.add(num)
    return true
  })

  const chapters: Omit<Chapter, 'id' | 'bookId' | 'createdAt'>[] = []

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const unitNumber = parseInt(match[1], 10)
    const title = match[2].trim()

    const start = match.index ?? 0
    const end = matches[i + 1]?.index ?? fullText.length
    const rawText = fullText.slice(start, end).trim()

    // Clean up raw text: collapse multiple spaces, trim lines
    const cleanText = formatRawText(rawText)

    chapters.push({
      unitNumber,
      title: cleanTitle(title),
      topic: cleanTitle(title),
      cefrLevel: getCEFRForUnit(unitNumber),
      rawText: cleanText,
      notes: null,
    })
  }

  // Sort by unit number
  chapters.sort((a, b) => a.unitNumber - b.unitNumber)

  return chapters
}

function cleanTitle(title: string): string {
  return title
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s''(),/&-]/g, '')
    .trim()
    .slice(0, 100)
}

function formatRawText(raw: string): string {
  return raw
    // Collapse 3+ spaces into paragraph break
    .replace(/ {3,}/g, '\n\n')
    // Collapse multiple newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim each line
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim()
}
