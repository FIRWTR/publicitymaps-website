"use client";

import { useState } from "react";

const BUSINESS_TYPES = [
  "Restoration",
  "Landscaping",
  "Roofing",
  "Real Estate",
  "Political Campaign",
  "Coffee Shop / Restaurant",
  "Events / Entertainment",
  "Food Truck",
  "Church / Nonprofit",
  "Sign Company",
  "Other Local Business",
];

const REPORT_TYPES = [
  { value: "starter", label: "Starter Report — $99" },
  { value: "professional", label: "Professional Report — $299" },
  { value: "growth", label: "Business Growth Plan — $999/yr" },
  { value: "enterprise", label: "Enterprise — Custom" },
  { value: "question", label: "Just have a question" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    businessType: "",
    reportType: "",
    city: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 mb-6">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l7 7 13-13" stroke="#00D084" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-3">
          We got your request!
        </h2>
        <p className="text-slate-500 max-w-sm mx-auto">
          Our team will review your details and be in touch within 2 business hours to confirm your order and get started on your report.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3 text-sm text-[#0066FF] font-medium">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="#0066FF" strokeWidth="1.5" />
            <path d="M7 4.5v3l1.5 1.5" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Expected delivery: within 24 hours
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
            placeholder="jane@yourbusiness.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            Business Name
          </label>
          <input
            type="text"
            value={form.business}
            onChange={(e) => setForm({ ...form, business: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
            placeholder="Smith Restoration"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
            City / Market *
          </label>
          <input
            type="text"
            required
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all"
            placeholder="Austin, TX"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
          Business Type *
        </label>
        <select
          required
          value={form.businessType}
          onChange={(e) => setForm({ ...form, businessType: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all appearance-none bg-white"
        >
          <option value="">Select your business type</option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
          Report Type *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {REPORT_TYPES.map((type) => (
            <label
              key={type.value}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                form.reportType === type.value
                  ? "border-[#0066FF] bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="reportType"
                value={type.value}
                checked={form.reportType === type.value}
                onChange={(e) => setForm({ ...form, reportType: e.target.value })}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  form.reportType === type.value
                    ? "border-[#0066FF] bg-[#0066FF]"
                    : "border-slate-300"
                }`}
              >
                {form.reportType === type.value && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className={`text-sm font-medium ${form.reportType === type.value ? "text-[#0066FF]" : "text-slate-600"}`}>
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
          Additional Notes
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all resize-none"
          placeholder="Tell us about your target area, specific intersections you want analyzed, or any questions..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl bg-[#0066FF] text-white font-bold text-[15px] hover:bg-[#0052CC] transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
      >
        Submit My Request
      </button>

      <p className="text-center text-xs text-slate-400">
        We&apos;ll review your details and send a confirmation with payment link within 2 hours.
      </p>
    </form>
  );
}
