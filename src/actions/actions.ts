"use server";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { petFormSchema, petIdSchema } from "@/lib/validation";

export async function addPet(newPet: unknown) {
  await sleep(1500);

  const validatedPet = petFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data shape",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "An error occurred while adding the pet.",
    };
  }
  revalidatePath("/app/dashboard");
}

export async function editPet(newPetData: unknown, id: unknown) {
  await sleep(1500);

  const validatedId = petIdSchema.safeParse(id);
  if (!validatedId.success) {
    return {
      message: "Invalid pet id",
    };
  }

  const validatedPet = petFormSchema.safeParse(newPetData);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data shape",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "An error occurred while editing the pet.",
    };
  }

  revalidatePath("/app/dashboard");
}

export async function deletePet(id: unknown) {
  await sleep(1500);

  const validatedId = petIdSchema.safeParse(id);
  if (!validatedId.success) {
    return {
      message: "Invalid pet id",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
      },
    });
  } catch (error) {
    return {
      message: "An error occurred while checking out the pet.",
    };
  }

  revalidatePath("/app/dashboard");
}
