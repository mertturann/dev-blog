import {
	AlertCircle,
	AlertTriangle,
	CheckCircle2,
	Info,
	XCircle,
} from "lucide-react";
import type { ReactNode } from "react";

type CalloutType = "info" | "warn" | "success" | "danger" | "default";

const CONFIG: Record<
	CalloutType,
	{ icon: React.ElementType; bg: string; border: string; text: string }
> = {
	info: {
		icon: Info,
		bg: "rgba(56,189,248,0.06)",
		border: "var(--accent-sky)",
		text: "var(--accent-sky)",
	},
	warn: {
		icon: AlertTriangle,
		bg: "rgba(245,158,11,0.06)",
		border: "var(--accent-amber)",
		text: "var(--accent-amber)",
	},
	success: {
		icon: CheckCircle2,
		bg: "rgba(52,211,153,0.06)",
		border: "var(--accent-emerald)",
		text: "var(--accent-emerald)",
	},
	danger: {
		icon: XCircle,
		bg: "rgba(244,63,94,0.06)",
		border: "var(--accent-rose)",
		text: "var(--accent-rose)",
	},
	default: {
		icon: AlertCircle,
		bg: "rgba(124,92,255,0.06)",
		border: "var(--accent-primary)",
		text: "var(--accent-primary)",
	},
};

interface CalloutProps {
	type?: CalloutType;
	title?: string;
	children: ReactNode;
}

export function Callout({ type = "default", title, children }: CalloutProps) {
	const { icon: Icon, bg, border, text } = CONFIG[type] ?? CONFIG.default;

	return (
		<div
			className="not-prose my-6 rounded-lg p-4 flex gap-3"
			style={{
				background: bg,
				border: `1px solid ${border}`,
				borderLeft: `3px solid ${border}`,
			}}
		>
			<Icon
				size={18}
				style={{ color: text, flexShrink: 0, marginTop: "2px" }}
			/>
			<div className="text-sm leading-relaxed" style={{ color: "var(--fg-primary)" }}>
				{title && (
					<p className="font-semibold mb-1" style={{ color: text }}>
						{title}
					</p>
				)}
				{children}
			</div>
		</div>
	);
}
