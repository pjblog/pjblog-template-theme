import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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