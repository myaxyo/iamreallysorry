import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import ApologyExperience from "@/components/ApologyExperience";
import CreatorFlow from "@/components/CreatorFlow";
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

  // If there's a name param, this is a RECEIVER viewing the apology
  if (name) {
    return <ApologyExperience dict={dict} name={name} lang={lang} isReceiver />;
  }

  // Otherwise, this is a CREATOR discovering or building an apology
  return (
    <>
      <CreatorFlow lang={lang} dict={dict.creator} />
      <LandingContent dict={dict} lang={lang} />
    </>
  );
}
