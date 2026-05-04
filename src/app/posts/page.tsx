import { PostCard } from "@/components/post/PostCard";
import { getAllPosts, getAllTags } from "@/lib/posts";
import Link from "next/link";

export const metadata = {
	title: "Posts",
	description: "Tüm yazılar",
};

export default function PostsPage() {
	const posts = getAllPosts();
	const tags = getAllTags();

	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
			<div className="mb-10">
				<h1
					className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
					style={{ color: "var(--fg-primary)", letterSpacing: "-0.03em" }}
				>
					Posts
				</h1>
				<p className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
					{posts.length} yazı · son güncelleme{" "}
					{new Date(posts[0]?.date ?? Date.now()).toLocaleDateString("tr-TR", {
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
							href={`/tags/${tag}`}
							className="tag-pill px-2.5 py-1 text-xs font-mono rounded-full transition-all duration-150"
							style={{
								background: "var(--bg-surface-1)",
								border: "1px solid var(--border-subtle)",
								color: "var(--fg-muted)",
							}}
						>
							#{tag}
						</Link>
					))}
				</div>
			)}

			<div className="grid sm:grid-cols-2 gap-4">
				{posts.map((post) => (
					<PostCard key={post.slug} post={post} />
				))}
			</div>
		</div>
	);
}
