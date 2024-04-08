"use client";
import { usePetContext } from "@/lib/hooks";
import React from "react";

export default function SearchForm() {
  const { handleFilteredPets } = usePetContext();
  return (
    <form className="w-full h-full">
      <input
        placeholder="Search for a pet"
        type="search"
        className="w-full h-full bg-white/20 placeholder:text-white/50 rounded-md px-5 outline-none transition focus-bg-white/50 hover:bg-white/30"
        onChange={(e) => handleFilteredPets(e.target.value)}
        id="search"
      />
    </form>
  );
}
