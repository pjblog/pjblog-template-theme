const path = require('path');
const clientDictionary = path.resolve(__dirname, 'dist', 'ssr', 'client');

module.exports = {
  static: path.resolve(__dirname, 'dist', 'ssr', 'client'),
  createMiddleware: async (state, version) => {
    const { getAssets } = await import('@codixjs/vite');
    const render = await import('./dist/ssr/server/server.mjs?version=' + version);
    const assets = await getAssets(render.default.prefix, 'src/entries/client.tsx', clientDictionary);
    return async (ctx, next) => {
      const req = ctx.req;
      req.HTMLAssets = assets;
      req.HTMLStates = state;
      const [matched, stream] = render.default.middleware(req);
      if (!matched) return await next();
      ctx.set('Content-type', 'text/html; charset=utf-8');
      ctx.body = stream;
    }
  }
}