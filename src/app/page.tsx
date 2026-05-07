"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
	const router = useRouter();
	useEffect(() => {
		const prefersTr =
			typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("tr");
		router.replace(prefersTr ? "/tr" : "/en");
	}, [router]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				fontFamily: "monospace",
				gap: "1rem",
				color: "#888",
			}}
		>
			<a href="/en" style={{ color: "inherit" }}>English</a>
			<span>·</span>
			<a href="/tr" style={{ color: "inherit" }}>Türkçe</a>
		</div>
	);
}
