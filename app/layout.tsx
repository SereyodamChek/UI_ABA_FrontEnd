import type { Metadata } from "next";
import { Dangrek, Inter, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const noto_sans_khmer = Noto_Sans_Khmer({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-noto-sans-khmer",
});
const dangrek = Dangrek({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dangrek",
});

export const metadata: Metadata = {
  title: "ABA Bank | Login Page",
  description: "Welcome to ABA BANK's secure login portal. Access your account, manage your finances, and explore our services with ease and confidence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${noto_sans_khmer.variable} ${dangrek.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
