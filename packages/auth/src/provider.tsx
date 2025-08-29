"use client";
import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  // If a given app doesn't define a publishable key, don't mount Clerk.
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!pk) {
    return <>{children}</>;
  }
  return (
    <ClerkProvider publishableKey={pk} signInUrl="/sign-in" signUpUrl="/sign-up">
      {children}
    </ClerkProvider>
  );
}

export { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
