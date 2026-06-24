import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "../dictionaries";
import { getBlogPosts } from "./posts";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "en"
      ? "Apology Tips & Relationship Advice | iamreallysorry.com"
      : "Советы по извинениям и отношениям | iamreallysorry.com",
    description: lang === "en"
      ? "Learn how to apologize to your girlfriend, boyfriend, or partner. Tips from TikTok trends, relationship experts, and real couple experiences."
      : "Узнай как попросить прощения у девушки, парня или партнёра. Советы из TikTok трендов и реальный опыт пар.",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const posts = getBlogPosts(lang as Locale);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {lang === "en" ? "Apology Tips & Relationship Advice" : "Советы: как правильно извиниться"}
        </h1>
        <p className="text-gray-400 mb-12 text-lg">
          {lang === "en"
            ? "Real advice for real mess-ups. Inspired by viral trends and actual relationship wisdom."
            : "Реальные советы для реальных ошибок. Вдохновлено вирусными трендами и мудростью отношений."}
        </p>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="block bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-pink-500/50 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{post.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm">{post.excerpt}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/${lang}`}
            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-lg hover:scale-105 transition-transform"
          >
            {lang === "en" ? "Create Your Apology Now →" : "Создать извинение →"}
          </Link>
        </div>
      </div>
    </main>
  );
}
