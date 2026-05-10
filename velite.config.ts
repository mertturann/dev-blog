import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import {
	transformerNotationDiff,
	transformerNotationHighlight,
} from "@shikijs/transformers";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
	name: "Post",
	pattern: "posts/**/*.mdx",
	schema: s
		.object({
			title: s.string().max(120),
			summary: s.string().max(300),
			date: s.isodate(),
			updated: s.isodate().optional(),
			tags: s.array(s.string()).default([]),
			cover: s.image().optional(),
			draft: s.boolean().default(false),
			featured: s.boolean().default(false),
			translationKey: s.string().optional(),
			slug: s.path(),
			content: s.mdx(),
			toc: s.toc(),
		})
		.transform((data) => {
			const withoutPrefix = data.slug.replace(/^posts\//, "");
			const slashIdx = withoutPrefix.indexOf("/");
			const locale = slashIdx !== -1 ? withoutPrefix.slice(0, slashIdx) : "en";
			const slug = slashIdx !== -1 ? withoutPrefix.slice(slashIdx + 1) : withoutPrefix;
			return {
				...data,
				locale,
				slug,
				permalink: `/${locale}/posts/${slug}`,
			};
		}),
});

const pages = defineCollection({
	name: "Page",
	pattern: "pages/**/*.mdx",
	schema: s.object({
		title: s.string(),
		slug: s.path(),
		content: s.mdx(),
	}),
});

export default defineConfig({
	root: "content",
	output: {
		data: ".velite",
		assets: "public/static",
		base: "/static/",
		name: "[name]-[hash:6][ext]",
		clean: true,
	},
	collections: { posts, pages },
	mdx: {
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
					properties: { className: ["anchor"], ariaLabel: "Link to section" },
				},
			],
			[
				rehypePrettyCode,
				{
					theme: "tokyo-night",
					keepBackground: false,
					defaultLang: "plaintext",
					transformers: [
						transformerNotationDiff(),
						transformerNotationHighlight(),
					],
				} satisfies PrettyCodeOptions,
			],
		],
		remarkPlugins: [remarkGfm, remarkSmartypants],
	},
});
