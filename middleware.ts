import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const orgSubmitted = request.cookies.get("orgSubmitted")?.value;
  const staffSubmitted = request.cookies.get("staffSubmitted")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const pathname = request.nextUrl.pathname;

  // If user hasn't submitted Center, redirect them back to the sign-in page
  if (pathname.startsWith("/Staff/sign-in") && !orgSubmitted) {
    return NextResponse.redirect(new URL("/Center/sign-in", request.url));
  }

  if (pathname === "/Center/sign-in" && orgSubmitted) {
    return NextResponse.redirect(new URL("/Staff/sign-in", request.url));
  }

  // If user hasn't signed in with Staff sign in, redirect them back to sign-in page
  if (pathname.startsWith(`/${userRole}/dashboard`) && !staffSubmitted) {
    return NextResponse.redirect(new URL("/Staff/sign-in", request.url));
  }
  
  // // Block access to staff dashboard if not staff
  // if (pathname.startsWith("/Staff/dashboard") && userRole !== "Staff") {
  //   return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
  // }

  if (pathname === "/Staff/sign-in" && staffSubmitted) {
    return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
  }

  // Allow access to the page requested for if the user has submitted
  return NextResponse.next();
}

// Apply the middleware to the following pages
export const config = {
  matcher: ["/Center/sign-in",
           "/Staff/sign-in", 
           "/Staff/dashboard",
          "/Admin/dashboard",
        ]  // Change this to the actual route of your new page
};
