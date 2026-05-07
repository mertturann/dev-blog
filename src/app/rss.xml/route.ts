import { getPostsByLocale } from "@/lib/posts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
	const posts = getPostsByLocale("en");

	const items = posts
		.map(
			(post) => `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <description><![CDATA[${post.summary}]]></description>
    <link>${SITE_URL}${post.permalink}</link>
    <guid>${SITE_URL}${post.permalink}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    ${post.tags.map((t) => `<category>${t}</category>`).join("\n    ")}
  </item>`,
		)
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
}
