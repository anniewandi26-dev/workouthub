import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Relative base works for local + GitHub Pages (HashRouter).
// Public URL: https://anniewandi26-dev.github.io/workouthub/
export default defineConfig({
  plugins: [react()],
  base: './',
})
