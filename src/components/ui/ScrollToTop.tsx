"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		function onScroll() { setVisible(window.scrollY > 400); }
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<button
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			aria-label="Scroll to top"
			className="fixed bottom-6 right-6 z-50 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300"
			style={{
				background: "var(--bg-surface-2)",
				border: "1px solid var(--border-strong)",
				color: "var(--fg-muted)",
				boxShadow: "0 4px 16px rgb(0 0 0 / 0.4)",
				opacity: visible ? 1 : 0,
				transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.9)",
				pointerEvents: visible ? "auto" : "none",
			}}
			onMouseEnter={(e) => {
				const el = e.currentTarget as HTMLElement;
				el.style.borderColor = "var(--accent-primary)";
				el.style.color = "var(--accent-primary)";
				el.style.boxShadow = "0 0 16px rgb(124 92 255 / 0.3), 0 4px 16px rgb(0 0 0 / 0.4)";
			}}
			onMouseLeave={(e) => {
				const el = e.currentTarget as HTMLElement;
				el.style.borderColor = "var(--border-strong)";
				el.style.color = "var(--fg-muted)";
				el.style.boxShadow = "0 4px 16px rgb(0 0 0 / 0.4)";
			}}
		>
			<ArrowUp size={15} />
		</button>
	);
}
