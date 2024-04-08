"use client";
import { useSearchQuery } from "@/lib/hooks";

export default function SearchForm() {
  const { searchQuery, handleChangeSearchQuery } = useSearchQuery();
  return (
    <form className="w-full h-full">
      <input
        placeholder="Search for a pet"
        type="search"
        className="w-full h-full bg-white/20 placeholder:text-white/50 rounded-md px-5 outline-none transition focus-bg-white/50 hover:bg-white/30"
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
        id="search"
        value={searchQuery}
      />
    </form>
  );
}
