import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: {
        host: 'localhost',
        port: 3000,
      },
    plugins: [
        react(),
        NodeGlobalsPolyfillPlugin({
            buffer: true
        }),
        nodePolyfills({
          protocolImports: true,
        }),
    ],
    alias: {
        stream: 'readable-stream',
    },
    define: {
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        //global: '({})',
        "process.env.TESS_ENV": process.env.ENV,
      },
  };
});