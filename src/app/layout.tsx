import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';
import NotificationBanner from "@/components/NotificationBanner";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hammad GFX | Professional Visual Designer",
  description: "Premium logos, brand identities, social media designs, and marketing visuals by Hammad GFX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SmoothScrollProvider>
          <div className="w-full max-w-full overflow-x-hidden">
            <NotificationBanner />
            {children}
            <Analytics />
            <Footer/>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
