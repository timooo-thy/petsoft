"use server";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function addPet(data: FormData) {
  await sleep(2000);
  const pet = {
    name: data.get("name") as string,
    ownerName: data.get("ownerName") as string,
    imageUrl:
      (data.get("imageUrl") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    age: parseInt(data.get("age") as string),
    notes: data.get("notes") as string,
  };

  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: "An error occurred while adding the pet.",
    };
  }

  revalidatePath("/app/dashboard");
}

export async function editPet(data: FormData, id: string | undefined) {
  await sleep(2000);
  const pet = {
    name: data.get("name") as string,
    ownerName: data.get("ownerName") as string,
    imageUrl:
      (data.get("imageUrl") as string) ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
    age: parseInt(data.get("age") as string),
    notes: data.get("notes") as string,
  };

  try {
    await prisma.pet.update({
      where: {
        id: id,
      },
      data: pet,
    });
  } catch (error) {
    return {
      message: "An error occurred while editing the pet.",
    };
  }

  revalidatePath("/app/dashboard");
}

export async function deletePet(id: string | undefined) {
  await sleep(2000);

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
