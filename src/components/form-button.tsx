import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type FormButtonProps = {
  actionType: "edit" | "add";
};

export default function FormButton({ actionType }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-5 self-end" disabled={pending}>
      {actionType === "add" ? "Add a new pet" : "Save changes"}
    </Button>
  );
}
