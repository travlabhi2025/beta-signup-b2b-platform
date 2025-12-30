"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, Check } from "lucide-react";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

const countries: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
  onBlur?: () => void;
  hasError?: boolean;
}

export default function PhoneInput({
  value,
  onChange,
  name = "phone",
  placeholder = "Phone number",
  onBlur,
  hasError = false,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Filter countries based on search
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        inputRef.current &&
        !inputRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchQuery("");
    // Update the phone value with new country code
    const phoneNumber = value.replace(/^\+\d+\s*/, "");
    onChange(`${country.dialCode} ${phoneNumber}`.trim());
    inputRef.current?.focus();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Remove country code if user types it
    const countryMatch = countries.find((c) =>
      inputValue.startsWith(c.dialCode)
    );

    if (countryMatch && inputValue.startsWith(countryMatch.dialCode)) {
      inputValue = inputValue.replace(countryMatch.dialCode, "").trim();
      setSelectedCountry(countryMatch);
    }

    // Format phone number (remove non-digits except + and spaces)
    const cleaned = inputValue.replace(/[^\d\s\-()]/g, "");
    onChange(`${selectedCountry.dialCode} ${cleaned}`.trim());
  };

  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = value.replace(selectedCountry.dialCode, "").trim();
    return phoneNumber;
  };

  return (
    <div className="relative">
      <div
        className={`flex rounded-lg border ${
          hasError
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/50"
            : "border-slate-200 focus-within:border-primary focus-within:ring-primary/50"
        } bg-slate-50 focus-within:ring-2 overflow-hidden`}
      >
        {/* Country Selector */}
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className="flex items-center justify-between gap-2 px-2 py-2 border-r border-slate-200 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset min-w-[110px] shrink-0"
          aria-label="Select country"
          aria-expanded={isDropdownOpen}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-lg shrink-0">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-brand-dark whitespace-nowrap">
              {selectedCountry.dialCode}
            </span>
          </div>
          {isDropdownOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          )}
        </button>

        {/* Phone Input */}
        <input
          ref={inputRef}
          type="tel"
          name={name}
          value={formatPhoneNumber(value)}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="flex-1 bg-slate-50 text-brand-dark px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full max-h-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-2 border-b border-slate-200 sticky top-0 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                autoFocus
              />
            </div>
          </div>

          {/* Country List */}
          <div className="overflow-y-auto max-h-56">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors ${
                    selectedCountry.code === country.code ? "bg-primary/5" : ""
                  }`}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="flex-1 text-left text-sm text-brand-dark font-medium">
                    {country.name}
                  </span>
                  <span className="text-sm text-slate-500">
                    {country.dialCode}
                  </span>
                  {selectedCountry.code === country.code && (
                    <Check className="w-4 h-4 text-primary shrink-0" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
