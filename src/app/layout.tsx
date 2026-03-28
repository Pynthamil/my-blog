import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://my-blog-tan-tau.vercel.app"),
  title: {
    default: "pyndu logs | Developer Blog & Experiments",
    template: "%s | pyndu logs",
  },
  description: "Building in public with Next.js, Notion, and a focus on clean aesthetics. Documenting spectacular failures and technical wins.",
  keywords: ["github", "nextjs", "coding projects", "learning in public", "minimal setup", "notion", "aesthetic", "developer blog", "software engineering"],
  authors: [{ name: "pyndu" }],
  creator: "pyndu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://my-blog-tan-tau.vercel.app",
    siteName: "pyndu logs",
    title: "pyndu logs | Developer Blog & Experiments",
    description: "Building in public with Next.js, Notion, and a focus on clean aesthetics.",
    images: [
      {
        url: "/images/TerminalIcon.svg", // Fallback OG image
        width: 800,
        height: 600,
        alt: "pyndu logs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "pyndu logs | Developer Blog & Experiments",
    description: "Building in public with Next.js, Notion, and a focus on clean aesthetics.",
    images: ["/images/TerminalIcon.svg"],
    creator: "@pyndu", // Update if you have a real handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "pyndu logs",
    alternateName: "pyndulogs",
    url: "https://my-blog-tan-tau.vercel.app",
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Reuse existing SVG as the site's favicon until we generate pixel/ICO variants */}
        <link rel="icon" href="/images/TerminalIcon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/TerminalIcon.svg" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="pyndu logs RSS" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f0f11" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        {children}
        <Analytics />
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
