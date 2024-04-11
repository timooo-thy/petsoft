"use server";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { Pet } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function addPet(newPet: Omit<Pet, "id">) {
  await sleep(1500);
  try {
    const pet = await prisma.pet.create({
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
  newPetData: Omit<Pet, "id">,
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

export async function deletePet(id: string | undefined) {
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
