import { createAuthMiddleware } from "@repo/auth/middleware";

export default createAuthMiddleware({
  // Make onboarding public; all other routes require sign-in
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/onboarding(.*)", "/api/(.*)"],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api)(.*)",
  ],
};
