import * as React from "react";
import type { Metadata } from "next";
import { Fraunces, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";


const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "PrintBloom | Turn Your Memories into Gifts",
  description: "Personalized magazines, polaroids, and frames. Turn your favorite memories into beautifully crafted gifts they'll keep forever.",
  keywords: ["personalized gifts", "custom magazine", "photo printing", "polaroid prints", "anniversary gifts", "birthday gifts"],
  openGraph: {
    title: "PrintBloom",
    description: "Personalized custom magazines and photo gifts.",
    url: "https://printbloom.in",
    siteName: "PrintBloom",
    images: [
      {
        url: "https://printbloom.in/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

import { GlobalModals } from "@/components/global-modals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${publicSans.variable} ${ibmPlexMono.variable} antialiased bg-[#FBF6EE] text-[#221F1C] font-sans selection:bg-[#C1502E] selection:text-white`}
        suppressHydrationWarning
      >
        {children}
        <GlobalModals />
      </body>
    </html>
  );
}
