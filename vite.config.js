import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(async () => {
  const tailwindcss = (await import('tailwindcss')).default;
  const autoprefixer = (await import('autoprefixer')).default;

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg'],
        manifest: {
          name: 'KidsEnglish - Learn English!',
          short_name: 'KidsEnglish',
          description: 'A fun English learning app for kids aged 4-6',
          theme_color: '#FFD93D',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            { src: '/favicon.svg', sizes: '192x192', type: 'image/svg+xml' },
            { src: '/favicon.svg', sizes: '512x512', type: 'image/svg+xml' }
          ]
        }
      })
    ],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  };
});
