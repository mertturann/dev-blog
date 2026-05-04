"use client";

import { useEffect, useRef, useState } from "react";

interface TerminalProps {
	children: string;
	autoPlay?: boolean;
	speed?: number;
}

export function Terminal({ children, autoPlay = true, speed = 18 }: TerminalProps) {
	const lines = children.trim().split("\n");
	const [visibleCount, setVisibleCount] = useState(autoPlay ? 0 : lines.length);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (!autoPlay) return;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (prefersReducedMotion) {
			setVisibleCount(lines.length);
			return;
		}
		intervalRef.current = setInterval(() => {
			setVisibleCount((c) => {
				if (c >= lines.length) {
					if (intervalRef.current) clearInterval(intervalRef.current);
					return c;
				}
				return c + 1;
			});
		}, speed * 10);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [autoPlay, lines.length, speed]);

	return (
		<div
			className="not-prose my-6 rounded-lg overflow-hidden"
			style={{
				background: "var(--bg-surface-0)",
				border: "1px solid var(--border-subtle)",
			}}
		>
			{/* Window chrome */}
			<div
				className="flex items-center gap-2 px-4 py-2.5 border-b"
				style={{
					background: "var(--bg-surface-1)",
					borderColor: "var(--border-subtle)",
				}}
			>
				<span className="w-3 h-3 rounded-full bg-rose-500/60" />
				<span className="w-3 h-3 rounded-full bg-amber-400/60" />
				<span className="w-3 h-3 rounded-full bg-emerald-400/60" />
				<span
					className="ml-auto text-xs font-mono"
					style={{ color: "var(--fg-muted)" }}
				>
					terminal
				</span>
			</div>
			<pre
				className="p-4 text-sm overflow-x-auto"
				style={{
					fontFamily: "var(--font-mono)",
					lineHeight: 1.7,
					color: "var(--fg-secondary)",
					minHeight: "4rem",
				}}
			>
				{lines.slice(0, visibleCount).map((line, i) => {
					const isCommand = line.startsWith("$");
					return (
						<div key={i}>
							{isCommand ? (
								<>
									<span style={{ color: "var(--accent-emerald)" }}>$ </span>
									<span style={{ color: "var(--fg-primary)" }}>
										{line.slice(2)}
									</span>
								</>
							) : (
								<span style={{ color: "var(--fg-muted)" }}>{line}</span>
							)}
						</div>
					);
				})}
				{visibleCount < lines.length && (
					<span
						className="inline-block w-2 h-4 animate-pulse"
						style={{ background: "var(--accent-primary)", verticalAlign: "middle" }}
					/>
				)}
			</pre>
		</div>
	);
}
