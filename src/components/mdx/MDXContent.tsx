"use client";

import React from "react";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./Callout";
import { FileTree } from "./FileTree";
import { Kbd } from "./Kbd";
import { Steps, Step } from "./Steps";
import { Terminal } from "./Terminal";
import { Video } from "./Video";
import { HttpRequest } from "./HttpRequest";
import { CodeFigure } from "./CodeFigure";
import NextImage from "next/image";

function MdxImage({
	src,
	alt,
	width,
	height,
}: React.ImgHTMLAttributes<HTMLImageElement>) {
	return (
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
	);
}

// Component map defined inside the Client Component — cannot be passed as props
// across the Server→Client boundary
const components = {
	Callout,
	FileTree,
	Kbd,
	Steps,
	Step,
	Terminal,
	Video,
	HttpRequest,
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
	img: MdxImage,
	figure: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
		if ("data-rehype-pretty-code-figure" in props) {
			return <CodeFigure {...props}>{children}</CodeFigure>;
		}
		return <figure {...props}>{children}</figure>;
	},
	// MDX wraps <img> in <p>; since MdxImage renders <figure> (block), we must
	// strip the <p> wrapper to avoid invalid nesting. We detect this by checking
	// that the sole child is a function component (not an intrinsic HTML string tag).
	p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => {
		const arr = React.Children.toArray(children);
		if (
			arr.length === 1 &&
			React.isValidElement(arr[0]) &&
			typeof arr[0].type !== "string"
		) {
			return <>{children}</>;
		}
		return <p>{children}</p>;
	},
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
