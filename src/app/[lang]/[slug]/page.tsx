import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "../dictionaries";
import { getSeoPage, seoPageSlugs } from "./seoPages";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return seoPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const page = getSeoPage(lang as Locale, slug);
  if (!page) return {};

  const baseUrl = "https://iamreallysorry.com";

  // Content is English for every locale, so consolidate ranking signals
  // onto the English URL to avoid duplicate-content dilution.
  const canonicalUrl = `${baseUrl}/en/${slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: canonicalUrl,
      siteName: "iamreallysorry.com",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function SeoPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const page = getSeoPage(lang as Locale, slug);
  if (!page) notFound();

  // FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbItems = [
    { label: "Home", href: `/${lang}` },
    { label: page.h1 },
  ];

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 px-4 pt-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 mt-4">
            {page.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
            {page.intro}
          </p>

          <Link
            href={`/${lang}`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform"
          >
            {page.cta} →
          </Link>
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Tips for the Perfect Apology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.tips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gray-800/50 border border-gray-700 rounded-xl p-4"
              >
                <span className="text-pink-500 text-xl font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-pink-500 mb-3">1</div>
              <p className="text-gray-300 text-lg">Enter their name</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-pink-500 mb-3">2</div>
              <p className="text-gray-300 text-lg">
                Watch the magic happen (3D heart, sounds, animations)
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-pink-500 mb-3">3</div>
              <p className="text-gray-300 text-lg">
                Share the link — they literally can&apos;t say no
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            What They&apos;ll Experience
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "3D beating heart animation with their name",
              "Sorry meter that hilariously breaks past 100%",
              "Runaway No button (impossible to click!)",
              "Meme sound effects (sad violin, vine boom, airhorn)",
              "Confetti explosion when they forgive you",
              "Personalized messages throughout",
              "Works on mobile and desktop",
              "Available in 11 languages",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-gray-300 text-lg"
              >
                <span className="text-pink-500 text-xl">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {page.faq.map((item, i) => (
              <details
                key={i}
                className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 group"
              >
                <summary className="text-white font-medium cursor-pointer text-lg list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-pink-400 group-open:rotate-45 transition-transform text-2xl">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      {page.relatedSlugs.length > 0 && (
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Related Apology Pages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {page.relatedSlugs.map((relSlug) => {
                const relPage = getSeoPage(lang as Locale, relSlug);
                if (!relPage) return null;
                return (
                  <Link
                    key={relSlug}
                    href={`/${lang}/${relSlug}`}
                    className="block bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-pink-500/50 transition-colors"
                  >
                    <p className="text-white font-medium">{relPage.h1}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-4 py-20 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Ready to Apologize?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Create your personalized apology page in 30 seconds. Free, funny, and
          impossible to say no to.
        </p>
        <Link
          href={`/${lang}`}
          className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-xl hover:scale-105 transition-transform"
        >
          {page.cta} →
        </Link>
      </section>
    </main>
  );
}
