import { File, Folder } from "lucide-react";

interface FileTreeProps {
	children: string;
}

function parseLine(line: string) {
	const depth = (line.match(/^(\s|[│├└─ ])+/) ?? [""])[0].length / 2;
	const name = line.replace(/^[\s│├└─ ]+/, "").trim();
	const isDir = name.endsWith("/") || line.includes("  # ") === false && !name.includes(".");
	return { depth, name, isDir: name.endsWith("/") };
}

export function FileTree({ children }: FileTreeProps) {
	const lines = children
		.trim()
		.split("\n")
		.filter((l) => l.trim() && l.trim() !== ".");

	return (
		<div
			className="not-prose my-6 rounded-lg overflow-hidden"
			style={{
				background: "var(--bg-surface-0)",
				border: "1px solid var(--border-subtle)",
			}}
		>
			<div
				className="px-3 py-2 text-xs font-mono border-b flex items-center gap-2"
				style={{
					background: "var(--bg-surface-1)",
					borderColor: "var(--border-subtle)",
					color: "var(--fg-muted)",
				}}
			>
				<Folder size={12} />
				<span>project</span>
			</div>
			<div className="p-3 overflow-x-auto">
				{lines.map((line, i) => {
					const { name, isDir } = parseLine(line);
					const indent = (line.match(/^([\s│├└─ ]+)/) ?? [""])[0].length;
					return (
						<div
							key={i}
							className="flex items-center gap-1.5 py-0.5 text-sm font-mono"
							style={{
								paddingLeft: `${(indent / 2) * 0.75}rem`,
								color: isDir ? "var(--accent-primary)" : "var(--fg-secondary)",
							}}
						>
							{isDir ? (
								<Folder size={13} style={{ flexShrink: 0 }} />
							) : (
								<File size={13} style={{ flexShrink: 0 }} />
							)}
							<span>{name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
