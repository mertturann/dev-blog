import { File } from "lucide-react";
import type { ReactNode } from "react";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
	filename?: string;
	language?: string;
	code: string;
	children: ReactNode;
}

export function CodeBlock({ filename, language, code, children }: CodeBlockProps) {
	const hasHeader = filename || language;

	return (
		<div className="shiki-wrapper not-prose">
			{hasHeader && (
				<div className="shiki-header">
					{filename ? (
						<span className="shiki-filename">
							<File size={12} />
							{filename}
						</span>
					) : (
						<span />
					)}
					{language && <span className="shiki-lang">{language}</span>}
					<CopyButton code={code} />
				</div>
			)}
			{!hasHeader && (
				<div
					className="absolute top-3 right-3 z-10"
					style={{ position: "absolute" }}
				>
					<CopyButton code={code} />
				</div>
			)}
			{children}
		</div>
	);
}
