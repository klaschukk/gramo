import { contextBridge, ipcRenderer } from 'electron'
import type { GramoAPI } from '../shared/types'

const api: GramoAPI = {
  // PDF
  importPdf: (filePath) => ipcRenderer.invoke('pdf:import', filePath),
  selectPdfFile: () => ipcRenderer.invoke('pdf:selectFile'),

  // Database / chapters
  getBooks: () => ipcRenderer.invoke('db:getBooks'),
  getChapters: (bookId) => ipcRenderer.invoke('db:getChapters', bookId),
  getChapter: (chapterId) => ipcRenderer.invoke('db:getChapter', chapterId),
  getExercises: (chapterId) => ipcRenderer.invoke('db:getExercises', chapterId),

  // Curriculum
  getCurriculum: (bookId) => ipcRenderer.invoke('db:getCurriculum', bookId),

  // Placement test
  getPlacementQuestions: () => ipcRenderer.invoke('db:getPlacementQuestions'),
  savePlacementResult: (result) => ipcRenderer.invoke('db:savePlacementResult', result),

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
