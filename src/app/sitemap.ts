import { LOCALES } from "@/lib/i18n";
import { getAllPosts, getTagsByLocale } from "@/lib/posts";
import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const allPosts = getAllPosts();

	const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((lang) => [
		{ url: `${SITE_URL}/${lang}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
		{ url: `${SITE_URL}/${lang}/posts`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
		{ url: `${SITE_URL}/${lang}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
		{ url: `${SITE_URL}/${lang}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
	]);

	const postRoutes: MetadataRoute.Sitemap = allPosts.map((p) => ({
		url: `${SITE_URL}${p.permalink}`,
		lastModified: new Date(p.updated ?? p.date),
		changeFrequency: "monthly",
		priority: 0.8,
	}));

	const tagRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((lang) =>
		getTagsByLocale(lang).map((t) => ({
			url: `${SITE_URL}/${lang}/tags/${t}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		}))
	);

	return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
