"use client";
import { addPet, deletePet, editPet } from "@/actions/actions";
import { Pet } from "@/lib/types";
import { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextValue = {
  activePetId: string | null;
  selectedPet: Pet | undefined;
  totalPets: number;
  pets: Pet[];
  handleActivePetId: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (newPetData: Omit<Pet, "id">) => Promise<void>;
  handleCheckoutPet: () => void;
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
  // state management
  const [activePetId, setActivePetId] = useState<string | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(data);

  // derived states
  const selectedPet = optimisticPets.find((pet) => pet.id === activePetId);
  const totalPets = optimisticPets.length;

  // event handlers
  const handleActivePetId = (id: string) => {
    setActivePetId(id);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    setOptimisticPets((prevPets) => [...prevPets, { ...newPet, id: "" }]);
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (newPetData: Omit<Pet, "id">) => {
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
