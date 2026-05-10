"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
	lang: string;
	alternateMap: Record<string, string>;
}

export function LanguageSwitcher({ lang, alternateMap }: LanguageSwitcherProps) {
	const pathname = usePathname();
	const otherLang = lang === "en" ? "tr" : "en";

	// Extract slug if we're on a post page: /[lang]/posts/[slug]
	const postMatch = pathname.match(/^\/[a-z]{2}\/posts\/([^/]+)/);
	const postSlug = postMatch?.[1];

	// Use pre-built alternate map for posts; fall back to simple locale swap for other pages
	const otherPath = postSlug
		? (alternateMap[postSlug] ?? `/${otherLang}/posts`)
		: pathname.replace(/^\/[a-z]{2}(\/|$)/, `/${otherLang}$1`);

	return (
		<Link
			href={otherPath}
			className="flex items-center justify-center w-7 h-7 rounded-md text-xs font-mono font-semibold transition-all duration-150"
			style={{
				color: "var(--fg-muted)",
				border: "1px solid var(--border-subtle)",
			}}
			onMouseEnter={(e) => {
				(e.currentTarget as HTMLElement).style.color = "var(--accent-primary)";
				(e.currentTarget as HTMLElement).style.borderColor = "rgba(124,92,255,0.4)";
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
				(e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
			}}
			title={otherLang === "tr" ? "Türkçe'ye geç" : "Switch to English"}
		>
			{otherLang.toUpperCase()}
		</Link>
	);
}
