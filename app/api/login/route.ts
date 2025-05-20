import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { staff_Id, password } = await req.json();

  // Mocked example — replace with real DB call
  if (staff_Id === "staff123" && password === "secret") {
    return NextResponse.json({
      user_role: "Staff",
    });
  } else {
    return new NextResponse(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }
}
