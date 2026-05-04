"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		function onScroll() {
			const el = document.documentElement;
			const scrolled = el.scrollTop;
			const total = el.scrollHeight - el.clientHeight;
			setProgress(total > 0 ? (scrolled / total) * 100 : 0);
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div
			aria-hidden
			className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
			style={{ background: "var(--bg-surface-1)" }}
		>
			<div
				className="h-full transition-all duration-100"
				style={{
					width: `${progress}%`,
					background:
						"linear-gradient(90deg, var(--accent-primary), var(--accent-glow))",
					boxShadow: "0 0 8px var(--accent-primary)",
				}}
			/>
		</div>
	);
}
