import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cleaner responses + smaller payloads.
  poweredByHeader: false,
  compress: true,

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
    ];
  },
};

export default nextConfig;
