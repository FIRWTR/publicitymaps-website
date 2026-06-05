import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 2C5.686 2 3 4.686 3 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6z"
                    fill="white"
                  />
                  <circle cx="9" cy="8" r="2.5" fill="#0066FF" />
                </svg>
              </div>
              <span className="font-bold text-white text-[15px]">PublicityMaps</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs mb-5">
              We help local businesses find the best spots to put their signs — backed by real traffic data and neighborhood research.
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 2c0 5 2.5 7.5 7.5 7.5l.5-1.5-1.5-.5-.5 1C7 8 5 6 4.5 4.5l1-.5L5 2.5 2 2z" stroke="#64748B" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <a href="tel:+15125550194" className="hover:text-white transition-colors">(512) 555-0194</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1" y="3" width="11" height="7" rx="1.5" stroke="#64748B" strokeWidth="1.1" />
                  <path d="M1 4.5l5.5 3.5 5.5-3.5" stroke="#64748B" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                <a href="mailto:support@publicitymaps.com" className="hover:text-white transition-colors">support@publicitymaps.com</a>
              </li>
              <li className="flex items-start gap-2">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mt-0.5 shrink-0">
                  <path d="M6.5 1C4.015 1 2 3.015 2 5.5c0 3.5 4.5 7 4.5 7s4.5-3.5 4.5-7C11 3.015 8.985 1 6.5 1z" stroke="#64748B" strokeWidth="1.1" fill="none" />
                  <circle cx="6.5" cy="5.5" r="1.5" stroke="#64748B" strokeWidth="1.1" fill="none" />
                </svg>
                <span>1204 San Antonio St, Suite 3<br />Austin, TX 78701</span>
              </li>
              <li className="text-xs text-slate-500 pt-1">Mon–Fri &nbsp;9am – 6pm CT</li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Visibility Score™", href: "/#visibility-score" },
                { label: "Sample Map", href: "/#sample-map" },
                { label: "Pricing", href: "/pricing" },
                { label: "Example Report", href: "/example-report" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Industries</h4>
            <ul className="space-y-2.5">
              {[
                "Restoration",
                "Landscaping",
                "Roofing",
                "Real Estate",
                "Political Campaigns",
                "Events & Food Trucks",
              ].map((ind) => (
                <li key={ind}>
                  <span className="text-sm text-slate-400 hover:text-white cursor-pointer transition-colors">
                    {ind}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2026 PublicityMaps. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Visibility Score™ is a trademark of PublicityMaps
          </p>
        </div>
      </div>
    </footer>
  );
}
