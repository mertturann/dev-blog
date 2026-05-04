import Link from "next/link";

export default function NotFound() {
	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 py-24 flex flex-col items-start">
			<div
				className="rounded-xl p-8 w-full max-w-xl font-mono text-sm"
				style={{
					background: "var(--bg-surface-0)",
					border: "1px solid var(--border-subtle)",
				}}
			>
				<div
					className="flex items-center gap-2 mb-6 pb-4 border-b text-xs"
					style={{ borderColor: "var(--border-subtle)", color: "var(--fg-muted)" }}
				>
					<span className="w-3 h-3 rounded-full bg-rose-500/60" />
					<span className="w-3 h-3 rounded-full bg-amber-400/60" />
					<span className="w-3 h-3 rounded-full bg-emerald-400/60" />
					<span className="ml-2">~/not-found</span>
				</div>

				<div className="space-y-2" style={{ color: "var(--fg-secondary)" }}>
					<p>
						<span style={{ color: "var(--accent-emerald)" }}>$ </span>
						<span style={{ color: "var(--fg-primary)" }}>
							find / -name &quot;this-page&quot;
						</span>
					</p>
					<p style={{ color: "var(--accent-rose)" }}>
						find: No such file or directory
					</p>
					<p style={{ color: "var(--fg-muted)" }}>exit code: 404</p>
					<br />
					<p>
						<span style={{ color: "var(--accent-emerald)" }}>$ </span>
						<span style={{ color: "var(--fg-primary)" }}>echo &quot;Did you mean:&quot;</span>
					</p>
					<div className="pl-2 space-y-1">
						{[
							{ label: "~/", href: "/" },
							{ label: "~/posts", href: "/posts" },
							{ label: "~/about", href: "/about" },
						].map(({ label, href }) => (
							<Link
								key={href}
								href={href}
								className="flex items-center gap-2 group transition-colors"
								style={{ color: "var(--accent-primary)" }}
							>
								<span style={{ color: "var(--fg-muted)" }}>→</span>
								{label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
