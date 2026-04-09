import type { GramoAPI } from '@shared/types'

declare global {
  interface Window {
    api: GramoAPI
  }
}
