import { contextBridge, ipcRenderer } from 'electron'
import type { GramoAPI } from '../shared/types'

const api: GramoAPI = {
  getBooks: () => ipcRenderer.invoke('db:getBooks'),
  getChapters: (bookId) => ipcRenderer.invoke('db:getChapters', bookId),
  getChapter: (chapterId) => ipcRenderer.invoke('db:getChapter', chapterId),
  getExercises: (chapterId) => ipcRenderer.invoke('db:getExercises', chapterId),
  getCurriculum: (bookId) => ipcRenderer.invoke('db:getCurriculum', bookId),
  getPlacementQuestions: () => ipcRenderer.invoke('db:getPlacementQuestions'),
  savePlacementResult: (answers) => ipcRenderer.invoke('db:savePlacementResult', answers),
  saveProgress: (entry) => ipcRenderer.invoke('db:saveProgress', entry),
  getProgress: (chapterId) => ipcRenderer.invoke('db:getProgress', chapterId),
  getSettings: () => ipcRenderer.invoke('db:getSettings'),
  saveSettings: (settings) => ipcRenderer.invoke('db:saveSettings', settings),

  // Study tracking
  logStudyTime: (seconds, exercises) => ipcRenderer.invoke('db:logStudyTime', seconds, exercises),
  getStudyStats: () => ipcRenderer.invoke('db:getStudyStats'),

  // AI Chat
  sendChatMessage: (message, history) => ipcRenderer.invoke('claude:sendChatMessage', message, history),
  getChatHistory: () => ipcRenderer.invoke('db:getChatHistory'),
  clearChatHistory: () => ipcRenderer.invoke('db:clearChatHistory'),

  // Claude
  generateExplanation: (chapterId, question) => ipcRenderer.invoke('claude:generateExplanation', chapterId, question),
  generateExercises: (chapterId, count) => ipcRenderer.invoke('claude:generateExercises', chapterId, count),
}

contextBridge.exposeInMainWorld('api', api)
