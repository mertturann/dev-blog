import { MDXContent } from "@/components/mdx/MDXContent";
import { getPageBySlug } from "@/lib/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: "About",
	description: "About the author",
};

export default function AboutPage() {
	const page = getPageBySlug("about");
	if (!page) notFound();

	return (
		<div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
			<div className="max-w-2xl">
				<div className="prose">
					<MDXContent code={page.content} />
				</div>
			</div>
		</div>
	);
}
