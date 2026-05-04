import type { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
	return (
		<div
			className="not-prose my-6 space-y-0"
			style={
				{
					"--step-color": "var(--accent-primary)",
					counterReset: "step",
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	);
}

export function Step({ children }: { children: ReactNode }) {
	return (
		<div
			className="relative pl-12 pb-8"
			style={
				{
					counterIncrement: "step",
				} as React.CSSProperties
			}
		>
			{/* Number bubble */}
			<div
				className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold"
				style={{
					background: "rgb(124 92 255 / 0.15)",
					border: "1px solid var(--accent-primary)",
					color: "var(--accent-primary)",
				}}
				aria-hidden
			>
				<span>{/* uses CSS counter */}</span>
			</div>
			{/* Vertical connector */}
			<div
				className="absolute left-4 top-8 bottom-0 w-px"
				style={{ background: "var(--border-subtle)" }}
				aria-hidden
			/>
			<div className="prose" style={{ paddingTop: "0.15rem" }}>
				{children}
			</div>
		</div>
	);
}
