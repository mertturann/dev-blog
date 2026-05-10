import React, { type ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
	const steps = React.Children.toArray(children);
	return (
		<div className="not-prose my-6">
			{steps.map((step, i) =>
				React.isValidElement(step)
					? React.cloneElement(step as React.ReactElement<{ number: number }>, { number: i + 1 })
					: step
			)}
		</div>
	);
}

interface StepProps {
	number?: number;
	children: ReactNode;
}

export function Step({ number, children }: StepProps) {
	const isLast = false; // connector always shown; last step handled via CSS
	return (
		<div className="relative flex gap-4 pb-8 last:pb-0">
			{/* Left column: bubble + connector */}
			<div className="flex flex-col items-center">
				<div
					className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-bold shrink-0 z-10"
					style={{
						background: "rgb(124 92 255 / 0.15)",
						border: "1px solid var(--accent-primary)",
						color: "var(--accent-primary)",
					}}
				>
					{number}
				</div>
				<div
					className="w-px flex-1 mt-1 last:hidden"
					style={{ background: "var(--border-subtle)", minHeight: "1rem" }}
				/>
			</div>

			{/* Right column: content */}
			<div
				className="prose pb-1 min-w-0"
				style={{ paddingTop: "0.25rem" }}
			>
				{children}
			</div>
		</div>
	);
}
