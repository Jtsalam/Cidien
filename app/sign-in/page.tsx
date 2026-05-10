import { redirect } from "next/navigation";

/**
 * Organization / desktop sign-in is disabled for now.
 * Flow: Home → Try Demo → onboarding → Staff dashboard.
 */
export default function SignInPage() {
  redirect("/");
}

/* Previously:
"use client";
import SelectOrganizationForm from "@/components/Center/SelectOrganizationForm";
export default function SignIn() { ... }
*/
