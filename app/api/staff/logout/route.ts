import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Staff logged out successfully" });

  // Append multiple Set-Cookie headers
  response.headers.append("Set-Cookie", "staffSubmitted=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "staff_Id=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "room_Id=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "organization=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "user_role=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "demo_session_id=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "demo_center_id=; Path=/; HttpOnly; Max-Age=0");
  response.headers.append("Set-Cookie", "demo_org_name=; Path=/; HttpOnly; Max-Age=0");
  return response;
}