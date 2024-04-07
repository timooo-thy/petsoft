"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextValue = {
  pets: Pet[];
  activePetId: string | null;
  handleActivePetId: (id: string) => void;
};

export const PetContext = createContext<PetContextValue | null>(null);

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  const [pets, setPets] = useState<Pet[]>(data);
  const [activePetId, setActivePetId] = useState<string | null>(null);

  const handleActivePetId = (id: string) => {
    setActivePetId(id);
  };

  return (
    <PetContext.Provider value={{ pets, activePetId, handleActivePetId }}>
      {children}
    </PetContext.Provider>
  );
}
