import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ValueProposition from "@/components/ValueProposition";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="font-display bg-background-light text-brand-dark min-h-screen flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      <Header />
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column: Value Prop */}
          <ValueProposition />
          {/* Right Column: Form Card */}
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

