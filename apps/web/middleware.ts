import { createAuthMiddleware, defaultConfig } from "@repo/auth/middleware";

export default createAuthMiddleware({
  // Only auth pages are public; everything else requires sign-in
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"],
});

export const config = defaultConfig;
