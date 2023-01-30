import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    preserveSymlinks: false,
    alias: {
        // Make sure *our* version of ag-grid & vue is always loaded.
        // This is needed for `yarn link / npm link` to work and prevent duplicate versions of these libs
        // being loaded
        '@ag-grid-community/core': resolve(__dirname, 'node_modules/@ag-grid-community/core'),
        'vue': resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8081,
    strictPort: true,
    // open: true,
    open: './public/main.html',
    hmr: {
      port: 8081,
      host: 'localhost',
    }, 
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
  },
  build: {
    outDir: resolve(__dirname, './public'),
    rollupOptions: {
      input: {
        // entry point for compilation; normally would be "./index.html"
        app: './public/main.html',
      }
    }
  }
});
