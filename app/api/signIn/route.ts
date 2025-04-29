import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { organization } = await req.json();

    if (!organization) {
      return NextResponse.json({ error: "Organization is required" }, { status: 400 });
    }

    console.log("Received Organization:", organization);

    // Create a response and set a cookie
    const response = NextResponse.json({ message: "Organization submitted successfully" }, { status: 200 });

    // Set a cookie to indicate submission (expires in 1 hour)
    response.headers.set("Set-Cookie", "orgSubmitted=true; Path=/; HttpOnly; Max-Age=3600");

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
