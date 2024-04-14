"use client";
import { createCheckoutSession } from "@/actions/actions";
import { Button } from "./ui/button";
import { useTransition } from "react";
import getStripe from "@/lib/getStripe";
import { toast } from "sonner";

export default function CheckoutButton() {
  const [isLoading, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          const { sessionId } = await createCheckoutSession();
          const stripe = await getStripe();
          const { error } = await stripe!.redirectToCheckout({
            sessionId,
          });
          if (error) {
            toast.error(error.message);
          }
        });
      }}
      disabled={isLoading}
    >
      Buy lifetime access for $299
    </Button>
  );
}
