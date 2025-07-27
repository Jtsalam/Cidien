// components/RoomLoginForm.tsx
"use client";

import React from "react";
import { RefObject } from "react";

type Props = {
  isActive: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, formType: "room") => void;
  togglePassword: (type: "room") => void;
  showPassword: { room: boolean };
  unsetSessionAndRedirect: () => void;
  passwordRoomRef: RefObject<HTMLInputElement | null>; // ✅ allows null
  roomError: string;
};

export default function RoomLoginForm({
  isActive,
  handleSubmit,
  togglePassword,
  showPassword,
  unsetSessionAndRedirect,
  passwordRoomRef,
  roomError,
}: Props) {
  return (
    <div
      className={`absolute top-0 h-full w-1/2 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isActive ? "left-1/2 scale-100 z-10" : "left-full scale-95 z-0"
      }`}
    >
      <form
        onSubmit={(e) => handleSubmit(e, "room")}
        className="w-full max-w-[320px] flex flex-col items-center justify-center h-full px-6 gap-4"
      >
        <h1 className="text-xl font-bold">Sign In</h1>
        <span className="text-xs">Login With Room Id</span>

        <input
          type="text"
          name="room_Id"
          placeholder="Enter Room Id"
          required
          className="bg-[#eee] border-none py-2 px-3 text-sm rounded-lg w-full outline-none"
        />

        <div className="relative w-full">
          <input
            type={showPassword.room ? "text" : "password"}
            name="room_password"
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

        <button
          type="submit"
          className="bg-[#1244b9] text-white text-xs px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wider uppercase cursor-pointer"
        >
          Sign In
        </button>

        <p>
          <a
            className="cursor-pointer text-sm flex items-center gap-1"
            onClick={unsetSessionAndRedirect}
          >
            <i className="bi bi-arrow-return-left"></i>
            Select Organization
          </a>
        </p>

        {roomError && <p className="text-red-500">{roomError}</p>}
      </form>
    </div>
  );
}
