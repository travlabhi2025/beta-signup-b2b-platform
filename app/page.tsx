import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-display bg-background-light text-brand-dark min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <div className="flex flex-col items-start gap-8 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  <span className="flex size-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    New Beta Access
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-brand-dark">
                    Run and scale your group trips —{" "}
                    <span className="relative inline-block text-primary">
                      without chaos
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-primary/30 -z-10"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 10"
                      >
                        <path
                          d="M0 5 Q 50 10 100 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                        ></path>
                      </svg>
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-brand-secondary leading-relaxed max-w-lg">
                    CRM, payments, approvals, operations, and trust — all in one
                    platform designed for modern organizers.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link
                    href="/signup"
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary h-12 px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40"
                  >
                    <span>Join Organizer Beta</span>
                    <span className="material-symbols-outlined text-[20px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
              <div className="relative lg:h-full flex items-center justify-center lg:justify-end">
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="relative z-10 w-full max-w-[540px]">
                  <div className="bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden transform hover:rotate-0 transition-transform duration-700 ease-out">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      </div>
                      <div className="ml-4 h-2 w-32 rounded-full bg-slate-200"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-end mb-6">
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                            Current Trip
                          </p>
                          <h3 className="text-xl font-bold text-brand-dark">
                            Bali Retreat 2026
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-lg bg-slate-50">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-slate-400 text-sm">
                              group
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              Participants
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-brand-dark">
                            24
                            <span className="text-sm font-normal text-slate-400">
                              /30
                            </span>
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-50">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-slate-400 text-sm">
                              payments
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              Collected
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-brand-dark">
                            $42k
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              <span className="material-symbols-outlined text-sm">
                                schedule
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-brand-dark">
                                Upcoming Departures
                              </p>
                              <p className="text-xs text-slate-500">
                                2 trips starting next week
                              </p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-400 text-sm">
                            chevron_right
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-sm">
                                verified_user
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-brand-dark">
                                Pending Approvals
                              </p>
                              <p className="text-xs text-slate-500">
                                5 requests awaiting review
                              </p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-400 text-sm">
                            chevron_right
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for Section */}
        <section
          id="who-is-it-for"
          className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white"
        >
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 mb-6">
              <span className="flex size-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium text-slate-600">
                New Beta Access
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 text-brand-dark">
              Who is the{" "}
              <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-secondary">
                Organizer Beta
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-primary/30 -z-10"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 10"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></path>
                </svg>
              </span>{" "}
              for?
            </h2>
            <p className="mt-6 text-lg leading-8 text-brand-secondary max-w-2xl mx-auto">
              Tailored solutions designed to empower every type of travel
              professional. Whether you&apos;re managing corporate retreats or
              influencer getaways, we&apos;ve got you covered.
            </p>
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Travel Agents */}
              <div className="group relative flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm border border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined !text-[28px]">
                      public
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    Travel Agents
                  </h3>
                  <p className="text-sm leading-6 text-brand-secondary">
                    Streamline bookings and itineraries for your entire client
                    roster in one place.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                  Learn more{" "}
                  <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
              {/* Card 2: Group Trip Organizers */}
              <div className="group relative flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm border border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined !text-[28px]">
                      groups
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    Group Organizers
                  </h3>
                  <p className="text-sm leading-6 text-brand-secondary">
                    Manage logistics, payments, and communication for large
                    cohorts easily.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                  Learn more{" "}
                  <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
              {/* Card 3: Influencers */}
              <div className="group relative flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm border border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined !text-[28px]">
                      camera_alt
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    Influencers
                  </h3>
                  <p className="text-sm leading-6 text-brand-secondary">
                    Monetize your audience with curated trips that reflect your
                    personal brand.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                  Learn more{" "}
                  <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
              {/* Card 4: Trainers & Niche Communities */}
              <div className="group relative flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm border border-transparent hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div>
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined !text-[28px]">
                      self_improvement
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">
                    Niche Communities
                  </h3>
                  <p className="text-sm leading-6 text-brand-secondary">
                    Host retreats, workshops, and events tailored specifically
                    for your tribe.
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                  Learn more{" "}
                  <span className="material-symbols-outlined text-sm ml-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section
          id="benefits"
          className="flex flex-col items-center justify-center py-16 px-6 md:px-10 lg:px-20 w-full max-w-[1440px] mx-auto bg-background-light"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mb-16 space-y-4">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              Limited Time Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tight leading-[1.1]">
              What You Get for Beta
            </h2>
            <p className="text-lg text-brand-secondary font-medium max-w-2xl mx-auto leading-relaxed">
              Join our exclusive group of early adopters and unlock premium
              benefits designed to supercharge your travel business from day
              one.
            </p>
          </div>
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* Card 1 */}
            <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 flex flex-col h-full">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  calendar_month
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                2 Months Free
              </h3>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Enjoy full, unrestricted access to the complete TripAbhi
                Organizer SaaS suite for your first 2 months, completely on us.
              </p>
            </div>
            {/* Card 2 (Hero/Highlighted) */}
            <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-primary/20 hover:border-primary flex flex-col h-full overflow-hidden">
              {/* Badge */}
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                Best Value
              </div>
              <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  percent
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Lifetime Discount
              </h3>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Lock in a massive{" "}
                <span className="text-primary font-black bg-primary/10 px-1 rounded">
                  40% OFF
                </span>{" "}
                on all paid plans forever. This is a one-time offer for our
                founding beta testers.
              </p>
            </div>
            {/* Card 3 */}
            <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 flex flex-col h-full">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  support_agent
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Priority Support
              </h3>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Skip the queue with dedicated onboarding sessions and priority
                fast-lane assistance whenever you need help.
              </p>
            </div>
            {/* Card 4 */}
            <div className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 flex flex-col h-full">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">
                  engineering
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                Shape the Product
              </h3>
              <p className="text-brand-secondary text-sm leading-relaxed">
                Get direct access to our product and engineering teams. Your
                feedback will prioritize features on our roadmap.
              </p>
            </div>
          </div>
          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/signup"
              className="bg-brand-dark hover:bg-brand-secondary text-white text-base md:text-lg font-bold h-14 px-8 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 mx-auto w-fit"
            >
              Claim Your Beta Access Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <p className="mt-4 text-sm text-brand-secondary/60">
              Limited spots available for the current cohort.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
