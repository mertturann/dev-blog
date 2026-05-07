import { Callout } from "@/components/mdx/Callout";
import { Terminal } from "@/components/mdx/Terminal";
import { dict, isValidLocale } from "@/lib/i18n";
import { buildLocaleMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { lang } = await params;
	if (!isValidLocale(lang)) return {};
	const t = dict[lang];
	return buildLocaleMetadata(lang, {
		title: t.about.title,
		description: t.about.subtitle,
	});
}

const k = (v: string) => <span style={{ color: "var(--syntax-fn)" }}>{v}</span>;
const s = (v: string) => <span style={{ color: "var(--syntax-string)" }}>{'"'}{v}{'"'}</span>;
const n = (v: number) => <span style={{ color: "var(--syntax-number)" }}>{v}</span>;
const b = (v: string) => <span style={{ color: "var(--syntax-keyword)" }}>{v}</span>;
const p = (v: string) => <span style={{ color: "var(--syntax-punctuation)" }}>{v}</span>;

function JsonLine({ no, children }: { no: number; children?: ReactNode }) {
	return (
		<div className="flex items-start">
			<span className="select-none w-7 text-right mr-4 shrink-0" style={{ color: "var(--fg-muted)", fontSize: "0.7rem", lineHeight: "1.65rem" }}>
				{no}
			</span>
			<span style={{ lineHeight: "1.65rem" }}>{children}</span>
		</div>
	);
}

type BadgeColor = "purple" | "sky" | "emerald" | "amber" | "rose";
const BADGE: Record<BadgeColor, { bg: string; border: string; fg: string }> = {
	purple:  { bg: "rgba(124,92,255,0.09)",  border: "rgba(124,92,255,0.22)",  fg: "var(--accent-primary)" },
	sky:     { bg: "rgba(56,189,248,0.09)",  border: "rgba(56,189,248,0.22)",  fg: "var(--accent-sky)" },
	emerald: { bg: "rgba(52,211,153,0.09)",  border: "rgba(52,211,153,0.22)",  fg: "var(--accent-emerald)" },
	amber:   { bg: "rgba(245,158,11,0.09)",  border: "rgba(245,158,11,0.22)",  fg: "var(--accent-amber)" },
	rose:    { bg: "rgba(244,63,94,0.09)",   border: "rgba(244,63,94,0.22)",   fg: "var(--accent-rose)" },
};

