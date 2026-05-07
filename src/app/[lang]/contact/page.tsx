import { dict, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { buildLocaleMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCards } from "./ContactCards";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = await params;
	if (!isValidLocale(lang)) return {};
	const t = dict[lang].contact;
	return buildLocaleMetadata(lang, { title: t.title, description: t.description });
}

function SectionLabel({ children }: { children: string }) {
	return (
		<div className="flex items-center gap-3 mb-6">
			<span className="text-[0.65rem] font-mono font-semibold uppercase tracking-widest shrink-0" style={{ color: "var(--fg-muted)" }}>
				{children}
			</span>
			<div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
		</div>
	);
}

export default async function ContactPage({ params }: Props) {
	const { lang } = await params;
	if (!isValidLocale(lang)) notFound();

	const t = dict[lang].contact;

	return (
		<div className="page-enter mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
			{/* Hero */}
			<div className="mb-12">
				<div
					className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6"
					style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", color: "var(--accent-sky)" }}
				>
					<span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-sky)" }} />
					{t.statusPill}
				</div>
				<h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ color: "var(--fg-primary)", letterSpacing: "-0.04em" }}>
					{t.title}
				</h1>
				<p className="text-base max-w-lg leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
					{t.description}
				</p>
			</div>

			{/* Contact cards */}
			<section className="mb-14">
				<SectionLabel>{t.channels}</SectionLabel>
				<ContactCards lang={lang as Locale} />
				<div
					className="mt-4 flex items-start gap-2.5 rounded-lg px-4 py-3 text-xs font-mono max-w-2xl"
					style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)", color: "var(--fg-muted)" }}
				>
					<span style={{ color: "var(--accent-amber)", marginTop: "1px" }}>!</span>
					{lang === "en" ? (
						<span>
							Most of my large-scale projects are hosted as{" "}
							<span style={{ color: "var(--accent-amber)" }}>private repositories</span> on GitHub.
							If you&apos;re interested in my work, feel free to reach out directly.
						</span>
					) : (
						<span>
							GitHub profilimde yer alan büyük çaplı projelerimin büyük çoğunluğu{" "}
							<span style={{ color: "var(--accent-amber)" }}>özel (private) depo</span> olarak tutulmaktadır.
							Çalışmalarımla ilgileniyorsan doğrudan iletişime geçebilirsin.
						</span>
					)}
				</div>
			</section>

			{/* netstat */}
			<section className="mb-8">
				<SectionLabel>{t.netstat}</SectionLabel>
				<div className="rounded-lg p-4 text-xs font-mono max-w-2xl" style={{ background: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
					{[
						{ proto: "tcp", addr: "0.0.0.0:email",     state: "LISTEN" },
						{ proto: "tcp", addr: "0.0.0.0:github",    state: "LISTEN" },
						{ proto: "tcp", addr: "0.0.0.0:instagram", state: "LISTEN" },
						{ proto: "tcp", addr: "0.0.0.0:nonsense",  state: "CLOSED" },
					].map(({ proto, addr, state }) => (
						<div key={addr} className="flex gap-4 py-0.5">
							<span style={{ color: "var(--fg-muted)", minWidth: "2.5rem" }}>{proto}</span>
							<span style={{ color: "var(--fg-secondary)", minWidth: "13rem" }}>{addr}</span>
							<span style={{ color: state === "LISTEN" ? "var(--accent-emerald)" : "var(--accent-rose)" }}>{state}</span>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
