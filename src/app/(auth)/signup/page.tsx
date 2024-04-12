import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function SignupPage() {
  return (
    <main className="md:w-1/3 w-2/3">
      <H1 className="text-center mb-5">Signup</H1>
      <AuthForm />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
