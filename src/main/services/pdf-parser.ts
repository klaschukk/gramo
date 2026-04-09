import type * as PdfjsType from 'pdfjs-dist'
import type { Chapter, CEFRLevel } from '../../shared/types'

// Unit → CEFR level mapping for Murphy Blue (5th edition, 145 units)
// Approximate — refined as we parse content
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
  // Use legacy build — pdfjs-dist v4 main requires Node 22+, Electron 29 ships Node 20
  const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.mjs')) as typeof PdfjsType
  const loadingTask = pdfjs.getDocument({ url: filePath, useWorkerFetch: false })
  const doc = await loadingTask.promise

  const fullText = await extractFullText(doc)
  const chapters = splitIntoUnits(fullText)

  return {
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    chapters,
  }
}

async function extractFullText(doc: PdfjsType.PDFDocumentProxy): Promise<string> {
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
  const unitPattern = /Unit\s+(\d+)\s+([^\n]+)/gi
  const chapters: Omit<Chapter, 'id' | 'bookId' | 'createdAt'>[] = []

  const matches = [...fullText.matchAll(unitPattern)]

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const unitNumber = parseInt(match[1], 10)
    const title = match[2].trim()

    // Extract text between this unit header and the next
    const start = match.index ?? 0
    const end = matches[i + 1]?.index ?? fullText.length
    const rawText = fullText.slice(start, end).trim()

    chapters.push({
      unitNumber,
      title,
      topic: extractTopic(title),
      cefrLevel: getCEFRForUnit(unitNumber),
      rawText,
      notes: null,
    })
  }

  return chapters
}

function extractTopic(title: string): string {
  // Remove leading/trailing noise, normalize whitespace
  return title.replace(/\s+/g, ' ').trim().slice(0, 100)
}
