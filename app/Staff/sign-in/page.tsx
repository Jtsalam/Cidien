'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignInPage() {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)
  const [displayName, setDisplayName] = useState('YourOrg')
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
  
  const unsetSessionAndRedirect = async () => {
    await fetch('/Center/sign-in')
    router.push('/Center/sign-in')
  };
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-black/80 font-montserrat">
      <div className="relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-whiteGlow">
        
        {/* Staff Login Form */}
        <div className={`absolute top-0 h-full w-1/2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'left-full opacity-0 scale-95' : 'left-0 opacity-100 scale-100'} ${isActive ? 'z-0' : 'z-10'}`}>
          <form action="/api/userlogin" method="POST" className="w-full max-w-[320px] flex flex-col items-center justify-center h-full px-6 gap-4">
            <h1 className="text-xl font-bold">Sign In</h1>
            <span className="text-xs">Login With Staff Id</span>
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
          <form action="/api/roomlogin" method="POST" className="w-full max-w-[320px] flex flex-col items-center justify-center h-full px-6 gap-4">
            <h1 className="text-xl font-bold">Sign In</h1>
            <span className="text-xs">Login With Room Id</span>
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
        <div className={`absolute top-0 h-full w-1/2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[20px] z-[50] ${isActive ? 'left-0 scale-100' : 'left-1/2 scale-100'}`}>
          <div className="bg-[#1244b9] text-white w-full h-full flex flex-col items-center justify-center px-8 text-center gap-4 rounded-[20px]">
            <h1>{displayName}</h1>
            <Image
              src={`/Mobile-Charter/Center_images/${displayName}.png`}
              alt="Organization logo"
              width={100}
              height={100}
            />
            <button
              type="button"
              className="mt-4 bg-white text-[#1244b9] px-4 py-2 rounded-lg font-bold text-sm cursor-pointer"
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