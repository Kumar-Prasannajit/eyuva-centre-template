import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";
import { SITE, FULL_NAME } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: FULL_NAME,
  description: SITE.metaDescription,
  keywords: [...SITE.keywords, SITE.university],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
