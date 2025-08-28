"use client";
import type { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  // ClerkProvider reads NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY from env in each app
  // Configure default sign-in/up urls used across apps
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      {children}
    </ClerkProvider>
  );
}

export { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
