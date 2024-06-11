import { renderers } from './renderers.mjs';
import { manifest } from './manifest_BKZ7okQh.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./chunks/generic_DGZjclQq.mjs');
const _page1 = () => import('./chunks/_slug__Ck7GHS79.mjs');
const _page2 = () => import('./chunks/_.._vYDybqjo.mjs');
const _page3 = () => import('./chunks/_slug__D204xTTp.mjs');
const _page4 = () => import('./chunks/_.._DDi9nRXF.mjs');
const _page5 = () => import('./chunks/rss_BEIZCe1u.mjs');
const _page6 = () => import('./chunks/_.._BYLsLEz-.mjs');
const _page7 = () => import('./chunks/index_Dg-Lh0WR.mjs');
const _page8 = () => import('./chunks/index_CWtSfFpi.mjs');
const _page9 = () => import('./chunks/_.._CjALNVUC.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/[slug].astro", _page1],
    ["src/pages/blog/[...page].astro", _page2],
    ["src/pages/projects/[slug].astro", _page3],
    ["src/pages/projects/[...page].astro", _page4],
    ["src/pages/rss.xml.js", _page5],
    ["src/pages/tags/[slug]/[...page].astro", _page6],
    ["src/pages/tags/index.astro", _page7],
    ["src/pages/index.astro", _page8],
    ["src/pages/[...slug].astro", _page9]
]);
const middleware = (_, next) => next();
const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware
});
const _args = {
    "middlewareSecret": "65b69ace-cb88-4d54-a2dc-6c2b85eec2f2"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
