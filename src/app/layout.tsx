import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Am Really Sorry — Create a Funny Apology Website for Free",
  description:
    "Make a personalized apology page with 3D animations, meme sounds, and a runaway No button. The funniest way to say sorry to your girlfriend, boyfriend, or friend online.",
  robots: {
    index: false,
    follow: true,
  },
};

// Root layout - minimal wrapper, actual HTML shell is in [lang]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
