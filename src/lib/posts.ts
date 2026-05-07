import postsData from "../../.velite/posts.json";
import pagesData from "../../.velite/pages.json";

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
	locale: string;
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

export interface TocHeading {
	id: string;
	text: string;
	level: number;
}

export function flattenToc(items: VeliteTocItem[], level = 2): TocHeading[] {
	return items.flatMap((item) => [
		{ id: item.url.replace(/^#/, ""), text: item.title, level },
		...flattenToc(item.items ?? [], level + 1),
	]);
}

const _all = (postsData as unknown as Post[]).filter((p) => !p.draft);
const _pages = pagesData as unknown as Page[];

function byDate(a: Post, b: Post) {
	return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllPosts(): Post[] {
	return [..._all].sort(byDate);
}

export function getPostsByLocale(locale: string): Post[] {
	return _all.filter((p) => p.locale === locale).sort(byDate);
}

export function getFeaturedPosts(): Post[] {
	return getAllPosts().filter((p) => p.featured);
}

export function getFeaturedPostsByLocale(locale: string): Post[] {
	return getPostsByLocale(locale).filter((p) => p.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
	return getAllPosts().find((p) => p.slug === slug);
}

export function getPostBySlugAndLocale(slug: string, locale: string): Post | undefined {
	return _all.find((p) => p.slug === slug && p.locale === locale);
}

export function getAllTags(): string[] {
	const tagSet = new Set<string>();
	for (const post of _all) {
		for (const tag of post.tags) tagSet.add(tag);
	}
	return Array.from(tagSet).sort();
}

export function getTagsByLocale(locale: string): string[] {
	const tagSet = new Set<string>();
	for (const post of _all.filter((p) => p.locale === locale)) {
		for (const tag of post.tags) tagSet.add(tag);
	}
	return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): Post[] {
	return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getPostsByTagAndLocale(tag: string, locale: string): Post[] {
	return getPostsByLocale(locale).filter((p) => p.tags.includes(tag));
}

/** Returns slugs that have a version in both locales */
export function getAlternateLocale(slug: string, currentLocale: string): string | null {
	const other = _all.find((p) => p.slug === slug && p.locale !== currentLocale);
	return other?.permalink ?? null;
}

export function getPageBySlug(slug: string): Page | undefined {
	return _pages.find((p) => p.slug === slug || p.slug === `pages/${slug}`);
}
