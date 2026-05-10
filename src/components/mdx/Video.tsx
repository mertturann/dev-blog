interface VideoProps {
	src: string;
	caption?: string;
}

export function Video({ src, caption }: VideoProps) {
	return (
		<figure className="my-8">
			<video
				src={src}
				controls
				playsInline
				className="rounded-lg border w-full"
				style={{ borderColor: "var(--border-subtle)" }}
			/>
			{caption && (
				<figcaption
					className="text-center text-xs mt-2 font-mono"
					style={{ color: "var(--fg-muted)" }}
				>
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
