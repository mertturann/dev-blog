import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const AI_BOTS = [
	"GPTBot",
	"Claude-Web",
	"anthropic-ai",
	"CCBot",
	"Bytespider",
	"Diffbot",
	"ImagesiftBot",
	"omgili",
	"omgilibot",
	"FacebookBot",
	"cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/cdn-cgi/"],
			},
			{
				userAgent: "Googlebot",
				allow: "/",
				disallow: ["/api/", "/cdn-cgi/"],
				crawlDelay: 0,
			},
			{
				userAgent: AI_BOTS,
				disallow: ["/"],
			},
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL,
	};
}
