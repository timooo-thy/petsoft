"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextValue = {
  pets: Pet[];
  activePetId: string | null;
  handleActivePetId: (id: string) => void;
  selectedPet: Pet | undefined;
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

  const selectedPet = pets.find((pet) => pet.id === activePetId);

  const handleActivePetId = (id: string) => {
    setActivePetId(id);
  };

  return (
    <PetContext.Provider
      value={{ pets, activePetId, handleActivePetId, selectedPet }}
    >
      {children}
    </PetContext.Provider>
  );
}
