import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";
import { defineCollection, defineConfig, s } from "velite";

// Wraps each <pre class="shiki"> in an IDE-style chrome:
// window dots + filename tab + language badge
function rehypeIDEChrome() {
	return (tree: Root) => {
		visit(tree, "element", (node: Element, index, parent) => {
			if (
				node.tagName !== "pre" ||
				!parent ||
				index === undefined
			) return;

			const classes = (node.properties?.className as string[]) ?? [];
			if (!classes.includes("shiki")) return;

			const meta = (node.properties?.["dataMetastring"] as string) ?? "";

			const titleMatch = meta.match(/title="([^"]+)"/);
			const filename = titleMatch?.[1] ?? null;

			const lang = classes
				.find((c) => c.startsWith("language-"))
				?.replace("language-", "") ?? null;

			const dots: Element = {
				type: "element",
				tagName: "div",
				properties: { className: ["shiki-dots"] },
				children: [
					{ type: "element", tagName: "span", properties: { className: ["dot", "dot-red"] }, children: [] },
					{ type: "element", tagName: "span", properties: { className: ["dot", "dot-yellow"] }, children: [] },
					{ type: "element", tagName: "span", properties: { className: ["dot", "dot-green"] }, children: [] },
				],
			};

			const filenameEl: Element = {
				type: "element",
				tagName: "span",
				properties: { className: ["shiki-filename"] },
				children: filename ? [{ type: "text", value: filename }] : [],
			};

			const langEl: Element = {
				type: "element",
				tagName: "span",
				properties: { className: ["shiki-lang"] },
				children: lang ? [{ type: "text", value: lang }] : [],
			};

			const header: Element = {
				type: "element",
				tagName: "div",
				properties: { className: ["shiki-header"] },
				children: [dots, filenameEl, langEl],
			};

			const wrapper: Element = {
				type: "element",
				tagName: "div",
				properties: { className: ["shiki-wrapper", "not-prose"] },
				children: [header, { ...node }],
			};

			parent.children[index] = wrapper;
		});
	};
}

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
					properties: { className: ["anchor"], ariaLabel: "Link to section" },
				},
			],
			[
				rehypeShiki,
				{
					theme: "tokyo-night",
					// Keep the metastring as a data attribute so our plugin can read it
					parseMetaString(meta: string) {
						return { dataMetastring: meta };
					},
				},
			],
			// Must run AFTER rehypeShiki so <pre class="shiki"> already exists
			rehypeIDEChrome,
		],
		remarkPlugins: [remarkGfm, remarkSmartypants],
	},
});
