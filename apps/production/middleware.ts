import { createAuthMiddleware, defaultConfig } from "@repo/auth/middleware";

export default createAuthMiddleware({
  publicRoutes: ["/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"],
});

export const config = defaultConfig;

