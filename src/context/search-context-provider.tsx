"use client";
import { createContext, useState } from "react";

type SearchContextValue = {
  searchQuery: string;
  handleChangeSearchQuery: (query: string) => void;
};

export const SearchContext = createContext<SearchContextValue | null>(null);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, handleChangeSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
