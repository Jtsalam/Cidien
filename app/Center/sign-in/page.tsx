//app/Center/sign-in/page.tsx
'use client';

import SelectOrganizationForm from "@/components/Center/SelectOrganizationForm";

export default function SignIn() {
  const handleOrgSubmit = async (organization: string) => {
    const res = await fetch("/api/center/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organization }),
    });

    if (!res.ok) {
      throw new Error("Please choose a medical center from the list.");
    }

    const data = await res.json();
    console.log("Success:", data.message);
    window.location.href = "/Staff/sign-in";
  };

  return <SelectOrganizationForm onSubmit={handleOrgSubmit} />;
}