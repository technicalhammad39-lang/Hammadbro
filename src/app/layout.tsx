import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';
import NotificationBanner from "@/components/NotificationBanner";


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
        <div className="w-full max-w-full overflow-x-hidden">
          <NotificationBanner />
          {children}
          <Analytics />
          <Footer/>
        </div>
      </body>
    </html>
  );
}
