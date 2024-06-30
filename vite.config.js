import { defineConfig } from 'vitest/config'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      sourcemap:true
    },
    server: {
        host: 'localhost',
        port: 3000,
      },
    plugins: [
        react(),
        VitePWA({ 
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            devOptions: {
                enabled: true
            }
        }),
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
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.js',
        setupFilesAfterEnv: ['./src/tests/test-utils.js'],
        //reporters: ['html'],
        // browser: {
        //     enabled: false,
        //     name: 'chrome', // browser name is required
        //   },
      },
    define: {
        // By default, Vite doesn't include shims for NodeJS/
        // necessary for segment analytics lib to work
        //global: '({})',
        "process.env.TESS_ENV": process.env.ENV,
      },
      
  };
});