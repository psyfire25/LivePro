"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

type AuthProviderProps = {
  children: any; // we already relaxed this for type soup
};

export function AuthProvider({ children }: AuthProviderProps) {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!pk) {
    throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY for AuthProvider");
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