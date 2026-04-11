import type { IpcMain } from 'electron'
import { generateExplanation, generateExercises, sendChatMessage } from '../services/ai'

export function registerClaudeHandlers(ipcMain: IpcMain): void {
  ipcMain.handle(
    'claude:generateExplanation',
    async (_e, chapterId: number, question: string): Promise<string> => {
      return generateExplanation(chapterId, question)
    }
  )

  ipcMain.handle(
    'claude:generateExercises',
    async (_e, chapterId: number, count: number) => {
      return generateExercises(chapterId, count)
    }
  )

  ipcMain.handle(
    'claude:sendChatMessage',
    async (_e, message: string, history: { role: string; content: string }[]): Promise<string> => {
      return sendChatMessage(message, history)
    }
  )
}
