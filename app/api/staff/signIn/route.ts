import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";


export async function POST(req: Request) {
    const orgMap: { [key: string]: string } = {
        EHC: "Erindale Health Center",
        PVM: "Parkville Manor",
        KMC: "Kenderdine Medical Clinic",
        JPCH: "Jim Pattison Children's Hospital",
        EMC: "Evergreen Medical Clinic"
    };
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

    const data = await req.formData();
    const formType = data.get("formType");
  
    if (formType === "staff") {
      const raw_staffId = data.get("staff_Id");
      const raw_password = data.get("staff_password");

      // Check both fields -> even though it's already checked in client side.
      if (!raw_staffId) {
        return new Response(JSON.stringify({ success: false, message: "staff id is null" }), { status: 400 });
      }
      if (!raw_password) {
        return new Response(JSON.stringify({ success: false, message: "Password is required" }), { status: 400 });
      }

      // Convert both to strings
      const staff_id = raw_staffId.toString();
      const staff_password = raw_password.toString();
    
      //Get organization information from database
      const organization = await prisma.medicalcenter_info.findFirst({
        where:{center_name:orgMap[org]}
      })

      //Find user that matches ID in selected organization
      const user = await prisma.user_info.findFirst({
        where:{staff_id: staff_id,
        center_id:organization?.center_id},
      })

      const isPasswordCorrect = user
      ? await bcrypt.compare(staff_password, user.password)
      : false;

      if(user && isPasswordCorrect)
      {
        return new Response(JSON.stringify({ success: true, role: "staff" }), { status: 200 });
      }
  
    } else if (formType === "room") {
      const room_Id = data.get("room_Id");
      const password = data.get("password");
  
      if (room_Id === "room1" && password === "abcd") {
        return new Response(JSON.stringify({ success: true, role: "room" }), { status: 200 });
      }
    }
  
    return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), { status: 401 });
  }