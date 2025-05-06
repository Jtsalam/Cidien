"use client";

import { useState } from "react";


export default function SignIn() {
  const [organization, setOrganization] = useState("");
  const [org, setOrg] = useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/center/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organization }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        // console.error("Error:", errorData.error);
        // alert(`Error: ${errorData.error}`);
        setError("Please choose a medical center from the list below.");
        return;
      }
      
      const data = await res.json();
      console.log("Success:", data.message);
      window.location.href = "/Staff/sign-in"
      // alert("Organization submitted successfully!");
      setError("");
  
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to connect to the server. Please try again.");
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
            onChange={(e) => setOrganization(e.target.value)}
            className="w-full p-2 mb-5 border border-gray-300 rounded-md text-lg"
          >
            <option value="">Select your Organization</option>
            <option value="EHC">Erindale Health center</option>
            <option value="PVM">Parkville Manor</option>
            <option value="KMC">Kenderdine Medical Clinic</option>
            <option value="JPCH">Jim Pattison Children's Hospital</option>
            <option value="EMC">Evergreen Medical Clinic</option>
          </select>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="px-5 py-2 w-full bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
          <br/>
          <a
            href="https://calendly.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
          >
            Register your account
          </a>

        </form>
      </div>
    </div>
  );
}
