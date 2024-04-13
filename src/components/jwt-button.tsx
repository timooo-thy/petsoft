"use client";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function JwtButton() {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await update(true);
        router.push("app/dashboard");
      }}
      disabled={status === "loading" || session?.user.subscriptionPlan}
    >
      Access PetSoft
    </Button>
  );
}
