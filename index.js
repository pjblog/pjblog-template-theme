const path = require('path');
const clientDictionary = path.resolve(__dirname, 'dist', 'ssr', 'client');
const PKG = require('./package.json');

module.exports = (state) => {
  return async (ctx, next) => {
    const { getAssets } = await import('@codixjs/vite');
    const render = await import('./dist/ssr/server/server.mjs?version=' + PKG.version);
    const assets = await getAssets(render.default.prefix, 'src/entries/client.tsx', clientDictionary);
    const req = ctx.req;
    req.HTMLAssets = assets;
    req.HTMLStates = state;
    const [matched, stream] = render.default.middleware(req);
    if (!matched) return await next();
    ctx.type === '.html';
    ctx.body = stream;
  }
}