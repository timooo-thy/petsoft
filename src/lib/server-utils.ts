import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function authCheck() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}
