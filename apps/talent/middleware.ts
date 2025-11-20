// // apps/talent/middleware.ts
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   "/sign-in(.*)",
//   "/sign-up(.*)",
//   "/api/(.*)",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   // Only protect non-public routes
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }
// });

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api)(.*)",
  ],
};

export function middleware() {}