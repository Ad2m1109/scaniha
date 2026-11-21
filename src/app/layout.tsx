import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
<<<<<<< HEAD
import { Providers } from "@/components/Providers";
import "./globals.css";
=======
import "./globals.css";
import { AppDataProvider } from "@/context/AppDataContext";
>>>>>>> origin/main

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Scaniha — Digital experiences for any business",
  description: "Turn your business into a digital experience. QR-powered access, mobile-first, free to start.",
=======
  title: "Perkly — Loyalty Studio",
  description: "A premium loyalty card system for growing cafes.",
>>>>>>> origin/main
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
=======
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body><AppDataProvider>{children}</AppDataProvider></body>
>>>>>>> origin/main
    </html>
  );
}
