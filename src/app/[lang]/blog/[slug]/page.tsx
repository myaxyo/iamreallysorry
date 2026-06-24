import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "../../dictionaries";
import { getBlogPost, getBlogPosts } from "../posts";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  if (!hasLocale(lang)) return [];
  const posts = getBlogPosts(lang as Locale);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const post = getBlogPost(lang as Locale, slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: `https://iamreallysorry.com/${lang}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const post = getBlogPost(lang as Locale, slug);
  if (!post) notFound();

  // Simple markdown to HTML (headings, bold, lists, links)
  const htmlContent = post.content
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-white mt-12 mb-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl md:text-4xl font-bold text-white mb-6">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-gray-300 mb-1">• $1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 text-gray-300 mb-2">$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-pink-400 underline hover:text-pink-300">$1</a>')
    .replace(/^(?!<[h|l|a|s])(.*\S.*)$/gm, '<p class="text-gray-400 leading-relaxed mb-4">$1</p>')
    .replace(/---/g, '<hr class="border-gray-700 my-8" />');

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    url: `https://iamreallysorry.com/${lang}/blog/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "iamreallysorry.com",
      url: "https://iamreallysorry.com",
    },
    datePublished: "2026-06-01",
    dateModified: "2026-06-21",
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="max-w-3xl mx-auto">
        <Link
          href={`/${lang}/blog`}
          className="text-gray-500 hover:text-pink-400 text-sm mb-8 inline-block"
        >
          ← {lang === "en" ? "Back to all articles" : "Назад ко всем статьям"}
        </Link>

        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-16 p-6 bg-gray-800/50 border border-pink-500/30 rounded-2xl text-center">
          <p className="text-xl font-bold text-white mb-2">
            {lang === "en" ? "Ready to apologize?" : "Готов извиниться?"}
          </p>
          <p className="text-gray-400 mb-4">
            {lang === "en"
              ? "Create an interactive apology page in 30 seconds. Free, funny, impossible to say no to."
              : "Создай интерактивную страницу извинения за 30 секунд. Бесплатно, смешно, невозможно отказать."}
          </p>
          <Link
            href={`/${lang}`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:scale-105 transition-transform"
          >
            {lang === "en" ? "Create Your Apology →" : "Создать извинение →"}
          </Link>
        </div>
      </article>
    </main>
  );
}
