import { ThemeProvider } from "@/lib/theme";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-VT8CSELFSN";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			suppressHydrationWarning
			data-theme="dark"
			className={`${geistSans.variable} ${geistMono.variable}`}
		>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
					strategy="afterInteractive"
				/>
				<Script id="gtag-init" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GA_ID}');
					`}
				</Script>
			</body>
		</html>
	);
}
