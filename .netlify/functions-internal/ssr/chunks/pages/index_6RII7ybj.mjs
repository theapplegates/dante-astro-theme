import { A as AstroError, i as UnknownContentCollectionError, f as createComponent, j as renderUniqueStylesheet, k as renderScriptElement, l as createHeadAndContent, r as renderTemplate, n as renderComponent, u as unescapeHTML, e as createAstro, h as addAttribute, m as maybeRenderHead, s as spreadAttributes, o as renderSlot, p as renderHead, q as Fragment } from '../astro_plsSzQLE.mjs';
import 'kleur/colors';
import pLimit from 'p-limit';
import { prependForwardSlash } from '@astrojs/internal-helpers/path';
import 'clsx';
/* empty css                           */
import { marked } from 'marked';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://dante.paulapplegate.com", "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/post-1.md": () => import('../post-1_BofUt-Wv.mjs'),"/src/content/blog/post-10.md": () => import('../post-10_1XLj94ih.mjs'),"/src/content/blog/post-11.md": () => import('../post-11_CJbDV521.mjs'),"/src/content/blog/post-12.md": () => import('../post-12_Db941oHh.mjs'),"/src/content/blog/post-13.md": () => import('../post-13_C5LVvqSN.mjs'),"/src/content/blog/post-14.md": () => import('../post-14_C66lUIZ1.mjs'),"/src/content/blog/post-2.md": () => import('../post-2_BTwwmkkN.mjs'),"/src/content/blog/post-3.md": () => import('../post-3_lR_EAKBs.mjs'),"/src/content/blog/post-4.md": () => import('../post-4_6AkvJDI5.mjs'),"/src/content/blog/post-5.md": () => import('../post-5_ftbmys0M.mjs'),"/src/content/blog/post-6.md": () => import('../post-6_Cz2xLKnG.mjs'),"/src/content/blog/post-7.md": () => import('../post-7_BB0q0PCz.mjs'),"/src/content/blog/post-8.md": () => import('../post-8_BHLbOX-4.mjs'),"/src/content/blog/post-9.md": () => import('../post-9_BCv9vuY6.mjs'),"/src/content/pages/about.md": () => import('../about_BneB_JuO.mjs'),"/src/content/pages/contact.md": () => import('../contact_u84tQs__.mjs'),"/src/content/pages/terms.md": () => import('../terms_CgpB8M_p.mjs'),"/src/content/projects/project-1.md": () => import('../project-1_LWs-mw3E.mjs'),"/src/content/projects/project-2.md": () => import('../project-2_CcdM3o6C.mjs'),"/src/content/projects/project-3.md": () => import('../project-3_CTonQG5M.mjs'),"/src/content/projects/project-4.md": () => import('../project-4_KWREqLcw.mjs'),"/src/content/projects/project-5.md": () => import('../project-5_D1SxBHOI.mjs'),"/src/content/projects/project-6.md": () => import('../project-6_DFLa6xQ8.mjs'),"/src/content/projects/project-7.md": () => import('../project-7_C9npBTWv.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"post-1":"/src/content/blog/post-1.md","post-10":"/src/content/blog/post-10.md","post-13":"/src/content/blog/post-13.md","post-11":"/src/content/blog/post-11.md","post-2":"/src/content/blog/post-2.md","post-3":"/src/content/blog/post-3.md","post-4":"/src/content/blog/post-4.md","post-12":"/src/content/blog/post-12.md","post-5":"/src/content/blog/post-5.md","post-14":"/src/content/blog/post-14.md","post-6":"/src/content/blog/post-6.md","post-7":"/src/content/blog/post-7.md","post-8":"/src/content/blog/post-8.md","post-9":"/src/content/blog/post-9.md"}},"pages":{"type":"content","entries":{"about":"/src/content/pages/about.md","contact":"/src/content/pages/contact.md","terms":"/src/content/pages/terms.md"}},"projects":{"type":"content","entries":{"project-1":"/src/content/projects/project-1.md","project-2":"/src/content/projects/project-2.md","project-3":"/src/content/projects/project-3.md","project-4":"/src/content/projects/project-4.md","project-5":"/src/content/projects/project-5.md","project-6":"/src/content/projects/project-6.md","project-7":"/src/content/projects/project-7.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/post-1.md": () => import('../post-1_C6NfAciL.mjs'),"/src/content/blog/post-10.md": () => import('../post-10_CKHI2Iv6.mjs'),"/src/content/blog/post-11.md": () => import('../post-11_CDSa7Jj9.mjs'),"/src/content/blog/post-12.md": () => import('../post-12_Bhlm-xel.mjs'),"/src/content/blog/post-13.md": () => import('../post-13_CwXk3umQ.mjs'),"/src/content/blog/post-14.md": () => import('../post-14_CKVgmJx8.mjs'),"/src/content/blog/post-2.md": () => import('../post-2_Cfch7yLx.mjs'),"/src/content/blog/post-3.md": () => import('../post-3_DChN-ezW.mjs'),"/src/content/blog/post-4.md": () => import('../post-4_BUMEKwb3.mjs'),"/src/content/blog/post-5.md": () => import('../post-5_D3s7wkam.mjs'),"/src/content/blog/post-6.md": () => import('../post-6_BeJ2aPN_.mjs'),"/src/content/blog/post-7.md": () => import('../post-7_BJjdxuUX.mjs'),"/src/content/blog/post-8.md": () => import('../post-8_BdQL1dvS.mjs'),"/src/content/blog/post-9.md": () => import('../post-9_IP1j1TD7.mjs'),"/src/content/pages/about.md": () => import('../about_DL05VlF6.mjs'),"/src/content/pages/contact.md": () => import('../contact_4CmP_KfC.mjs'),"/src/content/pages/terms.md": () => import('../terms_DRv9iCbI.mjs'),"/src/content/projects/project-1.md": () => import('../project-1_t0-Lld0U.mjs'),"/src/content/projects/project-2.md": () => import('../project-2_B7NTeFb-.mjs'),"/src/content/projects/project-3.md": () => import('../project-3_JoI4oTaB.mjs'),"/src/content/projects/project-4.md": () => import('../project-4_CQD2Lo_b.mjs'),"/src/content/projects/project-5.md": () => import('../project-5_5tESbYVL.mjs'),"/src/content/projects/project-6.md": () => import('../project-6_DUlBp2Qc.mjs'),"/src/content/projects/project-7.md": () => import('../project-7_C_ooFE--.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro$9 = createAstro("https://dante.paulapplegate.com");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/thor3/Documents/dante-astro-theme/node_modules/astro/components/ViewTransitions.astro", void 0);

