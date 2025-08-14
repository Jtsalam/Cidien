//app/api/center/signIn/route.ts
import { NextResponse } from "next/server";
import { orgMap } from "@/lib/constants";
import bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { organization, staffId, password } = await req.json();

    if (!organization || !orgMap[organization]) {
      return NextResponse.json({ error: "Invalid organization selected" }, { status: 400 });
    }

    if (!staffId) {
      return NextResponse.json({ error: "Staff ID is required" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    console.log("Received Organization:", organization);
    console.log("Received Staff ID:", staffId);
    
    // Find the organization in the database
    const organizationData = await prisma.medicalcenter_info.findFirst({
      where: { center_name: orgMap[organization] }
    });

    if (!organizationData) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 });
    }
    
    // Convert both to strings
    const staff_Id = staffId.toString();
    const staff_password = password.toString();
    
    // Find user that matches ID in selected organization
    const user = await prisma.user_info.findFirst({
      where: {
        staff_id: staff_Id,
        center_id: organizationData.center_id
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(staff_password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create response with cookies
    const response = NextResponse.json(
      { success: true, role: user.user_role, message: "Login successful" },
      { status: 200 }
    );

    response.cookies.set("organization", `${encodeURIComponent(organization)}`, {
      path: "/",
      maxAge: 3600,
      sameSite: "lax"
    });
    
    response.cookies.set("staffSubmitted", "true", {
      path: "/",
      maxAge: 3600,
      sameSite: "lax"
    });
    
    response.cookies.set("user_role", user.user_role, {
      path: "/",
      maxAge: 3600,
      sameSite: "lax"
    });
    
    response.cookies.set("staff_Id", staff_Id, {
      path: "/",
      maxAge: 3600,
      sameSite: "lax"
    });

    return response;
    
  } catch (error) {
    console.error("Error in route.ts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
