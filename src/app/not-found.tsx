import Link from "next/link";

export default function NotFound() {
	return (
		<div className="page-enter mx-auto max-w-5xl px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center">
			{/* Terminal card */}
			<div
				className="w-full max-w-xl rounded-xl overflow-hidden"
				style={{
					background: "var(--bg-surface-0)",
					border: "1px solid var(--border-subtle)",
					boxShadow: "var(--glow-card)",
				}}
			>
				{/* IDE chrome */}
				<div
					className="flex items-center gap-1.5 px-4 py-3 border-b"
					style={{ background: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
				>
					<span className="w-3 h-3 rounded-full" style={{ background: "rgba(244,63,94,0.7)" }} />
					<span className="w-3 h-3 rounded-full" style={{ background: "rgba(245,158,11,0.7)" }} />
					<span className="w-3 h-3 rounded-full" style={{ background: "rgba(52,211,153,0.7)" }} />
					<span
						className="ml-auto text-xs font-mono"
						style={{ color: "var(--fg-muted)" }}
					>
						bash — 80×24
					</span>
				</div>

				{/* Terminal output */}
				<div
					className="p-5 text-sm"
					style={{ fontFamily: "var(--font-mono)", lineHeight: "1.7" }}
				>
					<div>
						<span style={{ color: "var(--accent-emerald)" }}>$ </span>
						<span style={{ color: "var(--fg-primary)" }}>curl -sI https://abort.run/lost</span>
					</div>
					<div style={{ color: "var(--fg-muted)" }}>HTTP/2 404</div>
					<div style={{ color: "var(--fg-muted)" }}>content-type: text/html</div>
					<div className="mb-4" style={{ color: "var(--fg-muted)" }}>x-error: resource-not-found</div>
					<div>
						<span style={{ color: "var(--accent-emerald)" }}>$ </span>
						<span style={{ color: "var(--fg-primary)" }}>echo $?</span>
					</div>
					<div className="mb-5" style={{ color: "var(--syntax-number)" }}>404</div>

					<div
						className="rounded-lg p-3"
						style={{
							background: "rgba(244,63,94,0.06)",
							border: "1px solid rgba(244,63,94,0.2)",
						}}
					>
						<span style={{ color: "var(--accent-rose)" }}>error: </span>
						<span style={{ color: "var(--fg-secondary)" }}>
							The page you&apos;re looking for doesn&apos;t exist or was moved.
						</span>
					</div>
				</div>
			</div>

			{/* Actions */}
			<div className="mt-8 flex flex-wrap gap-3 justify-center">
				<Link href="/" className="btn-primary">← Back to home</Link>
				<Link href="/posts" className="btn-ghost">Browse all posts</Link>
			</div>
		</div>
	);
}
