"use client";

import { ReactNode } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function RequireAuth({ children }: { children: ReactNode }) {
    return (
        <>
            <SignedIn>{children}</SignedIn>

            <SignedOut>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="border rounded-xl p-6 shadow-lg max-w-md w-full space-y-4">
                        <h1 className="text-xl font-semibold">Please sign in</h1>
                        <p className="text-sm opacity-70">
                            You need to be logged in to access LivePro.
                        </p>
                        <SignInButton />
                    </div>
                </div>
            </SignedOut>
        </>
    );
}