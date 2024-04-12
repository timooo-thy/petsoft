"use server";
import prisma from "@/lib/db";
import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validation";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { authCheck } from "@/lib/server-utils";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";

// User actions
export async function logIn(prevState: unknown, formData: unknown) {
  await sleep(1500);
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  try {
    await signIn("credentials", formData, { redirectTo: "/app/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: "Invalid credentials",
      };
    }
    throw error; // nextjs redirects throws an error, so we need to rethrow it.
  }
}

export async function signUp(prevState: unknown, formData: unknown) {
  await sleep(1500);
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }
  const formObject = Object.fromEntries(formData.entries());
  const validatedFormData = authSchema.safeParse(formObject);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  const newUser = {
    email: validatedFormData.data.email,
    hashedPassword: await bcrypt.hash(validatedFormData.data.password, 10),
  };
  try {
    await prisma.user.create({
      data: newUser,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        message: "Email already exists",
      };
    } else {
      return {
        message: "An error occurred while creating the user",
      };
    }
  }

  await signIn("credentials", formData, { redirectTo: "/app/dashboard" });
}

export async function logOut() {
  await sleep(1500);
  await signOut({ redirectTo: "/" });
}

// Pet actions
export async function addPet(newPet: unknown) {
  await sleep(1500);

  const session = await authCheck();
  const validatedPet = petFormSchema.safeParse(newPet);
  if (!validatedPet.success) {
    return {
      message: "Invalid pet data shape",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: { connect: { id: session.user.id } },
      },
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

  const session = await authCheck();
  const validatedId = petIdSchema.safeParse(id);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPet.success || !validatedId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedId.data,
        userId: session.user.id,
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

  const session = await authCheck();
  const validatedId = petIdSchema.safeParse(id);
  if (!validatedId.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedId.data,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return {
      message: "An error occurred while checking out the pet.",
    };
  }

  revalidatePath("/app/dashboard");
}
