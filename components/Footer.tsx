import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/Logo.svg"
            alt="TripAbhi"
            width={120}
            height={32}
            className="h-8 w-auto opacity-80"
          />
        </Link>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-brand-secondary">
          <Link
            className="hover:text-primary transition-colors"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="hover:text-primary transition-colors"
            href="/terms-and-conditions"
          >
            Terms of Service
          </Link>
          <a
            className="hover:text-primary transition-colors"
            href="mailto:connect@travlabhi.com"
          >
            Support
          </a>
        </div>
        <p className="text-sm text-brand-secondary/60">
          © 2025 TripAbhi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

