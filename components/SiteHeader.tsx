"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Loader2, Menu, X } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Close on Escape so the menu doesn't trap keyboard users.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

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
          onClick={closeMobileMenu}
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

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-header-mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 md:hidden"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="site-header-mobile-menu"
          className="absolute inset-x-0 top-full border-b border-gray-200/80 bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/85 md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-base font-medium text-gray-700">
            <Link
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              href="/#features"
            >
              Features
            </Link>
            <Link
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              href="/#how-it-works"
            >
              How it works
            </Link>
            <Link
              onClick={closeMobileMenu}
              className="flex items-center gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              href="https://github.com/Jtsalam/Cidien"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden />
              GitHub
            </Link>
            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                void handleStartDemo();
              }}
              disabled={isStartingDemo}
              className="mt-1 inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-70"
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
      )}
    </header>
  );
}
