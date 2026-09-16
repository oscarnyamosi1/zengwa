'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium tracking-wide">
        Join thousands of donors transforming lives in Africa —&nbsp;
        <Link href="/donate" className="underline underline-offset-2 hover:text-accent transition-colors">
          Give Today
        </Link>
      </div> */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-card/95 backdrop-blur-md shadow-card border-b border-border'
            : 'bg-card border-b border-border'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <AppLogo size={45} />
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-primary text-base tracking-tight">Zengwa</span>
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Connect</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks?.map((link) => (
                // <div key={link?.href} className="relative group">
                <div key={link?.label} className="relative group">
                  {link?.children ? (
                    <button
                      className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                        link?.children?.some(c => c?.href === pathname) ? 'text-primary' : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                      onMouseEnter={() => setOpenDropdown(link?.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link?.label}
                      <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={link?.href}
                      className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors block ${
                        pathname === link?.href ? 'text-primary bg-primary/5' : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      {link?.label}
                    </Link>
                  )}
                  {link?.children && (
                    <div
                      className={`absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-sm shadow-card-lg overflow-hidden transition-all duration-150 ${
                        openDropdown === link?.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                      onMouseEnter={() => setOpenDropdown(link?.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link?.children?.map((child) => (
                        <Link
                          key={child?.href}
                          href={child?.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            pathname === child?.href ? 'text-primary bg-primary/5 font-semibold' : 'text-foreground hover:bg-muted hover:text-primary'
                          }`}
                        >
                          {child?.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-muted"
              >
                Sign In
              </Link>
              <Link
                href="/donate"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-all duration-150 active:scale-95 shadow-card"
              >
                <Heart size={15} />
                Donate Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} className="text-foreground" /> : <Menu size={22} className="text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pb-6 pt-2 border-t border-border bg-card flex flex-col gap-1">
            {navLinks?.map((link) => (
              <React.Fragment key={link?.label}>
                {link?.children ? (
                  <>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-3 pb-1">{link?.label}</p>
                    {link?.children?.map((child) => (
                      <Link
                        key={child?.href}
                        href={child?.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {child?.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={link?.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
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
                className="text-center py-2.5 rounded-xl text-sm font-medium text-primary border border-primary hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors"
              >
                <Heart size={15} />
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}