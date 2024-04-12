"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { logIn, signUp } from "@/actions/actions";
import AuthButton from "./auth-button";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "logIn" | "signUp";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogin] = useFormState(logIn, undefined);

  return (
    <form action={type === "logIn" ? dispatchLogin : dispatchSignUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          className="border-zinc-400"
          name="email"
          type="email"
          maxLength={50}
          required
        />
      </div>
      <div className="space-y-1 mb-4 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          className="border-zinc-400"
          required
          type="password"
          minLength={3}
          maxLength={50}
        />
      </div>
      <AuthButton type={type} />
      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
}
