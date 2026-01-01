"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "./PhoneInput";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
  enableNetwork,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { AuthError } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  companyName?: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [tripsValue, setTripsValue] = useState(10);
  const [phoneNumber, setPhoneNumber] = useState("+1 ");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Validation functions
  const validateFirstName = (value: string): string | undefined => {
    if (value.trim().length < 3) {
      return "First name must be at least 3 characters";
    }
    return undefined;
  };

  const validateLastName = (value: string): string | undefined => {
    if (value.trim().length < 3) {
      return "Last name must be at least 3 characters";
    }
    return undefined;
  };

  const validateEmail = (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validatePassword = (
    value: string,
    showEmptyError: boolean = false
  ): string | undefined => {
    // Check conditions in order - show first unmet requirement
    if (value.length === 0) {
      return showEmptyError
        ? "Password must be at least 8 characters"
        : undefined;
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }
    if (!/[^A-Za-z0-9]/.test(value)) {
      return "Password must contain at least one special character";
    }
    return undefined;
  };

  const validatePhoneNumber = (value: string): string | undefined => {
    // Remove country code and check if there's actual phone number
    const phoneWithoutCountryCode = value.replace(/^\+\d+\s*/, "").trim();
    if (phoneWithoutCountryCode.length === 0) {
      return "Phone number is required";
    }
    return undefined;
  };

  const validateCompanyName = (value: string): string | undefined => {
    if (value.trim().length === 0) {
      return "Company name is required";
    }
    return undefined;
  };

  const handleBlur = (field: keyof FormErrors, value: string) => {
    let error: string | undefined;

    switch (field) {
      case "firstName":
        error = validateFirstName(value);
        break;
      case "lastName":
        error = validateLastName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value, true); // Show error even if empty on blur
        break;
      case "phoneNumber":
        error = validatePhoneNumber(value);
        break;
      case "companyName":
        error = validateCompanyName(value);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const getTripsText = (val: number) => {
    if (val < 10) return "1-10 trips";
    if (val < 20) return "10-20 trips";
    if (val < 30) return "20-30 trips";
    if (val < 40) return "30-40 trips";
    if (val < 50) return "40-50 trips";
    if (val < 60) return "50-60 trips";
    if (val < 70) return "60-70 trips";
    if (val < 80) return "70-80 trips";
    if (val < 90) return "80-90 trips";
    if (val < 100) return "90-100 trips";
    return "100+ trips";
  };

  // Function to send data to Google Sheets via Next.js API route
  const sendToGoogleSheets = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    tripsPerYear: string;
    userId: string;
    emailVerified: boolean;
  }) => {
    try {
      const response = await fetch("/api/google-sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save to Google Sheets");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to save to Google Sheets");
      }
    } catch (fetchError) {
      throw fetchError;
    }
  };

  // Function to send welcome email via Resend
  const sendWelcomeEmail = async (data: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const response = await fetch("/api/send-welcome-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send welcome email");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to send welcome email");
      }
    } catch (fetchError) {
      throw fetchError;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields before submission
    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password, true);
    const phoneNumberError = validatePhoneNumber(phoneNumber);
    const companyNameError = validateCompanyName(companyName);

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      phoneNumberError ||
      companyNameError
    ) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
        phoneNumber: phoneNumberError,
        companyName: companyNameError,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create user account with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      // Combine first and last name
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

      // Update the user's display name
      await updateProfile(user, { displayName: fullName });

      // Wait for auth state to update and ensure user is authenticated
      let authReady = false;
      let attempts = 0;
      const maxAttempts = 10;

      while (!authReady && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const currentUser = auth.currentUser;
        if (currentUser && currentUser.uid === user.uid) {
          authReady = true;
        } else {
          attempts++;
        }
      }

      // Create user document in Firestore matching platform structure
      const userData: {
        name: string;
        email: string;
        emailVerified: boolean;
        role: "organizer";
        createdAt: Timestamp;
        updatedAt: Timestamp;
        contact?: { phone?: string };
        company?: string;
      } = {
        name: fullName,
        email: email.trim(),
        emailVerified: false,
        role: "organizer",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      // Add phone number if provided (not empty and not just default country code)
      const cleanedPhone = phoneNumber.trim();
      if (cleanedPhone && cleanedPhone !== "+1" && cleanedPhone.length > 3) {
        // Check if there's actual phone number after country code
        const phoneWithoutCountryCode = cleanedPhone
          .replace(/^\+\d+\s*/, "")
          .trim();
        if (phoneWithoutCountryCode.length > 0) {
          userData.contact = {
            phone: cleanedPhone,
          };
        }
      }

      if (companyName.trim()) {
        userData.company = companyName.trim();
      }

      // Create user document in Firestore
      try {
        await enableNetwork(db);

        // Wait a moment for auth state to fully propagate
        await new Promise((resolve) => setTimeout(resolve, 100));

        const userDocRef = doc(db, "users", user.uid);

        // Check if document exists (matching b2b-platform pattern)
        const userSnap = await getDoc(userDocRef);

        // Use the same pattern as b2b-platform: check first, then setDoc for new documents
        if (userSnap.exists()) {
          await updateDoc(userDocRef, {
            ...userData,
            updatedAt: Timestamp.now(),
          });
        } else {
          // Create new user using setDoc (same as b2b-platform)
          await setDoc(userDocRef, userData);
        }
      } catch (firestoreError) {
        throw new Error(
          `Failed to create user profile: ${
            firestoreError instanceof Error
              ? firestoreError.message
              : "Unknown error"
          }`
        );
      }

      // Send data to Google Sheets (non-blocking - don't fail signup if this fails)
      try {
        await sendToGoogleSheets({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phoneNumber: phoneNumber.trim(),
          companyName: companyName.trim(),
          tripsPerYear: getTripsText(tripsValue),
          userId: user.uid,
          emailVerified: false, // Initially false, will be updated after verification
        });
      } catch {
        // Don't fail the signup if Google Sheets fails
      }

      // Send signup email (non-blocking - don't fail signup if this fails)
      try {
        await fetch("/api/send-signup-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          }),
        });
      } catch {
        // Don't fail signup if email sending fails
      }

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("+1 ");
      setCompanyName("");
      setTripsValue(10);
      setErrors({});

      // Redirect to next steps page
      router.push("/next-steps");
    } catch (error: unknown) {
      let errorMessage = "An error occurred during signup. Please try again.";

      if ((error as AuthError).code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please use a different email.";
      } else if ((error as AuthError).code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. Please choose a stronger password.";
      } else if ((error as AuthError).code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please check your email.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-brand-secondary to-primary"></div>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-brand-dark mb-6">
            Sign up for beta
          </h3>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* First Name & Last Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-brand-dark">
                  First Name
                </span>
                <input
                  className={`form-input w-full rounded-lg border ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      : "border-slate-200 focus:border-primary focus:ring-primary/50"
                  } bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 text-sm placeholder:text-slate-400`}
                  placeholder="Jane"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFirstName(value);
                    // Clear error if validation passes
                    if (errors.firstName) {
                      const error = validateFirstName(value);
                      if (!error) {
                        setErrors((prev) => ({
                          ...prev,
                          firstName: undefined,
                        }));
                      }
                    }
                  }}
                  onBlur={(e) => handleBlur("firstName", e.target.value)}
                />
                {errors.firstName && (
                  <span className="text-xs text-red-500 mt-0.5">
                    {errors.firstName}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-brand-dark">
                  Last Name
                </span>
                <input
                  className={`form-input w-full rounded-lg border ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      : "border-slate-200 focus:border-primary focus:ring-primary/50"
                  } bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 text-sm placeholder:text-slate-400`}
                  placeholder="Doe"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setLastName(value);
                    // Clear error if validation passes
                    if (errors.lastName) {
                      const error = validateLastName(value);
                      if (!error) {
                        setErrors((prev) => ({ ...prev, lastName: undefined }));
                      }
                    }
                  }}
                  onBlur={(e) => handleBlur("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <span className="text-xs text-red-500 mt-0.5">
                    {errors.lastName}
                  </span>
                )}
              </label>
            </div>

            {/* Email & Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-brand-dark">
                  Email Address
                </span>
                <input
                  className={`form-input w-full rounded-lg border ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                      : "border-slate-200 focus:border-primary focus:ring-primary/50"
                  } bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 text-sm placeholder:text-slate-400`}
                  placeholder="jane@company.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
                    // Clear error if validation passes
                    if (errors.email) {
                      const error = validateEmail(value);
                      if (!error) {
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }
                  }}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-0.5">
                    {errors.email}
                  </span>
                )}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-brand-dark">
                  Password
                </span>
                <div className="relative">
                  <input
                    className={`form-input w-full rounded-lg border ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                        : "border-slate-200 focus:border-primary focus:ring-primary/50"
                    } bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 pr-11 text-sm placeholder:text-slate-400`}
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPassword(value);
                      // Re-validate on every change to show next error progressively
                      // Only show errors if field has been touched (has an error or has been blurred)
                      if (errors.password !== undefined || value.length > 0) {
                        const error = validatePassword(value, false);
                        setErrors((prev) => ({
                          ...prev,
                          password: error,
                        }));
                      }
                    }}
                    onBlur={(e) => handleBlur("password", e.target.value)}
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
                {errors.password && (
                  <span className="text-xs text-red-500 mt-0.5">
                    {errors.password}
                  </span>
                )}
              </label>
            </div>

            {/* Phone Number */}
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-brand-dark">
                Phone Number
              </span>
              <PhoneInput
                value={phoneNumber}
                onChange={(value) => {
                  setPhoneNumber(value);
                  // Clear error if validation passes
                  if (errors.phoneNumber) {
                    const error = validatePhoneNumber(value);
                    if (!error) {
                      setErrors((prev) => ({
                        ...prev,
                        phoneNumber: undefined,
                      }));
                    }
                  }
                }}
                onBlur={() => handleBlur("phoneNumber", phoneNumber)}
                name="phone"
                placeholder="(555) 000-0000"
                hasError={!!errors.phoneNumber}
              />
              {errors.phoneNumber && (
                <span className="text-xs text-red-500 mt-0.5">
                  {errors.phoneNumber}
                </span>
              )}
            </label>

            {/* Company Name */}
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-brand-dark">
                Company Name
              </span>
              <input
                className={`form-input w-full rounded-lg border ${
                  errors.companyName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                    : "border-slate-200 focus:border-primary focus:ring-primary/50"
                } bg-slate-50 text-brand-dark focus:outline-none focus:ring-2 px-4 py-3 text-sm placeholder:text-slate-400`}
                placeholder="Travel Co."
                type="text"
                name="company"
                value={companyName}
                onChange={(e) => {
                  const value = e.target.value;
                  setCompanyName(value);
                  // Clear error if validation passes
                  if (errors.companyName) {
                    const error = validateCompanyName(value);
                    if (!error) {
                      setErrors((prev) => ({
                        ...prev,
                        companyName: undefined,
                      }));
                    }
                  }
                }}
                onBlur={(e) => handleBlur("companyName", e.target.value)}
              />
              {errors.companyName && (
                <span className="text-xs text-red-500 mt-0.5">
                  {errors.companyName}
                </span>
              )}
            </label>

            {/* Trips Per Year Range */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex justify-between items-end">
                <label
                  className="text-sm font-semibold text-brand-dark"
                  htmlFor="trips-range"
                >
                  Trips per year
                </label>
                <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded">
                  {getTripsText(tripsValue)}
                </span>
              </div>
              <div className="relative w-full h-8 flex items-center">
                <input
                  className="w-full focus:outline-none"
                  id="trips-range"
                  max={100}
                  min={1}
                  type="range"
                  value={tripsValue}
                  onChange={(e) => setTripsValue(parseInt(e.target.value))}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
                <span>1</span>
                <span>50</span>
                <span>100+</span>
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium text-center">
                  {submitError}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              className="mt-4 w-full rounded-lg bg-primary hover:bg-[#0b9c8d] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign up for beta"}
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              Limited spots available. No credit card required.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
