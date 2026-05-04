import { formatDate } from "@/lib/utils";
import { ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { GlowCard } from "@/components/ui/GlowCard";

function readingTime(content: string): number {
	const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function PostCard({ post }: { post: Post }) {
	const mins = readingTime(post.content);

	return (
		<GlowCard>
			<Link href={post.permalink} className="group block p-5 focus:outline-none h-full">
				<div className="flex flex-col h-full gap-3">
					{/* Tags */}
					{post.tags.length > 0 && (
						<div className="flex flex-wrap gap-1.5">
							{post.tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className="px-2 py-0.5 text-[0.65rem] font-mono rounded-full"
									style={{
										background: "rgba(124,92,255,0.08)",
										color: "var(--accent-primary)",
										border: "1px solid rgba(124,92,255,0.15)",
									}}
								>
									{tag}
								</span>
							))}
						</div>
					)}

					{/* Title */}
					<h2
						className="text-sm font-semibold leading-snug group-hover:text-[var(--accent-glow)] transition-colors duration-150"
						style={{ color: "var(--fg-primary)" }}
					>
						{post.title}
						<ArrowUpRight
							size={13}
							className="inline ml-1 opacity-0 group-hover:opacity-100 transition-all duration-150 -translate-y-0.5 group-hover:translate-x-0.5"
						/>
					</h2>

					{/* Summary — clamped to 3 lines */}
					<p
						className="text-xs leading-relaxed flex-1"
						style={{
							color: "var(--fg-muted)",
							display: "-webkit-box",
							WebkitLineClamp: 3,
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
						}}
					>
						{post.summary}
					</p>

					{/* Meta — pinned to bottom */}
					<div
						className="flex items-center justify-between pt-3 text-[0.65rem] font-mono"
						style={{
							color: "var(--fg-muted)",
							borderTop: "1px solid var(--border-subtle)",
						}}
					>
						<time dateTime={post.date}>{formatDate(post.date)}</time>
						<span className="flex items-center gap-1">
							<Clock size={10} />
							{mins} dk
						</span>
					</div>
				</div>
			</Link>
		</GlowCard>
	);
}
