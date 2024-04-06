import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSoft - Pet Daycare Software",
  description: "PetSoft is a SaaS for pet owners and pet businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-[#e5e8ec] min-h-dvh`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
