'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from "@/utils/getCookie";
import Image from 'next/image'

export default function SignInPage() {
  const orgMap: { [key: string]: string } = {
    EHC: "Erindale Health Center",
    PVM: "Parkville Manor",
    KMC: "Kenderdine Medical Clinic",
    JPCH: "Jim Pattison Children's Hospital",
    EMC: "Evergreen Medical Clinic"
  };

  
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
      if (result.role === "staff" || formType === "staff") {
        // router.push("/user-dashboard"); //Where to put alert information
        alert("Staff signed in successfully!");
      } else if (result.role === "room" || formType === "room") {
        router.push("/room-dashboard");
      } else {
        router.push("/dashboard"); // fallback if needed
      }
    } else {
      // alert("Staff sign in failed!");
      setError("Invalid credentials");
      return;
    }
  };
  
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-black/80 font-montserrat">
      <div className="relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-whiteGlow">
        
        {/* Staff Login Form */}
        <div className={`absolute top-0 h-full w-1/2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'left-full opacity-0 scale-95' : 'left-0 opacity-100 scale-100'} ${isActive ? 'z-0' : 'z-10'}`}>
          {/* <form action="/api/staff/signIn" method="POST" className="w-full max-w-[320px] flex flex-col items-center justify-center h-full px-6 gap-4"> */}
          <form onSubmit={(e) => handleSubmit(e, "staff")} className="w-full max-w-[320px] flex flex-col items-center justify-center h-full px-6 gap-4">
            <h1 className="text-xl font-bold">Sign In</h1>
            <span className="text-xs">Login With Staff Id</span>
            {/* <input type="hidden" name="formType" value="staff" />To use in route.ts */}
            <input type="text" name="staff_Id" placeholder="Enter Staff Id" required className="bg-[#eee] border-none py-2 px-3 text-sm rounded-lg w-full outline-none" />
            <div className="relative w-full">
              <input
                type={showPassword.staff ? "text" : "password"}
                name="staff_password"
                ref={passwordRef}
                className="bg-[#eee] border-none py-2 px-3 text-sm rounded-lg w-full pr-8 outline-none"
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("staff")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
              >
                <i className={`bi ${showPassword.staff ? "bi-eye" : "bi-eye-slash"}`}></i>
              </button>
            </div>
            <a href="#" className="text-xs text-gray-600">Forgot Password?</a>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-[#1244b9] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wider uppercase cursor-pointer">
              Sign In
            </button>
            <p>
              <a className="cursor-pointer text-sm flex items-center gap-1" onClick={unsetSessionAndRedirect}>
                <i className="bi bi-arrow-return-right"></i>
                Select Organization
              </a>
            </p>
          </form>
        </div>
  
        {/* Room Login Form */}
        <div className={`absolute top-0 h-full w-1/2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'left-1/2 scale-100' : 'left-full scale-95'} ${isActive ? 'z-10' : 'z-0'}`}>
          {/* <form action="/api/staff/signIn" method="POST" className="w-full max-w-[320px] flex flex-col items-center justify-center h-full px-6 gap-4"> */}
          <form onSubmit={(e) => handleSubmit(e, "room")} className="w-full max-w-[320px] flex flex-col items-center justify-center h-full px-6 gap-4">
            <h1 className="text-xl font-bold">Sign In</h1>
            <span className="text-xs">Login With Room Id</span>
            {/* <input type="hidden" name="formType" value="room" /> To use in route.ts */}
            <input type="text" name="room_Id" placeholder="Enter Room Id" required className="bg-[#eee] border-none py-2 px-3 text-sm rounded-lg w-full outline-none" />
            <div className="relative w-full">
              <input
                type={showPassword.room ? "text" : "password"}
                name="password"
                ref={passwordRoomRef}
                className="bg-[#eee] border-none py-2 px-3 text-sm rounded-lg w-full pr-8 outline-none"
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={() => togglePassword("room")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
              >
                <i className={`bi ${showPassword.room ? "bi-eye" : "bi-eye-slash"}`}></i>
              </button>
            </div>
            <a href="#" className="text-xs text-gray-600">Forgot Password?</a>
            <button type="submit" className="bg-[#1244b9] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wider uppercase cursor-pointer">
              Sign In
            </button>
            <p>
              <a className="cursor-pointer text-sm flex items-center gap-1" onClick={unsetSessionAndRedirect}>
                <i className="bi bi-arrow-return-left"></i>
                Select Organization
              </a>
            </p>
          </form>
        </div>
  
        {/* Toggle Panel */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[20px] z-[50] ${
            isActive ? 'left-0 scale-100' : 'left-1/2 scale-100'
          }`}
        >
          <div className="bg-[#1244b9] text-white w-full h-full flex flex-col items-center justify-center px-8 text-center gap-[2px] rounded-[20px]">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            {orgMap[org] || "Organization name"}
          </h1>
            {org && (
              <div className="w-[250px] h-[300px] flex items-center justify-center">
                <Image
                  src={`/centerImages/${org}.png`}
                  alt={`${orgMap[org] || "Organization"} logo`}
                  width={300}
                  height={300}
                  className="rounded-[10px] object-contain"
                />
              </div>
            )}
            <button
              type="button"
              className="mt-[-2px] bg-white text-[#1244b9] px-4 py-2 rounded-lg font-bold text-sm cursor-pointer"
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Sign in with Staff Id" : "Sign in with Room Id"}
            </button>
          </div>
        </div>
  
      </div>
    </main>
  );
}  