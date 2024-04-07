import BackgroundPattern from "@/components/background-pattern";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PetContextProvider from "@/context/pet-context-provider";
import { Pet } from "@/lib/types";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  const data: Pet[] = await response.json();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-dvh">
        <Header />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <Footer />
      </div>
    </>
  );
}