const siteConfig = {
  title: "Dante",
  subtitle: "Minimal Astro.js theme",
  description: "Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com",
  image: {
    src: "/dante-preview.jpg",
    alt: "Dante - Astro.js and Tailwind CSS theme"
  },
  headerNavLinks: [
    {
      text: "Home",
      href: "/"
    },
    {
      text: "Projects",
      href: "/projects"
    },
    {
      text: "Blog",
      href: "/blog"
    },
    {
      text: "Tags",
      href: "/tags"
    }
  ],
  footerNavLinks: [
    {
      text: "About",
      href: "/about"
    },
    {
      text: "Contact",
      href: "/contact"
    },
    {
      text: "Terms",
      href: "/terms"
    },
    {
      text: "Download theme",
      href: "https://github.com/JustGoodUI/dante-astro-theme"
    }
  ],
  socialLinks: [
    {
      text: "Dribbble",
      href: "https://dribbble.com/"
    },
    {
      text: "Instagram",
      href: "https://instagram.com/"
    },
    {
      text: "X/Twitter",
      href: "https://twitter.com/"
    }
  ],
  hero: {
    title: "Hi There & Welcome to My Corner of the Web!",
    text: "I'm **Ethan Donovan**, a web developer at Amazing Studio, dedicated to the realms of collaboration and artificial intelligence. My approach involves embracing intuition, conducting just enough research, and leveraging aesthetics as a catalyst for exceptional products. I have a profound appreciation for top-notch software, visual design, and the principles of product-led growth. Feel free to explore some of my coding endeavors on <a href='https://github.com/JustGoodUI/dante-astro-theme'>GitHub</a> or follow me on <a href='https://twitter.com/justgoodui'>Twitter/X</a>.",
    image: {
      src: "/hero.jpeg",
      alt: "A person sitting at a desk in front of a computer"
    },
    actions: [
      {
        text: "Get in Touch",
        href: "/contact"
      }
    ]
  },
  subscribe: {
    title: "Subscribe to Dante Newsletter",
    text: "One update per week. All the latest posts directly in your inbox.",
    formUrl: "#"
  },
  postsPerPage: 8,
  projectsPerPage: 8
};

