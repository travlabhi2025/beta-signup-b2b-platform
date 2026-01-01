"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NextStepsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUserEmail(currentUser.email || "");
        setUserId(currentUser.uid);

        // Check if email is already verified in Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setEmailVerified(userData.emailVerified || false);
          }
        } catch (err) {
          console.error("Error checking email verification:", err);
        }
      } else {
        // Redirect to signup if not authenticated
        router.push("/signup");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Soft rate limit countdown for resend button (client-side only)
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleSendOTP = async () => {
    if (!userEmail || !userId) {
      setError("User information not available");
      return;
    }

    // Soft rate limit check (client-side only, 30 seconds)
    if (resendCooldown > 0) {
      setError(
        `Please wait ${resendCooldown} second${
          resendCooldown !== 1 ? "s" : ""
        } before requesting a new code.`
      );
      return;
    }

    setIsSendingOtp(true);
    setError(null);

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          userId: userId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send OTP");
      }

      // Store OTP data in Firestore (client-side with proper auth)
      if (result.otpData) {
        try {
          const otpRef = doc(db, "otps", userId);
          await setDoc(otpRef, {
            email: userEmail,
            otp: result.otpData.otp,
            expiresAt: Timestamp.fromDate(new Date(result.otpData.expiresAt)),
            createdAt: Timestamp.now(),
            verified: false,
          });
        } catch (firestoreError) {
          console.error("Failed to store OTP in Firestore:", firestoreError);
          throw new Error("Failed to store OTP. Please try again.");
        }
      }

      // Set soft rate limit (30 seconds) for resend button
      setResendCooldown(30);

      setOtpSent(true);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send OTP. Please try again."
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    if (!userEmail || !userId) {
      setError("User information not available");
      return;
    }

    setIsVerifying(true);
    setError(null);

    // Get OTP data from Firestore for verification
    let storedOtpData = null;
    try {
      const otpRef = doc(db, "otps", userId);
      const otpSnap = await getDoc(otpRef);
      if (otpSnap.exists()) {
        const data = otpSnap.data();
        storedOtpData = {
          otp: data.otp,
          expiresAt: data.expiresAt.toDate().toISOString(),
          email: data.email,
        };
      }
    } catch (err) {
      console.error("Failed to read OTP from Firestore:", err);
    }

    if (!storedOtpData) {
      setError("OTP not found. Please request a new code.");
      setIsVerifying(false);
      return;
    }

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otp,
          email: userEmail,
          userId: userId,
          otpData: storedOtpData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to verify OTP");
      }

      // Mark OTP as verified in Firestore
      try {
        const otpRef = doc(db, "otps", userId);
        await updateDoc(otpRef, {
          verified: true,
          verifiedAt: Timestamp.now(),
        });
      } catch (firestoreError) {
        console.error("Failed to update OTP status:", firestoreError);
      }

      // Update Firestore user document client-side (with proper auth)
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          emailVerified: true,
          updatedAt: Timestamp.now(),
        });

        // Get user data for welcome email
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const nameParts = userData.name?.split(" ") || [];
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          // Send welcome email after successful verification (non-blocking)
          try {
            await fetch("/api/send-welcome-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: userEmail,
              }),
            });
          } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            // Don't fail verification if welcome email fails
          }
        }
      } catch (firestoreError) {
        console.error("Failed to update Firestore:", firestoreError);
        // Don't fail verification if Firestore update fails
        // The API has already validated the OTP
      }

      setEmailVerified(true);
      setOtpSent(false);
      setOtp("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid OTP. Please try again."
      );
    } finally {
      setIsVerifying(false);
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
      <main className="flex-1 w-full relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-linear-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-[960px] mx-auto px-6 lg:px-10 py-12 lg:py-20 flex flex-col items-center">
          {/* Hero / Status Section */}
          <div className="flex flex-col items-center gap-8 text-center mb-16 relative z-10">
            <div className="max-w-xl space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-dark">
                Sign-up Received
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Thanks for signing up. We are currently reviewing applications
                to ensure the best experience for our beta partners.
              </p>
            </div>
          </div>

          {/* Email Verification Section */}
          <div className="w-full max-w-md mb-12 relative z-10">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`size-10 rounded-lg flex items-center justify-center ${
                    emailVerified
                      ? "bg-green-100 text-green-600"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {emailVerified ? "verified" : "mail"}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-dark">
                    Email Verification
                  </h3>
                  <p className="text-sm text-slate-600">
                    {emailVerified
                      ? "Your email has been verified"
                      : "Verify your email to continue"}
                  </p>
                </div>
              </div>

              {emailVerified ? (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium text-center">
                    ✓ Email verified successfully!
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {!otpSent ? (
                    <div>
                      <p className="text-sm text-slate-600 mb-4">
                        We&apos;ll send a verification code to{" "}
                        <span className="font-semibold text-brand-dark">
                          {userEmail}
                        </span>
                      </p>
                      <button
                        onClick={handleSendOTP}
                        disabled={isSendingOtp}
                        className="w-full rounded-lg bg-primary hover:bg-[#0b9c8d] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 shadow-lg shadow-primary/25 transition-all"
                      >
                        {isSendingOtp ? "Sending..." : "Send Verification Code"}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                      <div>
                        <label
                          htmlFor="otp"
                          className="block text-sm font-semibold text-brand-dark mb-2"
                        >
                          Enter Verification Code
                        </label>
                        <input
                          id="otp"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          value={otp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setOtp(value);
                            setError(null);
                          }}
                          className="w-full rounded-lg border border-slate-200 focus:border-primary focus:ring-primary/50 bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 text-center text-2xl font-mono tracking-widest"
                          placeholder="000000"
                          autoComplete="one-time-code"
                        />
                        <p className="text-xs text-slate-500 mt-2 text-center">
                          Check your email for the 6-digit code
                        </p>
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isVerifying || otp.length !== 6}
                        className="w-full rounded-lg bg-primary hover:bg-[#0b9c8d] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 shadow-lg shadow-primary/25 transition-all"
                      >
                        {isVerifying ? "Verifying..." : "Verify"}
                      </button>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          disabled={isSendingOtp || resendCooldown > 0}
                          className="w-full text-sm text-primary hover:text-[#0b9c8d] disabled:text-slate-400 disabled:cursor-not-allowed font-medium transition-colors"
                        >
                          {isSendingOtp
                            ? "Sending..."
                            : resendCooldown > 0
                            ? `Resend Code (${resendCooldown}s)`
                            : "Resend Code"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Steps Section */}
          <div className="w-full relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                What happens next
              </span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-slate-400 group-hover:text-primary transition-colors select-none">
                  1
                </div>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-2xl">
                    rule
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    Application Review
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We manually check your travel organization profile to match
                    you with the right beta cohort tailored to your niche.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-slate-400 group-hover:text-primary transition-colors select-none">
                  2
                </div>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-2xl">
                    lock_open
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    Rolling Access
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We grant platform access in weekly batches. This helps us
                    maintain stability and ensure every new user gets attention.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-slate-400 group-hover:text-primary transition-colors select-none">
                  3
                </div>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-2xl">
                    support_agent
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">
                    Onboarding Support
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Selected partners receive a complimentary 1:1 strategy call
                    to set up workflows and integrate existing data.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 h-12 rounded-lg bg-white border border-slate-200 hover:border-primary/50 text-brand-dark text-sm font-bold transition-all shadow-sm"
              >
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
