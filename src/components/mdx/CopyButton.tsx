"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	async function copy() {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<button
			onClick={copy}
			aria-label={copied ? "Copied!" : "Copy code"}
			className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-all"
			style={{
				background: copied ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.05)",
				border: `1px solid ${copied ? "var(--accent-emerald)" : "var(--border-subtle)"}`,
				color: copied ? "var(--accent-emerald)" : "var(--fg-muted)",
				cursor: "pointer",
			}}
		>
			{copied ? <Check size={12} /> : <Copy size={12} />}
			{copied ? "Copied!" : "Copy"}
		</button>
	);
}
