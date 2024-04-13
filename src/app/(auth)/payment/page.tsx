"use client";
import CheckoutButton from "@/components/checkout-button";
import H1 from "@/components/h1";
import JwtButton from "@/components/jwt-button";
import { useEffect } from "react";
import { toast } from "sonner";

type PaymentPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function PaymentPage({ searchParams }: PaymentPageProps) {
  useEffect(() => {
    if (searchParams.success) {
      const timer = setTimeout(() => {
        toast.success("Payment successful!");
      });
      return () => clearTimeout(timer);
    } else if (searchParams.cancelled) {
      const timer = setTimeout(() => {
        toast.warning("Payment cancelled.", {
          description: "Please try again.",
        });
      });
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col item-center space-y-10">
      <H1>PetSoft access requires payment</H1>
      {!searchParams.success ? <CheckoutButton /> : <JwtButton />}
    </main>
  );
}
