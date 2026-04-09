import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { registerPdfHandlers } from './ipc/pdf'
import { registerDatabaseHandlers } from './ipc/database'
import { registerClaudeHandlers } from './ipc/claude'
import { initDatabase } from './services/database'

const isDev = process.env.NODE_ENV === 'development'

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Gramo',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Initialize SQLite database
  initDatabase()

  // Register IPC handlers
  registerDatabaseHandlers(ipcMain)
  registerPdfHandlers(ipcMain)
  registerClaudeHandlers(ipcMain)

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
