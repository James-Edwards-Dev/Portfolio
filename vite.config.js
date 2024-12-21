import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Portfolio/', // Replace <repository-name> with your repo name
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        project: 'project.html',
      },
    },
  },
});
