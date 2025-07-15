/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/components/utils'),
      '@hooks': path.resolve(__dirname, './src/components/utils/hooks'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@styles': path.resolve(__dirname, './src/settings/styles/'),
      '@images': path.resolve(__dirname, './src/images/'),
    },
  },
});
