import type { PropsWithChildren } from "react";
import type { NextMiddleware } from "next/server";

declare module "@repo/auth" {
  export function AuthProvider(props: PropsWithChildren<{}>): JSX.Element;
  export { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
}

declare module "@repo/auth/middleware" {
  export interface CreateAuthMiddlewareOptions {
    publicRoutes?: (string | RegExp)[];
  }
  export function createAuthMiddleware(options?: CreateAuthMiddlewareOptions): NextMiddleware;
  export const defaultMiddleware: NextMiddleware;
  export const defaultConfig: {
    matcher: string[];
  };
}
