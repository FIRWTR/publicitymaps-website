import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PublicityMaps — Know Exactly Where To Advertise",
  description:
    "PublicityMaps uses AI, traffic data, demographics, and location intelligence to identify the best places to put signs, banners, wrapped vehicles, and local advertising.",
  keywords: [
    "advertising location intelligence",
    "sign placement analysis",
    "traffic data advertising",
    "visibility score",
    "local advertising",
    "outdoor advertising",
  ],
  openGraph: {
    title: "PublicityMaps — Know Exactly Where To Advertise",
    description:
      "AI-powered location intelligence for physical advertising. Get your Visibility Score™ and place signs where they actually work.",
    type: "website",
    url: "https://publicitymaps.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "PublicityMaps — Know Exactly Where To Advertise",
    description: "AI-powered location intelligence for physical advertising.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
