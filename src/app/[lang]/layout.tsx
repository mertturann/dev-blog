import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { dict, isValidLocale, LOCALES } from "@/lib/i18n";
import { getPostsByLocale, getTagsByLocale, buildAlternateMap } from "@/lib/posts";
import { defaultMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = defaultMetadata;

export async function generateStaticParams() {
	return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isValidLocale(lang)) notFound();

	const t = dict[lang];
	const posts = getPostsByLocale(lang).map(({ title, summary, slug, tags, permalink }) => ({
		title,
		summary,
		slug,
		tags,
		permalink,
	}));
	const tags = getTagsByLocale(lang);
	const alternateMap = buildAlternateMap(lang);

	return (
		<>
			<Header posts={posts} tags={tags} lang={lang} t={t.nav} alternateMap={alternateMap} />
			<main className="flex-1 pt-(--header-height)">{children}</main>
			<Footer lang={lang} t={t} />
			<ScrollToTop />
		</>
	);
}
