import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://expatmalaga.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Expat Málaga — Guide des expatriés français en Andalousie",
    template: "%s · Expat Málaga",
  },
  description:
    "Récits, démarches et bonnes adresses pour les Français qui s'installent en Andalousie : NIE, logement, santé, padel, visa nomade digital.",
  openGraph: {
    title: "Expat Málaga — Guide des expatriés français en Andalousie",
    description:
      "Le guide indépendant des Français qui s'installent en Andalousie.",
    url: SITE_URL,
    siteName: "Expat Málaga",
    locale: "fr_FR",
    type: "website",
    images: [{ url: `${SITE_URL}/api/og?title=Expat+M%C3%A1laga`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expat Málaga",
    description:
      "Le guide indépendant des Français qui s'installent en Andalousie.",
    images: [`${SITE_URL}/api/og?title=Expat+M%C3%A1laga`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  verification: { google: "YIQu-DYF05o3DILUn_f17ozwqk2_F" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
