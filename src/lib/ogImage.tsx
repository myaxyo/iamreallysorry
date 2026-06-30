import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Short, ASCII-safe taglines per locale. Kept ASCII so the default
// next/og font always renders them (no remote font fetch = no build risk).
const TAGLINES: Record<string, string> = {
  en: "Say sorry. The fun way.",
  ru: "Say sorry. The fun way.",
  es: "Pide perdon. Con estilo.",
  pt: "Peca desculpas. Com estilo.",
  fr: "Demande pardon. Version fun.",
  de: "Sag sorry. Aber mit Stil.",
  tr: "Ozur dile. Eglenceli sekilde.",
  ar: "Say sorry. The fun way.",
  hi: "Say sorry. The fun way.",
  ja: "Say sorry. The fun way.",
  ko: "Say sorry. The fun way.",
};

export function renderOgImage(lang: string) {
  const tagline = TAGLINES[lang] ?? TAGLINES.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #030712 0%, #1a0533 55%, #3b0764 100%)",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Soft glow behind the heart */}
        <div
          style={{
            position: "absolute",
            top: 150,
            width: 360,
            height: 360,
            borderRadius: 360,
            background: "#ec4899",
            opacity: 0.25,
            display: "flex",
          }}
        />

        {/* Heart (inline SVG, font-independent) */}
        <svg
          width="190"
          height="190"
          viewBox="0 0 24 24"
          fill="#ff2d6f"
          style={{ marginBottom: 24 }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 78,
            letterSpacing: -2,
            color: "#ffffff",
            display: "flex",
          }}
        >
          iamreallysorry
          <span style={{ color: "#ec4899" }}>.com</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 38,
            color: "#cbd5e1",
            marginTop: 14,
            display: "flex",
          }}
        >
          {tagline}
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 44,
          }}
        >
          {["FREE", "FUNNY", "INTERACTIVE"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#f9a8d4",
                border: "2px solid #ec4899",
                borderRadius: 999,
                padding: "8px 26px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
