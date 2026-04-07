import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.hashnode.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us.i.posthog.com https://giscus.app; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://cdn.hashnode.com https://lh3.googleusercontent.com https://avatars.githubusercontent.com https://pbs.twimg.com https://us.i.posthog.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://us.i.posthog.com https://hvihsxfmlcenhoqfkgrr.supabase.co https://giscus.app; frame-src 'self' https://giscus.app; object-src 'none';",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