function Badge({ label, color }: { label: string; color: BadgeColor }) {
	const c = BADGE[color];
	return (
		<span className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md" style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.fg }}>
			{label}
		</span>
	);
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

function Em({ children }: { children: string }) {
	return <span className="font-medium" style={{ color: "var(--fg-primary)" }}>{children}</span>;
}

export default async function AboutPage({ params }: Props) {
	const { lang } = await params;
	if (!isValidLocale(lang)) notFound();

	const t = dict[lang].about;

	const roleLabel = lang === "tr" ? "Backend Geliştirici" : "Backend Developer";
	const stackValues = lang === "tr"
		? { primary: ["C#", "ASP.NET Core"], secondary: ["PHP"], os: "Linux (Debian)", containers: "Docker", vcs: "Git" }
		: { primary: ["C#", "ASP.NET Core"], secondary: ["PHP"], os: "Linux (Debian)", containers: "Docker", vcs: "Git" };
	const interestsTr = lang === "tr"
		? ["Backend Mühendisliği", "Siber Güvenlik", "Low-level şeyler"]
		: ["Backend Engineering", "Cyber Security", "Low-level stuff"];

	const stackBadges: Array<{ label: string; color: BadgeColor }> = [
		{ label: "C#", color: "purple" },
		{ label: "ASP.NET Core", color: "purple" },
		{ label: "PHP", color: "sky" },
		{ label: "Linux", color: "emerald" },
		{ label: "Docker", color: "sky" },
		{ label: "Git", color: "amber" },
		{ label: lang === "tr" ? "Siber Güvenlik" : "Cyber Security", color: "rose" },
		{ label: lang === "tr" ? "Backend Mühendisliği" : "Backend Engineering", color: "purple" },
		{ label: lang === "tr" ? "Low-level şeyler" : "Low-level stuff", color: "emerald" },
	];

	return (
		<div className="page-enter mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
			{/* Hero */}
			<div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
				{/* Avatar */}
				<div className="shrink-0 relative">
					<div
						className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden"
						style={{
							border: "1px solid var(--border-strong)",
							boxShadow: "0 0 0 4px rgba(52,211,153,0.07), 0 0 32px rgba(124,92,255,0.12)",
						}}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://github.com/mertturann.png"
							alt="Mert Turan"
							width={112}
							height={112}
							className="w-full h-full object-cover"
						/>
					</div>
					<span
						className="absolute bottom-1.5 right-1.5 w-3 h-3 rounded-full border-2 animate-pulse"
						style={{ background: "var(--accent-emerald)", borderColor: "var(--bg-canvas)" }}
					/>
				</div>

				{/* Text */}
				<div>
				<div
					className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4"
					style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", color: "var(--accent-emerald)" }}
				>
					<span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-emerald)" }} />
					{t.statusPill}
				</div>
				<h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ color: "var(--fg-primary)", letterSpacing: "-0.04em" }}>
					{t.title}
				</h1>
				<p className="text-base max-w-lg leading-relaxed" style={{ color: "var(--fg-secondary)" }}>
					{t.subtitle}
				</p>
				</div>
			</div>

			{/* Profile card */}
			<div className="mb-14 rounded-xl overflow-hidden" style={{ background: "var(--bg-surface-0)", border: "1px solid var(--border-strong)", boxShadow: "var(--glow-card), 0 0 48px rgba(124,92,255,0.06)" }}>
				<div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ background: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
					<span className="w-3 h-3 rounded-full" style={{ background: "rgba(244,63,94,0.7)" }} />
					<span className="w-3 h-3 rounded-full" style={{ background: "rgba(245,158,11,0.7)" }} />
					<span className="w-3 h-3 rounded-full" style={{ background: "rgba(52,211,153,0.7)" }} />
					<div className="ml-4 flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono" style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border-subtle)", color: "var(--fg-secondary)" }}>
						<span style={{ color: "var(--accent-emerald)", fontSize: "0.55rem" }}>●</span>
						profile.json
					</div>
					<span className="ml-auto text-xs font-mono" style={{ color: "var(--fg-muted)" }}>mert@abort:~</span>
				</div>
				<div className="px-5 py-2.5 border-b flex items-center gap-2 text-xs font-mono" style={{ background: "var(--bg-canvas)", borderColor: "var(--border-subtle)" }}>
					<span style={{ color: "var(--accent-emerald)" }}>$</span>
					<span style={{ color: "var(--fg-secondary)" }}>cat /etc/mert/profile.json</span>
				</div>
				<pre className="p-5 text-sm overflow-x-auto" style={{ fontFamily: "var(--font-mono)", margin: 0 }}>
					<JsonLine no={1}>{p("{")}</JsonLine>
					<JsonLine no={2}>{"  "}{k('"name"')}{p(":    ")}{s("Mert Turan")}{p(",")}</JsonLine>
					<JsonLine no={3}>{"  "}{k('"role"')}{p(":    ")}{s(roleLabel)}{p(",")}</JsonLine>
					<JsonLine no={4}>{"  "}{k('"status"')}{p(":  ")}{s("online")}{p(",")}</JsonLine>
					<JsonLine no={5}>{"  "}{k('"uptime"')}{p(":  ")}{s(lang === "tr" ? "7/24 (kahveye bağlı)" : "24/7 (coffee dependent)")}{p(",")}</JsonLine>
					<JsonLine no={6}>{"  "}{k('"stack"')}{p(": {")}</JsonLine>
					<JsonLine no={7}>{"    "}{k('"primary"')}{p(":    ")}{p("[")}{s("C#")}{p(", ")}{s("ASP.NET Core")}{p("],")} </JsonLine>
					<JsonLine no={8}>{"    "}{k('"secondary"')}{p(":  ")}{p("[")}{s("PHP")}{p("],")} </JsonLine>
					<JsonLine no={9}>{"    "}{k('"os"')}{p(":         ")}{s(stackValues.os)}{p(",")}</JsonLine>
					<JsonLine no={10}>{"    "}{k('"containers"')}{p(": ")}{s(stackValues.containers)}{p(",")}</JsonLine>
					<JsonLine no={11}>{"    "}{k('"vcs"')}{p(":        ")}{s(stackValues.vcs)}</JsonLine>
					<JsonLine no={12}>{"  "}{p("},")}</JsonLine>
					<JsonLine no={13}>
						{"  "}{k('"interests"')}{p(": ")}{p("[")}{s(interestsTr[0])}{p(", ")}{s(interestsTr[1])}{p(", ")}{s(interestsTr[2])}{p("],")}
					</JsonLine>
					<JsonLine no={14}>{"  "}{k('"knownVulnerabilities"')}{p(": ")}{n(0)}{p(",")}</JsonLine>
					<JsonLine no={15}>{"  "}{k('"openToBugs"')}{p(": ")}{b("false")}</JsonLine>
					<JsonLine no={16}>{p("}")}</JsonLine>
				</pre>
			</div>

			{/* Stack badges */}
			<section className="mb-14">
				<SectionLabel>{t.stackLabel}</SectionLabel>
				<div className="flex flex-wrap gap-2">
					{stackBadges.map(({ label, color }) => <Badge key={label} label={label} color={color} />)}
				</div>
			</section>

			{/* Stack Trace bio */}
			<section className="mb-14">
				<SectionLabel>{t.stackTrace}</SectionLabel>
				<div className="space-y-4 text-sm leading-relaxed max-w-2xl" style={{ color: "var(--fg-secondary)" }}>
					{lang === "tr" ? (
						<>
							<p>Gündüz <Em>ASP.NET Core</Em> API&apos;leri yazıyor, geceleri bunları nasıl sertleştireceğimi düşünüyorum — siber güvenlik yan ilgim oldukça işe yarıyor.</p>
							<p><Em>PHP</Em>&apos;yi de akıcı konuşurum, yani eski kod tabanlarını okurken donup kalmam. Bu bir beceri sayılır.</p>
							<p><Em>Linux</Em> benim doğal ortamım — GUI gerektirmez, terminal benim IDE&apos;im ve vim terapim. <Em>Docker</Em> &ldquo;bende çalışıyor&rdquo; dönemini kapattı. <Em>Git</Em>, her şeyin kayıt altında olduğunun sessiz güvenciyle commit yapma sanatıdır.</p>
						</>
					) : (
						<>
							<p>I write <Em>ASP.NET Core</Em> APIs by day and think about hardening them at night — my cybersecurity side-interest turns out to be quite functional.</p>
							<p>Fluent in <Em>PHP</Em> too, meaning I don&apos;t freeze when reading legacy codebases. That qualifies as a skill.</p>
							<p><Em>Linux</Em> is my natural habitat — no GUI required, the terminal is my IDE, and vim is my therapy. <Em>Docker</Em> closed the &ldquo;works on my machine&rdquo; era. <Em>Git</Em> is the art of committing with the quiet confidence that everything is recorded.</p>
						</>
					)}
				</div>
			</section>

			{/* Security */}
			<section className="mb-14">
				<SectionLabel>{t.securityLabel}</SectionLabel>
				<div className="max-w-2xl">
					<Callout type="warn" title="Disclaimer">
						{t.disclaimer}
					</Callout>
					<p className="text-sm leading-relaxed mt-4" style={{ color: "var(--fg-secondary)" }}>
						{t.securityText}
					</p>
				</div>
			</section>

			{/* Processes */}
			<section className="mb-14">
				<SectionLabel>{t.psLabel}</SectionLabel>
				<div className="max-w-2xl">
					<Terminal>
						{lang === "tr"
							? `mert     1337  0.0  0.1  blog-yazma\nmert     4200  2.4  0.8  dokuman-okuma\nmert     6660  0.0  0.0  hayat-sorgulamak\nmert     8080  1.2  0.4  bir-seyler-insa-etme\nmert     9999 99.9 99.9  kahve-icme`
							: `mert     1337  0.0  0.1  writing-blog\nmert     4200  2.4  0.8  reading-docs\nmert     6660  0.0  0.0  questioning-life-choices\nmert     8080  1.2  0.4  building-something-new\nmert     9999 99.9 99.9  drinking-coffee`}
					</Terminal>
				</div>
			</section>

			{/* Contact */}
			<section className="mb-8">
				<SectionLabel>{t.contactLabel}</SectionLabel>
				<div className="max-w-2xl">
					<p className="text-sm leading-relaxed mb-5" style={{ color: "var(--fg-secondary)" }}>
						{t.contactText}
					</p>
					<div className="rounded-lg p-4 text-xs font-mono" style={{ background: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
						<div>
							<span style={{ color: "var(--accent-emerald)" }}>$ </span>
							<span style={{ color: "var(--fg-primary)" }}>curl -X POST https://abort.run/contact \</span>
						</div>
						<div className="pl-4">
							<span style={{ color: "var(--fg-primary)" }}>-d </span>
							<span style={{ color: "var(--syntax-string)" }}>{`'{"intent": "hello"}'`}</span>
							<span style={{ color: "var(--fg-muted)" }}> # {lang === "tr" ? "ya da footer'dan ulaş" : "or just reach out via footer"}</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
