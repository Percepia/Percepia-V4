// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";

// Set this in .env.local for production: NEXT_PUBLIC_SITE_URL=https://percepia.app
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Percepia",
    template: "%s • Percepia",
  },
  description:
    "Confidence, with kindness. Percepia connects you with real people for thoughtful feedback on looks, style, and presence.",
  themeColor: "#0f0f14",

  // ✅ Single `icons` object (not nested)
  icons: {
    icon: [
      { url: "/favicon.ico?v=5" }, // multi-size .ico in /public
      { url: "/icon.png?v=5" }, // 512×512 in /src/app
      { url: "/icon-256.png?v=5", sizes: "256x256", type: "image/png" }, // /public
      { url: "/favicon-32.png?v=5", sizes: "32x32", type: "image/png" }, // /public
    ],
    apple: [{ url: "/apple-icon.png?v=5", sizes: "180x180", type: "image/png" }], // /src/app
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Percepia",
    title: "Percepia — Confidence, with kindness.",
    description:
      "Get kind, honest feedback on your look, style, and presence from real people.",
    images: [
      {
        url: "/og.png?v=5", // /public/og.png  (use og-dark.png if you prefer solid bg)
        width: 1200,
        height: 630,
        alt: "Percepia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Percepia — Confidence, with kindness.",
    description:
      "Get kind, honest feedback on your look, style, and presence from real people.",
    images: ["/og.png?v=5"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

