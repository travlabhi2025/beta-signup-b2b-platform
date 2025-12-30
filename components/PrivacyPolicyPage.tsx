"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <Header />
      <main className="mx-auto px-4 sm:px-6 md:px-8 lg:px-20 py-16 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Signup
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-primary text-4xl md:text-5xl mb-4 font-black">
            Privacy Policy
          </h1>
          <p className="text-brand-secondary text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              1. Introduction
            </h2>
            <p className="text-brand-dark leading-relaxed">
              TripAbhi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you use our website, mobile application, and services
              (collectively, the &quot;Service&quot;).
            </p>
            <p className="text-brand-dark leading-relaxed mt-4">
              Please read this Privacy Policy carefully. By using our Service,
              you agree to the collection and use of information in accordance
              with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              2.1 Personal Information
            </h3>
            <p className="text-brand-dark leading-relaxed mb-4">
              We may collect personal information that you provide directly to
              us, including:
            </p>
            <ul className="list-disc pl-6 text-brand-dark space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials and profile information</li>
              <li>Payment and billing information</li>
              <li>Travel preferences and booking history</li>
              <li>Communications with us or other users</li>
            </ul>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-brand-dark leading-relaxed mb-4">
              When you use our Service, we may automatically collect certain
              information, including:
            </p>
            <ul className="list-disc pl-6 text-brand-dark space-y-2">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, clicks)</li>
              <li>Location data (if you enable location services)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-brand-dark leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-brand-dark space-y-2">
              <li>To provide, maintain, and improve our Service</li>
              <li>To process transactions and send related information</li>
              <li>To send you technical notices and support messages</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To personalize your experience and provide relevant content</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To detect, prevent, and address technical issues and fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              4.1 Service Providers
            </h3>
            <p className="text-brand-dark leading-relaxed">
              We may share your information with third-party service providers
              who perform services on our behalf, such as payment processing,
              data analysis, email delivery, and hosting services.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              4.2 Business Transfers
            </h3>
            <p className="text-brand-dark leading-relaxed">
              If we are involved in a merger, acquisition, or asset sale, your
              information may be transferred as part of that transaction.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              4.3 Legal Requirements
            </h3>
            <p className="text-brand-dark leading-relaxed">
              We may disclose your information if required to do so by law or in
              response to valid requests by public authorities.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              4.4 With Your Consent
            </h3>
            <p className="text-brand-dark leading-relaxed">
              We may share your information with your consent or at your
              direction.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              5. Data Security
            </h2>
            <p className="text-brand-dark leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method of
              transmission over the Internet or electronic storage is 100% secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-brand-dark leading-relaxed">
              We use cookies and similar tracking technologies to track activity
              on our Service and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is being
              sent. However, if you do not accept cookies, you may not be able to
              use some portions of our Service.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              7. Your Rights and Choices
            </h2>
            <p className="text-brand-dark leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-brand-dark space-y-2">
              <li>The right to access and receive a copy of your personal data</li>
              <li>The right to rectify inaccurate or incomplete information</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <p className="text-brand-dark leading-relaxed mt-4">
              To exercise these rights, please contact us using the information
              provided in the Contact section below.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              8. Data Retention
            </h2>
            <p className="text-brand-dark leading-relaxed">
              We will retain your personal information only for as long as
              necessary to fulfill the purposes outlined in this Privacy Policy,
              unless a longer retention period is required or permitted by law.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-brand-dark leading-relaxed">
              Our Service is not intended for individuals under the age of 18. We
              do not knowingly collect personal information from children. If you
              become aware that a child has provided us with personal information,
              please contact us, and we will take steps to delete such information.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-brand-dark leading-relaxed">
              Your information may be transferred to and maintained on computers
              located outside of your state, province, country, or other
              governmental jurisdiction where data protection laws may differ. By
              using our Service, you consent to the transfer of your information
              to these facilities.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-brand-dark leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date. You are advised to
              review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              12. Contact Us
            </h2>
            <p className="text-brand-dark leading-relaxed">
              If you have any questions about this Privacy Policy, please contact
              us:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mt-4">
              <p className="text-brand-dark">
                <strong>Email:</strong> connect@travlabhi.com
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-brand-secondary">
          <p className="text-sm">
            By using TripAbhi, you acknowledge that you have read and
            understood this Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}

