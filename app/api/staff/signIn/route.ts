import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";
import { orgMap } from "@/lib/constants";


export async function POST(req: Request) {
    // Getting selected organization from cookies
    const cookieStore = await cookies();
    const org = cookieStore.get("organization")?.value;
    //Error checking for org value
    if (!org) {
        return new Response(
          JSON.stringify({ success: false, message: "organization cookie not found" }),
          { status: 400 }
        );
    }
    //Get organization information from database
    const organization = await prisma.medicalcenter_info.findFirst({
        where:{center_name:orgMap[org]}
    })

    const data = await req.formData();
    const formType = data.get("formType");
  
    if (formType === "staff") {
      const raw_staffId = data.get("staff_Id");
      const raw_staffPassword = data.get("staff_password");

      // Check both fields -> even though it's already checked in client side.
      if (!raw_staffId) {
        return new Response(JSON.stringify({ success: false, message: "staff id is null" }), { status: 400 });
      }
      if (!raw_staffPassword) {
        return new Response(JSON.stringify({ success: false, message: "Staff password is required" }), { status: 400 });
      }

      // Convert both to strings
      const staff_Id = raw_staffId.toString();
      const staff_password = raw_staffPassword.toString();

      //Find user that matches ID in selected organization
      const user = await prisma.user_info.findFirst({
        where:{staff_id: staff_Id,
        center_id:organization?.center_id},
      })

      const isPasswordCorrect = user
      ? await bcrypt.compare(staff_password, user.password)
      : false;

      // Verifying staff login credentials
      if(user && isPasswordCorrect)
      {
        const response = new Response(JSON.stringify({ success: true, role: "staff" }), { status: 200 });
        response.headers.append("Set-Cookie", `staffSubmitted=true; Path=/; Max-Age=3600; SameSite=Lax`);
        response.headers.append("Set-Cookie", `staff_Id=${encodeURIComponent(staff_Id)}; Path=/; Max-Age=3600; SameSite=Lax`)
        return response
      }
  
    } else if (formType === "room") {
      const raw_roomId = data.get("room_Id");
      const raw_roomPassword = data.get("room_password");

      // Check both fields -> even though it's already checked in client side.
      if (!raw_roomId) {
        return new Response(JSON.stringify({ success: false, message: "room id is null" }), { status: 400 });
      }
      if (!raw_roomPassword) {
        return new Response(JSON.stringify({ success: false, message: "Room password is required" }), { status: 400 });
      }

      //Convert to proper types
      const room_Id = parseInt(raw_roomId.toString());
      const room_password = raw_roomPassword.toString();
      
      //Find room that matches ID in selected organization
      const room = await prisma.room_info.findFirst({
        where:{room_number: room_Id,
        center_id:organization?.center_id},
      })

      //Verifies user is in selected organization
      const users = await prisma.user_info.findMany({
        where: { center_id: organization?.center_id },
      });
      
      let matchedUser = null;
      for (const user of users) {
        const match = await bcrypt.compare(room_password, user.password);
        if (match) {
            matchedUser = user;
            break;
        }
      }

      // Verifying room login credentials
      if (matchedUser && room) {
        const response = new Response(JSON.stringify({ success: true, role: "room" }), { status: 200 });
        response.headers.append("Set-Cookie", `roomSubmitted=true; Path=/; Max-Age=3600; SameSite=Lax`);
        response.headers.append("Set-Cookie", `room_Id=${encodeURIComponent(room_Id)}; Path=/; Max-Age=3600; SameSite=Lax`)
        return response
      }
    }
  
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }