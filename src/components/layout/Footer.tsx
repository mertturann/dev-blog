import { Code2, Mail, Rss, MessageSquare } from "lucide-react";
import Link from "next/link";

const LINKS = [
	{ icon: Code2, href: "https://github.com/yourusername", label: "GitHub" },
	{ icon: MessageSquare, href: "https://x.com/yourusername", label: "X / Twitter" },
	{ icon: Mail, href: "mailto:you@example.com", label: "Email" },
	{ icon: Rss, href: "/rss.xml", label: "RSS Feed" },
];

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer
			className="mt-auto border-t py-8 px-4"
			style={{ borderColor: "var(--border-subtle)" }}
		>
			<div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
				<p className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
					© {year} — Built with Next.js &amp; MDX
				</p>
				<div className="flex items-center gap-3">
					{LINKS.map(({ icon: Icon, href, label }) => (
						<Link
							key={href}
							href={href}
							aria-label={label}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							className="w-8 h-8 flex items-center justify-center rounded-md transition-all duration-150 hover:scale-110"
							style={{
								color: "var(--fg-muted)",
								border: "1px solid var(--border-subtle)",
							}}
						>
							<Icon size={14} />
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
}
