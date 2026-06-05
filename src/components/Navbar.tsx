"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center shadow-sm group-hover:shadow-blue-500/30 transition-shadow">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 2C5.686 2 3 4.686 3 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6z"
                  fill="white"
                />
                <circle cx="9" cy="8" r="2.5" fill="#0066FF" />
              </svg>
            </div>
            <span className="font-bold text-[15px] tracking-tight text-slate-900">
              PublicityMaps
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Product", href: "/#how-it-works" },
              { label: "Pricing", href: "/pricing" },
              { label: "Example Report", href: "/example-report" },
              { label: "About", href: "/about" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15125550194"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 2.5c0 5.5 3.5 9 9 9l1-2-2.5-1-1 1.5C7.5 9 5 6.5 4.5 5l1.5-1L5 1.5 2.5 2.5z" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              (512) 555-0194
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0066FF] text-white text-sm font-semibold hover:bg-[#0052CC] transition-all duration-200 shadow-sm hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              Order a Report
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white py-4 space-y-1">
            {[
              { label: "Product", href: "/#how-it-works" },
              { label: "Pricing", href: "/pricing" },
              { label: "Example Report", href: "/example-report" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 px-4 space-y-2">
              <a
                href="tel:+15125550194"
                className="block w-full text-center px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium"
              >
                Call (512) 555-0194
              </a>
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl bg-[#0066FF] text-white text-sm font-semibold"
              >
                Order a Report
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
