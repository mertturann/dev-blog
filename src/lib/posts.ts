import postsData from "../../.velite/posts.json";
import pagesData from "../../.velite/pages.json";

// Velite s.toc() produces a nested tree structure
interface VeliteTocItem {
	title: string;
	url: string;
	items: VeliteTocItem[];
}

export interface Post {
	title: string;
	summary: string;
	date: string;
	updated?: string;
	tags: string[];
	draft: boolean;
	featured: boolean;
	slug: string;
	permalink: string;
	content: string;
	toc: VeliteTocItem[];
}

export interface Page {
	title: string;
	slug: string;
	content: string;
}

// Flat heading structure for the TOC sidebar scroll-spy
export interface TocHeading {
	id: string;
	text: string;
	level: number;
}

export function flattenToc(
	items: VeliteTocItem[],
	level = 2,
): TocHeading[] {
	return items.flatMap((item) => [
		{
			id: item.url.replace(/^#/, ""),
			text: item.title,
			level,
		},
		...flattenToc(item.items ?? [], level + 1),
	]);
}

const _posts = postsData as unknown as Post[];
const _pages = pagesData as unknown as Page[];

export function getAllPosts(): Post[] {
	return _posts
		.filter((p) => !p.draft)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(): Post[] {
	return getAllPosts().filter((p) => p.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
	return getAllPosts().find((p) => p.slug === slug);
}

export function getAllTags(): string[] {
	const tagSet = new Set<string>();
	for (const post of getAllPosts()) {
		for (const tag of post.tags) tagSet.add(tag);
	}
	return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): Post[] {
	return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getPageBySlug(slug: string): Page | undefined {
	return _pages.find(
		(p) => p.slug === slug || p.slug === `pages/${slug}`,
	);
}
