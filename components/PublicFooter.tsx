import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { MapPin, Phone, Mail } from 'lucide-react';
// import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
// import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/' },
  { label: 'Donate', href: '/donate' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Blog', href: '/' },
  { label: 'Contact', href: '/' },
];

const ministryLinks = [
  { label: 'Child Sponsorship', href: '/donate' },
  { label: 'School Construction', href: '/' },
  { label: 'Clean Water Projects', href: '/' },
  { label: 'Church Planting', href: '/' },
  { label: 'Community Health', href: '/' },
  { label: 'Volunteer Program', href: '/' },
];

const socialLinks = [
  { icon: FaFacebook, label: 'Facebook' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaTwitter, label: 'Twitter' },
  { icon: FaYoutube, label: 'YouTube' },
];

export default function PublicFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="xl:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AppLogo size={40} />
              <div>
                <div className="font-extrabold text-xl tracking-tight text-primary-foreground">ZengwaConnect</div>
                <div className="text-accent text-xs font-medium tracking-widest uppercase">Ministry Platform</div>
              </div>
            </div>
            <p className="text-primary-foreground/75 text-sm leading-relaxed mb-5 max-w-xs">
              Transforming lives through Christian education, community development, and the power of the Gospel in the heart of Africa. Every gift makes an eternal difference.
            </p>
            <p className="text-accent text-sm font-medium italic mb-5">
              &ldquo;Train up a child in the way he should go; even when he is old he will not depart from it.&rdquo; — Proverbs 22:6
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map(({ icon: IconComponent, label }) => (
                <button
                  key={`social-${label}`}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-colors"
                >
                  <IconComponent size={16} className="text-primary-foreground/80" />
                  {/* social icon plavece holder */}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-accent mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks?.map((link) => (
                <li key={`footer-quick-${link?.label}`}>
                  <Link href={link?.href} className="text-primary-foreground/70 text-sm hover:text-accent transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-accent mb-4">Our Ministry</h4>
            <ul className="flex flex-col gap-2.5">
              {ministryLinks?.map((link) => (
                <li key={`footer-ministry-${link?.label}`}>
                  <Link href={link?.href} className="text-primary-foreground/70 text-sm hover:text-accent transition-colors">
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-accent mb-4">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  Zengwa Village, Marsabit County,<br />Northern Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <span className="text-primary-foreground/70 text-sm">+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <span className="text-primary-foreground/70 text-sm">info@zengwaconnect.org</span>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
              <p className="text-xs text-primary-foreground/60 font-medium uppercase tracking-wider mb-1">Registered Charity</p>
              <p className="text-xs text-primary-foreground/80">Kenya NGO Registration No. 0042/2019</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/50 text-xs">
            &copy; 2026 ZengwaConnect. All rights reserved. Built with ❤️ for God&apos;s glory.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-primary-foreground/50 text-xs hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-primary-foreground/50 text-xs hover:text-accent transition-colors">Terms of Service</Link>
            <Link href="/" className="text-primary-foreground/50 text-xs hover:text-accent transition-colors">Donation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
