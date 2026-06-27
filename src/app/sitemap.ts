import type { MetadataRoute } from "next";

const locales = ["en", "ru", "es", "pt", "fr", "de", "tr", "ar", "hi", "ja", "ko"];
const baseUrl = "https://iamreallysorry.com";

// Blog slugs per locale (only locales with blog content)
const blogSlugs: Record<string, string[]> = {
  en: [
    "how-to-apologize-to-your-girlfriend",
    "sorry-message-for-boyfriend-after-fight",
    "couple-fight-makeup-ideas-viral",
    "how-to-say-sorry-without-saying-sorry",
    "apology-to-best-friend-after-betrayal",
    "how-to-apologize-at-work-professionally",
    "long-distance-apology-ideas",
  ],
  ru: [
    "kak-poprosit-proshcheniya-u-devushki",
    "virusnye-sposoby-pomiritsya-posle-ssory",
  ],
};

// Programmatic SEO page slugs
const seoSlugs = [
  "apology-to-girlfriend",
  "apology-to-boyfriend",
  "apology-to-friend",
  "apology-to-partner",
  "apology-to-wife",
  "apology-to-husband",
  "apology-to-mom",
  "apology-to-family",
  "apology-to-coworker",
  "sorry-for-forgetting",
  "sorry-for-argument",
  "sorry-for-being-distant",
  "sorry-for-lying",
  "sorry-for-being-rude",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Main pages for each locale
  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    });
  }

  // Programmatic SEO pages for each locale
  for (const locale of locales) {
    for (const slug of seoSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  // Blog index pages
  for (const locale of Object.keys(blogSlugs)) {
    routes.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Individual blog posts
    for (const slug of blogSlugs[locale]) {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return routes;
}
