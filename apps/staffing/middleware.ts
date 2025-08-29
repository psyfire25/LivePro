import { createAuthMiddleware } from "@repo/auth/middleware";

export default createAuthMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"],
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api)(.*)",
  ],
};

