import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const orgSubmitted = request.cookies.get("orgSubmitted")?.value;
  const pathname = request.nextUrl.pathname;

  // If user hasn't submitted Center, redirect them back to the sign-in page
  if (pathname.startsWith("/Staff/sign-in") && !orgSubmitted) {
    return NextResponse.redirect(new URL("/Center/sign-in", request.url));
  }

  if (pathname === "/Center/sign-in" && orgSubmitted) {
    return NextResponse.redirect(new URL("/Staff/sign-in", request.url));
  }

  // Allow access to the page requested for if the user has submitted
  return NextResponse.next();
}

// Apply the middleware to the following pages
export const config = {
  matcher: ["/Center/sign-in", "/Staff/sign-in"],  // Change this to the actual route of your new page
};
