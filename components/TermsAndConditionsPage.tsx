"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditionsPage() {
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
            Terms and Conditions
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
              Welcome to TripAbhi (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). These Terms and Conditions (&quot;Terms&quot;)
              govern your use of our website, mobile application, and services
              (collectively, the &quot;Service&quot;) operated by TripAbhi.
            </p>
            <p className="text-brand-dark leading-relaxed mt-4">
              By accessing or using our Service, you agree to be bound by these
              Terms. If you disagree with any part of these terms, then you may
              not access the Service.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              2. Acceptance of Terms
            </h2>
            <p className="text-brand-dark leading-relaxed">
              By using TripAbhi&apos;s platform, you acknowledge that you have
              read, understood, and agree to be bound by these Terms and our
              Privacy Policy. These Terms constitute a legally binding agreement
              between you and TripAbhi.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              3. Service Description
            </h2>
            <p className="text-brand-dark leading-relaxed">
              TripAbhi is an online platform that connects travelers with trip
              organizers, enabling users to:
            </p>
            <ul className="list-disc pl-6 text-brand-dark space-y-2 mt-4">
              <li>
                Discover and book travel experiences organized by certified trip
                organizers
              </li>
              <li>Create and manage travel experiences as a trip organizer</li>
              <li>Connect with fellow travelers and share experiences</li>
              <li>
                Access travel-related information, reviews, and recommendations
              </li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              4. User Accounts and Registration
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              4.1 Account Creation
            </h3>
            <p className="text-brand-dark leading-relaxed">
              To access certain features of our Service, you must create an
              account. You agree to provide accurate, current, and complete
              information during registration and to update such information to
              keep it accurate, current, and complete.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              4.2 Account Security
            </h3>
            <p className="text-brand-dark leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You agree to notify us immediately of any unauthorized
              use of your account.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              5. User Responsibilities and Conduct
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              5.1 Prohibited Activities
            </h3>
            <p className="text-brand-dark leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-brand-dark space-y-2">
              <li>
                Use the Service for any unlawful purpose or in violation of
                applicable laws
              </li>
              <li>
                Post, transmit, or share content that is defamatory, obscene, or
                violates intellectual property rights
              </li>
              <li>
                Impersonate any person or entity or misrepresent your
                affiliation
              </li>
              <li>
                Attempt to gain unauthorized access to the Service or related
                systems
              </li>
              <li>
                Interfere with or disrupt the Service or servers connected to
                the Service
              </li>
              <li>
                Collect or harvest any personally identifiable information from
                the Service
              </li>
            </ul>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              5.2 Content Standards
            </h3>
            <p className="text-brand-dark leading-relaxed">
              All content posted on our platform must comply with applicable laws
              and regulations.
            </p>
          </section>

          {/* Trip Organizer Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              6. Trip Organizer Responsibilities
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              6.1 Organizer Verification
            </h3>
            <p className="text-brand-dark leading-relaxed">
              Trip organizers must undergo verification processes and maintain
              valid documentation as required by applicable law and our platform
              policies.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              6.2 Safety and Compliance
            </h3>
            <p className="text-brand-dark leading-relaxed">
              Organizers are responsible for ensuring all trips comply with
              local regulations, safety standards, and applicable laws. This
              includes obtaining necessary permits, licenses, and insurance
              coverage.
            </p>
          </section>

          {/* Booking and Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              7. Booking and Payment Terms
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              7.1 Booking Process
            </h3>
            <p className="text-brand-dark leading-relaxed">
              All bookings are subject to availability and confirmation by the
              trip organizer. TripAbhi acts as an intermediary platform and is
              not directly responsible for the delivery of travel services.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              7.2 Payment Processing
            </h3>
            <p className="text-brand-dark leading-relaxed">
              Payments are processed through secure third-party payment
              gateways. All transactions are subject to applicable taxes.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              7.3 Refund Policy
            </h3>
            <p className="text-brand-dark leading-relaxed">
              Refunds are subject to the cancellation policy of individual trip
              organizers and applicable consumer protection laws.
            </p>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              8. Privacy and Data Protection
            </h2>
            <p className="text-brand-dark leading-relaxed">
              Your privacy is important to us. Our collection, use, and
              disclosure of personal information is governed by our Privacy
              Policy and applicable data protection laws.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              9. Intellectual Property Rights
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              9.1 Our Content
            </h3>
            <p className="text-brand-dark leading-relaxed">
              The Service and its original content, features, and functionality
              are owned by TripAbhi and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              9.2 User Content
            </h3>
            <p className="text-brand-dark leading-relaxed">
              By posting content on our platform, you grant TripAbhi a
              non-exclusive, royalty-free license to use, modify, and display
              such content in connection with the Service.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-brand-dark leading-relaxed">
              To the maximum extent permitted by applicable law, TripAbhi shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses, resulting from
              your use of the Service.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              11. Dispute Resolution
            </h2>
            <h3 className="text-xl font-medium text-brand-dark mb-3">
              11.1 Governing Law
            </h3>
            <p className="text-brand-dark leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              applicable laws, without regard to its conflict of law
              provisions.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              11.2 Jurisdiction
            </h3>
            <p className="text-brand-dark leading-relaxed">
              Any disputes arising out of or relating to these Terms shall be
              subject to the exclusive jurisdiction of the courts in the
              applicable jurisdiction.
            </p>

            <h3 className="text-xl font-medium text-brand-dark mb-3 mt-6">
              11.3 Alternative Dispute Resolution
            </h3>
            <p className="text-brand-dark leading-relaxed">
              Before pursuing legal action, users agree to attempt resolution
              through good faith negotiation and, if necessary, mediation.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              12. Modifications to Terms
            </h2>
            <p className="text-brand-dark leading-relaxed">
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will try to provide at least 30 days
              notice prior to any new terms taking effect.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              13. Termination
            </h2>
            <p className="text-brand-dark leading-relaxed">
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              14. Contact Information
            </h2>
            <p className="text-brand-dark leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mt-4">
              <p className="text-brand-dark">
                <strong>Email:</strong> connect@travlabhi.com
              </p>
            </div>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              15. Severability
            </h2>
            <p className="text-brand-dark leading-relaxed">
              If any provision of these Terms is held to be invalid or
              unenforceable by a court, the remaining provisions of these Terms
              will remain in effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-dark mb-4">
              16. Entire Agreement
            </h2>
            <p className="text-brand-dark leading-relaxed">
              These Terms constitute the sole and entire agreement between you
              and TripAbhi regarding the Service and supersede all prior and
              contemporaneous understandings, agreements, representations, and
              warranties.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-brand-secondary">
          <p className="text-sm">
            By using TripAbhi, you acknowledge that you have read and
            understood these Terms and Conditions.
          </p>
        </div>
      </main>
    </div>
  );
}

