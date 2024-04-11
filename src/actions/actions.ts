"use server";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { PetEssentials } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { Pet } from "@prisma/client";

export async function addPet(newPet: PetEssentials) {
  await sleep(1500);
  try {
    await prisma.pet.create({
      data: newPet,
      select: {
        id: true,
      },
    });
  } catch (error) {
    return {
      message: "An error occurred while adding the pet.",
    };
  }
  revalidatePath("/app/dashboard");
}

export async function editPet(
  newPetData: PetEssentials,
  id: string | undefined
) {
  await sleep(1500);

  try {
    await prisma.pet.update({
      where: {
        id: id,
      },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: "An error occurred while editing the pet.",
    };
  }

  revalidatePath("/app/dashboard");
}

export async function deletePet(id: Pet["id"]) {
  await sleep(1500);

  try {
    await prisma.pet.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      message: "An error occurred while checking out the pet.",
    };
  }

  revalidatePath("/app/dashboard");
}
