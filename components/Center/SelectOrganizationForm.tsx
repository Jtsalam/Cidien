"use client";

import { useState, useRef, useEffect } from "react";
import Head from 'next/head';

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
    <div className="h-screen flex justify-center items-center bg-[#87896b]">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="mb-5 text-2xl font-bold text-gray-800">SIGN IN</h1>
        <form onSubmit={handleSubmit}>
          <select
            id="option"
            name="option"
            value={organization}
            onChange={handleOrganizationChange}
            className="w-full p-2 mb-5 border border-gray-300 rounded-md text-lg"
          >
            <option value="" disabled>Select your Organization</option>
            <option value="EHC">Erindale Health center</option>
            <option value="PVM">Parkville Manor</option>
            <option value="KMC">Kenderdine Medical Clinic</option>
            <option value="JPCH">Jim Pattison Children's Hospital</option>
            <option value="EMC">Evergreen Medical Clinic</option>
          </select>

          <input
            type="text"
            name="staff_Id"
            placeholder="Enter Staff Id"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
            className="w-full p-2 mb-5 border border-gray-300 rounded-md text-lg"
          />

          <div className="relative w-full mb-5">
            <input
              type={showPassword ? "text" : "password"}
              name="staff_password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-md text-lg"
              placeholder="Enter Password"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
            >
              <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
            </button>
          </div>

          {error && <p className="text-red-500 mb-5">{error}</p>}
          
          <button
            type="submit"
            className="px-5 py-2 w-full bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700 transition-all"
          >
            Submit
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
