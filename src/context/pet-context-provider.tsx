"use client";
import { Pet } from "@/lib/types";
import { createContext, useState } from "react";

type PetContextValue = {
  activePetId: string | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  pets: Pet[];
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>;
  handleActivePetId: (id: string) => void;
  handleCheckout: () => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => void;
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
  const totalPets = pets.length;

  const handleActivePetId = (id: string) => {
    setActivePetId(id);
  };

  const handleCheckout = () => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== activePetId));
    setActivePetId(null);
  };

  const handleAddPet = (newPet: Omit<Pet, "id">) => {
    setPets((prevPets) => [
      ...prevPets,
      {
        ...newPet,
        id: Date.now().toString(),
      },
    ]);
  };

  return (
    <PetContext.Provider
      value={{
        activePetId,
        selectedPet,
        pets,
        totalPets,
        setPets,
        handleActivePetId,
        handleCheckout,
        handleAddPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
