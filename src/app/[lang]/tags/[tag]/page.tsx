import { PostCard } from "@/components/post/PostCard";
import { dict, isValidLocale } from "@/lib/i18n";
import { getTagsByLocale, getPostsByTagAndLocale, getPostsByLocale } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ lang: string; tag: string }> }

export async function generateStaticParams() {
	const { LOCALES } = await import("@/lib/i18n");
	return LOCALES.flatMap((lang) =>
		getTagsByLocale(lang).map((tag) => ({ lang, tag }))
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params;
	return { title: `#${tag}`, description: `Posts tagged with ${tag}` };
}

export default async function TagPage({ params }: Props) {
	const { lang, tag } = await params;
	if (!isValidLocale(lang)) notFound();

	const t = dict[lang];
	const posts = getPostsByTagAndLocale(tag, lang);
	if (posts.length === 0) notFound();

	return (
		<div className="page-enter mx-auto max-w-5xl px-4 sm:px-6 py-16">
			<Link
				href={`/${lang}/posts`}
				className="inline-flex items-center gap-1.5 text-xs font-mono mb-8 transition-colors"
				style={{ color: "var(--fg-muted)" }}
			>
				<ArrowLeft size={12} /> {t.tags.allPosts}
			</Link>

			<div className="mb-10">
				<h1
					className="text-3xl font-bold tracking-tight mb-2"
					style={{ color: "var(--fg-primary)", letterSpacing: "-0.03em" }}
				>
					<span style={{ color: "var(--accent-primary)" }}>#</span>{tag}
				</h1>
				<p className="text-sm font-mono" style={{ color: "var(--fg-muted)" }}>
					{posts.length} {t.posts.title.toLowerCase()}{posts.length !== 1 && lang === "en" ? "s" : ""}
				</p>
			</div>

			<div className="grid sm:grid-cols-2 gap-4">
				{posts.map((post) => <PostCard key={post.slug} post={post} />)}
			</div>
		</div>
	);
}
