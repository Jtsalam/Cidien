import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.append("Set-Cookie", "orgSubmitted=; Path=/; HttpOnly; Max-Age=0"); // Expire the cookie
  return response;
}
