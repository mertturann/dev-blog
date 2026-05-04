"use client";

import * as runtime from "react/jsx-runtime";
import { Callout } from "./Callout";
import { FileTree } from "./FileTree";
import { Kbd } from "./Kbd";
import { Steps } from "./Steps";
import { Terminal } from "./Terminal";
import NextImage from "next/image";

// Component map defined inside the Client Component — cannot be passed as props
// across the Server→Client boundary
const components = {
	Callout,
	FileTree,
	Kbd,
	Steps,
	Terminal,
	a: ({
		href,
		children,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<a
			href={href}
			target={href?.startsWith("http") ? "_blank" : undefined}
			rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			{...props}
		>
			{children}
		</a>
	),
	img: ({
		src,
		alt,
		width,
		height,
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<figure className="my-8">
			<NextImage
				src={typeof src === "string" ? src : ""}
				alt={alt ?? ""}
				width={(width as number) ?? 1200}
				height={(height as number) ?? 630}
				className="rounded-lg border w-full h-auto"
				style={{ borderColor: "var(--border-subtle)", objectFit: "cover" }}
			/>
			{alt && (
				<figcaption
					className="text-center text-xs mt-2 font-mono"
					style={{ color: "var(--fg-muted)" }}
				>
					{alt}
				</figcaption>
			)}
		</figure>
	),
};

interface MDXContentProps {
	code: string;
}

export function MDXContent({ code }: MDXContentProps) {
	// Velite compiles MDX to a JS function string using the React runtime
	// biome-ignore lint/security/noGlobalEval: required to execute Velite-compiled MDX
	const fn = new Function(code);
	const mod = fn({ ...runtime });
	const Component = mod.default;
	return <Component components={components} />;
}
