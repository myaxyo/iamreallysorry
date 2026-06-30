import type { MetadataRoute } from "next";
import { seoPageSlugs } from "./[lang]/[slug]/seoPages";
import { getBlogPosts } from "./[lang]/blog/posts";

const locales = ["en", "ru", "es", "pt", "fr", "de", "tr", "ar", "hi", "ja", "ko"];
const baseUrl = "https://iamreallysorry.com";

// hreflang alternates for the genuinely-localized home pages.
const homeLanguageAlternates: Record<string, string> = {
  ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`])),
  "x-default": `${baseUrl}/en`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [];

  // 1. Localized home pages — one entry per locale (real translations exist).
  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: homeLanguageAlternates },
    });
  }

  // 2. Programmatic SEO landing pages — content is English, so only the
  //    canonical English URLs are submitted (other locales canonicalize here).
  for (const slug of seoPageSlugs) {
    routes.push({
      url: `${baseUrl}/en/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // 3. Blog index pages (locales with their own blog content).
  for (const locale of ["en", "ru"]) {
    routes.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 4. Blog posts — only canonical URLs (English set under /en, Russian under /ru).
  for (const locale of ["en", "ru"] as const) {
    for (const post of getBlogPosts(locale)) {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return routes;
}
