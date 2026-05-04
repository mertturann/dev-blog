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
		<div className="mx-auto max-w-5xl px-4 sm:px-6">
			{/* Hero — full-bleed ambient section */}
			<section className="relative py-20 sm:py-28 mb-16">
				{/* Dot grid + radial glow */}
				<div
					aria-hidden
					className="dot-grid hero-glow pointer-events-none absolute inset-x-[-2rem] top-0 bottom-0"
					style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)" }}
				/>

				<div className="relative">
					{/* Status pill */}
					<div
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-7"
						style={{
							background: "rgba(124,92,255,0.08)",
							border: "1px solid rgba(124,92,255,0.2)",
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
						className="text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
						style={{ color: "var(--fg-secondary)" }}
					>
						C# · ASP.NET Core · PHP · Linux · Docker · Cyber Security.
						<br />
						Burada sistemler, araçlar ve yazılım mühendisliği üzerine yazıyorum.
					</p>

					<div className="flex flex-wrap gap-3">
						<Link href="/posts" className="btn-primary">
							Yazıları Oku <ArrowRight size={14} />
						</Link>
						<Link href="/about" className="btn-ghost">
							Hakkımda
						</Link>
					</div>
				</div>
			</section>

			{/* Featured */}
			{featured.length > 0 && (
				<section className="mb-16">
					<div className="flex items-center gap-3 mb-6">
						<span
							className="text-[0.65rem] font-mono font-semibold uppercase tracking-widest"
							style={{ color: "var(--fg-muted)" }}
						>
							Öne Çıkan
						</span>
						<div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
					</div>
					<div className="grid sm:grid-cols-2 gap-4">
						{featured.map((post) => (
							<PostCard key={post.slug} post={post} />
						))}
					</div>
				</section>
			)}

			{/* Recent */}
			{recent.length > 0 && (
				<section className="mb-16">
					<div className="flex items-center gap-3 mb-6">
						<span
							className="text-[0.65rem] font-mono font-semibold uppercase tracking-widest"
							style={{ color: "var(--fg-muted)" }}
						>
							Son Yazılar
						</span>
						<div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
						<Link
							href="/posts"
							className="text-xs font-mono flex items-center gap-1 transition-colors"
							style={{ color: "var(--accent-primary)" }}
						>
							Tümü <ArrowRight size={11} />
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
