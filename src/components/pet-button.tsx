"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

type PetButtonProps = {
  actionType: "edit" | "checkout" | "add";
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onClick,
}: PetButtonProps) {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon size={24} />
      </Button>
    );
  } else if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  } else {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }
}
