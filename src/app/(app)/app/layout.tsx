import BackgroundPattern from "@/components/background-pattern";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-dvh">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
