"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <header
      data-site-header
      className="sticky top-0 z-[100] flex h-16 shrink-0 items-center border-b border-gray-200/80 bg-white/90 px-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] backdrop-blur supports-[backdrop-filter]:bg-white/75 sm:h-20 sm:px-6"
    >
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
    </header>
  );
}
