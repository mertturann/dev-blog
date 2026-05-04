import type { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import { Callout } from "./Callout";
import { FileTree } from "./FileTree";
import { Kbd } from "./Kbd";
import { Steps } from "./Steps";
import { Terminal } from "./Terminal";

export const mdxComponents: MDXComponents = {
	// Override native elements
	a: ({ href, children, ...props }) => (
		<a
			href={href}
			target={href?.startsWith("http") ? "_blank" : undefined}
			rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			{...props}
		>
			{children}
		</a>
	),
	img: ({ src, alt, width, height }) => (
		<figure className="my-8">
			<NextImage
				src={src ?? ""}
				alt={alt ?? ""}
				width={(width as number) ?? 1200}
				height={(height as number) ?? 630}
				className="rounded-lg border border-[var(--border-subtle)] w-full h-auto"
				style={{ objectFit: "cover" }}
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
	// Custom components available in MDX files
	Callout,
	FileTree,
	Kbd,
	Steps,
	Terminal,
};