const $$Astro$8 = createAstro("https://dante.paulapplegate.com");
const $$BaseHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { description = "", image = siteConfig.image, pageType = "website" } = Astro2.props;
  const title = [Astro2.props.title, siteConfig.title].filter(Boolean).join(" | ");
  const resolvedImage = image?.src ? {
    src: new URL(image.src, Astro2.site).toString(),
    alt: image.alt
  } : void 0;
  const canonicalURL = new URL(Astro2.request.url, Astro2.site);
  function formatCanonicalURL(url) {
    const path = url.toString();
    const hasQueryParams = path.includes("?");
    if (hasQueryParams) {
      path.replace(/\/?$/, "");
    }
    return path.replace(/\/?$/, hasQueryParams ? "" : "/");
  }
  return renderTemplate`<!-- High Priority Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap" rel="stylesheet"><!-- Low Priority Global Metadata --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS"><!-- Page Metadata --><link rel="canonical"${addAttribute(formatCanonicalURL(canonicalURL), "href")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(pageType, "content")}><meta property="og:url"${addAttribute(formatCanonicalURL(canonicalURL), "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}>${resolvedImage?.src && renderTemplate`<meta property="og:image"${addAttribute(resolvedImage.src, "content")}>`}${resolvedImage?.alt && renderTemplate`<meta property="og:image:alt"${addAttribute(resolvedImage.alt, "content")}>`}<!-- X/Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(formatCanonicalURL(canonicalURL), "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}>${resolvedImage?.src && renderTemplate`<meta property="twitter:image"${addAttribute(resolvedImage.src, "content")}>`}${resolvedImage?.alt && renderTemplate`<meta name="twitter:image:alt"${addAttribute(resolvedImage?.alt, "content")}>`}`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/BaseHead.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const socialLinks = siteConfig.socialLinks || [];
  const navLinks = siteConfig.footerNavLinks || [];
  return renderTemplate`${maybeRenderHead()}<footer class="w-full max-w-3xl mx-auto pt-12 pb-10 sm:pt-24 sm:pb-14"> ${navLinks.length > 0 && renderTemplate`<div class="mb-4 flex flex-wrap gap-x-6 gap-y-1"> ${navLinks.map((link) => renderTemplate`<a class="font-serif hover:underline hover:underline-offset-2"${addAttribute(link.href, "href")}> ${link.text} </a>`)} </div>`} <div${addAttribute([
    "pt-6 flex flex-col gap-4 border-t border-dashed border-main",
    { "sm:flex-row-reverse sm:justify-between sm:items-center": socialLinks.length > 0 }
  ], "class:list")}> ${socialLinks.length > 0 && renderTemplate`<div class="flex flex-wrap gap-x-4 gap-y-1"> ${socialLinks.map((link) => renderTemplate`<a class="inline-flex items-center justify-center text-sm hover:underline hover:underline-offset-2"${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferer"> ${link.text} </a>`)} </div>`} <p class="text-sm">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()}&nbsp;<a class="hover:underline hover:underline-offset-2" href="/">${siteConfig.title}</a>. All rights reserved.
</p> </div> </footer>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/Footer.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="w-full max-w-3xl mx-auto mb-12 sm:mb-16"> ${siteConfig.logo && siteConfig.logo?.src ? renderTemplate`<a href="/"> <img${addAttribute(siteConfig.logo.src, "src")}${addAttribute(siteConfig.logo.alt || "", "alt")} class="max-h-12"> </a>` : renderTemplate`<a class="font-serif text-2xl leading-tight font-medium text-theme-foreground sm:text-4xl" href="/"> ${siteConfig.title} </a>`} ${renderTemplate`<p class="text-sm leading-tight mt-1">${siteConfig.subtitle}</p>`} </header>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/Header.astro", void 0);

const $$Astro$7 = createAstro("https://dante.paulapplegate.com");
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href, class: className, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([className, { "underline underline-offset-2 decoration-1": isActive }], "class:list")}${addAttribute(href, "href")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/NavLink.astro", void 0);

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="theme-toggle" class="w-8 h-8 -mr-2 flex items-center justify-center" aria-label="Change color scheme"> <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <circle cx="8" cy="8" r="8"></circle> </svg> </button>  `;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/ThemeToggle.astro", void 0);

