"use client";

import type { Post } from "@/lib/posts";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import {
	FileText,
	Hash,
	Home,
	Moon,
	Sun,
	User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

interface SearchItem {
	id: string;
	title: string;
	href: string;
	type: "post" | "page" | "action" | "tag";
	description?: string;
	tags?: string[];
}

interface CommandPaletteProps {
	posts: Pick<Post, "title" | "summary" | "slug" | "tags" | "permalink">[];
	tags: string[];
}

export function CommandPalette({ posts, tags }: CommandPaletteProps) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const inputRef = useRef<HTMLInputElement>(null);

	// Build search index
	const items: SearchItem[] = useMemo(
		() => [
			{ id: "home", title: "Home", href: "/", type: "page" },
			{ id: "posts", title: "All Posts", href: "/posts", type: "page" },
			{ id: "about", title: "About", href: "/about", type: "page" },
			...posts.map((p) => ({
				id: p.slug,
				title: p.title,
				href: p.permalink,
				type: "post" as const,
				description: p.summary,
				tags: p.tags,
			})),
			...tags.map((t) => ({
				id: `tag-${t}`,
				title: `#${t}`,
				href: `/tags/${t}`,
				type: "tag" as const,
			})),
		],
		[posts, tags],
	);

	const fuse = useMemo(
		() =>
			new Fuse(items, {
				keys: ["title", "description", "tags"],
				threshold: 0.35,
			}),
		[items],
	);

	const results = useMemo(
		() => (query ? fuse.search(query).map((r) => r.item) : items.slice(0, 8)),
		[query, fuse, items],
	);

	// Global ⌘K shortcut
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen((o) => !o);
			}
			if (e.key === "Escape") setOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	// Focus input on open
	useEffect(() => {
		if (open) setTimeout(() => inputRef.current?.focus(), 50);
		else setQuery("");
	}, [open]);

	function runItem(item: SearchItem) {
		if (item.type === "action") return;
		router.push(item.href);
		setOpen(false);
	}

	const ICON: Record<string, React.ElementType> = {
		post: FileText,
		page: Home,
		tag: Hash,
		action: User,
	};

	return (
		<>
			{/* Trigger badge (visible in header / keyboard hint) */}
			<button
				onClick={() => setOpen(true)}
				className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all"
				style={{
					background: "var(--bg-surface-1)",
					border: "1px solid var(--border-subtle)",
					color: "var(--fg-muted)",
				}}
				aria-label="Open command palette (⌘K)"
			>
				<span>Search...</span>
				<kbd
					className="px-1 py-0.5 text-[10px] rounded"
					style={{
						background: "var(--bg-surface-2)",
						border: "1px solid var(--border-strong)",
					}}
				>
					⌘K
				</kbd>
			</button>

			{/* Overlay */}
			{open && (
				<div
					className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
					style={{ background: "rgba(5,6,10,0.7)", backdropFilter: "blur(4px)" }}
					onClick={(e) => e.target === e.currentTarget && setOpen(false)}
				>
					<Command
						className="w-full max-w-xl rounded-xl overflow-hidden shadow-2xl"
						style={{
							background: "var(--bg-surface-1)",
							border: "1px solid var(--border-strong)",
							boxShadow:
								"0 0 0 1px var(--border-strong), 0 24px 48px rgba(0,0,0,0.6), 0 0 80px rgba(124,92,255,0.08)",
						}}
						shouldFilter={false}
					>
						<div
							className="flex items-center gap-2 px-4 border-b"
							style={{ borderColor: "var(--border-subtle)" }}
						>
							<span style={{ color: "var(--fg-muted)", fontSize: 14 }}>›</span>
							<Command.Input
								ref={inputRef}
								value={query}
								onValueChange={setQuery}
								placeholder="Search posts, pages, tags..."
								className="flex-1 py-4 bg-transparent text-sm outline-none font-mono"
								style={{ color: "var(--fg-primary)" }}
							/>
							{query && (
								<button
									onClick={() => setQuery("")}
									className="text-xs font-mono px-1.5 py-0.5 rounded"
									style={{ color: "var(--fg-muted)", background: "var(--bg-surface-2)" }}
								>
									esc
								</button>
							)}
						</div>

						<Command.List
							className="max-h-72 overflow-y-auto p-2"
							style={{ scrollbarWidth: "thin" }}
						>
							<Command.Empty
								className="py-8 text-center text-sm font-mono"
								style={{ color: "var(--fg-muted)" }}
							>
								No results for &quot;{query}&quot;
							</Command.Empty>

							{results.map((item) => {
								const Icon = ICON[item.type] ?? FileText;
								return (
									<Command.Item
										key={item.id}
										value={item.id}
										onSelect={() => runItem(item)}
										className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
										style={
											{
												color: "var(--fg-secondary)",
												"--cmdk-item-hover-bg": "var(--bg-surface-2)",
											} as React.CSSProperties
										}
									>
										<Icon size={14} style={{ flexShrink: 0, color: "var(--fg-muted)" }} />
										<div className="flex-1 min-w-0">
											<span className="text-sm font-medium block truncate">
												{item.title}
											</span>
											{item.description && (
												<span
													className="text-xs truncate block mt-0.5 font-mono"
													style={{ color: "var(--fg-muted)" }}
												>
													{item.description}
												</span>
											)}
										</div>
										{item.type === "tag" && (
											<span
												className="text-xs font-mono px-1.5 py-0.5 rounded"
												style={{
													background: "rgba(124,92,255,0.1)",
													color: "var(--accent-primary)",
												}}
											>
												tag
											</span>
										)}
									</Command.Item>
								);
							})}

							{/* Actions group */}
							<Command.Separator
								className="my-1 border-t"
								style={{ borderColor: "var(--border-subtle)" }}
							/>
							<Command.Group>
								<Command.Item
									value="toggle-theme"
									onSelect={() => {
										setTheme(theme === "dark" ? "light" : "dark");
										setOpen(false);
									}}
									className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer"
									style={{ color: "var(--fg-muted)" }}
								>
									{theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
									<span className="text-sm font-mono">
										Switch to {theme === "dark" ? "light" : "dark"} theme
									</span>
								</Command.Item>
							</Command.Group>
						</Command.List>

						<div
							className="flex items-center gap-4 px-4 py-2 border-t text-xs font-mono"
							style={{
								borderColor: "var(--border-subtle)",
								color: "var(--fg-muted)",
								background: "var(--bg-surface-0)",
							}}
						>
							<span>↑↓ navigate</span>
							<span>↵ open</span>
							<span>esc close</span>
						</div>
					</Command>
				</div>
			)}
		</>
	);
}
