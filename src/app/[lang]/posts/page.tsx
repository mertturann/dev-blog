import { PostCard } from "@/components/post/PostCard";
import { dict, isValidLocale } from "@/lib/i18n";
import { getPostsByLocale, getTagsByLocale } from "@/lib/posts";
import { buildLocaleMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = await params;
	if (!isValidLocale(lang)) return {};
	const t = dict[lang];
	return buildLocaleMetadata(lang, { title: t.posts.title });
}

export default async function PostsPage({ params }: Props) {
	const { lang } = await params;
	if (!isValidLocale(lang)) notFound();

	const t = dict[lang];
	const posts = getPostsByLocale(lang);
	const tags = getTagsByLocale(lang);

	return (
		<div className="page-enter mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
			<div className="mb-10">
				<h1
					className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
					style={{ color: "var(--fg-primary)", letterSpacing: "-0.03em" }}
				>
					{t.posts.title}
				</h1>
				<p className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
					{posts.length} {t.posts.title.toLowerCase()} · {t.posts.lastUpdated}{" "}
					{new Date(posts[0]?.date ?? Date.now()).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
						month: "long",
						year: "numeric",
					})}
				</p>
			</div>

			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-10">
					{tags.map((tag) => (
						<Link
							key={tag}
							href={`/${lang}/tags/${tag}`}
							className="tag-pill px-2.5 py-1 text-xs font-mono rounded-full transition-all duration-150"
							style={{ background: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)", color: "var(--fg-muted)" }}
						>
							#{tag}
						</Link>
					))}
				</div>
			)}

			<div className="grid sm:grid-cols-2 gap-4">
				{posts.map((post) => <PostCard key={post.slug} post={post} />)}
			</div>
		</div>
	);
}
