"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

type AuthProviderProps = {
  children: any; // we already relaxed this for type soup
};

export function AuthProvider({ children }: AuthProviderProps) {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!pk) {
    const availableKeys = Object.keys(process.env)
      .filter((key) => key.startsWith("NEXT_PUBLIC_"))
      .join(", ");
    throw new Error(
      `Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY for AuthProvider. Available NEXT_PUBLIC_ keys: ${availableKeys}`
    );
  }

  return (
    <ClerkProvider dynamic
      publishableKey={pk}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      {children}
    </ClerkProvider>
  );
}

export { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";