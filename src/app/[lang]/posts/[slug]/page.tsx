import { Comments } from "@/components/post/Comments";
import { ReadingProgress } from "@/components/post/ReadingProgress";
import { TOC } from "@/components/post/TOC";
import { MDXContent } from "@/components/mdx/MDXContent";
import { formatDate } from "@/lib/utils";
import { dict, isValidLocale } from "@/lib/i18n";
import { getPostsByLocale, getPostBySlugAndLocale, flattenToc, getAlternateLocale } from "@/lib/posts";
import { buildPostMetadata } from "@/lib/seo";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
	const { LOCALES } = await import("@/lib/i18n");
	return LOCALES.flatMap((lang) =>
		getPostsByLocale(lang).map((p) => ({ lang, slug: p.slug }))
	);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang, slug } = await params;
	if (!isValidLocale(lang)) return {};
	const post = getPostBySlugAndLocale(slug, lang);
	if (!post) return {};
	const alternate = getAlternateLocale(slug, lang);
	return buildPostMetadata(post, alternate);
}

export default async function PostPage({ params }: Props) {
	const { lang, slug } = await params;
	if (!isValidLocale(lang)) notFound();

	const post = getPostBySlugAndLocale(slug, lang);
	if (!post) notFound();

	const t = dict[lang];
	const headings = flattenToc(post.toc ?? []);
	const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).length;
	const readingMinutes = Math.max(1, Math.round(wordCount / 200));
	const alternateHref = getAlternateLocale(slug, lang);
	const otherLang = lang === "en" ? "tr" : "en";

	const allPosts = getPostsByLocale(lang);
	const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
	const prevPost = allPosts[currentIndex + 1] ?? null;
	const nextPost = allPosts[currentIndex - 1] ?? null;

	return (
		<>
			<ReadingProgress lang={lang} />
			<div className="page-enter mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
				<div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
					<article className="min-w-0">
						<div className="flex items-center justify-between mb-8">
							<Link
								href={`/${lang}/posts`}
								className="inline-flex items-center gap-1.5 text-xs font-mono transition-colors"
								style={{ color: "var(--fg-muted)" }}
							>
								<ArrowLeft size={12} /> {t.post.allPosts}
							</Link>
							{alternateHref && (
								<Link
									href={alternateHref}
									className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md transition-colors"
									style={{
										color: "var(--accent-primary)",
										background: "rgba(124,92,255,0.08)",
										border: "1px solid rgba(124,92,255,0.2)",
									}}
								>
									{otherLang === "tr" ? "TR" : "EN"}
								</Link>
							)}
						</div>

						{post.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{post.tags.map((tag) => (
									<Link
										key={tag}
										href={`/${lang}/tags/${tag}`}
										className="px-2 py-0.5 text-xs font-mono rounded transition-colors"
										style={{
											background: "rgba(124,92,255,0.1)",
											color: "var(--accent-primary)",
											border: "1px solid rgba(124,92,255,0.2)",
										}}
									>
										#{tag}
									</Link>
								))}
							</div>
						)}

						<h1
							className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
							style={{ color: "var(--fg-primary)", letterSpacing: "-0.03em" }}
						>
							{post.title}
						</h1>

						<div
							className="flex flex-wrap items-center gap-4 mb-10 text-xs font-mono border-b pb-8"
							style={{ color: "var(--fg-muted)", borderColor: "var(--border-subtle)" }}
						>
							<span className="flex items-center gap-1.5">
								<Calendar size={12} />
								<time dateTime={post.date}>{formatDate(post.date)}</time>
							</span>
							{post.updated && post.updated !== post.date && (
								<span>{t.post.updated} {formatDate(post.updated)}</span>
							)}
							<span className="flex items-center gap-1.5">
								<Clock size={12} />
								{readingMinutes} {t.post.minRead}
							</span>
						</div>

						<div className="prose">
							<MDXContent code={post.content} />
						</div>

						<Comments />

						{(prevPost || nextPost) && (
							<nav
								className="mt-14 pt-8 border-t flex flex-col sm:flex-row gap-3"
								style={{ borderColor: "var(--border-subtle)" }}
							>
								{prevPost && (
									<Link
										href={prevPost.permalink}
										className="post-nav-card group flex-1 flex flex-col gap-1.5 p-4 rounded-xl"
										style={{ background: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}
									>
										<span className="text-[0.65rem] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: "var(--fg-muted)" }}>
											<ArrowLeft size={10} /> {t.post.olderPost}
										</span>
										<span className="post-nav-title text-sm font-medium leading-snug" style={{ color: "var(--fg-primary)" }}>
											{prevPost.title}
										</span>
									</Link>
								)}
								{nextPost && (
									<Link
										href={nextPost.permalink}
										className="post-nav-card group flex-1 flex flex-col gap-1.5 p-4 rounded-xl sm:items-end sm:text-right"
										style={{ background: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}
									>
										<span className="text-[0.65rem] font-mono uppercase tracking-widest flex items-center gap-1.5" style={{ color: "var(--fg-muted)" }}>
											{t.post.newerPost} <ArrowRight size={10} />
										</span>
										<span className="post-nav-title text-sm font-medium leading-snug" style={{ color: "var(--fg-primary)" }}>
											{nextPost.title}
										</span>
									</Link>
								)}
							</nav>
						)}
					</article>

					<aside className="hidden lg:block">
						<div className="sticky top-[calc(var(--header-height)+2rem)]">
							<TOC headings={headings} />
						</div>
					</aside>
				</div>
			</div>
		</>
	);
}
