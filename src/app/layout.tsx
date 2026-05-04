import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { defaultMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = defaultMetadata;

const geistSans = Geist({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const posts = getAllPosts().map(({ title, summary, slug, tags, permalink }) => ({
		title,
		summary,
		slug,
		tags,
		permalink,
	}));
	const tags = getAllTags();

	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
			<body>
				<ThemeProvider
					attribute="data-theme"
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange={false}
				>
					<Header posts={posts} tags={tags} />
					<main className="flex-1 pt-[var(--header-height)]">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
