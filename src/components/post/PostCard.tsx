import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { GlowCard } from "@/components/ui/GlowCard";

export function PostCard({ post }: { post: Post }) {
	return (
		<GlowCard>
			<Link
				href={post.permalink}
				className="group block p-5 focus:outline-none"
			>
				{/* Tags */}
				{post.tags.length > 0 && (
					<div className="flex flex-wrap gap-1.5 mb-3">
						{post.tags.slice(0, 3).map((tag) => (
							<span
								key={tag}
								className="px-2 py-0.5 text-xs font-mono rounded"
								style={{
									background: "rgba(124,92,255,0.1)",
									color: "var(--accent-primary)",
									border: "1px solid rgba(124,92,255,0.2)",
								}}
							>
								{tag}
							</span>
						))}
					</div>
				)}

				{/* Title */}
				<h2
					className="text-base font-semibold leading-snug mb-2 group-hover:text-[var(--accent-glow)] transition-colors"
					style={{ color: "var(--fg-primary)" }}
				>
					{post.title}
					<ArrowUpRight
						size={14}
						className="inline ml-1 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-x-0.5 transition-all"
					/>
				</h2>

				{/* Summary */}
				<p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-secondary)" }}>
					{post.summary}
				</p>

				{/* Meta */}
				<div
					className="flex items-center gap-3 text-xs font-mono"
					style={{ color: "var(--fg-muted)" }}
				>
					<time dateTime={post.date}>{formatDate(post.date)}</time>
				</div>
			</Link>
		</GlowCard>
	);
}
