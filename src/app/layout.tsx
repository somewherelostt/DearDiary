import type { Metadata } from "next";
import {
  Inter,
  Fraunces,
  Geist,
  Geist_Mono,
  Merriweather,
} from "next/font/google";
import "./globals.css";

// Design System Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Legacy Fonts (keeping for compatibility)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DearDiary - Your Emotional Journey",
  description:
    "A mood-aware journaling app that helps you understand your emotional patterns",
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "DearDiary - Your Emotional Journey",
    description:
      "A mood-aware journaling app that helps you understand your emotional patterns",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "DearDiary Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DearDiary - Your Emotional Journey",
    description:
      "A mood-aware journaling app that helps you understand your emotional patterns",
    images: ["/logo.png"],
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
        className={`${inter.variable} ${fraunces.variable} ${geistSans.variable} ${geistMono.variable} ${merriweather.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
