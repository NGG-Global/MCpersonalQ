import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // נתיבים יחסיים – עובד תחת תת-הנתיב של GitHub Pages (/MCpersonalQ/).
  base: './',
  build: {
    // בונים אל תיקיית docs/ כדי לאפשר פרסום ב-GitHub Pages ממצב "Deploy from a branch".
    outDir: 'docs',
    emptyOutDir: true,
  },
});
