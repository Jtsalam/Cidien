"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Github, Loader2 } from "lucide-react";

/**
 * Global site header rendered by app/layout.tsx.
 *
 * Visibility is controlled declaratively via CSS in app/globals.css:
 * when the staff dashboard mounts a `[data-staff-dashboard]` node anywhere in
 * the document, the `body:has(...) [data-site-header]` rule hides this header.
 * That keeps the global bar visible on demo onboarding routes (which also live
 * under /dashboard) and only hides it once StaffDashboard itself renders.
 */
export default function SiteHeader() {
  const [isStartingDemo, setIsStartingDemo] = useState(false);

  const handleStartDemo = async () => {
    try {
      setIsStartingDemo(true);
      const response = await fetch("/api/demo/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start demo.");
      }

      window.location.href = data.redirectUrl || "/dashboard";
    } catch (error) {
      console.error("Failed to start demo:", error);
      setIsStartingDemo(false);
    }
  };

  return (
    <header
      data-site-header
      className="sticky top-0 z-[100] flex h-16 shrink-0 items-center border-b border-gray-200/80 bg-white/90 px-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:h-20 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Cidien — Home"
          className="inline-flex items-center rounded-md outline-none ring-offset-2 transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          <Image
            src="/Cidien.svg"
            alt="Cidien"
            width={375}
            height={225}
            priority
            className="h-10 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-emerald-200 hover:text-emerald-700"
            href="https://github.com/Jtsalam/Cidien"
            target="_blank"
            rel="noreferrer"
            aria-label="Cidien GitHub repository"
            title="Cidien GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link className="transition-colors hover:text-emerald-700" href="/#features">
            Features
          </Link>
          <Link className="transition-colors hover:text-emerald-700" href="/#how-it-works">
            How it works
          </Link>
          <button
            type="button"
            onClick={handleStartDemo}
            disabled={isStartingDemo}
            className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isStartingDemo ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                Starting…
              </>
            ) : (
              "Get started"
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
