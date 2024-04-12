import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutButton from "@/components/sign-out-button";
import { authCheck } from "@/lib/server-utils";
import React from "react";

export default async function AccountPage() {
  const session = await authCheck();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex-col gap-3 flex justify-center items-center">
        <p>Logged in as {session.user.email}</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
}
