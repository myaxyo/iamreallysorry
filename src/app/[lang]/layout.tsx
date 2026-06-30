import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales, type Locale } from "./dictionaries";
import "../globals.css";

const BASE_URL = "https://iamreallysorry.com";

// Map our locale codes to full Open Graph locale identifiers.
const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  es: "es_ES",
  pt: "pt_BR",
  fr: "fr_FR",
  de: "de_DE",
  tr: "tr_TR",
  ar: "ar_AR",
  hi: "hi_IN",
  ja: "ja_JP",
  ko: "ko_KR",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  const baseUrl = BASE_URL;

  // hreflang map for every locale + an x-default fallback (English).
  const languageAlternates: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `${baseUrl}/${l}`])
  );
  languageAlternates["x-default"] = `${baseUrl}/en`;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${baseUrl}/${lang}`,
      siteName: "iamreallysorry.com",
      type: "website",
      locale: OG_LOCALES[lang] ?? "en_US",
      alternateLocale: Object.values(OG_LOCALES).filter(
        (l) => l !== (OG_LOCALES[lang] ?? "en_US")
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dir = lang === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "I Am Really Sorry",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "I Am Really Sorry",
        inLanguage: lang,
        publisher: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "WebApplication",
        name: "I Am Really Sorry",
        url: `${BASE_URL}/${lang}`,
        applicationCategory: "EntertainmentApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and a modern browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: { "@id": `${BASE_URL}/#organization` },
        description:
          "Create a personalized, interactive apology page with 3D animations, meme sounds, and a runaway No button. Free and works in 11 languages.",
      },
    ],
  };

  return (
    <html lang={lang} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
