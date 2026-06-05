"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const PLANS = {
  starter: {
    name: "Starter Report",
    price: "$99",
    priceNote: "one-time payment",
    features: ["5 ranked locations", "Visibility Score™ for each", "PDF report delivered in 24h"],
  },
  professional: {
    name: "Professional Report",
    price: "$299",
    priceNote: "one-time payment",
    features: [
      "15 ranked locations",
      "Full traffic & demographic breakdown",
      "Interactive location map",
      "PDF report delivered in 24h",
    ],
  },
  growth: {
    name: "Business Growth Plan",
    price: "$999",
    priceNote: "per year",
    features: [
      "Unlimited reports",
      "Monthly data refresh",
      "Priority 12-hour delivery",
      "Dedicated account support",
    ],
  },
} as const;

type PlanKey = keyof typeof PLANS;

const BUSINESS_TYPES = [
  "Restoration / Water Damage",
  "Landscaping & Lawn Care",
  "Roofing & Exteriors",
  "Real Estate",
  "Political Campaign",
  "Food Truck / Mobile Business",
  "Retail Store",
  "Home Services",
  "Healthcare / Medical",
  "Other",
];

function CheckoutForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") as PlanKey | null;
  const activePlan: PlanKey =
    planParam && planParam in PLANS ? planParam : "starter";
  const plan = PLANS[activePlan];

  const [form, setForm] = useState({
    name: "",
    email: "",
    businessName: "",
    city: "",
    businessType: "",
    notes: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function formatCardNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    let formatted = value;
    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiry") formatted = formatExpiry(value);
    if (name === "cvc") formatted = value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "A valid email is required";
    if (!form.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!form.city.trim()) newErrors.city = "City / market is required";
    if (!form.businessType) newErrors.businessType = "Please select a business type";
    if (form.cardNumber.replace(/\s/g, "").length < 16)
      newErrors.cardNumber = "Enter a valid 16-digit card number";
    if (form.expiry.replace(/\s/g, "").replace("/", "").length < 4)
      newErrors.expiry = "Enter a valid expiry (MM / YY)";
    if (form.cvc.length < 3) newErrors.cvc = "Enter a valid CVC";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#00D084]/15 flex items-center justify-center mx-auto mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#00D084" fillOpacity="0.15" />
              <path
                d="M11 18l5 5 9-9"
                stroke="#00D084"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3">Order Confirmed!</h2>
          <p className="text-slate-600 text-lg mb-2">
            Your report is being prepared. Expect delivery within 24 hours.
          </p>
          <p className="text-slate-500 mb-8">
            Check your email at{" "}
            <span className="font-semibold text-slate-800">{form.email}</span> for your order
            confirmation and report delivery.
          </p>
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 text-left mb-8 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Plan</span>
              <span className="font-semibold text-slate-800">{plan.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Business</span>
              <span className="font-semibold text-slate-800">{form.businessName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Market</span>
              <span className="font-semibold text-slate-800">{form.city}</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0066FF] text-white font-semibold hover:bg-[#0052CC] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

        {/* Left: Form */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-black text-slate-900 mb-1">Secure Checkout</h1>
          <p className="text-slate-500 mb-8">Complete your order below. Delivery within 24 hours.</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Contact info */}
            <fieldset>
              <legend className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">
                Your Information
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Full Name"
                  name="name"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="jane@yourbusiness.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <Field
                  label="Business Name"
                  name="businessName"
                  placeholder="Smith Restoration LLC"
                  value={form.businessName}
                  onChange={handleChange}
                  error={errors.businessName}
                />
                <Field
                  label="City / Market"
                  name="city"
                  placeholder="Austin, TX"
                  value={form.city}
                  onChange={handleChange}
                  error={errors.city}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Business Type
                </label>
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 ${
                    errors.businessType
                      ? "border-red-400 focus:ring-red-300"
                      : "border-slate-200 focus:border-[#0066FF]"
                  }`}
                >
                  <option value="">Select your business type…</option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-xs text-red-500">{errors.businessType}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Additional Notes{" "}
                  <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific intersections, neighborhoods, or context that will help us…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 focus:border-[#0066FF] resize-none transition-colors"
                />
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset>
              <legend className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">
                Payment Details
              </legend>

              {/* Security note */}
              <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M6.5 1L2 2.5v4c0 2.8 1.9 5.4 4.5 6 2.6-.6 4.5-3.2 4.5-6v-4L6.5 1z"
                    stroke="#64748b"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                Your payment info is encrypted with 256-bit SSL
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
                {/* Card number */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      className={`w-full px-3.5 py-2.5 pr-20 rounded-xl border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 ${
                        errors.cardNumber
                          ? "border-red-400 focus:ring-red-300"
                          : "border-slate-200 focus:border-[#0066FF]"
                      }`}
                    />
                    {/* Card brand icons placeholder */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-8 h-5 rounded bg-[#1A1F71] opacity-70" />
                      <div className="w-8 h-5 rounded bg-[#EB001B] opacity-50 -ml-3" />
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM / YY"
                      inputMode="numeric"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 ${
                        errors.expiry
                          ? "border-red-400 focus:ring-red-300"
                          : "border-slate-200 focus:border-[#0066FF]"
                      }`}
                    />
                    {errors.expiry && (
                      <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      CVC
                    </label>
                    <input
                      name="cvc"
                      value={form.cvc}
                      onChange={handleChange}
                      placeholder="123"
                      inputMode="numeric"
                      maxLength={4}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 ${
                        errors.cvc
                          ? "border-red-400 focus:ring-red-300"
                          : "border-slate-200 focus:border-[#0066FF]"
                      }`}
                    />
                    {errors.cvc && (
                      <p className="mt-1 text-xs text-red-500">{errors.cvc}</p>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#0066FF] text-white font-bold text-base hover:bg-[#0052CC] active:scale-[0.99] transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 5.5h12M2 5.5A1.5 1.5 0 0 1 3.5 4h9A1.5 1.5 0 0 1 14 5.5M2 5.5v6A1.5 1.5 0 0 0 3.5 13h9A1.5 1.5 0 0 0 14 11.5v-6"
                  stroke="white"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              Complete Purchase — {plan.price}
            </button>

            <p className="text-xs text-center text-slate-400">
              By completing your purchase you agree to our{" "}
              <Link href="/terms" className="underline hover:text-slate-600">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-slate-600">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>

        {/* Right: Order summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-4">
            {/* Plan summary card */}
            <div className="bg-slate-950 rounded-2xl p-6 text-white">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Order Summary
              </p>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{plan.priceNote}</p>
                </div>
                <div className="text-2xl font-black text-[#00D084]">{plan.price}</div>
              </div>
              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.5" fill="#00D084" fillOpacity="0.2" />
                      <path
                        d="M4.5 7l2 2 3-3"
                        stroke="#00D084"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* 14-day guarantee badge */}
            <div className="bg-[#00D084]/10 border border-[#00D084]/30 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00D084]/20 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2L3 5v5c0 4.4 3 8.3 7 9.3C14 18.3 17 14.4 17 10V5l-7-3z"
                    fill="#00D084"
                    fillOpacity="0.3"
                    stroke="#00D084"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10l2 2 4-4"
                    stroke="#00D084"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">14-Day Money-Back Guarantee</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  Not satisfied within 14 days of delivery? Email us for a full refund — no
                  questions asked.
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 1.5L2 4v4c0 3.5 2.5 6.6 6 7.3C11.5 14.6 14 11.5 14 8V4L8 1.5z"
                          stroke="#0066FF"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <path
                          d="M5.5 8l2 2L11 6"
                          stroke="#0066FF"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    label: "256-bit SSL",
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect
                          x="2"
                          y="5"
                          width="12"
                          height="9"
                          rx="1.5"
                          stroke="#0066FF"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M5 5V4a3 3 0 0 1 6 0v1"
                          stroke="#0066FF"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <circle cx="8" cy="9.5" r="1.2" fill="#0066FF" />
                      </svg>
                    ),
                    label: "Secure Checkout",
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#0066FF" strokeWidth="1.2" />
                        <path
                          d="M8 5v3l2 2"
                          stroke="#0066FF"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ),
                    label: "24-Hr Delivery",
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 2l1.6 3.3L13 6l-2.5 2.4.6 3.6L8 10.3 4.9 12l.6-3.6L3 6l3.4-.7L8 2z"
                          stroke="#0066FF"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    ),
                    label: "Trusted Service",
                  },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 bg-blue-50 rounded-xl px-3 py-2.5"
                  >
                    {badge.icon}
                    <span className="text-xs font-semibold text-slate-700">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan switcher */}
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-2">Not the right plan?</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {(Object.keys(PLANS) as PlanKey[]).map((key) => (
                  <Link
                    key={key}
                    href={`/checkout?plan=${key}`}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      key === activePlan
                        ? "bg-[#0066FF] border-[#0066FF] text-white"
                        : "border-slate-200 text-slate-500 hover:border-[#0066FF] hover:text-[#0066FF]"
                    }`}
                  >
                    {PLANS[key].name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable field component
function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/40 ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-slate-200 focus:border-[#0066FF]"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-slate-50 min-h-screen">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="w-8 h-8 border-2 border-[#0066FF] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <CheckoutForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
