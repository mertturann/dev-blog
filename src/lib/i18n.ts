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
				"Backend geliştirici. Dayanıklı sistemler kuruyorum, içlerine takıntılıyım ve arada sırada dokunulmaması gereken şeylere dokunuyorum.",
			stackLabel: "Stack",
			stackTrace: "Stack Trace",
			securityLabel: "Güvenlik İzni",
			psLabel: "$ ps aux | grep mert",
			contactLabel: "İletişim",
			disclaimer:
				"Güvenlik bilgisi kesinlikle savunma amaçlıdır. İzinsiz sistemlere girmiyorum — girseydim de logları temizlerdim.",
			securityText:
				"Güvenlik tarafında, ikisi arasında sıkışıp kalmak yerine hem teoriyi hem pratiği bilmeyi hedefliyorum. CTF zorlukları, sızma testi metodolojileri ve \"bu yamayı bekliyor\" diyen bir PR açmak rutinin bir parçası.",
			contactText:
				"Bir proje fikrin, teknik bir sorun mu var ya da sadece merhaba demek mi istiyorsun — footer'daki bağlantıları kullan. PR'lar da memnuniyetle karşılanır.",
		},
		contact: {
			statusPill: "bağlantı kabul ediliyor",
			title: "iletişim",
			description:
				"Bir proje fikrin, teknik bir sorun mu var ya da sadece merhaba demek mi istiyorsun — aşağıdan bir kanal seç.",
			channels: "Kanallar",
			netstat: "$ netstat -an | grep LISTEN",
			privateRepos:
				"GitHub profilimde yer alan büyük çaplı projelerimin büyük çoğunluğu özel (private) depo olarak tutulmaktadır. Çalışmalarımla ilgileniyorsan doğrudan iletişime geçebilirsin.",
			contactDescriptions: {
				github: "Kaynak kod & projeler",
				instagram: "Günlük paylaşımlar",
				email: "Diğer her şey için",
			},
		},
	},
} as const;

export type Dict = (typeof dict)[Locale];
