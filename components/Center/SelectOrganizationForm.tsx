"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  onSubmit: (orgCode: string, staffId: string) => Promise<void>;
};

export default function SelectOrganizationForm({ onSubmit }: Props) {
  const [organization, setOrganization] = useState("");
  const [staffId, setStaffId] = useState("");
  const [error, setError] = useState("");
  const staffIdRef = useRef<HTMLInputElement>(null);

  // Load remembered organization on component mount
  useEffect(() => {
    const rememberedOrg = localStorage.getItem('rememberedOrganization');
    if (rememberedOrg) {
      setOrganization(rememberedOrg);
    }
  }, []);

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOrg = e.target.value;
    setOrganization(selectedOrg);
    
    // Remember the selected organization
    if (selectedOrg) {
      localStorage.setItem('rememberedOrganization', selectedOrg);
    } else {
      localStorage.removeItem('rememberedOrganization');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!organization) {
      setError("Please choose a medical center from the list.");
      return;
    }

    if (!staffId) {
      setError("Please enter your Staff ID.");
      return;
    }

    try {
      await onSubmit(organization, staffId);
      setError("");
    } catch (err) {
      setError((err as Error).message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 text-center max-w-md w-full">
        <div className="mb-8">
          {/* Cidien Logo */}
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/Cidien.png"
              alt="Cidien Logo"
              width={200}
              height={72}
              className="mx-auto hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to access your dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="option" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Medical Center
            </label>
            <select
              id="option"
              name="option"
              value={organization}
              onChange={handleOrganizationChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
            >
              <option value="" disabled>Select your Organization</option>
              <option value="SGH">Starlane General Hospital</option>
              <option value="NMC">Northcrest Medical Center</option>
              <option value="EHI">Evergreen Health Institute</option>
              <option value="NCI">NovaCare Institute</option>
              <option value="HGH">Havenridge General Hospital</option>
            </select>
          </div>

          <div>
            <label htmlFor="staff_Id" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Staff ID
            </label>
            <input
              type="text"
              id="staff_Id"
              name="staff_Id"
              ref={staffIdRef}
              placeholder="Enter your Staff ID"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-base font-medium py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-emerald-800 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>

          {/* <br /> */}
          {/* <a
            href="https://calendly.com/mobilecharterorg/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
          >
            Register your account
          </a> */}


        </form>
      </div>
    </div>
  );
}
