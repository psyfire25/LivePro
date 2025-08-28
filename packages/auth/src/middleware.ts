import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Create a Clerk middleware that protects all routes except the provided public ones.
 * By default, only sign-in and sign-up are public.
 */
export function createAuthMiddleware({
  publicRoutes,
}: { publicRoutes?: (string | RegExp)[] } = {}) {
  const isPublic = createRouteMatcher(
    publicRoutes ?? ["/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"]
  );

  return clerkMiddleware((auth, req) => {
    if (isPublic(req)) return; // allow public
    auth().protect(); // otherwise require auth
  });
}

// Default auth middleware (protect everything except sign-in/up/api)
export const defaultMiddleware = createAuthMiddleware();

// Recommended matcher config (exclude static assets and _next)
export const defaultConfig = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api)(.*)",
  ],
};
