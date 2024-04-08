"use client";
import { Pet } from "@/lib/types";
import React, { createContext, useState } from "react";

type PetContextValue = {
  activePetId: string | null;
  filteredPets: Pet[];
  selectedPet: Pet | undefined;
  totalPets: number;
  handleActivePetId: (id: string) => void;
  handleFilteredPets: (search: string) => void;
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
  const [filteredPets, setFilteredPets] = useState<Pet[]>(pets);

  const selectedPet = pets.find((pet) => pet.id === activePetId);
  const totalPets = pets.length;

  const handleActivePetId = (id: string) => {
    setActivePetId(id);
  };

  const handleFilteredPets = (search: string) => {
    setFilteredPets(
      pets.filter((pet) =>
        pet.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <PetContext.Provider
      value={{
        activePetId,
        selectedPet,
        filteredPets,
        totalPets,
        handleActivePetId,
        handleFilteredPets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
