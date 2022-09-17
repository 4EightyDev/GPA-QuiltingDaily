import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
const pageData = {
  '/index.html': {
    title: 'Subscription',
  },
  '/single-issue.html': {
    title: 'Single Issue',
  }
};

export default defineConfig({
     root: resolve(__dirname, 'src'),
     publicDir: resolve(__dirname, 'public'),
     assetsDir: resolve(__dirname, 'src/pages'),
     base: './',
     resolve: {
          alias: {
               '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
          },
     },
     server: {
          port: 8080,
          hot: true
     },
     build: {
          emptyOutDir: true,
          outDir: resolve(__dirname, 'dist'),
          rollupOptions: {
               input: {
                    index: resolve(__dirname, 'src/index.html'),
                    single_issue: resolve(__dirname, 'src/single-issue.html')
               },
          output: {
                    assetFileNames: (assetInfo) => {
                         let extType = assetInfo.name.split('.').at(1);
                         if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                         extType = 'img';
                         }
                         return `assets/${extType}/[name]-[hash][extname]`;
                    },
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
               },
          }
     },
     plugins: [
          handlebars({
               partialDirectory: resolve(__dirname, 'src'),
               context(pagePath) {
                    return pageData[pagePath];
               },
          }),
     ]
})
