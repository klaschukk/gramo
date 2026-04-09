import path from 'path'
import { app } from 'electron'
import { getDb } from './database'
import { parseMurphyPdf } from './pdf-parser'

// Auto-import Murphy Blue PDF on first launch if no books exist
export async function autoImportBook(): Promise<void> {
  const db = getDb()
  const bookCount = (db.prepare('SELECT COUNT(*) as c FROM books').get() as { c: number }).c
  if (bookCount > 0) return // already imported

  // PDF is bundled at project root in dev, or in resources in production
  const isDev = process.env.NODE_ENV === 'development'
  const pdfPath = isDev
    ? path.join(app.getAppPath(), 'murphy.pdf')
    : path.join(process.resourcesPath, 'murphy.pdf')

  try {
    const parsed = await parseMurphyPdf(pdfPath)

    const bookResult = db
      .prepare('INSERT INTO books (title, author, file_path, total_units) VALUES (?, ?, ?, ?)')
      .run(parsed.title, parsed.author, pdfPath, parsed.chapters.length)

    const bookId = bookResult.lastInsertRowid as number

    const insertChapter = db.prepare(
      `INSERT INTO chapters (book_id, unit_number, title, topic, cefr_level, raw_text)
       VALUES (?, ?, ?, ?, ?, ?)`
    )

    const insertAll = db.transaction((chapters: typeof parsed.chapters) => {
      for (const ch of chapters) {
        insertChapter.run(bookId, ch.unitNumber, ch.title, ch.topic, ch.cefrLevel, ch.rawText)
      }
    })

    insertAll(parsed.chapters)

    // Set as active book and default level
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run('active_book_id', String(bookId))
    db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run('current_level', 'A2')

    console.log(`Auto-imported: ${parsed.chapters.length} units`)
  } catch (err) {
    console.error('Auto-import failed:', err)
  }
}
