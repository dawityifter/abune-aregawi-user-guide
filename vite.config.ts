import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves a project site from /<repository-name>/. Override with
// GUIDE_BASE=/ for a custom domain or a user/organization site.
const base = process.env.GUIDE_BASE ?? '/abune-aregawi-user-guide/';

export default defineConfig({
  base,
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false, chunkSizeWarningLimit: 1500 },
});
