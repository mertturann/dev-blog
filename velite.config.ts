import rehypeAutolinkHeadings from "rehype-autolink-headings";
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
			slug: s.path(),
			content: s.mdx(),
			toc: s.toc(),
		})
		.transform((data) => ({
			...data,
			slug: data.slug.replace(/^posts\//, ""),
			permalink: `/posts/${data.slug.replace(/^posts\//, "")}`,
		})),
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
					properties: {
						className: ["anchor"],
						ariaLabel: "Link to section",
					},
				},
			],
		],
		remarkPlugins: [remarkGfm, remarkSmartypants],
	},
});
