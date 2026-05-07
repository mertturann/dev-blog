"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ lang = "en" }: { lang?: string }) {
	const [progress, setProgress] = useState(0);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		function onScroll() {
			const el = document.documentElement;
			const scrolled = el.scrollTop;
			const total = el.scrollHeight - el.clientHeight;
			const pct = total > 0 ? (scrolled / total) * 100 : 0;
			setProgress(pct);
			setVisible(scrolled > 80);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const label = lang === "tr" ? "okundu" : "read";

	return (
		<>
			{/* Top progress bar */}
			<div
				aria-hidden
				className="fixed top-0 left-0 right-0 h-0.5 z-50 pointer-events-none"
				style={{ background: "var(--bg-surface-1)" }}
			>
				<div
					className="h-full transition-[width] duration-100"
					style={{
						width: `${progress}%`,
						background: "linear-gradient(90deg, var(--accent-primary), var(--accent-glow))",
						boxShadow: "0 0 8px var(--accent-primary)",
					}}
				/>
			</div>

			{/* Corner badge */}
			<div
				aria-hidden
				className="fixed bottom-20 right-6 z-50 pointer-events-none transition-all duration-300"
				style={{
					opacity: visible ? 1 : 0,
					transform: visible ? "translateY(0) scale(1)" : "translateY(6px) scale(0.92)",
				}}
			>
				<div
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold"
					style={{
						background: "rgba(10,11,16,0.85)",
						border: "1px solid var(--border-subtle)",
						backdropFilter: "blur(12px)",
						color: "var(--fg-muted)",
						boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
					}}
				>
					<span style={{ color: "var(--accent-primary)", fontVariantNumeric: "tabular-nums" }}>
						%{Math.round(progress)}
					</span>
					<span>{label}</span>
				</div>
			</div>
		</>
	);
}
