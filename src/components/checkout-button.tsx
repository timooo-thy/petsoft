"use client";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";

export default function CheckoutButton() {
  const [isLoading, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await createCheckoutSession();
        });
      }}
      disabled={isLoading}
    >
      Buy lifetime access for $299
    </Button>
  );
}
