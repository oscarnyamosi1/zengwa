'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X, Heart, ChevronDown, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Get Involved',
    href: '#',
    children: [
      { label: 'Donate', href: '/donate' },
      { label: 'Campaigns', href: '/campaigns' },
      { label: 'Child Sponsorship', href: '/child-sponsorship' },
      { label: 'Volunteer', href: '/volunteer' },
    ],
  },
  {
    label: 'Our Work',
    href: '#',
    children: [
      { label: 'Projects', href: '/projects' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
      { label: 'Events', href: '/events' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize dark mode from system preference / localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored === 'dark' || (!stored && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-card/75 backdrop-blur-xl backdrop-saturate-150 border-b border-border shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
            : 'bg-card/60 backdrop-blur-xl backdrop-saturate-150 border-b border-border'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-12">

            {/* ── Left: Logo ─────────────────────────── */}
            <div className="flex items-center gap-4">
              
              <Link href="/" className="flex items-center gap-2 group">
                <AppLogo size={28} />
                <span className="font-semibold text-foreground text-[13px] tracking-[-0.01em] hidden sm:inline">
                  Zengwa
                </span>
              </Link>
            </div>

            {/* ── Center: Desktop Nav ────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks?.map((link) => (
                <div key={link?.label} className="relative group">
                  {link?.children ? (
                    <button
                      className={`flex items-center gap-1 text-[13px] font-medium px-3 py-1.5 rounded-md transition-colors duration-150 ${
                        link?.children?.some(c => c?.href === pathname)
                          ? 'text-primary bg-primary/8'
                          : 'text-foreground/80 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                      }`}
                      onMouseEnter={() => setOpenDropdown(link?.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link?.label}
                      <ChevronDown size={12} className="opacity-50 transition-transform group-hover:rotate-180 duration-150" />
                    </button>
                  ) : (
                    <Link
                      href={link?.href}
                      className={`text-[13px] font-medium px-3 py-1.5 rounded-md transition-colors duration-150 block ${
                        pathname === link?.href
                          ? 'text-primary bg-primary/8'
                          : 'text-foreground/80 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      {link?.label}
                    </Link>
                  )}

                  {link?.children && (
                    <div
                      className={`absolute top-full left-0 mt-1.5 w-52 bg-card/95 backdrop-blur-xl backdrop-saturate-150 border border-border rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-150 ${
                        openDropdown === link?.label
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-1'
                      }`}
                      onMouseEnter={() => setOpenDropdown(link?.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-1.5">
                        {link?.children?.map((child) => (
                          <Link
                            key={child?.href}
                            href={child?.href}
                            className={`block px-3.5 py-1.5 text-[13px] transition-colors duration-150 mx-1 rounded-md ${
                              pathname === child?.href
                                ? 'text-primary bg-primary/8 font-medium'
                                : 'text-foreground/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-foreground'
                            }`}
                          >
                            {child?.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* ── Right: Actions ─────────────────────── */}
            <div className="flex items-center gap-1.5">

              {/* Dark Mode Switch */}
              <button
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className={`relative inline-flex items-center h-[26px] w-[46px] rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  darkMode
                    ? 'bg-primary/90'
                    : 'bg-black/[0.08] dark:bg-white/[0.12]'
                }`}
              >
                <span
                  className={`absolute top-[2px] left-[2px] flex items-center justify-center w-[22px] h-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-200 ease-out ${
                    darkMode ? 'translate-x-[20px]' : 'translate-x-0'
                  }`}
                >
                  {darkMode ? (
                    <Moon size={11} className="text-primary" strokeWidth={2.5} />
                  ) : (
                    <Sun size={11} className="text-[#ff9f0a]" strokeWidth={2.5} />
                  )}
                </span>
              </button>

              <div className="hidden lg:flex items-center gap-2 ml-1">
                <Link
                  href="/login"
                  className="text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors duration-150 px-3 py-1.5 rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                >
                  Sign In
                </Link>
                <Link
                  href="/donate"
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-[7px] rounded-lg text-[13px] font-medium hover:bg-secondary transition-colors duration-150 active:scale-[0.97] shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                >
                  <Heart size={13} />
                  Donate
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-1.5 rounded-md hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors duration-150 ml-1"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? (
                  <X size={18} className="text-foreground" />
                ) : (
                  <Menu size={18} className="text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ────────────────────────── */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-5 pt-1 border-t border-border bg-card/95 backdrop-blur-xl backdrop-saturate-150 flex flex-col gap-0.5">
            {navLinks?.map((link) => (
              <React.Fragment key={link?.label}>
                {link?.children ? (
                  <>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-3 pb-1">
                      {link?.label}
                    </p>
                    {link?.children?.map((child) => (
                      <Link
                        key={child?.href}
                        href={child?.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-3 py-2 rounded-md text-[13px] font-medium text-foreground/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-foreground transition-colors duration-150"
                      >
                        {child?.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={link?.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-3 py-2 rounded-md text-[13px] font-medium text-foreground/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-foreground transition-colors duration-150"
                  >
                    {link?.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center py-2 rounded-lg text-[13px] font-medium text-foreground/80 border border-border hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors duration-150"
              >
                Sign In
              </Link>
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 bg-primary text-primary-foreground py-2 rounded-lg text-[13px] font-medium hover:bg-secondary transition-colors duration-150 active:scale-[0.97]"
              >
                <Heart size={13} />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}