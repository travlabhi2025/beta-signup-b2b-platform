"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-background-light/80 backdrop-blur-md px-6 py-4 lg:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/Logo.svg"
            alt="TripAbhi"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Only show on homepage */}
        {pathname === "/" && (
          <div className="flex items-center gap-4">
            <Link
              href="/verify-email"
              className="hidden sm:flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-brand-dark px-5 py-2 text-sm font-bold transition-all"
            >
              Verify Email
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-[#0b9c8d] transition-all shadow-lg shadow-primary/25"
            >
              Sign Up for Beta
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
