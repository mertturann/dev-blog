import type { ReactNode } from "react";

export function Kbd({ children }: { children: ReactNode }) {
	return (
		<kbd
			className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono"
			style={{
				background: "var(--bg-surface-2)",
				border: "1px solid var(--border-strong)",
				borderBottom: "2px solid var(--border-strong)",
				color: "var(--fg-secondary)",
				boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
			}}
		>
			{children}
		</kbd>
	);
}
