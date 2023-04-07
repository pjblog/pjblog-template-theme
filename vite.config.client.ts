import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const pkg = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    base: '/',
    resolve: {
      extensions: [
        '.tsx', 
        '.ts', 
        '.jsx', 
        '.js', 
        '.json', 
        '.less', 
        '.css'
      ],
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {}
        },
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vonder: [
              'react',
              'react-dom',
              '@pjblog/theme'
            ],
          }
        }
      },
    },
    optimizeDeps: {
      include: [
        'react/jsx-runtime', 
        'react', 
        'react-dom', 
        '@pjblog/theme'
      ],
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        }
      })
    ]
  }
})