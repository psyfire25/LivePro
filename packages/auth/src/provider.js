"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { ClerkProvider } from "@clerk/nextjs";
export function AuthProvider({ children }) {
    const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!pk) {
        const availableKeys = Object.keys(process.env)
            .filter((key) => key.startsWith("NEXT_PUBLIC_"))
            .join(", ");
        throw new Error(`Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY for AuthProvider. Available NEXT_PUBLIC_ keys: ${availableKeys}`);
    }
    return (_jsx(ClerkProvider, { dynamic: true, publishableKey: pk, signInUrl: "/sign-in", signUpUrl: "/sign-up", children: children }));
}
export { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
