import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nightshift-logistics/',  // IMPORTANT: Must match your repo name
  build: {
    outDir: 'dist',
  }
})