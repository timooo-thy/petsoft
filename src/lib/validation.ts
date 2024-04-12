import { z } from "zod";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(20, { message: "Name should be less than 20 characters" }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner Name is required" })
      .max(20, { message: "Owner Name should be less than 20 characters" }),
    imageUrl: z
      .string()
      .trim()
      .url({ message: "Invalid URL" })
      .or(z.literal("")),
    age: z.coerce
      .number()
      .int()
      .min(1, { message: "Age is required" })
      .positive()
      .max(20, { message: "Age should be less than 20" }),
    notes: z
      .string()
      .trim()
      .max(200, { message: "Notes should be less than 200 characters" })
      .or(z.literal("")),
  })
  .transform((data) => ({
    ...data,
    imageUrl:
      data.imageUrl ||
      "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  }));

export const petIdSchema = z.string().cuid();

export const authSchema = z.object({
  email: z.string().trim().email().max(50),
  password: z.string().trim().min(3).max(50),
});

export type TPetForm = z.infer<typeof petFormSchema>;
