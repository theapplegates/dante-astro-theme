import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_plsSzQLE.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Thank you for reaching out! Whether you have a question, a suggestion, or just want to share your thoughts, I’m all ears. Feel free to get in touch through any of the methods below:</p>\n<p><em>Email:</em>\nFeel free to drop me an email at <a href=\"mailto:example@example.com\">example@example.com</a>, and I’ll do my best to respond as soon as possible.</p>\n<p><em>Social Media:</em>\nConnect with me on social media as well. Find me on <a href=\"https://twitter.com\">Twitter</a> or <a href=\"https://www.linkedin.com/\">LinkedIn</a>.</p>";

				const frontmatter = {"title":"Get in touch","seo":{"title":"Contact","description":"Get in touch through email or social media! Let me know how I can help."}};
				const file = "/Users/thor3/Documents/dante-astro-theme/src/content/pages/contact.md";
				const url = "/contact";
				function rawContent() {
					return "\nThank you for reaching out! Whether you have a question, a suggestion, or just want to share your thoughts, I'm all ears. Feel free to get in touch through any of the methods below:\n\n_Email:_\nFeel free to drop me an email at [example@example.com](mailto:example@example.com), and I'll do my best to respond as soon as possible.\n\n_Social Media:_\nConnect with me on social media as well. Find me on [Twitter](https://twitter.com) or [LinkedIn](https://www.linkedin.com/).\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
