"use client";
import { usePetContext, useSearchQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PetList() {
  const { handleActivePetId, activePetId, pets } = usePetContext();
  const { searchQuery } = useSearchQuery();
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => {
        return (
          <li key={pet.id}>
            <button
              onClick={() => handleActivePetId(pet.id)}
              className={cn(
                "flex items-center h-[70px] w-full cursor-pointer px-5 text-base hover:bg-[#eff1f2] focus:hover:bg-[#eff1f2] transition gap-3",
                {
                  "bg-[#eff1f2]": activePetId === pet.id,
                }
              )}
            >
              <Image
                src={pet.imageUrl}
                alt="Pet"
                width={45}
                height={45}
                className="w-[45px] h-[45px] rounded-full object-cover"
              />
              <p className="font-semibold">{pet.name}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
