// components/OrganizationPanel.tsx
"use client";

import Image from "next/image";
import { orgMap } from "@/lib/constants";

type Props = {
  isActive: boolean;
  org: string;
  setIsActive: (value: boolean) => void;
};

export default function OrganizationPanel({ isActive, org, setIsActive }: Props) {
  return (
    <div
      className={`absolute top-0 h-full w-1/2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-[20px] z-[50] ${
        isActive ? "left-0 scale-100" : "left-1/2 scale-100"
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
  );
}
