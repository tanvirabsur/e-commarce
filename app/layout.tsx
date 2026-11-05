import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elyqor | Multi-Vendor Social Commerce Marketplace",
  description: "Discover curated artisanal fashion, organic specialties, and gadgets from verified social merchants across Bangladesh. Enjoy nationwide Cash on Delivery and buyer protection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFCF9] text-[#0F2F2A] font-sans">
        {children}
      </body>
    </html>
  );
}
