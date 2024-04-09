"use client";
import { addPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextValue = {
  activePetId: string | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  pets: Pet[];
  handleActivePetId: (id: string) => void;
};

export const PetContext = createContext<PetContextValue | null>(null);

type PetContextProviderProps = {
  children: React.ReactNode;
  data: Pet[];
};

export default function PetContextProvider({
  children,
  data: pets,
}: PetContextProviderProps) {
  const [activePetId, setActivePetId] = useState<string | null>(null);

  const selectedPet = pets.find((pet) => pet.id === activePetId);
  const totalPets = pets.length;

  const handleActivePetId = (id: string) => {
    setActivePetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        activePetId,
        selectedPet,
        pets,
        totalPets,
        handleActivePetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
