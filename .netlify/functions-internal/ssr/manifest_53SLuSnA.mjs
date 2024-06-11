import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import './chunks/astro_plsSzQLE.mjs';
import 'clsx';
import 'html-escaper';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CgilCGG2.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.44hiG3_3.css"}],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CgilCGG2.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.44hiG3_3.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://dante.paulapplegate.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/blog/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/projects/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/projects/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/tags/[slug]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/[slug]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/thor3/Documents/dante-astro-theme/src/utils/data-utils.ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_Cbrc49__.mjs","/src/pages/rss.xml.js":"chunks/pages/rss_BnIdKjCU.mjs","\u0000@astrojs-manifest":"manifest_53SLuSnA.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_D2RRiPMn.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"chunks/_slug__01lwulCA.mjs","\u0000@astro-page:src/pages/blog/[...page]@_@astro":"chunks/_.._DBQpo1Fe.mjs","\u0000@astro-page:src/pages/projects/[slug]@_@astro":"chunks/_slug__BHL2Uawr.mjs","\u0000@astro-page:src/pages/projects/[...page]@_@astro":"chunks/_.._D7OpBjrg.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"chunks/rss_zx5tks7i.mjs","\u0000@astro-page:src/pages/tags/[slug]/[...page]@_@astro":"chunks/_.._D5NO1yyE.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"chunks/index_D7TCXjUd.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_2L6Ty6l4.mjs","\u0000@astro-page:src/pages/[...slug]@_@astro":"chunks/_.._BJDV9678.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-1.md?astroContentCollectionEntry=true":"chunks/post-1_BofUt-Wv.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-10.md?astroContentCollectionEntry=true":"chunks/post-10_1XLj94ih.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-11.md?astroContentCollectionEntry=true":"chunks/post-11_CJbDV521.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-12.md?astroContentCollectionEntry=true":"chunks/post-12_Db941oHh.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-13.md?astroContentCollectionEntry=true":"chunks/post-13_C5LVvqSN.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-14.md?astroContentCollectionEntry=true":"chunks/post-14_C66lUIZ1.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-2.md?astroContentCollectionEntry=true":"chunks/post-2_BTwwmkkN.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-3.md?astroContentCollectionEntry=true":"chunks/post-3_lR_EAKBs.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-4.md?astroContentCollectionEntry=true":"chunks/post-4_6AkvJDI5.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-5.md?astroContentCollectionEntry=true":"chunks/post-5_ftbmys0M.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-6.md?astroContentCollectionEntry=true":"chunks/post-6_Cz2xLKnG.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-7.md?astroContentCollectionEntry=true":"chunks/post-7_BB0q0PCz.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-8.md?astroContentCollectionEntry=true":"chunks/post-8_BHLbOX-4.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-9.md?astroContentCollectionEntry=true":"chunks/post-9_BCv9vuY6.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/about.md?astroContentCollectionEntry=true":"chunks/about_BneB_JuO.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/contact.md?astroContentCollectionEntry=true":"chunks/contact_u84tQs__.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/terms.md?astroContentCollectionEntry=true":"chunks/terms_CgpB8M_p.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-1.md?astroContentCollectionEntry=true":"chunks/project-1_LWs-mw3E.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-2.md?astroContentCollectionEntry=true":"chunks/project-2_CcdM3o6C.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-3.md?astroContentCollectionEntry=true":"chunks/project-3_CTonQG5M.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-4.md?astroContentCollectionEntry=true":"chunks/project-4_KWREqLcw.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-5.md?astroContentCollectionEntry=true":"chunks/project-5_D1SxBHOI.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-6.md?astroContentCollectionEntry=true":"chunks/project-6_DFLa6xQ8.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-7.md?astroContentCollectionEntry=true":"chunks/project-7_C9npBTWv.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-1.md?astroPropagatedAssets":"chunks/post-1_C6NfAciL.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-10.md?astroPropagatedAssets":"chunks/post-10_CKHI2Iv6.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-11.md?astroPropagatedAssets":"chunks/post-11_CDSa7Jj9.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-12.md?astroPropagatedAssets":"chunks/post-12_Bhlm-xel.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-13.md?astroPropagatedAssets":"chunks/post-13_CwXk3umQ.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-14.md?astroPropagatedAssets":"chunks/post-14_CKVgmJx8.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-2.md?astroPropagatedAssets":"chunks/post-2_Cfch7yLx.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-3.md?astroPropagatedAssets":"chunks/post-3_DChN-ezW.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-4.md?astroPropagatedAssets":"chunks/post-4_BUMEKwb3.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-5.md?astroPropagatedAssets":"chunks/post-5_D3s7wkam.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-6.md?astroPropagatedAssets":"chunks/post-6_BeJ2aPN_.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-7.md?astroPropagatedAssets":"chunks/post-7_BJjdxuUX.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-8.md?astroPropagatedAssets":"chunks/post-8_BdQL1dvS.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-9.md?astroPropagatedAssets":"chunks/post-9_IP1j1TD7.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/about.md?astroPropagatedAssets":"chunks/about_DL05VlF6.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/contact.md?astroPropagatedAssets":"chunks/contact_4CmP_KfC.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/terms.md?astroPropagatedAssets":"chunks/terms_DRv9iCbI.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-1.md?astroPropagatedAssets":"chunks/project-1_t0-Lld0U.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-2.md?astroPropagatedAssets":"chunks/project-2_B7NTeFb-.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-3.md?astroPropagatedAssets":"chunks/project-3_JoI4oTaB.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-4.md?astroPropagatedAssets":"chunks/project-4_CQD2Lo_b.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-5.md?astroPropagatedAssets":"chunks/project-5_5tESbYVL.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-6.md?astroPropagatedAssets":"chunks/project-6_DUlBp2Qc.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-7.md?astroPropagatedAssets":"chunks/project-7_C_ooFE--.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-1.md":"chunks/post-1_DKaUPhKC.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-10.md":"chunks/post-10_Buv44DXx.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-11.md":"chunks/post-11_J3QswOzw.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-12.md":"chunks/post-12_C_6sN6Uu.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-13.md":"chunks/post-13_CPfBwehP.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-14.md":"chunks/post-14_CWDXpxIt.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-2.md":"chunks/post-2_iioqM1ip.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-3.md":"chunks/post-3_oDPSWUW-.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-4.md":"chunks/post-4_CCHzGTqx.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-5.md":"chunks/post-5_BC57lKhC.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-6.md":"chunks/post-6_BDINU56d.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-7.md":"chunks/post-7_2wIbXfxm.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-8.md":"chunks/post-8_BRYZCKdV.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/blog/post-9.md":"chunks/post-9_CuGdBtDI.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/about.md":"chunks/about_CMc7YQXn.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/contact.md":"chunks/contact_D1TjfM4T.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/pages/terms.md":"chunks/terms_CI0qpEpl.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-1.md":"chunks/project-1_BqTzmFGd.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-2.md":"chunks/project-2_BeCt_Wc-.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-3.md":"chunks/project-3_k5fFOJzH.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-4.md":"chunks/project-4_KLAz8WGb.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-5.md":"chunks/project-5_Du_bu5km.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-6.md":"chunks/project-6_DTdvzwn7.mjs","/Users/thor3/Documents/dante-astro-theme/src/content/projects/project-7.md":"chunks/project-7_Dutr2L-n.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.AYk-dgCY.js","/astro/hoisted.js?q=1":"_astro/hoisted.CgilCGG2.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.44hiG3_3.css","/about.jpeg","/dante-preview.jpg","/favicon.svg","/hero.jpeg","/post-1.jpg","/post-10.jpg","/post-11.jpg","/post-12.jpg","/post-13.jpg","/post-14.jpg","/post-2.jpg","/post-3.jpg","/post-4.jpg","/post-5.jpg","/post-6.jpg","/post-7.jpg","/post-8.jpg","/post-9.jpg","/project-1.jpg","/project-2.jpg","/project-3.jpg","/project-4.jpg","/project-5.jpg","/project-6.jpg","/project-7.jpg","/_astro/hoisted.AYk-dgCY.js","/_astro/hoisted.CgilCGG2.js"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"experimentalEnvGetSecretEnabled":false});

export { manifest };
