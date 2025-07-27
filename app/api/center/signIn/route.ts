import { NextResponse } from "next/server";
import { orgMap } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { organization } = await req.json();

    if (!organization || !orgMap[organization]) {
      return NextResponse.json({ error: "Invalid organization selected" }, { status: 400 });
    }

    console.log("Received Organization:", organization);

    const response = new NextResponse(
      JSON.stringify({ message: "Organization submitted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    response.headers.append("Set-Cookie", `orgSubmitted=true; Path=/; Max-Age=3600; SameSite=Lax`);
    response.headers.append("Set-Cookie", `organization=${encodeURIComponent(organization)}; Path=/; Max-Age=3600; SameSite=Lax`);
    
    return response;
    
  } catch (error) {
    console.error("Error in route.ts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
