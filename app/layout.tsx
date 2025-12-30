import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import MaterialSymbolsLoader from "@/components/MaterialSymbolsLoader";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TripAbhi B2B Beta Sign-up",
  description:
    "Join our exclusive beta program for professional travel organizers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <MaterialSymbolsLoader />
        {children}
      </body>
    </html>
  );
}
