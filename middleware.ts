import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const orgSubmitted = request.cookies.get("orgSubmitted")?.value;
  const staffSubmitted = request.cookies.get("staffSubmitted")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const pathname = request.nextUrl.pathname;

  // If user has already signed in and tries to access sign in page, redirect to dashboard
  if (pathname === "/sign-in" && staffSubmitted) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user hasn't signed in and tries to access dashboard, redirect to sign-in page
  if (pathname === "/dashboard" && !staffSubmitted) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Block access to old role-specific dashboard routes
  if ((pathname === "/Admin/dashboard" || pathname === "/Staff/dashboard") && staffSubmitted) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Block access to old role-specific dashboard routes if not signed in
  if ((pathname === "/Admin/dashboard" || pathname === "/Staff/dashboard") && !staffSubmitted) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow access to the page requested
  return NextResponse.next();
}

// Apply the middleware to the following pages
export const config = {
  matcher: [
    "/sign-in",
    "/dashboard",
    "/Staff/dashboard",
    "/Admin/dashboard"
  ]
};
