import type { Metadata } from "next";
import type { Post } from "./posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abort.run";
const SITE_NAME = "abort.run";
const SITE_DESCRIPTION =
	"A Senior Software Engineer writing about distributed systems, frontend engineering, and developer tools.";
const TWITTER_HANDLE = "@mertturann";

export const defaultMetadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE_NAME,
		template: `%s — ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	authors: [{ name: "mertturann", url: SITE_URL }],
	openGraph: {
		type: "website",
		siteName: SITE_NAME,
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		creator: TWITTER_HANDLE,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export function buildPostMetadata(post: Post): Metadata {
	return {
		title: post.title,
		description: post.summary,
		openGraph: {
			type: "article",
			title: post.title,
			description: post.summary,
			publishedTime: post.date,
			modifiedTime: post.updated,
			tags: post.tags,
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.summary,
		},
		alternates: {
			canonical: `${SITE_URL}${post.permalink}`,
		},
	};
}

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };
