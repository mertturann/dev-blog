import type { Metadata } from "next";
import type { Post } from "./posts";
import type { Locale } from "./i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abort.run";
const SITE_NAME = "abort.run";
const SITE_DESCRIPTION =
	"Backend developer writing about systems, tools, and software engineering.";
const TWITTER_HANDLE = "@merttturan0706";

const OG_LOCALE: Record<Locale, string> = {
	en: "en_US",
	tr: "tr_TR",
};

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
	robots: { index: true, follow: true },
};

export function buildLocaleMetadata(locale: Locale, overrides: Partial<Metadata> = {}): Metadata {
	return {
		...defaultMetadata,
		openGraph: {
			...(defaultMetadata.openGraph as object),
			locale: OG_LOCALE[locale],
		},
		alternates: {
			languages: {
				en: `${SITE_URL}/en`,
				tr: `${SITE_URL}/tr`,
			},
		},
		...overrides,
	};
}

export function buildPostMetadata(post: Post, alternatePermalink?: string | null): Metadata {
	const languages: Record<string, string> = {
		[post.locale]: `${SITE_URL}${post.permalink}`,
	};
	if (alternatePermalink) {
		const otherLocale = post.locale === "en" ? "tr" : "en";
		languages[otherLocale] = `${SITE_URL}${alternatePermalink}`;
	}

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
			locale: OG_LOCALE[post.locale as Locale] ?? "en_US",
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.summary,
		},
		alternates: {
			canonical: `${SITE_URL}${post.permalink}`,
			languages,
		},
	};
}

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };
