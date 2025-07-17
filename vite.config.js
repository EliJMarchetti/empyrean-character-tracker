import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';        // your SWC plug‑in
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/empyrean-character-tracker/',             // GitHub Pages sub‑path
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Empyrean Character Tracker',
        short_name: 'Empyrean',
        description: 'Offline tracker for Empyrean TTRPG',
        theme_color: '#000000',
        background_color: '#000000',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});
