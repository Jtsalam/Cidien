"use client";

import Image from "next/image";
import Link from "next/link";
import { getCookie } from "@/utils/getCookie";
import { orgMap } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import LogoutConfirmationModal from "@/components/Dashboard/LogoutConfirmationModal";

export default function DashboardPage() {
  const [displayName, setDisplayName] = useState("");
  const [nurseId, setNurseId] = useState("");
  const [orgImage, setOrgImage] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Mock fetching session data (replace with actual logic)
  useEffect(() => {
    // fetch session info here
    const cookieOrg = getCookie("organization") ?? "";
    console.log("Organization from cookie:", cookieOrg);
    setDisplayName(orgMap[cookieOrg.trim()]);

    const cookieId = getCookie("staff_Id") ?? "";
    console.log("Staff Id from cookie:", cookieId);
    setNurseId(cookieId.trim());
    setOrgImage(`${cookieOrg.trim()}`);
    //console.log(`/centerImages/${cookieOrg.trim()}.png`);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/staff/logout", { method: "POST" });
    window.location.href = "/Staff/sign-in";
  };


  // Map paths to tab values for active state
  const tabRoutes = [
    { value: "home", path: "/Mobile-Charter/StaffDashboard/userdashboard.php" },
    { value: "uploads", path: "/Mobile-Charter/uploads/uploadview.php" },
    { value: "data", path: "/Mobile-Charter/StaffDashboard/data.php" },
    { value: "clients", path: "/Mobile-Charter/StaffDashboard/clients.php" },
  ];

  // Determine the active tab based on the current pathname
  const activeTab = tabRoutes.find((route) => pathname === route.path)?.value || "home";

  return (
    <div className="font-sans">
      <header className="bg-[#6d8a55] text-[#f8f0f0] flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-4">
          <Image
            src={`/centerImages/${orgImage}.png`}
            alt="Organization logo"
            width={150}
            height={150}
            className="rounded"
          />
        </div>
        <div className="text-center">
          <b>Organization Name: {displayName}</b><br/>
          <b>Nurse ID: {nurseId}</b>
        </div>
        <Button variant="ghost" className="underline text-white hover:bg-white/10" onClick={() => setShowLogoutModal(true)}>
          Logout
        </Button>
      </header>

      <div className="flex justify-center">
        <Tabs value={activeTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-4 bg-[#f4e6d9] rounded-md p-1">
            {tabRoutes.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => router.push(tab.path)}
                className="text-sm font-medium text-[#2b2b2b]  data-[state=active]:bg-[#6d8a55] data-[state=active]:text-[#f4e6d9] rounded-sm transition-all"
              >
                {tab.value.charAt(0).toUpperCase() + tab.value.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <LogoutConfirmationModal
        open={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}