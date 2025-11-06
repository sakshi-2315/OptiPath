// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher([
//   "/dashboard(.*)",
//   "/resume(.*)",
//   "/interview(.*)",
//   "/ai-cover-letter(.*)",
//   "/onboarding(.*)",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId, redirectToSignIn } = await auth(); // ✅ correct key

//   if (!userId && isProtectedRoute(req)) {
//     // Pass the current URL so Clerk knows where to go back
//     return redirectToSignIn({ returnBackUrl: req.url });
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };





import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define all routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/resume(.*)",
  "/interview(.*)",
  "/ai-cover-letter(.*)",
  "/ai-career-chat(.*)",
  "/resume-analyzer(.*)",
  "/onboarding(.*)",

]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If user is not signed in and tries to access a protected route
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Otherwise continue to the requested page
  return NextResponse.next();
});

// Middleware configuration
export const config = {
  matcher: [
    // Run for all pages except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
