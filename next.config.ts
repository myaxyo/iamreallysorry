import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for self-hosted/Coolify deployment
  output: "standalone",

  // Cleaner responses + smaller payloads.
  poweredByHeader: false,
  compress: true,

  // Proxy Umami analytics through our domain to bypass ad blockers
  async rewrites() {
    return [
      {
        source: "/stats/:path*",
        destination: "https://umami.prompter.uz/:path*",
      },
    ];
  },

  // Safe, non-breaking response headers. Intentionally no Content-Security-Policy
  // here — a strict CSP would break the inline JSON-LD scripts and Three.js runtime.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // Cache static assets aggressively (images, fonts, sounds)
        source: "/(.*\\.(?:png|jpg|jpeg|gif|ico|svg|webp|woff2|woff|mp3))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
