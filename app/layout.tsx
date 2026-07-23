import { WishlistFab } from "@/app/_components/WishlistFab";
import { WishlistProvider } from "@/lib/wishlist-context";
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
  title: "Browse — Movies & TV by Genre",
  description:
    "Discover popular movies and TV series across every genre, powered by TMDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
        <div
          aria-hidden
          className="fixed inset-0 -z-10 overflow-hidden bg-background"
        >
          <div className="absolute top-[-10%] left-[-10%] h-[60vw] w-[60vw] animate-blob rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--accent)_75%,transparent)_0%,transparent_65%)] blur-[70px]" />
          <div className="absolute top-[30%] right-[-15%] h-[55vw] w-[55vw] animate-blob animation-delay-2000 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#a78bfa_70%,transparent)_0%,transparent_65%)] blur-[70px]" />
          <div className="absolute bottom-[-15%] left-[20%] h-[50vw] w-[50vw] animate-blob animation-delay-5000 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#60a5fa_70%,transparent)_0%,transparent_65%)] blur-[70px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_85%)]" />
        </div>
        <WishlistProvider>
          {children}
          <WishlistFab />
        </WishlistProvider>
      </body>
    </html>
  );
}
