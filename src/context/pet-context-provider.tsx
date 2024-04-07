"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextValue = {
  pets: Pet[];
  activePetId: Pet | null;
  setActivePetId: React.Dispatch<React.SetStateAction<Pet | null>>;
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
  const [activePetId, setActivePetId] = useState<Pet | null>(null);
  return (
    <PetContext.Provider value={{ pets, activePetId, setActivePetId }}>
      {children}
    </PetContext.Provider>
  );
}
