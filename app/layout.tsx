import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3001";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Word of Mouth — Strategy · Design · Motion";
  const description = "We turn signal into direction — and direction into movement.";

  return {
    title,
    description,
    icons: { icon: "/brand/word-of-mouth-favicon.svg", shortcut: "/brand/word-of-mouth-favicon.svg" },
    openGraph: {
      title,
      description,
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og-wom.png`, width: 1200, height: 630, alt: "Word of Mouth — Strategy, Design, Motion" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og-wom.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={manrope.variable}>{children}</body></html>;
}
