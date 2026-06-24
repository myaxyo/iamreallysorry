import type { MetadataRoute } from "next";

const locales = ["en", "ru", "es", "pt", "fr", "de", "tr", "ar", "hi", "ja", "ko"];
const baseUrl = "https://iamreallysorry.com";

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

  return routes;
}
