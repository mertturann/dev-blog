"use client";

import type { TocHeading } from "@/lib/posts";
import { useEffect, useRef, useState } from "react";

interface TOCProps {
	headings: TocHeading[];
}

export function TOC({ headings }: TOCProps) {
	const [activeId, setActiveId] = useState<string>("");
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const elements = headings
			.map(({ id }) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];

		observerRef.current = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{
				rootMargin: "-64px 0% -70% 0%",
			},
		);

		for (const el of elements) observerRef.current.observe(el);
		return () => observerRef.current?.disconnect();
	}, [headings]);

	if (headings.length < 2) return null;

	return (
		<nav aria-label="Table of contents" className="text-xs">
			<p
				className="font-mono font-semibold mb-3 tracking-widest uppercase"
				style={{ color: "var(--fg-muted)", fontSize: "0.65rem" }}
			>
				On this page
			</p>
			<ul className="space-y-1">
				{headings.map(({ id, text, level }) => {
					const isActive = activeId === id;
					return (
						<li key={id} style={{ paddingLeft: level === 3 ? "0.75rem" : 0 }}>
							<a
								href={`#${id}`}
								className="block py-0.5 transition-all duration-150 font-mono truncate"
								style={{
									color: isActive ? "var(--accent-primary)" : "var(--fg-muted)",
									borderLeft: isActive
										? "2px solid var(--accent-primary)"
										: "2px solid transparent",
									paddingLeft: "0.5rem",
									textShadow: isActive
										? "0 0 8px rgba(124,92,255,0.4)"
										: "none",
								}}
								onClick={(e) => {
									e.preventDefault();
									document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
								}}
							>
								{text}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
