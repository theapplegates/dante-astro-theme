
				import createSSRHandler from './entry.mjs';
				export default createSSRHandler({"cacheOnDemandPages":true});
				export const config = { name: "Astro SSR", generator: "@astrojs/netlify@5.3.0", path: "/*", preferStatic: true };
			