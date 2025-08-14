//app/Center/sign-in/page.tsx
'use client';

import SelectOrganizationForm from "@/components/Center/SelectOrganizationForm";

export default function SignIn() {
  const handleOrgSubmit = async (organization: string, staffId: string, password: string) => {
    const res = await fetch("/api/center/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ organization, staffId, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Invalid credentials");
    }

    window.location.href = "/dashboard";
  };

  return <SelectOrganizationForm onSubmit={handleOrgSubmit} />;
}
