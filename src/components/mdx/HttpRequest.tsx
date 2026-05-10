import type { ReactNode } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Header {
	key: string;
	value: string;
	highlight?: boolean;
}

interface HttpRequestProps {
	method: Method;
	path: string;
	host?: string;
	headers?: Header[];
	body?: string;
	highlightBody?: boolean;
}

const METHOD_STYLE: Record<Method, { bg: string; border: string; text: string }> = {
	GET:    { bg: "rgba(56,189,248,0.12)",  border: "var(--accent-sky)",     text: "var(--accent-sky)" },
	POST:   { bg: "rgba(245,158,11,0.12)",  border: "var(--accent-amber)",   text: "var(--accent-amber)" },
	PUT:    { bg: "rgba(52,211,153,0.12)",  border: "var(--accent-emerald)", text: "var(--accent-emerald)" },
	DELETE: { bg: "rgba(244,63,94,0.12)",   border: "var(--accent-rose)",    text: "var(--accent-rose)" },
	PATCH:  { bg: "rgba(124,92,255,0.12)",  border: "var(--accent-primary)", text: "var(--accent-primary)" },
};

function Row({ label, value, highlight }: { label: string; value: ReactNode; highlight?: boolean }) {
	return (
		<div
			className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 px-4 py-2 text-xs font-mono"
			style={{
				borderBottom: "1px solid var(--border-subtle)",
				background: highlight ? "rgba(124,92,255,0.06)" : "transparent",
				borderLeft: highlight ? "2px solid var(--accent-primary)" : "2px solid transparent",
			}}
		>
			<span
				className="shrink-0 font-semibold w-full sm:w-44"
				style={{ color: "var(--fg-muted)" }}
			>
				{label}
			</span>
			<span
				className="break-all"
				style={{ color: highlight ? "var(--accent-primary)" : "var(--fg-primary)" }}
			>
				{value}
			</span>
		</div>
	);
}

export function HttpRequest({ method, path, host, headers = [], body, highlightBody }: HttpRequestProps) {
	const ms = METHOD_STYLE[method] ?? METHOD_STYLE.GET;

	return (
		<div
			className="not-prose my-6 rounded-lg overflow-hidden text-xs"
			style={{ border: "1px solid var(--border-subtle)" }}
		>
			{/* ── Request line ── */}
			<div
				className="flex items-center gap-3 px-4 py-2.5 flex-wrap"
				style={{ background: "var(--bg-surface-2)", borderBottom: "1px solid var(--border-subtle)" }}
			>
				<span
					className="font-mono font-bold text-xs px-2 py-0.5 rounded"
					style={{ background: ms.bg, border: `1px solid ${ms.border}`, color: ms.text }}
				>
					{method}
				</span>
				{host && (
					<span className="font-mono text-xs" style={{ color: "var(--fg-muted)" }}>
						{host}
					</span>
				)}
				<span className="font-mono text-xs font-medium break-all" style={{ color: "var(--fg-primary)" }}>
					{path}
				</span>
			</div>

			{/* ── Headers ── */}
			{headers.length > 0 && (
				<div style={{ background: "var(--bg-surface-0)" }}>
					{headers.map((h) => (
						<Row key={h.key} label={h.key} value={h.value} highlight={h.highlight} />
					))}
				</div>
			)}

			{/* ── Body ── */}
			{body && (
				<>
					<div
						className="flex items-center gap-2 px-4 py-1.5"
						style={{
							background: "var(--bg-surface-2)",
							borderTop: "2px solid var(--border-subtle)",
							borderBottom: "1px solid var(--border-subtle)",
						}}
					>
						<span
							className="text-xs font-semibold font-mono uppercase tracking-widest"
							style={{ color: "var(--accent-amber)" }}
						>
							body
						</span>
						<div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
					</div>
					<div
						className="px-4 py-3 font-mono text-xs break-all leading-relaxed"
						style={{
							background: highlightBody ? "rgba(124,92,255,0.04)" : "var(--bg-surface-0)",
							borderLeft: highlightBody ? "2px solid var(--accent-primary)" : undefined,
							color: highlightBody ? "var(--accent-primary)" : "var(--fg-primary)",
						}}
					>
						{body}
					</div>
				</>
			)}
		</div>
	);
}
