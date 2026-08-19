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
  title: "Commercial Kitchen Equipment & Restaurant Design | COPINA",
  description: "COPINA supplies professional commercial kitchen equipment, restaurant design, installation guidance and after-sales support for Saudi Arabia, the UAE and Africa.",
  openGraph: {
    title: "Professional Kitchen Solutions for Efficient Operations | COPINA",
    description: "Commercial kitchen design, professional equipment supply, installation guidance and after-sales support.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Kitchen Solutions for Efficient Operations | COPINA",
    description: "Commercial kitchen design, professional equipment supply, installation guidance and after-sales support.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
