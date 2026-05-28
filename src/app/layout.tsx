import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';
import NotificationBanner from "@/components/NotificationBanner";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollToTopButton from "@/components/ScrollToTopButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const highlightDisplay = Bricolage_Grotesque({
  variable: "--font-highlight",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hammadgfx.online"),
  title: {
    default: "Hammad GFX | Professional Graphic Designer Portfolio",
    template: "%s | Hammad GFX",
  },
  description:
    "Hammad GFX is a professional graphic designer portfolio showcasing logo design, brand identity, social media posts, print design, banners, thumbnails, and creative marketing visuals.",
  keywords: [
    "graphic designer Pakistan",
    "logo designer",
    "brand identity designer",
    "social media post designer",
    "print design",
    "banner design",
    "YouTube thumbnail designer",
    "Hammad GFX",
    "freelance graphic designer",
  ],
  alternates: {
    canonical: "https://hammadgfx.online",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Hammad GFX | Professional Graphic Designer Portfolio",
    description:
      "Logo design, brand identity, social media posts, print design, banners, thumbnails, and creative marketing visuals by Hammad GFX.",
    url: "https://hammadgfx.online",
    siteName: "Hammad GFX",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Hammad GFX professional graphic designer portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hammad GFX | Professional Graphic Designer Portfolio",
    description:
      "Professional logo design, brand identity, social media, print, banner, thumbnail, and marketing visuals.",
    images: ["/logo.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${highlightDisplay.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SmoothScrollProvider>
          <div className="w-full max-w-full overflow-x-hidden">
            <NotificationBanner />
            {children}
            {process.env.VERCEL ? <Analytics /> : null}
            <Footer/>
            <ScrollToTopButton />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
