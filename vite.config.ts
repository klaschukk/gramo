import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'
import path from 'path'

const root = path.resolve(__dirname, 'src/renderer')

// VSCode/Claude Code sets ELECTRON_RUN_AS_NODE=1 which breaks Electron main process.
// Must delete it before Electron spawns.
delete process.env.ELECTRON_RUN_AS_NODE

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: path.resolve(__dirname, 'src/main/index.ts'),
        vite: {
          build: {
            outDir: path.resolve(__dirname, 'dist/main'),
            rollupOptions: {
              external: ['better-sqlite3', /^pdfjs-dist/],
            },
          },
        },
      },
      preload: {
        input: path.resolve(__dirname, 'src/main/preload.ts'),
        vite: {
          build: {
            outDir: path.resolve(__dirname, 'dist/main'),
          },
        },
      },
    }),
  ],
  root,
  base: './',
  build: {
    outDir: path.resolve(__dirname, 'dist/renderer'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  server: {
    port: 5173,
  },
})
