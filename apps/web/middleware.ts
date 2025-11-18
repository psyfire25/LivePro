import { createAuthMiddleware } from "@repo/auth/middleware";
import type { NextMiddleware } from "next/server";

const middleware = createAuthMiddleware({
  // Make onboarding public; all other routes require sign-in
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/onboarding(.*)", "/api/(.*)"],
}) as unknown as NextMiddleware;

export default middleware;
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api)(.*)",
  ],
};
