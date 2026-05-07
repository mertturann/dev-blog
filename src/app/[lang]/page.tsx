import { PostCard } from "@/components/post/PostCard";
import { dict, isValidLocale } from "@/lib/i18n";
import { getFeaturedPostsByLocale, getPostsByLocale } from "@/lib/posts";
import { buildLocaleMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = await params;
	if (!isValidLocale(lang)) return {};
	return buildLocaleMetadata(lang);
}

export default async function HomePage({ params }: Props) {
	const { lang } = await params;
	if (!isValidLocale(lang)) notFound();

	const t = dict[lang];
	const featured = getFeaturedPostsByLocale(lang).slice(0, 2);
	const recent = getPostsByLocale(lang).filter((p) => !p.featured).slice(0, 4);

	return (
		<div className="page-enter mx-auto max-w-5xl px-4 sm:px-6">
			{/* Hero */}
			<section className="relative py-20 sm:py-28 mb-16">
				<div
					aria-hidden
					className="dot-grid hero-glow pointer-events-none absolute inset-x-[-2rem] top-0 bottom-0"
					style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)" }}
				/>
				<div className="relative">
					<div
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-7"
						style={{
							background: "rgba(124,92,255,0.08)",
							border: "1px solid rgba(124,92,255,0.2)",
							color: "var(--accent-primary)",
						}}
					>
						<span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-emerald)" }} />
						{t.home.statusPill}
					</div>

					<h1
						className="text-4xl sm:text-[3.25rem] font-bold mb-5 leading-[1.1] tracking-tight"
						style={{ color: "var(--fg-primary)", letterSpacing: "-0.04em" }}
					>
						Mert Turan
						<br />
						<span
							style={{
								background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-glow) 50%, var(--accent-sky) 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}
						>
							Backend Developer
						</span>
					</h1>

					<p
						className="text-base sm:text-lg max-w-xl mb-8 leading-relaxed whitespace-pre-line"
						style={{ color: "var(--fg-secondary)" }}
					>
						{t.home.subtitle}
					</p>

					<div className="flex flex-wrap gap-3">
						<Link href={`/${lang}/posts`} className="btn-primary">
							{t.home.readPosts} <ArrowRight size={14} />
						</Link>
						<Link href={`/${lang}/about`} className="btn-ghost">
							{t.home.about}
						</Link>
					</div>
				</div>
			</section>

			{/* Featured */}
			{featured.length > 0 && (
				<section className="mb-16">
					<div className="flex items-center gap-3 mb-6">
						<span className="text-[0.65rem] font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
							{t.home.featured}
						</span>
						<div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
					</div>
					<div className="grid sm:grid-cols-2 gap-4">
						{featured.map((post) => <PostCard key={post.slug} post={post} />)}
					</div>
				</section>
			)}

			{/* Recent */}
			{recent.length > 0 && (
				<section className="mb-16">
					<div className="flex items-center gap-3 mb-6">
						<span className="text-[0.65rem] font-mono font-semibold uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
							{t.home.recentPosts}
						</span>
						<div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
						<Link href={`/${lang}/posts`} className="text-xs font-mono flex items-center gap-1 transition-colors" style={{ color: "var(--accent-primary)" }}>
							{t.home.all} <ArrowRight size={11} />
						</Link>
					</div>
					<div className="grid sm:grid-cols-2 gap-4">
						{recent.map((post) => <PostCard key={post.slug} post={post} />)}
					</div>
				</section>
			)}
		</div>
	);
}
