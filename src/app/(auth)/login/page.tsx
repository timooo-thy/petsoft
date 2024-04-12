import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <main className="md:w-1/3 w-2/3">
      <H1 className="text-center mb-5">Login</H1>
      <AuthForm />
      <p className="mt-6 text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
}
