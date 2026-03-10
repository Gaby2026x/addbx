import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';

/**
 * Vite plugin to serve .js.download files with the correct JavaScript MIME type.
 * The saved Xfinity HTML page references script assets with a .download suffix,
 * which Vite does not recognise by default.
 */
function fixDownloadMime(): Plugin {
  return {
    name: 'fix-download-mime',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url && req.url.endsWith('.js.download')) {
          // Override the Content-Type that will be set by sirv/send
          const origSetHeader = _res.setHeader.bind(_res);
          _res.setHeader = function (name: string, value: string | number | readonly string[]) {
            if (name.toLowerCase() === 'content-type') {
              return origSetHeader(name, 'application/javascript; charset=utf-8');
            }
            return origSetHeader(name, value);
          };
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fixDownloadMime()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: '/',
});