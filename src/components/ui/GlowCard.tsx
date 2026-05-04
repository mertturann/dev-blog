"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

interface GlowCardProps {
	children: ReactNode;
	className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty("--mouse-x", `${x}px`);
		card.style.setProperty("--mouse-y", `${y}px`);
	}

	function handleMouseLeave() {
		const card = cardRef.current;
		if (!card) return;
		card.style.setProperty("--mouse-x", "-999px");
		card.style.setProperty("--mouse-y", "-999px");
	}

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={`glow-card relative overflow-hidden rounded-xl transition-colors ${className}`}
			style={
				{
					"--mouse-x": "-999px",
					"--mouse-y": "-999px",
					background: "var(--bg-surface-0)",
					border: "1px solid var(--border-subtle)",
				} as React.CSSProperties
			}
		>
			{/* Cursor glow */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
				style={{
					background:
						"radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(124,92,255,0.07), transparent 70%)",
					zIndex: 0,
				}}
			/>
			<div className="relative" style={{ zIndex: 1 }}>
				{children}
			</div>
		</div>
	);
}
