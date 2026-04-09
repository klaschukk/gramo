import { contextBridge, ipcRenderer } from 'electron'
import type { GramoAPI } from '../shared/types'

const api: GramoAPI = {
  // Database / chapters
  getBooks: () => ipcRenderer.invoke('db:getBooks'),
  getChapters: (bookId) => ipcRenderer.invoke('db:getChapters', bookId),
  getChapter: (chapterId) => ipcRenderer.invoke('db:getChapter', chapterId),
  getExercises: (chapterId) => ipcRenderer.invoke('db:getExercises', chapterId),

  // Curriculum
  getCurriculum: (bookId) => ipcRenderer.invoke('db:getCurriculum', bookId),

  // Progress
  saveProgress: (entry) => ipcRenderer.invoke('db:saveProgress', entry),
  getProgress: (chapterId) => ipcRenderer.invoke('db:getProgress', chapterId),

  // Settings
  getSettings: () => ipcRenderer.invoke('db:getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('db:saveSettings', settings),

  // Claude (optional)
  generateExplanation: (chapterId, question) =>
    ipcRenderer.invoke('claude:generateExplanation', chapterId, question),
  generateExercises: (chapterId, count) =>
    ipcRenderer.invoke('claude:generateExercises', chapterId, count),
}

contextBridge.exposeInMainWorld('api', api)
