import { NextResponse } from "next/server";

export async function GET() {
  // Here you'd clear cookies or tokens
  return NextResponse.json({ message: "Session cleared" });
}
