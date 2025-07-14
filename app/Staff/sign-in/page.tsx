//app/Staff/sign-in/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from "@/utils/getCookie";
import StaffLoginForm from "@/components/Staff/StaffLoginForm";
import RoomLoginForm from "@/components/Staff/RoomLoginForm";
import OrganizationPanel from "@/components/Staff/OrganizationPanel";
import Image from 'next/image'

export default function SignInPage() {

  const [staffError, setStaffError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  const [org, setOrg] = useState("");
  const [isActive, setIsActive] = useState(false)
  const [showPassword, setShowPassword] = useState({
    staff: false,
    room: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRoomRef = useRef<HTMLInputElement>(null);
  
  const togglePassword = (type: "staff" | "room") => {
    setShowPassword(prev => {
      const input = type === "staff" ? passwordRef.current : passwordRoomRef.current;
      if (input) {
        input.type = prev[type] ? "password" : "text"; // use previous state for that type
      }
      return { ...prev, [type]: !prev[type] };
    });
  };
  
  useEffect(() => {
    const cookieOrg = getCookie("organization") ?? "";
    console.log("Organization from cookie:", cookieOrg);
    setOrg(cookieOrg.trim());
  }, []);

  const unsetSessionAndRedirect = async () => {
    await fetch("/api/center/logout", { method: "POST" });
    window.location.href = "/Center/sign-in"; // Redirect to Center sign-in page
    //A hybrid approach is available.
  };
  
  /* Form Submission Logic */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: "staff" | "room") => {
    e.preventDefault();
    setError("");
  
    const formData = new FormData(e.currentTarget);
    formData.append("formType", formType);
  
    const res = await fetch("/api/staff/signIn", {
      method: "POST",
      body: formData,
    });
  
    const result = await res.json();
  
    if (res.ok && result.success) {
      // 🌟 Redirect based on role or formType
      if (result.role === "Staff" || formType === "staff") {
        // router.push("/user-dashboard"); //Where to put alert information
        setStaffError("");
        window.location.href = "/Staff/dashboard";
        // alert("Staff signed in successfully!");
      } else if (result.role === "room" || formType === "room") {
        // router.push("/room-dashboard");
        setRoomError("");
        alert("Room sign in successful!");
      } else {
        router.push("/dashboard"); // fallback if needed
      }
    } else {
      // alert("Staff sign in failed!");
      if(result.role === "staff" || formType === "staff" ){
        setStaffError("Invalid credentials");
        return;
      }
      else {
        setRoomError("Invalid credentials");
        return;
      }
    }
  };
  
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-black/80 font-montserrat">
      <div className="relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-whiteGlow">
        
        {/* Staff Login Form */}
        <StaffLoginForm
          isActive={isActive}
          handleSubmit={handleSubmit}
          togglePassword={togglePassword}
          showPassword={showPassword}
          unsetSessionAndRedirect={unsetSessionAndRedirect}
          passwordRef={passwordRef}
          staffError={staffError}
        />

  
        {/* Room Login Form */}
        <RoomLoginForm
          isActive={isActive}
          handleSubmit={handleSubmit}
          togglePassword={togglePassword}
          showPassword={showPassword}
          unsetSessionAndRedirect={unsetSessionAndRedirect}
          passwordRoomRef={passwordRoomRef}
          roomError={roomError}
        />

        {/* Toggle Panel */}
        <OrganizationPanel
          isActive={isActive}
          org={org}
          setIsActive={setIsActive}
        />
      </div>
    </main>
  );
}  