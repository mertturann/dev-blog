"use client";

import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
	{ label: "Posts", href: "/posts" },
	{ label: "About", href: "/about" },
];

interface HeaderProps {
	posts: Parameters<typeof CommandPalette>[0]["posts"];
	tags: string[];
}

export function Header({ posts, tags }: HeaderProps) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		function onScroll() { setScrolled(window.scrollY > 12); }
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => setMobileOpen(false), [pathname]);

	return (
		<header
			className="fixed inset-x-0 top-0 z-[100] transition-all duration-300"
			style={{
				height: "var(--header-height)",
				borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
				backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
				WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
				background: scrolled ? "rgba(10,11,16,0.88)" : "transparent",
			}}
		>
			<div className="mx-auto max-w-5xl px-4 sm:px-6 h-full flex items-center justify-between">
				{/* Logo */}
				<Link
					href="/"
					className="font-mono text-sm font-semibold tracking-tight group"
					style={{ color: "var(--fg-primary)" }}
				>
					<span
						className="transition-colors duration-150 group-hover:text-accent-glow"
						style={{ color: "var(--accent-primary)" }}
					>
						abort
					</span>
					<span
						className="transition-colors duration-150 group-hover:text-fg-secondary"
						style={{ color: "var(--fg-muted)" }}
					>
						.run
					</span>
				</Link>

				{/* Desktop nav */}
				<nav className="hidden sm:flex items-center gap-0.5">
					<CommandPalette posts={posts} tags={tags} />

					{NAV.map(({ label, href }) => {
						const active = pathname === href || pathname.startsWith(`${href}/`);
						return (
							<Link
								key={href}
								href={href}
								className="relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
								style={{
									color: active ? "var(--fg-primary)" : "var(--fg-muted)",
									background: active ? "var(--bg-surface-2)" : "transparent",
								}}
								onMouseEnter={(e) => {
									if (!active) (e.currentTarget as HTMLElement).style.color = "var(--fg-secondary)";
								}}
								onMouseLeave={(e) => {
									if (!active) (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
								}}
							>
								{label}
								{active && (
									<span
										className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
										style={{ background: "var(--accent-primary)" }}
									/>
								)}
							</Link>
						);
					})}

					<div className="ml-1">
						<ThemeToggle />
					</div>
				</nav>

				{/* Mobile */}
				<div className="sm:hidden flex items-center gap-2">
					<ThemeToggle />
					<button
						onClick={() => setMobileOpen((o) => !o)}
						aria-label="Toggle mobile menu"
						className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
						style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-muted)" }}
					>
						{mobileOpen ? <X size={15} /> : <Menu size={15} />}
					</button>
				</div>
			</div>

			{/* Mobile nav drawer */}
			{mobileOpen && (
				<div
					className="sm:hidden border-t px-4 py-3 flex flex-col gap-1"
					style={{
						background: "rgba(10,11,16,0.97)",
						borderColor: "var(--border-subtle)",
						backdropFilter: "blur(20px)",
					}}
				>
					{NAV.map(({ label, href }) => {
						const active = pathname === href || pathname.startsWith(`${href}/`);
						return (
							<Link
								key={href}
								href={href}
								className="px-3 py-2.5 rounded-md text-sm font-mono transition-colors flex items-center gap-2"
								style={{
									color: active ? "var(--fg-primary)" : "var(--fg-secondary)",
									background: active ? "var(--bg-surface-2)" : "transparent",
								}}
							>
								{active && (
									<span
										className="w-1 h-1 rounded-full"
										style={{ background: "var(--accent-primary)" }}
									/>
								)}
								{label}
							</Link>
						);
					})}
				</div>
			)}
		</header>
	);
}