const $$Nav = createComponent(($$result, $$props, $$slots) => {
  const navLinks = siteConfig.headerNavLinks || [];
  return renderTemplate`${maybeRenderHead()}<nav class="min-h-10 pt-4 pb-12 relative sm:min-h-14 sm:pb-24 md:pt-8" data-astro-cid-dmqpwcec> ${navLinks.length > 0 && renderTemplate`<div class="w-full max-w-3xl mx-auto relative" data-astro-cid-dmqpwcec> <button class="menu-toggle w-8 h-8 -ml-1 flex items-center justify-center relative z-30 md:hidden" aria-label="Open Menu" aria-expanded="false" aria-controls="menu-items" data-astro-cid-dmqpwcec> <span class="menu-toggle-icon w-6 h-px relative bg-current" data-astro-cid-dmqpwcec></span> </button> <ul id="menu-items" class="menu flex gap-6" data-astro-cid-dmqpwcec> ${navLinks.map((link) => renderTemplate`<li class="py-1" data-astro-cid-dmqpwcec> ${renderComponent($$result, "NavLink", $$NavLink, { "class": "text-xl font-serif text-main hover:underline hover:underline-offset-2 hover:decoration-1 md:text-base", "href": link.href, "data-astro-cid-dmqpwcec": true }, { "default": ($$result2) => renderTemplate`${link.text}` })} </li>`)} </ul> </div>`} <div class="absolute right-0 top-4 z-10 md:top-8" data-astro-cid-dmqpwcec> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-dmqpwcec": true })} </div> </nav>  `;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/Nav.astro", void 0);

const $$Astro$6 = createAstro("https://dante.paulapplegate.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { showHeader = true, ...head } = Astro2.props;
  return renderTemplate`<html lang="en" class="antialiased break-words"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { ...head })}${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="bg-main text-main"> <div class="flex flex-col min-h-screen px-4 md:px-8"> ${renderComponent($$result, "Nav", $$Nav, {})} ${showHeader && renderTemplate`${renderComponent($$result, "Header", $$Header, {})}`} <main class="grow w-full max-w-3xl mx-auto"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </div> </body></html>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/layouts/BaseLayout.astro", void 0);

const $$Astro$5 = createAstro("https://dante.paulapplegate.com");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, class: className, ...rest } = Astro2.props;
  const buttonClasses = "inline-flex items-center justify-center px-6 py-2 font-serif text-sm leading-tight italic  text-main bg-main border border-main rounded-full transition hover:bg-muted";
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/Button.astro", void 0);

const $$Astro$4 = createAstro("https://dante.paulapplegate.com");
const $$FormattedDate = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/FormattedDate.astro", void 0);

const $$Astro$3 = createAstro("https://dante.paulapplegate.com");
const $$ArrowRight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ArrowRight;
  const { class: className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${addAttribute(className, "class")}${spreadAttributes(props)}> <path d="M4.286 12c0-0.533 0.432-0.964 0.964-0.964v0h11.172l-4.14-4.138c-0.175-0.175-0.283-0.416-0.283-0.683 0-0.533 0.432-0.965 0.965-0.965 0.267 0 0.508 0.108 0.683 0.283v0l5.785 5.785c0.175 0.175 0.283 0.416 0.283 0.683s-0.108 0.508-0.283 0.683l-5.785 5.785c-0.175 0.175-0.416 0.283-0.683 0.283-0.533 0-0.965-0.432-0.965-0.965 0-0.267 0.108-0.508 0.283-0.683v0l4.14-4.138h-11.172c-0.533 0-0.964-0.432-0.964-0.964v0z"></path> </svg>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/icons/ArrowRight.astro", void 0);

const $$Astro$2 = createAstro("https://dante.paulapplegate.com");
const $$PostPreview = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PostPreview;
  const { post, class: className, headingLevel = "h2" } = Astro2.props;
  const { title, publishDate, updatedDate, excerpt } = post.data;
  const TitleTag = headingLevel;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(["flex justify-between items-start gap-8 group", className], "class:list")}${addAttribute(`/blog/${post.slug}/`, "href")}> <div class="grow"> ${renderComponent($$result, "TitleTag", TitleTag, { "class": "text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl" }, { "default": ($$result2) => renderTemplate`${title}` })} <div class="mt-1 text-sm leading-normal"> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": publishDate })} ${updatedDate && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${" "}<span>
(Updated on ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": updatedDate })})
</span> ` })}`} </div> ${excerpt && renderTemplate`<div class="mt-3 text-sm leading-normal">${excerpt}</div>`} </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
Read Post ${renderComponent($$result, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/PostPreview.astro", void 0);

const $$Astro$1 = createAstro("https://dante.paulapplegate.com");
const $$Subscribe = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Subscribe;
  const subscribe = siteConfig.subscribe;
  const { class: className } = Astro2.props;
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<section${addAttribute(["px-8 py-12 flex flex-col items-center border border-dashed border-main text-center sm:px-12 sm:py-16", className], "class:list")}>${renderTemplate`<h2${addAttribute(["w-full max-w-xl text-2xl leading-tight font-serif font-medium sm:text-4xl", "mb-4" ], "class:list")}>${subscribe.title}</h2>`}${renderTemplate`<p class="w-full max-w-xl mb-8 text-sm leading-normal">${subscribe.text}</p>`}<form${addAttribute(subscribe.formUrl, "action")} method="post" id="subscribe-form" name="subscribe-form" class="w-full max-w-xl flex flex-col gap-3.5 sm:flex-row" target="_blank"><label for="email" class="sr-only">
Email Address
</label><input type="email" name="email" id="email" class="w-full h-9 px-5 py-2 text-sm text-main bg-transparent border border-main rounded-full placeholder:text-main/60 focus:outline-none" required="" value="" placeholder="Your email">${renderComponent($$result, "Button", $$Button, { "type": "submit", "name": "subscribe", "class": "w-full h-9 sm:w-auto" }, { "default": ($$result2) => renderTemplate`
Subscribe
` })}</form></section>`}`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/Subscribe.astro", void 0);

function slugify(input) {
  if (!input)
    return "";
  var slug = input.toLowerCase().trim();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();
  slug = slug.replace(/[\s-]+/g, "-");
  return slug;
}

function sortItemsByDateDesc(itemA, itemB) {
  return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}
function getAllTags(posts) {
  const tags = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
  return tags.map((tag) => {
    return {
      name: tag,
      slug: slugify(tag)
    };
  }).filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos;
  });
}
function getPostsByTag(posts, tagSlug) {
  const filteredPosts = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagSlug));
  return filteredPosts;
}

const $$Astro = createAstro("https://dante.paulapplegate.com");
const $$ProjectPreview = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectPreview;
  const { project, class: className, headingLevel = "h2" } = Astro2.props;
  const { title, description } = project.data;
  const TitleTag = headingLevel;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(["flex justify-between items-start gap-8 group", className], "class:list")}${addAttribute(`/projects/${project.slug}/`, "href")}> <div class="grow"> ${renderComponent($$result, "TitleTag", TitleTag, { "class": "text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl" }, { "default": ($$result2) => renderTemplate`${title}` })} ${description && renderTemplate`<div class="mt-1 text-sm leading-normal">${description}</div>`} </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
View Project ${renderComponent($$result, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/ProjectPreview.astro", void 0);

const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const tags = getAllTags(posts).sort((tagA, tagB) => {
    const postCountTagA = getPostsByTag(posts, tagA.slug).length;
    const postCountTagB = getPostsByTag(posts, tagB.slug).length;
    return postCountTagB - postCountTagA;
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Tags", "description": "Explore tag directory for easy navigation and discovery. Find a wide range of topics, articles, and insights organized by tags, making it effortless to locate the content that interests you most.", "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-12 text-2xl font-serif italic sm:mb-16 sm:text-4xl">All Tags</h1> ${tags.map((tag) => {
    const postCount = getPostsByTag(posts, tag.slug).length;
    return renderTemplate`<a class="mb-10 flex justify-between items-start gap-8 group sm:mb-12"${addAttribute(`/tags/${tag.slug}`, "href")}> <div class="grow"> <h2 class="text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl"> ${tag.name} </h2> <div class="mt-1 text-sm leading-normal"> ${postCount} ${postCount === 1 ? "post" : "posts"} </div> </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
