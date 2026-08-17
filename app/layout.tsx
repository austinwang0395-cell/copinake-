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
  title: "商用厨房设备产品中心｜COPINA",
  description: "COPINA 商用厨房设备产品目录，支持分类浏览、在线下单与询价。",
  openGraph: {
    title: "专业厨房设备，为高效运营而生。",
    description: "COPINA 商用厨房设备产品中心",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "专业厨房设备，为高效运营而生。",
    description: "COPINA 商用厨房设备产品中心",
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
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
