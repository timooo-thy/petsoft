import React from "react";
import { Button } from "./ui/button";

type FormButtonProps = {
  actionType: "edit" | "add";
};

export default function FormButton({ actionType }: FormButtonProps) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Save changes"}
    </Button>
  );
}
