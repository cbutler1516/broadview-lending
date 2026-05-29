import type { Metadata } from "next";
import { defaultMetadata } from "@/lib/brand/seo";
import { Geist } from "next/font/google";
import { AttributionCapture } from "@/components/attribution-capture";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}
