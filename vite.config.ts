import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'Blog.html',
        'blogs/pizza-ratings.html',
        'pages/projects.html',
        'pages/Hobbies.html',
        'pages/Cubing.html',
        'pages/Basketball.html',
        'pages/Gaming.html',
        'pages/BlockRunner.html',
        'pages/Isolation.html',
        'pages/MagicClicker.html',
      ],
    },
  },
})
