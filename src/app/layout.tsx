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
  title: "pyndu logs() — Developer Blog",
  description: "building in public so future me can laugh at this code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable} antialiased`}>
      <head>
        {/* Reuse existing SVG as the site's favicon until we generate pixel/ICO variants */}
        <link rel="icon" href="/images/TerminalIcon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/TerminalIcon.svg" />
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
