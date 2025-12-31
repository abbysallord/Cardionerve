import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cardionerve.com"),
  title: "CardioNerve - Cardiac Risk Detection",
  description: "Real-time heart health monitoring with AI-powered risk assessment.",
  openGraph: {
    title: "CardioNerve - Cardiac Risk Detection",
    description: "Real-time heart health monitoring with AI-powered risk assessment.",
    url: "https://cardionerve.com",
    siteName: "CardioNerve",
    images: [
      {
        url: "../public/og.png",
        width: 1200,
        height: 630,
        alt: "CardioNerve Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CardioNerve - Cardiac Risk Detection",
    description: "Real-time heart health monitoring with AI-powered risk assessment.",
    images: ["../public/og.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
