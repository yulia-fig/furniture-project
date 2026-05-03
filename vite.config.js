import { defineConfig } from 'vite';
import { globSync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(() => {
  return {
    // Project structure
    root: '.',

    // Build settings for Vercel
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,

      rollupOptions: {
        input: globSync('./src/*.html'),

        output: {
          // Split vendor code (node_modules)
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },

          // JS output naming
          entryFileNames: (chunkInfo) => {
            return chunkInfo.name === 'commonHelpers'
              ? 'commonHelpers.js'
              : '[name].js';
          },

          // Assets output naming
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },

    // Plugins
    plugins: [
      injectHTML(),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});