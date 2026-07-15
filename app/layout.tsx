import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const title = "Word of Mouth — Brand strategy, identity & digital experiences";
const description = "An independent brand studio turning clear strategy into distinct identity, digital experiences, and motion.";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "wordofmouth.studio";
  const isLocal = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const protocol = incoming.get("x-forwarded-proto") ?? (isLocal ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    applicationName: "Word of Mouth",
    alternates: { canonical: "/" },
    icons: {
      icon: "/brand/word-of-mouth-favicon.svg",
      shortcut: "/brand/word-of-mouth-favicon.svg",
      apple: "/brand/word-of-mouth-favicon.svg",
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Word of Mouth",
      url: "/",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Word of Mouth brand studio" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: { index: !isLocal, follow: !isLocal },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3eadf",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
