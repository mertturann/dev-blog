export const LOCALES = ["en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(lang: string): lang is Locale {
	return LOCALES.includes(lang as Locale);
}

export const dict = {
	en: {
		nav: { posts: "Posts", about: "About", contact: "Contact" },
		home: {
			statusPill: "writing about systems & craft",
			subtitle:
				"C# · ASP.NET Core · PHP · Linux · Docker · Cyber Security.\nWriting about systems, tools, and software engineering.",
			readPosts: "Read Posts",
			about: "About",
			featured: "Featured",
			recentPosts: "Recent Posts",
			all: "All",
		},
		posts: {
			title: "Posts",
			lastUpdated: "last updated",
		},
		post: {
			allPosts: "All posts",
			olderPost: "Older post",
			newerPost: "Newer post",
			minRead: "min read",
			updated: "Updated",
		},
		tags: {
			allPosts: "All posts",
		},
		footer: {
			tagline: "Backend developer. Writing about systems, tools, and engineering.",
		},
		about: {
			statusPill: "status: online",
			title: "whoami",
			subtitle:
				"Backend developer. I build resilient systems, obsess over internals, and occasionally poke at things that shouldn't be poked.",
			stackLabel: "Stack",
			stackTrace: "Stack Trace",
			securityLabel: "Security Clearance",
			psLabel: "$ ps aux | grep mert",
			contactLabel: "Contact",
			disclaimer:
				"Security knowledge is strictly defensive. I don't intrude on systems without authorization — and if I did, I'd clean the logs anyway.",
			securityText:
				"On the security side, I aim to know both theory and practice rather than getting stuck between them. CTF challenges, pentesting methodologies, and opening a PR that says \"this needs to be patched\" are part of the routine.",
			contactText:
				"Have a project idea, a technical question, or just want to say hello — use the links in the footer. PRs are welcome too.",
		},
		contact: {
			statusPill: "accepting connections",
			title: "contact",
			description:
				"Have a project idea, a question, or just want to say hello — pick a channel below.",
			channels: "Channels",
			netstat: "$ netstat -an | grep LISTEN",
			privateRepos:
				"Most of my large-scale projects are hosted as private repositories on GitHub. If you're interested in my work, feel free to reach out directly.",
			contactDescriptions: {
				github: "Source code & projects",
				instagram: "Day-to-day stuff",
				email: "For anything else",
			},
		},
	},
	tr: {
		nav: { posts: "Yazılar", about: "Hakkımda", contact: "İletişim" },
		home: {
			statusPill: "sistemler & yazılım üzerine yazıyorum",
			subtitle:
				"C# · ASP.NET Core · PHP · Linux · Docker · Siber Güvenlik.\nSistemler, araçlar ve yazılım mühendisliği üzerine yazılar.",
			readPosts: "Yazıları Oku",
			about: "Hakkımda",
			featured: "Öne Çıkan",
			recentPosts: "Son Yazılar",
			all: "Tümü",
		},
		posts: {
			title: "Yazılar",
			lastUpdated: "son güncelleme",
		},
		post: {
			allPosts: "Tüm yazılar",
			olderPost: "Eski yazı",
			newerPost: "Yeni yazı",
			minRead: "dk okuma",
			updated: "Güncellendi",
		},
		tags: {
			allPosts: "Tüm yazılar",
		},
		footer: {
			tagline: "Backend geliştirici. Sistemler, araçlar ve mühendislik üzerine yazıyorum.",
		},
		about: {
			statusPill: "durum: çevrimiçi",
			title: "whoami",
			subtitle:
				"Backend geliştiriciyim. Sağlam sistemler kurmaya çalışıyorum, bir şeyin arka planda nasıl çalıştığını öğrenmeden rahat edemiyorum. Arada bir de kurcalanmaması gereken yerleri kurcalıyorum.",
			stackLabel: "Stack",
			stackTrace: "Stack Trace",
			securityLabel: "Güvenlik",
			psLabel: "$ ps aux | grep mert",
			contactLabel: "İletişim",
			disclaimer:
				"Bildiklerimi sadece savunma için kullanıyorum. İzinsiz hiçbir sisteme girmiyorum, girsem de zaten arkamda log bırakmazdım.",
			securityText:
				"Güvenlikte işi teoride bırakmıyorum, okuduğumu pratikte de deniyorum. CTF çözüyorum, pentest tekniklerine kafa yoruyorum. Bir açık görünce de \"bunu kapatalım\" deyip PR açıyorum.",
			contactText:
				"Aklında bir proje fikri varsa, teknik bir konuda takıldıysan ya da sadece selam vermek istiyorsan sayfanın altındaki bağlantılardan bana ulaşabilirsin. PR'lara da her zaman açığım.",
		},
		contact: {
			statusPill: "bağlantılara açık",
			title: "iletişim",
			description:
				"Bir proje fikrin mi var, teknik bir konuda mı takıldın, yoksa sadece selam mı vermek istiyorsun? Aşağıdaki kanallardan bana ulaşabilirsin.",
			channels: "Kanallar",
			netstat: "$ netstat -an | grep LISTEN",
			privateRepos:
				"Büyük projelerimin çoğu GitHub'da private repo olarak duruyor. Çalışmalarımı merak ediyorsan bana doğrudan yazabilirsin.",
			contactDescriptions: {
				github: "Kaynak kod & projeler",
				instagram: "Günlük paylaşımlar",
				email: "Diğer her şey için",
			},
		},
	},
} as const;

export type Dict = (typeof dict)[Locale];
