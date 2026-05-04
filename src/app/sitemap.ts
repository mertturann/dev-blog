import { getAllPosts, getAllTags } from "@/lib/posts";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPosts();
	const tags = getAllTags();

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
		{ url: `${SITE_URL}/posts`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
		{ url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
	];

	const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
		url: `${SITE_URL}${p.permalink}`,
		lastModified: new Date(p.updated ?? p.date),
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	const tagRoutes: MetadataRoute.Sitemap = tags.map((t) => ({
		url: `${SITE_URL}/tags/${t}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.5,
	}));

	return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
