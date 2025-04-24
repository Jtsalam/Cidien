import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { organization } = await request.json();

    if (!organization) {
      return NextResponse.json({ error: "Organization is required" }, { status: 400 });
    }

    console.log("Received Organization:", organization);
    return NextResponse.json({ message: "Organization submitted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}