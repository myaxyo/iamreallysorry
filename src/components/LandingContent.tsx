interface Dict {
  landing: {
    h1: string;
    h2_1: string;
    p1: string;
    h2_2: string;
    steps: string[];
    h2_3: string;
    features: string[];
    h2_faq: string;
    faq: { q: string; a: string }[];
    cta: string;
  };
  [key: string]: unknown;
}

interface Props {
  dict: Dict;
  lang: string;
}

const SEO_LINKS = [
  { slug: "apology-to-girlfriend", label: "Apology to Girlfriend" },
  { slug: "apology-to-boyfriend", label: "Apology to Boyfriend" },
  { slug: "apology-to-friend", label: "Apology to Friend" },
  { slug: "apology-to-wife", label: "Apology to Wife" },
  { slug: "apology-to-husband", label: "Apology to Husband" },
  { slug: "apology-to-mom", label: "Apology to Mom" },
  { slug: "apology-to-family", label: "Apology to Family" },
  { slug: "apology-to-coworker", label: "Apology to Coworker" },
  { slug: "sorry-for-forgetting", label: "Sorry for Forgetting" },
  { slug: "sorry-for-argument", label: "Sorry After an Argument" },
  { slug: "sorry-for-being-distant", label: "Sorry for Being Distant" },
  { slug: "sorry-for-lying", label: "Sorry for Lying" },
  { slug: "sorry-for-being-rude", label: "Sorry for Being Rude" },
];

export default function LandingContent({ dict, lang }: Props) {
  const landing = dict.landing;

  // FAQ structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section
      className="bg-gray-950 text-gray-300 py-20 px-4"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Main H1 for SEO */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {landing.h1}
          </h2>
        </div>

        {/* Value proposition */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {landing.h2_1}
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">{landing.p1}</p>
        </div>

        {/* How it works */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {landing.h2_2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landing.steps.map((step, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center"
              >
                <div className="text-4xl font-black text-pink-500 mb-3">
                  {i + 1}
                </div>
                <p className="text-gray-300 text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {landing.h2_3}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {landing.features.map((feature, i) => (
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

        {/* FAQ for SEO */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {landing.h2_faq}
          </h2>
          <div className="space-y-4">
            {landing.faq.map((item, i) => (
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

        {/* CTA */}
        <div className="text-center pt-8">
          <a
            href={`/${lang}`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-xl hover:scale-105 transition-transform"
          >
            {landing.cta} →
          </a>
        </div>

        {/* Internal SEO Links */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
            {lang === "en" ? "Apologize to Anyone" : "Извинись перед кем угодно"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {SEO_LINKS.map((link) => (
              <a
                key={link.slug}
                href={`/${lang}/${link.slug}`}
                className="text-sm bg-gray-800/50 border border-gray-700 text-gray-300 px-3 py-2 rounded-lg hover:border-pink-500/50 hover:text-pink-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Blog link for SEO internal linking */}
        {(lang === "en" || lang === "ru") && (
          <div className="mt-12 text-center border-t border-gray-800 pt-8">
            <p className="text-gray-400 mb-3">
              {lang === "en"
                ? "Want more tips on how to apologize?"
                : "Хочешь больше советов как извиниться?"}
            </p>
            <a
              href={`/${lang}/blog`}
              className="text-pink-400 underline hover:text-pink-300 text-lg"
            >
              {lang === "en"
                ? "Read our relationship & apology advice →"
                : "Читай наши советы по отношениям и извинениям →"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
