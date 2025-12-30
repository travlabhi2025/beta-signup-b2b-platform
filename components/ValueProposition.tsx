import { CheckCircle } from "lucide-react";

export default function ValueProposition() {
  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto lg:mx-0">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/20 uppercase tracking-wider">
          Beta Access
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight leading-[1.1]">
          Experience the <span className="text-primary">Future</span> of Travel
          Planning
        </h1>
        <p className="text-lg text-brand-secondary leading-relaxed">
          Join our exclusive beta program for professional travel organizers.
          Automate bookings, manage itineraries, and scale your business without
          the chaos.
        </p>
      </div>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <span className="text-brand-dark font-medium">
            Automated payment collection & invoicing
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <span className="text-brand-dark font-medium">
            Dynamic itinerary builder with real-time updates
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <span className="text-brand-dark font-medium">
            Supplier management dashboard
          </span>
        </li>
      </ul>
    </div>
  );
}
