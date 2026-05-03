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
  options: string[] | null
  answer: string
  explanation: string | null
  source: 'static'
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
  score: number
  attempts: number
  completedAt: string
}

export interface PlacementQuestion {
  id: number
  cefrLevel: CEFRLevel
  section: 'grammar' | 'reading' | 'error' | 'cloze'
  passage: string | null
  question: string
  options: string[]
  answer: string
  topic: string
}

export interface VocabWord {
  id: number
  word: string
  translation: string
  example: string
  cefrLevel: CEFRLevel
  topic: string
}

export interface VocabProgress {
  wordId: number
  ease: number
  interval: number
  repetitions: number
  nextReview: string
  lastReview: string | null
  lapses: number
}

export interface VocabCard extends VocabWord {
  progress: VocabProgress | null
}

export interface VocabStats {
  total: number
  learned: number
  due: number
  newToday: number
  reviewedToday: number
}

export interface WritingPrompt {
  prompt: string
  checklist: string[]
  minWords: number
}

export interface PlacementResult {
  level: CEFRLevel
  score: number
  totalQuestions: number
  breakdown: Record<CEFRLevel, { correct: number; total: number }>
}

export interface UserSettings {
  currentLevel: CEFRLevel | null
  activeBookId: number | null
  theme: 'light' | 'dark'
  dailyGoalMinutes: number
  focusUnits: number[]
  assessmentNotes: string | null
}

export interface CurriculumEntry {
  chapterId: number
  unitNumber: number
  title: string
  cefrLevel: CEFRLevel
  completed: boolean
  score: number | null
  unlocked: boolean
  exerciseCount: number
}

export interface StudySession {
  id: number
  date: string
  durationSeconds: number
  exercisesDone: number
  startedAt: string
}

export interface StudyStats {
  streak: number
  todayMinutes: number
  totalMinutes: number
  calendar: Record<string, { minutes: number; exercises: number }>
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

  // Study tracking
  logStudyTime: (seconds: number, exercises: number) => Promise<void>
  getStudyStats: () => Promise<StudyStats>

  // Writing essays
  saveEssay: (chapterId: number, text: string) => Promise<void>
  getEssay: (chapterId: number) => Promise<string | null>
  getWritingPrompt: (unitNumber: number) => Promise<WritingPrompt>

  // Vocabulary
  getVocabDue: (limit?: number) => Promise<VocabCard[]>
  getVocabStats: () => Promise<VocabStats>
  reviewVocab: (wordId: number, quality: 0 | 2 | 4 | 5) => Promise<void>
  getVocabByTopic: () => Promise<{ topic: string; total: number; learned: number }[]>

  // Mistakes
  logMistake: (exerciseId: number, userAnswer: string) => Promise<void>
  resolveMistake: (exerciseId: number) => Promise<void>
  getMistakes: (limit?: number) => Promise<Exercise[]>
  getMistakesCount: () => Promise<number>

  // Reading
  getReadingPassages: () => Promise<ReadingPassageWithProgress[]>
  getReadingPassage: (id: string) => Promise<ReadingPassage | null>
  saveReadingProgress: (passageId: string, score: number, total: number) => Promise<void>
}

export type ReadingQuestion = {
  type: 'multiple-choice' | 'true-false-notgiven' | 'fill-in-blank'
  question: string
  options?: string[]
  answer: string
  explanation: string
}

export type ReadingPassage = {
  id: string
  title: string
  cefrLevel: 'B1' | 'B2' | 'C1'
  topic: string
  estimatedMinutes: number
  text: string
  questions: ReadingQuestion[]
}

export type ReadingPassageWithProgress = ReadingPassage & {
  score: number | null
  total: number | null
}
