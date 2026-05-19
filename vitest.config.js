import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: false,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    include: ['src/**/*.test.{js,jsx}'],
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
