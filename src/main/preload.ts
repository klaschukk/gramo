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

  // Writing essays
  saveEssay: (chapterId, text) => ipcRenderer.invoke('db:saveEssay', chapterId, text),
  getEssay: (chapterId) => ipcRenderer.invoke('db:getEssay', chapterId),
  getWritingPrompt: (unitNumber) => ipcRenderer.invoke('db:getWritingPrompt', unitNumber),

  // Vocabulary
  getVocabDue: (limit) => ipcRenderer.invoke('db:getVocabDue', limit),
  getVocabStats: () => ipcRenderer.invoke('db:getVocabStats'),
  reviewVocab: (wordId, quality) => ipcRenderer.invoke('db:reviewVocab', wordId, quality),
  getVocabByTopic: () => ipcRenderer.invoke('db:getVocabByTopic'),

  // Mistakes
  logMistake: (exerciseId, userAnswer) => ipcRenderer.invoke('db:logMistake', exerciseId, userAnswer),
  resolveMistake: (exerciseId) => ipcRenderer.invoke('db:resolveMistake', exerciseId),
  getMistakes: (limit) => ipcRenderer.invoke('db:getMistakes', limit),
  getMistakesCount: () => ipcRenderer.invoke('db:getMistakesCount'),
}

contextBridge.exposeInMainWorld('api', api)
