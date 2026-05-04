import { Comments } from "@/components/post/Comments";
import { ReadingProgress } from "@/components/post/ReadingProgress";
import { TOC } from "@/components/post/TOC";
import { MDXContent } from "@/components/mdx/MDXContent";
import { formatDate } from "@/lib/utils";
import { getAllPosts, getPostBySlug, flattenToc } from "@/lib/posts";
import { buildPostMetadata } from "@/lib/seo";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) return {};
	return buildPostMetadata(post);
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) notFound();

	const headings = flattenToc(post.toc ?? []);

	// Rough reading time from content word count
	const wordCount = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).length;
	const readingMinutes = Math.max(1, Math.round(wordCount / 200));

	return (
		<>
			<ReadingProgress />
			<div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-20">
				<div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
					{/* Article — min-w-0 prevents grid child from overflowing its column */}
					<article className="min-w-0">
						<Link
							href="/posts"
							className="inline-flex items-center gap-1.5 text-xs font-mono mb-8 transition-colors"
							style={{ color: "var(--fg-muted)" }}
						>
							<ArrowLeft size={12} /> All posts
						</Link>

						{post.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{post.tags.map((tag) => (
									<Link
										key={tag}
										href={`/tags/${tag}`}
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
							style={{
								color: "var(--fg-muted)",
								borderColor: "var(--border-subtle)",
							}}
						>
							<span className="flex items-center gap-1.5">
								<Calendar size={12} />
								<time dateTime={post.date}>{formatDate(post.date)}</time>
							</span>
							{post.updated && post.updated !== post.date && (
								<span>Updated {formatDate(post.updated)}</span>
							)}
							<span className="flex items-center gap-1.5">
								<Clock size={12} />
								{readingMinutes} min read
							</span>
						</div>

						<div className="prose">
							<MDXContent code={post.content} />
						</div>

						<Comments />
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
