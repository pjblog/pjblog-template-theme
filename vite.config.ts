import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const pkg = require('./package.json');

const themeConfigs = {
  abc: 123456
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: codixServer } = await import('@codixjs/vite');
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
        manualChunks: {
          vonder: Object.keys(pkg.dependencies).filter(dep => !dep.startsWith('@types/')),
        }
      }
    },
    optimizeDeps: {
      include: ["react/jsx-runtime", "react", "react-dom"],
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        }
      }),
      // antdConfigs,
      codixServer(pkg.config),

      // theme configs mockup
      {
        name: 'theme:configs',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/theme/configs' && req.method.toLowerCase() === 'get') {
              res.setHeader('content-type', 'application/json');
              res.end(JSON.stringify({
                status: 200,
                data: themeConfigs
              }));
            } else {
              next()
            }
          })
        }
      }
    ],
    server: {
      proxy: {
        "/api": {
          changeOrigin: true,
          target: "http://127.0.0.1:8866",
        }
      }
    }
  }
})