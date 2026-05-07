"use client";

import { Mail, Code2 } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

function InstagramIcon({ size = 16 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
			<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
		</svg>
	);
}

export function ContactCards({ lang }: { lang: Locale }) {
	const t = dict[lang].contact.contactDescriptions;

	const CONTACTS = [
		{
			icon: <Code2 size={16} />,
			label: "GitHub",
			handle: "mertturann",
			href: "https://github.com/mertturann",
			description: t.github,
			color: "var(--accent-primary)",
			colorBg: "rgba(124,92,255,0.08)",
			colorBorder: "rgba(124,92,255,0.18)",
		},
		{
			icon: <InstagramIcon size={16} />,
			label: "Instagram",
			handle: "merttturan0706",
			href: "https://instagram.com/merttturan0706",
			description: t.instagram,
			color: "var(--accent-rose)",
			colorBg: "rgba(244,63,94,0.08)",
			colorBorder: "rgba(244,63,94,0.18)",
		},
		{
			icon: <Mail size={16} />,
			label: "Email",
			handle: "linuxturkey06@gmail.com",
			href: "mailto:linuxturkey06@gmail.com",
			description: t.email,
			color: "var(--accent-sky)",
			colorBg: "rgba(56,189,248,0.08)",
			colorBorder: "rgba(56,189,248,0.18)",
		},
	];

	return (
		<div className="flex flex-col gap-3 max-w-2xl">
			{CONTACTS.map(({ icon, label, handle, href, description, color, colorBg, colorBorder }) => (
				<Link
					key={href}
					href={href}
					target={href.startsWith("http") ? "_blank" : undefined}
					rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
					className="group flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200"
					style={{ background: "var(--bg-surface-0)", border: "1px solid var(--border-subtle)" }}
					onMouseEnter={(e) => {
						(e.currentTarget as HTMLElement).style.borderColor = colorBorder;
						(e.currentTarget as HTMLElement).style.background = colorBg;
					}}
					onMouseLeave={(e) => {
						(e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
						(e.currentTarget as HTMLElement).style.background = "var(--bg-surface-0)";
					}}
				>
					<div className="w-9 h-9 flex items-center justify-center rounded-lg shrink-0" style={{ background: colorBg, border: `1px solid ${colorBorder}`, color }}>
						{icon}
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-baseline gap-2">
							<span className="text-sm font-semibold" style={{ color: "var(--fg-primary)" }}>{label}</span>
							<span className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>{handle}</span>
						</div>
						<p className="text-xs mt-0.5" style={{ color: "var(--fg-muted)" }}>{description}</p>
					</div>
					<svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" style={{ color: "var(--fg-muted)" }}>
						<path d="M7 17L17 7M17 7H7M17 7v10" />
					</svg>
				</Link>
			))}
		</div>
	);
}
