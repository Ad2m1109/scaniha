import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { GaranemsaPage } from "@/components/garanemsa/GaranemsaPage";
import { business, menuCategories } from "@/lib/garanemsa/content";
import "./garanemsa.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garanemsa-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-garanemsa-sans",
  display: "swap",
});

const title = "Garanemsa Café & Resto — Sousse, Tunisie";
const description =
  "Garanemsa Café & Resto à Sousse, Tunisie : un café-restaurant au cadre végétal et chaleureux. Carte, photos et coordonnées à découvrir via Scaniha.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title,
  description,
  applicationName: "Scaniha",
  alternates: {
    canonical: "/garanemsa",
  },
  openGraph: {
    type: "website",
    locale: "fr_TN",
    alternateLocale: ["en_US", "ar_TN"],
    url: "/garanemsa",
    siteName: "Garanemsa Café & Resto",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Garanemsa",
    "café Sousse",
    "restaurant Sousse",
    "café resto Tunisie",
    "carte Sousse",
  ],
  other: {
    "content-language": "fr",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C2B26",
  colorScheme: "light",
};

const sameAs = [
  business.instagram,
  business.facebook,
  business.whatsapp,
].filter((value): value is string => Boolean(value));

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Garanemsa Café & Resto",
  description:
    "Café-restaurant à Sousse, Tunisie, au cadre végétal et chaleureux.",
  url: `${business.siteUrl}/garanemsa`,
  inLanguage: ["fr", "en", "ar"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sousse",
    addressCountry: "TN",
    ...(business.address ? { streetAddress: business.address } : {}),
  },
  hasMenu: {
    "@type": "Menu",
    name: "La carte",
    hasMenuSection: menuCategories.map((category) => ({
      "@type": "MenuSection",
      name: category.label.fr,
    })),
  },
  ...(business.phone ? { telephone: business.phone } : {}),
  ...(business.hours ? { openingHours: business.hours.fr } : {}),
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

export default function GaranemsaRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <GaranemsaPage
        fontClassName={`${serif.variable} ${sans.variable}`}
      />
    </>
  );
}
