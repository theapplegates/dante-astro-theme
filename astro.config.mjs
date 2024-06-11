import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: 'https://dante.paulapplegate.com',
  integrations: [mdx(), sitemap(), tailwind({
    applyBaseStyles: false
  })],
 output: "server",
    adapter: netlify({
      imageCDN: true,
      edgeMiddleware: true,
      cacheOnDemandPages: true
    })
  });