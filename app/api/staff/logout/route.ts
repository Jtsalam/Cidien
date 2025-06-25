import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.set("Set-Cookie", "staffSubmitted=; Path=/; HttpOnly; Max-Age=0"); // Expire the cookie
  response.headers.set("Set-Cookie", "staff_Id=; Path=/; HttpOnly; Max-Age=0"); // Expire the cookie

  return response;
}