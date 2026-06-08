"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On homepage before scroll: dark/transparent. Otherwise: white glass.
  const dark = isHome && !scrolled;

  return (
    <header
      style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, transition:"all 0.3s ease" }}
      className={dark
        ? "bg-transparent"
        : "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#0066FF] flex items-center justify-center shadow-sm">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5C5.686 1.5 3 4.186 3 7.5c0 4.5 6 9 6 9s6-4.5 6-9c0-3.314-2.686-6-6-6z" fill="white" />
                <circle cx="9" cy="7.5" r="2.2" fill="#0066FF" />
              </svg>
            </div>
            <span className={`font-bold text-[15px] tracking-tight transition-colors ${dark ? "text-white" : "text-slate-900"}`}>
              Publicity<span className="text-[#0066FF]">Maps</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {[
              { label: "How It Works", href: "/#how-it-works" },
              { label: "Analyze",      href: "/analyze"        },
              { label: "Pricing",      href: "/pricing"        },
              { label: "Example",      href: "/example-report" },
              { label: "About",        href: "/about"          },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  dark
                    ? "text-white/75 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+15125550194"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 2c0 5 2.5 7.5 7.5 7.5l.5-1.5-1.5-.5-.5 1C7 8 5 6 4.5 4.5l1-.5L5 2.5 2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              (512) 555-0194
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #ff4400, #ff7700)",
                boxShadow: "0 4px 16px rgba(255,100,0,0.35)",
              }}
            >
              Order a Report
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5h8M6.5 2.5l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              dark ? "text-white/80 hover:bg-white/10" : "text-slate-600 hover:bg-slate-100"
            }`}
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md py-3 space-y-0.5">
            {[
              { label: "How It Works",   href: "/#how-it-works" },
              { label: "Analyze",        href: "/analyze"        },
              { label: "Pricing",        href: "/pricing"        },
              { label: "Example Report", href: "/example-report" },
              { label: "About",          href: "/about"          },
              { label: "Contact",        href: "/contact"        },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 px-4 pb-1 space-y-2">
              <a href="tel:+15125550194" className="block text-center px-4 py-2.5 rounded-xl border border-white/15 text-white/60 text-sm font-medium">
                (512) 555-0194
              </a>
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-xl text-white text-sm font-bold"
                style={{ background:"linear-gradient(135deg,#ff4400,#ff7700)" }}
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
