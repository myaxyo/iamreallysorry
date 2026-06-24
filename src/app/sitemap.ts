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
  ],
  ru: [
    "kak-poprosit-proshcheniya-u-devushki",
    "virusnye-sposoby-pomiritsya-posle-ssory",
  ],
};

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
