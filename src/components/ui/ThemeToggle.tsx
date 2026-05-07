"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return <div className="w-8 h-8" aria-hidden />;

	const isDark = theme === "dark";

	return (
		<button
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
			title={`Switch to ${isDark ? "light" : "dark"} theme (T)`}
			className="relative w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200"
			style={{
				background: "transparent",
				border: "1px solid var(--border-subtle)",
				color: "var(--fg-muted)",
			}}
		>
			{isDark ? <Sun size={15} /> : <Moon size={15} />}
		</button>
	);
}
