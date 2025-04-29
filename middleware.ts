import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const orgSubmitted = request.cookies.get("orgSubmitted")?.value;

  // If user hasn't submitted Center, redirect them back to the sign-in page
  if (!orgSubmitted) {
    return NextResponse.redirect(new URL("/Center/sign-in", request.url));
  }

  // Allow access to the page if the user has submitted
  return NextResponse.next();
}

// Apply the middleware only to the restricted page
export const config = {
  matcher: "/Staff/sign-in",  // Change this to the actual route of your new page
};
