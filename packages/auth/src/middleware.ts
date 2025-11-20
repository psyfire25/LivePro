// packages/auth/src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Minimal middleware type compatible with Next's edge middleware.
 * We don't depend on next/server types here to keep this package portable.
 */
export type AuthMiddleware = (
  req: Request
) => void | Response | Promise<void | Response>;

/**
 * Create a Clerk middleware that protects all routes except the provided public ones.
 * By default, only sign-in and sign-up are public.
 */
export function createAuthMiddleware(
  { publicRoutes }: { publicRoutes?: (string | RegExp)[] } = {}
): AuthMiddleware {
  const isPublic = createRouteMatcher(
    publicRoutes ?? ["/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"]
  );

  // Clerk v6: auth.protect() is async
  return clerkMiddleware(async (auth, req) => {
    if (isPublic(req)) return;  // allow public routes
    await auth.protect();       // protect everything else
  }) as AuthMiddleware;
}

// Default auth middleware (protect everything except sign-in/up/api)
export const defaultMiddleware: AuthMiddleware = createAuthMiddleware();

// Recommended matcher config (exclude static assets and _next)
export const defaultConfig = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api)(.*)",
  ],
};