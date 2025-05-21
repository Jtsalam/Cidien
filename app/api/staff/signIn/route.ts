import { prisma } from "@/lib/prisma";
import bcrypt from 'bcryptjs';


export async function POST(req: Request) {
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


      const user = await prisma.user_info.findFirst({
        where:{staff_id: staff_id}
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