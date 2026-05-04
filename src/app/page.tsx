import { PostCard } from "@/components/post/PostCard";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
	const featured = getFeaturedPosts().slice(0, 2);
	const recent = getAllPosts()
		.filter((p) => !p.featured)
		.slice(0, 4);

	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
			{/* Hero */}
			<section className="mb-20">
				<div
					className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6"
					style={{
						background: "rgba(124,92,255,0.1)",
						border: "1px solid rgba(124,92,255,0.25)",
						color: "var(--accent-primary)",
					}}
				>
					<span
						className="w-1.5 h-1.5 rounded-full animate-pulse"
						style={{ background: "var(--accent-emerald)" }}
					/>
					writing about systems &amp; craft
				</div>

				<h1
					className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
					style={{ color: "var(--fg-primary)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
				>
					Senior Software{" "}
					<span
						style={{
							background: "linear-gradient(135deg, var(--accent-primary), var(--accent-glow))",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						Engineer
					</span>
				</h1>

				<p className="text-lg max-w-2xl mb-8" style={{ color: "var(--fg-secondary)", lineHeight: 1.7 }}>
					I write about distributed systems, frontend performance, developer
					tooling, and the craft of building software that scales and delights.
				</p>

				<div className="flex flex-wrap gap-3">
					<Link
						href="/posts"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
						style={{ background: "var(--accent-primary)", color: "#fff" }}
					>
						All posts <ArrowRight size={14} />
					</Link>
					<Link
						href="/about"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
						style={{
							background: "var(--bg-surface-1)",
							border: "1px solid var(--border-subtle)",
							color: "var(--fg-secondary)",
						}}
					>
						About me
					</Link>
				</div>
			</section>

			{/* Featured */}
			{featured.length > 0 && (
				<section className="mb-16">
					<h2
						className="text-xs font-mono font-semibold uppercase tracking-widest mb-6"
						style={{ color: "var(--fg-muted)" }}
					>
						Featured
					</h2>
					<div className="grid sm:grid-cols-2 gap-4">
						{featured.map((post) => (
							<PostCard key={post.slug} post={post} />
						))}
					</div>
				</section>
			)}

			{/* Recent */}
			{recent.length > 0 && (
				<section>
					<div className="flex items-center justify-between mb-6">
						<h2
							className="text-xs font-mono font-semibold uppercase tracking-widest"
							style={{ color: "var(--fg-muted)" }}
						>
							Recent
						</h2>
						<Link
							href="/posts"
							className="text-xs font-mono flex items-center gap-1 transition-colors"
							style={{ color: "var(--accent-primary)" }}
						>
							View all <ArrowRight size={11} />
						</Link>
					</div>
					<div className="grid sm:grid-cols-2 gap-4">
						{recent.map((post) => (
							<PostCard key={post.slug} post={post} />
						))}
					</div>
				</section>
			)}
		</div>
	);
}
