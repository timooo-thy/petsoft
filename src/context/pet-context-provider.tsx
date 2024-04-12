"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextValue = {
  activePetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  pets: Pet[];
  handleActivePetId: (id: Pet["id"]) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (newPetData: PetEssentials) => Promise<void>;
  handleCheckoutPet: () => void;
};

export const PetContext = createContext<PetContextValue | null>(null);

type PetContextProviderProps = {
  children: React.ReactNode;
  pets: Pet[];
};

export default function PetContextProvider({
  children,
  pets,
}: PetContextProviderProps) {
  // state management
  const [activePetId, setActivePetId] = useState<string | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(pets);

  // derived states
  const selectedPet = optimisticPets.find((pet) => pet.id === activePetId);
  const totalPets = optimisticPets.length;

  // event handlers
  const handleActivePetId = (id: Pet["id"]) => {
    setActivePetId(id);
  };

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets((prevPets) => [
      ...prevPets,
      { ...newPet, id: "", createdAt: new Date(), updatedAt: new Date() },
    ]);
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (newPetData: PetEssentials) => {
    if (!selectedPet) return;
    setOptimisticPets((prevPets) =>
      prevPets.map((pet) => {
        if (pet.id === selectedPet.id) {
          return { ...pet, ...newPetData };
        }
        return pet;
      })
    );

    const error = await editPet(newPetData, selectedPet.id);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async () => {
    if (!selectedPet) return;
    setOptimisticPets((prevPets) =>
      prevPets.filter((pet) => pet.id !== selectedPet.id)
    );

    const error = await deletePet(selectedPet.id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setActivePetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        activePetId,
        selectedPet,
        pets: optimisticPets,
        totalPets,
        handleActivePetId,
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