View Tag Archive ${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
  })}${renderComponent($$result2, "Subscribe", $$Subscribe, { "class": "my-16 sm:my-24" })} ` })}`;
}, "/Users/thor3/Documents/dante-astro-theme/src/pages/tags/index.astro", void 0);

const $$file$1 = "/Users/thor3/Documents/dante-astro-theme/src/pages/tags/index.astro";
const $$url$1 = "/tags";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const hero = siteConfig.hero;
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<section class="w-full flex flex-col gap-8 mb-16 sm:mb-24">${renderTemplate`<h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${hero.title}</h1>`}${renderTemplate`<figure><img class="w-full"${addAttribute(hero.image.src, "src")} loading="lazy" decoding="async"${addAttribute(hero.image.alt , "alt")}>${hero.image.caption && renderTemplate`<figcaption class="mt-1.5 text-xs sm:text-sm">${hero.image.caption}</figcaption>`}</figure>`}${renderTemplate`<div class="max-w-none prose prose-dante sm:prose-lg">${unescapeHTML(marked.parse(hero.text))}</div>`}${hero.actions && hero.actions.length > 0 && renderTemplate`<div class="flex flex-wrap gap-4">${hero.actions.map((action) => renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": action.href }, { "default": ($$result2) => renderTemplate`${action.text}` })}`)}</div>`}</section>`}`;
}, "/Users/thor3/Documents/dante-astro-theme/src/components/Hero.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const featuredPosts = posts.filter(({ data }) => data.isFeatured);
  const projects = (await getCollection("projects")).sort(sortItemsByDateDesc);
  const featuredProjects = projects.filter(({ data }) => data.isFeatured);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "description": siteConfig.description, "image": siteConfig.image }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${featuredProjects?.length > 0 && renderTemplate`${maybeRenderHead()}<div class="mb-16 sm:mb-24"> <h2 class="mb-12 text-xl font-serif italic sm:mb-16 sm:text-2xl">Projects</h2> ${featuredProjects.map((project) => renderTemplate`${renderComponent($$result2, "ProjectPreview", $$ProjectPreview, { "project": project, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`)} <div class="mt-12 sm:mt-16"> ${renderComponent($$result2, "Button", $$Button, { "href": "/projects" }, { "default": ($$result3) => renderTemplate`View All Projects` })} </div> </div>`}${featuredPosts?.length > 0 && renderTemplate`<div class="mb-16 sm:mb-24"> <h2 class="mb-12 text-xl font-serif italic sm:mb-16 sm:text-2xl">Writing</h2> ${featuredPosts.map((post) => renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": post, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`)} <div class="mt-12 sm:mt-16"> ${renderComponent($$result2, "Button", $$Button, { "href": "/blog" }, { "default": ($$result3) => renderTemplate`View All Posts` })} </div> </div>`}` })}`;
}, "/Users/thor3/Documents/dante-astro-theme/src/pages/index.astro", void 0);

const $$file = "/Users/thor3/Documents/dante-astro-theme/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseLayout as $, siteConfig as a, $$FormattedDate as b, slugify as c, $$Button as d, $$PostPreview as e, $$Subscribe as f, getCollection as g, $$ArrowRight as h, $$ProjectPreview as i, getAllTags as j, getPostsByTag as k, index$1 as l, index as m, sortItemsByDateDesc as s };
