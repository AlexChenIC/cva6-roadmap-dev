import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  display: "swap",
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cva6-roadmap-dev.vercel.app"),
  title: {
    default: "CVA6 Roadmap",
    template: "%s | CVA6 Roadmap",
  },
  description: "Public roadmap for the OpenHW CVA6 RISC-V core.",
  openGraph: {
    title: "CVA6 Roadmap",
    description: "Public roadmap for the OpenHW CVA6 RISC-V core.",
    type: "website",
    url: "https://cva6-roadmap-dev.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground`}>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
