import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base: GitHub Pages /docs + HashRouter resolve assets correctly.
export default defineConfig({
  plugins: [react()],
  base: './',
})
