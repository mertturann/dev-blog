import { Code2, Mail, MessageSquare, Rss } from "lucide-react";
import Link from "next/link";

const LINKS = [
	{ icon: Code2, href: "https://github.com/mertturann", label: "GitHub" },
	{ icon: MessageSquare, href: "https://x.com/mertturann", label: "X / Twitter" },
	{ icon: Mail, href: "mailto:mertqq06@gmail.com", label: "Email" },
	{ icon: Rss, href: "/rss.xml", label: "RSS Feed" },
];

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto" style={{ borderTop: "1px solid var(--border-subtle)" }}>
			{/* Tagline strip */}
			<div
				className="border-b"
				style={{ borderColor: "var(--border-subtle)", background: "var(--bg-surface-0)" }}
			>
				<div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div>
						<p className="font-mono text-sm font-semibold" style={{ color: "var(--fg-primary)" }}>
							<span style={{ color: "var(--accent-primary)" }}>abort</span>
							<span style={{ color: "var(--fg-muted)" }}>.run</span>
						</p>
						<p className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
							Backend geliştirici. Sistemler, araçlar ve mühendislik üzerine yazılar.
						</p>
					</div>
					<nav className="flex gap-1">
						{[
							{ label: "Posts", href: "/posts" },
							{ label: "About", href: "/about" },
							{ label: "RSS", href: "/rss.xml" },
						].map(({ label, href }) => (
							<Link
								key={href}
								href={href}
								className="px-3 py-1.5 text-xs font-mono rounded-md transition-colors duration-150 hover:text-fg-primary"
								style={{ color: "var(--fg-muted)" }}
							>
								{label}
							</Link>
						))}
					</nav>
				</div>
			</div>

			{/* Bottom strip */}
			<div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
				<p className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
					© {year} abort.run — made with Next.js &amp; MDX
				</p>
				<div className="flex items-center gap-2">
					{LINKS.map(({ icon: Icon, href, label }) => (
						<Link
							key={href}
							href={href}
							aria-label={label}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							className="footer-icon-link w-7 h-7 flex items-center justify-center rounded-md transition-all duration-150"
							style={{
								color: "var(--fg-muted)",
								border: "1px solid var(--border-subtle)",
							}}
						>
							<Icon size={13} />
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
}
