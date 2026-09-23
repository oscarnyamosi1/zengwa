import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { MapPin, Phone, Mail } from 'lucide-react';
import { companyCommunicationChannel } from '@/data/dummyData';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Donate', href: '/donate' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const ministryLinks = [
  { label: 'Child Sponsorship', href: '/sponsorship' },
  { label: 'School Construction', href: '/coming-soon' },
  { label: 'Clean Water Projects', href: '/coming-soon' },
  { label: 'Church Planting', href: '/coming-soon' },
  { label: 'Community Health', href: '/coming-soon' },
  { label: 'Volunteer Program', href: '/volunteer-program' },
];

const socialLinks = [
  // { icon: FaFacebook, label: 'Facebook' ,link:'' },
  { icon: FaInstagram, label: 'Instagram' ,link:`${companyCommunicationChannel?.instagram}` },
  // { icon: FaTwitter, label: 'Twitter' ,link:'' },
  // { icon: FaYoutube, label: 'YouTube' ,link:'' },
];

export default function PublicFooter() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="xl:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <AppLogo size={36} />
              <div className="flex flex-col leading-none">
                <span className="font-semibold text-[15px] tracking-[-0.01em] text-foreground">
                  ZengwaConnect
                </span>
                <span className="text-muted-foreground text-[11px] font-medium tracking-wider uppercase mt-0.5">
                  Ministry Platform
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-[13px] leading-relaxed mb-5 max-w-xs">
              Transforming lives through Christian education, community development,
              and the power of the Gospel in the heart of Africa. Every gift makes
              an eternal difference.
            </p>

            <p className="text-primary text-[13px] font-medium italic mb-6 max-w-xs leading-relaxed">
              &ldquo;Train up a child in the way he should go; even when he is old
              he will not depart from it.&rdquo;
              <span className="not-italic text-muted-foreground font-normal ml-1">
                — Proverbs 22:6
              </span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks?.map(({ icon: IconComponent, label,link }) => (
                <button
                  key={`social-${label}`}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-secondary border border-border hover:bg-primary/8 hover:border-primary/20 flex items-center justify-center transition-colors duration-150 active:scale-95"
                >
                  <a href={link}>
                    <IconComponent size={14} className="text-muted-foreground" />
                  </a>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[11px] tracking-wider uppercase text-muted-foreground mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks?.map((link) => (
                <li key={`footer-quick-${link?.label}`}>
                  <Link
                    href={link?.href}
                    className="text-foreground/75 text-[13px] hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministry */}
          <div>
            <h4 className="font-semibold text-[11px] tracking-wider uppercase text-muted-foreground mb-4">
              Our Ministry
            </h4>
            <ul className="flex flex-col gap-2.5">
              {ministryLinks?.map((link) => (
                <li key={`footer-ministry-${link?.label}`}>
                  <Link
                    href={link?.href}
                    className="text-foreground/75 text-[13px] hover:text-primary transition-colors duration-150"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[11px] tracking-wider uppercase text-muted-foreground mb-4">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground/75 text-[13px] leading-relaxed">
                  Zengwa Village, Kwale County,
                  <br />
                  Coast region of Kenya
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-muted-foreground shrink-0" />
                <span className="text-foreground/75 text-[13px]">
                  {companyCommunicationChannel.phone}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-muted-foreground shrink-0" />
                <span className="text-foreground/75 text-[13px]">
                  {companyCommunicationChannel.email}
                </span>
              </li>
            </ul>

                     </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-[11px]">
            &copy; {new Date().getFullYear()} ZengwaConnect. All rights reserved.
            Built with Love for God&apos;s glory.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-muted-foreground text-[11px] hover:text-primary transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-muted-foreground text-[11px] hover:text-primary transition-colors duration-150"
            >
              Terms of Service
            </Link>
            <Link
              href="/donation-policy"
              className="text-muted-foreground text-[11px] hover:text-primary transition-colors duration-150"
            >
              Donation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}