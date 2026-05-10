"use client";

import { useRef, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";

interface CodeFigureProps {
	children?: ReactNode;
	[key: string]: unknown;
}

export function CodeFigure({ children, ...props }: CodeFigureProps) {
	const ref = useRef<HTMLElement>(null);
	const getCode = () => ref.current?.querySelector("code")?.innerText ?? "";

	return (
		<figure ref={ref} className="not-prose rpc-figure" {...(props as object)}>
			{children}
			<div className="rpc-actions">
				<CopyButton getCode={getCode} />
			</div>
		</figure>
	);
}
