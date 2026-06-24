import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import ApologyExperience from "@/components/ApologyExperience";
import LandingContent from "@/components/LandingContent";

interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const { name } = await searchParams;

  return (
    <>
      <ApologyExperience dict={dict} name={name} lang={lang} />
      {/* Only show SEO landing content when no name is provided (discovery mode) */}
      {!name && <LandingContent dict={dict} lang={lang} />}
    </>
  );
}
