'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignInPage() {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)
  const [displayName, setDisplayName] = useState('YourOrg')
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordRoomRef = useRef<HTMLInputElement>(null)

  const togglePassword = () => {
    const input = passwordRef.current
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password'
    }
  }

  const showPassword = () => {
    const input = passwordRoomRef.current
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password'
    }
  }

  const unsetSessionAndRedirect = async () => {
    await fetch('/Mobile-Charter/UserLogin/unset-session.php')
    router.push('/Mobile-Charter/UserLogin/sign-in-form.php')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black/80 font-montserrat">
      <div className="relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-whiteGlow" id="container">
        {/* Room Login Form */}
        <div className={`absolute top-0 h-full transition-all duration-500 ease-in-out left-0 w-1/2 ${isActive ? 'translate-x-full opacity-100 z-[1]' : 'opacity-0 z-[1]'}`}>
          <form action="/api/roomlogin" method="POST" className="bg-white flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-xl font-bold">Sign In</h1>
            <span className="text-xs">Login With Room Id</span>
            <input type="text" name="room_Id" placeholder="Enter Room Id" required className="bg-[#eee] border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none" />
            <div className="relative w-full">
              <input
                type="password"
                name="password"
                ref={passwordRoomRef}
                className="bg-[#eee] border-none my-2 py-2 px-3 text-sm rounded-lg w-full pr-8"
                placeholder="Enter Password"
                required
              />
              <i className="bi bi-eye-slash absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={showPassword}></i>
            </div>
            <a href="#" className="text-xs text-gray-600 my-2">Forgot Password?</a>
            <button type="submit" className="bg-[#1244b9] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer">
              Sign In
            </button>
            <p>
              <a className="bi bi-arrow-return-left cursor-pointer text-sm" onClick={unsetSessionAndRedirect}>Select Organization</a>
            </p>
          </form>
        </div>

        {/* Staff Login Form */}
        <div className={`absolute top-0 h-full transition-all duration-500 ease-in-out left-0 w-1/2 ${!isActive ? 'z-[5]' : 'opacity-0 z-[1]'}`}>
          <form action="/api/userlogin" method="POST" className="bg-white flex flex-col items-center justify-center h-full px-10">
            <h1 className="text-xl font-bold">Sign In</h1>
            <span className="text-xs">Login With Staff Id</span>
            <input type="text" name="staff_Id" placeholder="Enter Staff Id" required className="bg-[#eee] border-none my-2 py-2 px-3 text-sm rounded-lg w-full outline-none" />
            <div className="relative w-full">
              <input
                type="password"
                name="password"
                ref={passwordRef}
                className="bg-[#eee] border-none my-2 py-2 px-3 text-sm rounded-lg w-full pr-8"
                placeholder="Enter Password"
                required
              />
              <i className="bi bi-eye-slash absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePassword}></i>
            </div>
            <a href="#" className="text-xs text-gray-600 my-2">Forgot Password?</a>
            <button type="submit" className="bg-[#1244b9] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-2 cursor-pointer">
              Sign In
            </button>
            <p>
              <a className="bi bi-arrow-return-right cursor-pointer text-sm" onClick={() => {
                setIsActive(true)
              }}>
                Select Organization
              </a>
            </p>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-500 ease-in-out rounded-[20px] z-[1000]">
          <div className="bg-[#1244b9] text-white absolute left-[-100%] w-[200%] h-full transition-all duration-500 ease-in-out">
            <div className="absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-500 ease-in-out translate-x-[-200%]">
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
                onClick={() => setIsActive(false)}
              >
                Sign in with Staff Id
              </button>
            </div>
            <div className="absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-500 ease-in-out right-0">
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
                onClick={() => setIsActive(true)}
              >
                Sign in with Room Id
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}