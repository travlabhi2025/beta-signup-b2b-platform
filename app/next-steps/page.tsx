import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NextStepsPage() {
  return (
    <div className="font-display bg-background-light text-brand-dark min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-1 w-full relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
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
                  <span className="material-symbols-outlined text-2xl">rule</span>
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

