import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Production base matches GitHub Pages: https://anniewandi26-dev.github.io/workouthub/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/workouthub/' : '/',
}))
