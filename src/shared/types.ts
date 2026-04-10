// Shared types between main and renderer processes

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface Book {
  id: number
  title: string
  author: string
  filePath: string
  totalUnits: number
  importedAt: string
}

export interface Chapter {
  id: number
  bookId: number
  unitNumber: number
  title: string
  topic: string
  cefrLevel: CEFRLevel
  rawText: string
  notes: string | null
  createdAt: string
}

export interface Exercise {
  id: number
  chapterId: number
  type: ExerciseType
  question: string
  options: string[] | null  // for multiple-choice
  answer: string
  explanation: string | null
  source: 'static' | 'ai'
  createdAt: string
}

export type ExerciseType =
  | 'multiple-choice'
  | 'fill-in-blank'
  | 'true-false'
  | 'rewrite'

export interface UserProgress {
  id: number
  chapterId: number
  exerciseId: number | null
  score: number           // 0–100
  attempts: number
  completedAt: string
}

export interface PlacementQuestion {
  id: number
  cefrLevel: CEFRLevel
  question: string
  options: string[]
  answer: string
  topic: string
}

export interface PlacementResult {
  level: CEFRLevel
  score: number
  totalQuestions: number
  breakdown: Record<CEFRLevel, { correct: number; total: number }>
}

export interface UserSettings {
  claudeApiKey: string | null
  currentLevel: CEFRLevel | null
  activeBookId: number | null
  theme: 'light' | 'dark'
  dailyGoalMinutes: number
}

export interface CurriculumEntry {
  chapterId: number
  unitNumber: number
  title: string
  cefrLevel: CEFRLevel
  completed: boolean
  score: number | null
  unlocked: boolean
}

// IPC API types (exposed via preload)
export interface GramoAPI {
  // Database / chapters
  getBooks: () => Promise<Book[]>
  getChapters: (bookId: number) => Promise<Chapter[]>
  getChapter: (chapterId: number) => Promise<Chapter>
  getExercises: (chapterId: number) => Promise<Exercise[]>

  // Curriculum
  getCurriculum: (bookId: number) => Promise<CurriculumEntry[]>

  // Placement test
  getPlacementQuestions: () => Promise<PlacementQuestion[]>
  savePlacementResult: (answers: Record<number, string>) => Promise<PlacementResult>

  // Progress
  saveProgress: (entry: Omit<UserProgress, 'id' | 'completedAt'>) => Promise<void>
  getProgress: (chapterId: number) => Promise<UserProgress[]>

  // Settings
  getSettings: () => Promise<UserSettings>
  saveSettings: (settings: Partial<UserSettings>) => Promise<void>

  // Claude (optional)
  generateExplanation: (chapterId: number, question: string) => Promise<string>
  generateExercises: (chapterId: number, count: number) => Promise<Exercise[]>
}
