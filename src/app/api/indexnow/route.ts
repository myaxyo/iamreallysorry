import { NextResponse } from "next/server";

const INDEX_NOW_KEY = "432d33ec-42a4-4b0e-9fed-92612d555beb";
const HOST = "https://iamreallysorry.com";

// Key URLs to ping search engines about
const URLS = [
  `${HOST}/en`,
  `${HOST}/ru`,
  `${HOST}/es`,
  `${HOST}/en/apology-to-girlfriend`,
  `${HOST}/en/apology-to-boyfriend`,
  `${HOST}/en/apology-to-friend`,
  `${HOST}/en/blog/how-to-apologize-to-your-girlfriend`,
  `${HOST}/en/blog/sorry-message-for-boyfriend-after-fight`,
  `${HOST}/en/blog/couple-fight-makeup-ideas-viral`,
];

export async function GET() {
  const payload = {
    host: "iamreallysorry.com",
    key: INDEX_NOW_KEY,
    keyLocation: `${HOST}/${INDEX_NOW_KEY}.txt`,
    urlList: URLS,
  };

  const results = await Promise.allSettled([
    // Ping Bing
    fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
    // Ping Yandex
    fetch("https://yandex.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  ]);

  const summary = results.map((r, i) => ({
    engine: i === 0 ? "bing" : "yandex",
    status: r.status === "fulfilled" ? r.value.status : "failed",
  }));

  return NextResponse.json({ success: true, pinged: summary });
}
