import { Code2, Mail } from "lucide-react";
import Link from "next/link";
import type { Dict } from "@/lib/i18n";

function InstagramIcon({ size = 13 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
			<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
		</svg>
	);
}

const ICON_LINKS = [
	{ icon: Code2, href: "https://github.com/mertturann", label: "GitHub" },
	{ icon: InstagramIcon, href: "https://instagram.com/merttturan0706", label: "Instagram" },
	{ icon: Mail, href: "mailto:linuxturkey06@gmail.com", label: "Email" },
];

interface FooterProps {
	lang: string;
	t: Dict;
}

export function Footer({ lang, t }: FooterProps) {
	const year = new Date().getFullYear();

	const NAV_LINKS = [
		{ label: t.nav.posts, href: `/${lang}/posts` },
		{ label: t.nav.about, href: `/${lang}/about` },
		{ label: t.nav.contact, href: `/${lang}/contact` },
	];

	return (
		<footer className="mt-auto" style={{ borderTop: "1px solid var(--border-subtle)" }}>
			{/* Tagline strip */}
			<div className="border-b" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-surface-0)" }}>
				<div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div>
						<p className="flex items-baseline gap-px select-none">
							<span
								className="font-mono font-bold tracking-tighter"
								style={{
									fontSize: "1.05rem",
									letterSpacing: "-0.045em",
									background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-glow) 100%)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									filter: "drop-shadow(0 0 6px rgba(124,92,255,0.3))",
								}}
							>
								abort
							</span>
							<span
								className="font-mono font-semibold tracking-tighter"
								style={{
									fontSize: "1.05rem",
									letterSpacing: "-0.045em",
									color: "var(--fg-muted)",
								}}
							>
								.run
							</span>
						</p>
						<p className="text-xs mt-1" style={{ color: "var(--fg-muted)" }}>
							{t.footer.tagline}
						</p>
					</div>
					<nav className="flex gap-1">
						{NAV_LINKS.map(({ label, href }) => (
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
					© {year} · abort.run — made with Next.js &amp; MDX
				</p>
				<div className="flex items-center gap-2">
					{ICON_LINKS.map(({ icon: Icon, href, label }) => (
						<Link
							key={href}
							href={href}
							aria-label={label}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							className="footer-icon-link w-7 h-7 flex items-center justify-center rounded-md transition-all duration-150"
							style={{ color: "var(--fg-muted)", border: "1px solid var(--border-subtle)" }}
						>
							<Icon size={13} />
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
}
