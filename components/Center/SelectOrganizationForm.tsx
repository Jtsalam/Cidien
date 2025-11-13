"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  onSubmit: (orgCode: string, staffId: string, password: string) => Promise<void>;
};

export default function SelectOrganizationForm({ onSubmit }: Props) {
  const [organization, setOrganization] = useState("");
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);

  // Load remembered organization on component mount
  useEffect(() => {
    const rememberedOrg = localStorage.getItem('rememberedOrganization');
    if (rememberedOrg) {
      setOrganization(rememberedOrg);
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      await onSubmit(organization, staffId, password);
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
              placeholder="Enter your Staff ID"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="staff_password" className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="staff_password"
                name="staff_password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>
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
