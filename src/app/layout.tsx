import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SearchProvider } from "../context/SearchContext";
import Header from "./components/header";
import Footer from "./components/footer";
import { CartProvider } from "@/context/CartContext";
import { WishListProvider } from "@/context/WishlistContext";
import AuthProvider from "./components/SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ModernStore | Curated Fashion & Lifestyle Collections",
  description:
    "Discover curated fashion, footwear, and everyday essentials crafted with premium materials and sustainable craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-[#fafbfc] text-slate-900 selection:bg-orange-500 selection:text-white`}
      >
        <WishListProvider>
          <CartProvider>
            <SearchProvider>
              <AuthProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </AuthProvider>
            </SearchProvider>
          </CartProvider>
        </WishListProvider>
      </body>
    </html>
  );
}
