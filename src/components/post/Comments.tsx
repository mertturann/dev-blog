"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO ?? "";
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Blog Comments";
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

const isConfigured =
	GISCUS_REPO !== "" && GISCUS_REPO_ID !== "" && GISCUS_CATEGORY_ID !== "";

export function Comments() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [loaded, setLoaded] = useState(false);
	const { resolvedTheme } = useTheme();

	useEffect(() => {
		if (!isConfigured) return;
		const el = containerRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setLoaded(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!loaded || !isConfigured) return;
		const existing = containerRef.current?.querySelector(".giscus");
		if (existing) existing.remove();

		const script = document.createElement("script");
		script.src = "https://giscus.app/client.js";
		script.setAttribute("data-repo", GISCUS_REPO);
		script.setAttribute("data-repo-id", GISCUS_REPO_ID);
		script.setAttribute("data-category", GISCUS_CATEGORY);
		script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
		script.setAttribute("data-mapping", "pathname");
		script.setAttribute("data-strict", "0");
		script.setAttribute("data-reactions-enabled", "1");
		script.setAttribute("data-emit-metadata", "0");
		script.setAttribute("data-input-position", "top");
		script.setAttribute("data-theme", resolvedTheme === "light" ? "light" : "dark");
		script.setAttribute("data-lang", "en");
		script.setAttribute("data-loading", "lazy");
		script.crossOrigin = "anonymous";
		script.async = true;
		containerRef.current?.appendChild(script);
	}, [loaded, resolvedTheme]);

	return (
		<section
			className="mt-16 pt-8 border-t"
			style={{ borderColor: "var(--border-subtle)" }}
		>
			<h2
				className="text-sm font-mono font-semibold mb-6 tracking-widest uppercase"
				style={{ color: "var(--fg-muted)" }}
			>
				Discussion
			</h2>

			{!isConfigured ? (
				<p
					className="text-xs font-mono"
					style={{ color: "var(--fg-muted)" }}
				>
					Comments not configured. Set{" "}
					<code
						className="px-1 py-0.5 rounded"
						style={{
							background: "var(--bg-surface-2)",
							color: "var(--accent-sky)",
						}}
					>
						NEXT_PUBLIC_GISCUS_REPO
					</code>
					,{" "}
					<code
						className="px-1 py-0.5 rounded"
						style={{
							background: "var(--bg-surface-2)",
							color: "var(--accent-sky)",
						}}
					>
						NEXT_PUBLIC_GISCUS_REPO_ID
					</code>
					, and{" "}
					<code
						className="px-1 py-0.5 rounded"
						style={{
							background: "var(--bg-surface-2)",
							color: "var(--accent-sky)",
						}}
					>
						NEXT_PUBLIC_GISCUS_CATEGORY_ID
					</code>{" "}
					in{" "}
					<code
						className="px-1 py-0.5 rounded"
						style={{
							background: "var(--bg-surface-2)",
							color: "var(--accent-sky)",
						}}
					>
						.env.local
					</code>{" "}
					to enable Giscus.
				</p>
			) : (
				<>
					{!loaded && (
						<div
							className="h-32 rounded-xl animate-pulse"
							style={{ background: "var(--bg-surface-1)" }}
						/>
					)}
					<div ref={containerRef} />
				</>
			)}
		</section>
	);
}
