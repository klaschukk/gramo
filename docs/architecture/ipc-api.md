# IPC API Reference

All channels are registered via `ipcMain.handle(channel, handler)` and called from renderer via `window.api.*`.

## PDF

### `pdf:selectFile` → `string | null`
Opens file dialog. Returns selected file path or null if cancelled.

### `pdf:import(filePath: string)` → `{ bookId: number; chaptersCount: number }`
Parses PDF, stores book + chapters in SQLite. Sets `active_book_id` in settings.

## Database

### `db:getBooks()` → `Book[]`
All imported books ordered by import date.

### `db:getChapters(bookId)` → `Chapter[]`
All chapters for a book, ordered by unit_number.

### `db:getChapter(chapterId)` → `Chapter`

### `db:getExercises(chapterId)` → `Exercise[]`
Includes parsed `options` array (not raw JSON string).

### `db:getCurriculum(bookId)` → `CurriculumEntry[]`
Chapters with unlock/completion status based on user level and progress.

### `db:getPlacementQuestions()` → `PlacementQuestion[]`
All 30 seeded questions (5 per CEFR level).

### `db:savePlacementResult(answers: Record<number, string>)` → `PlacementResult`
Scores answers, saves result, updates `current_level` setting.

### `db:saveProgress(entry)` → `void`
Saves a chapter or exercise attempt.

### `db:getProgress(chapterId)` → `UserProgress[]`

### `db:getSettings()` → `UserSettings`

### `db:saveSettings(settings: Partial<UserSettings>)` → `void`

## Claude (optional)

### `claude:generateExplanation(chapterId, question)` → `string`
Requires `claude_api_key` set. Uses `claude-haiku-4-5-20251001`.

### `claude:generateExercises(chapterId, count)` → `Exercise[]`
Requires `claude_api_key` set. Returns AI-generated exercises.
