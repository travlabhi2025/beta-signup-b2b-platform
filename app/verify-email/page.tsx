"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Eye, EyeOff } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        // Redirect to next-steps page if already authenticated
        router.push("/next-steps");
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSigningIn(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // onAuthStateChanged will handle the redirect
      router.push("/next-steps");
    } catch (err: any) {
      let errorMessage = "Failed to sign in. Please check your credentials.";

      if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Incorrect password. Please try again.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed attempts. Please try again later.";
      }

      setError(errorMessage);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="font-display bg-background-light text-brand-dark min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-brand-secondary">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-display bg-background-light text-brand-dark min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-linear-to-r from-brand-secondary to-primary"></div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                Sign In to Verify Email
              </h2>
              <p className="text-sm text-brand-secondary mb-6">
                Enter your credentials to access the email verification page.
              </p>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Email */}
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-brand-dark">
                    Email Address
                  </span>
                  <input
                    className="form-input w-full rounded-lg border border-slate-200 focus:border-primary focus:ring-primary/50 bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 text-sm placeholder:text-slate-400"
                    placeholder="jane@company.com"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    required
                    autoComplete="email"
                  />
                </label>

                {/* Password */}
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-brand-dark">
                    Password
                  </span>
                  <div className="relative">
                    <input
                      className="form-input w-full rounded-lg border border-slate-200 focus:border-primary focus:ring-primary/50 bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 pr-11 text-sm placeholder:text-slate-400"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                      }}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none focus:text-primary transition-colors w-5 h-5"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </label>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-medium text-center">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  className="mt-4 w-full rounded-lg bg-primary hover:bg-[#0b9c8d] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  type="submit"
                  disabled={isSigningIn}
                >
                  {isSigningIn ? "Signing in..." : "Sign In"}
                </button>

                <p className="text-center text-xs text-slate-400 mt-2">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/signup"
                    className="text-primary hover:text-[#0b9c8d] font-semibold"
                  >
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

