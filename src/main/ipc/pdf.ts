import type { IpcMain } from 'electron'
import { dialog } from 'electron'
import { parseMurphyPdf } from '../services/pdf-parser'
import { getDb } from '../services/database'

export function registerPdfHandlers(ipcMain: IpcMain): void {
  ipcMain.handle('pdf:selectFile', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Select PDF textbook',
      filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
      properties: ['openFile'],
    })
    if (result.canceled || result.filePaths.length === 0) return null
    return result.filePaths[0]
  })

  ipcMain.handle(
    'pdf:import',
    async (_e, filePath: string): Promise<{ bookId: number; chaptersCount: number }> => {
      const db = getDb()
      const parsed = await parseMurphyPdf(filePath)

      const bookResult = db
        .prepare(
          'INSERT INTO books (title, author, file_path, total_units) VALUES (?, ?, ?, ?)'
        )
        .run(parsed.title, parsed.author, filePath, parsed.chapters.length)

      const bookId = bookResult.lastInsertRowid as number

      const insertChapter = db.prepare(
        `INSERT INTO chapters (book_id, unit_number, title, topic, cefr_level, raw_text)
         VALUES (?, ?, ?, ?, ?, ?)`
      )

      const insertAll = db.transaction(
        (chapters: typeof parsed.chapters) => {
          for (const ch of chapters) {
            insertChapter.run(
              bookId,
              ch.unitNumber,
              ch.title,
              ch.topic,
              ch.cefrLevel,
              ch.rawText
            )
          }
        }
      )

      insertAll(parsed.chapters)

      // Set as active book
      db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(
        'active_book_id',
        String(bookId)
      )

      return { bookId, chaptersCount: parsed.chapters.length }
    }
  )
}
