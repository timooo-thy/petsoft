"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type AuthButtonProps = {
  type: "logIn" | "signUp";
};

export default function AuthButton({ type }: AuthButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {type === "logIn" ? "Log in" : "Sign up"}
    </Button>
  );
}
