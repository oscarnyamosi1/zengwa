'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Heart,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Megaphone,
  HandHeart,
  Calendar,
  Image,
  FileText,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const navGroups = [
  {
    id: 'group-main',
    label: 'Overview',
    items: [
      { id: 'nav-dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', badge: null },
      { id: 'nav-analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', badge: null },
    ],
  },
  {
    id: 'group-fundraising',
    label: 'Fundraising',
    items: [
      { id: 'nav-donations', label: 'Donations', icon: Heart, href: '/donations', badge: '12' },
      { id: 'nav-campaigns', label: 'Campaigns', icon: Megaphone, href: '/campaigns', badge: null },
      { id: 'nav-sponsorship', label: 'Sponsorship', icon: HandHeart, href: '/sponsorship', badge: '3' },
    ],
  },
  {
    id: 'group-people',
    label: 'People',
    items: [
      { id: 'nav-donors', label: 'Donors', icon: Users, href: '/donors', badge: null },
      { id: 'nav-volunteers', label: 'Volunteers', icon: Users, href: '/volunteers', badge: null },
    ],
  },
  {
    id: 'group-content',
    label: 'Content',
    items: [
      { id: 'nav-blog', label: 'Blog / CMS', icon: BookOpen, href: '/blog', badge: null },
      { id: 'nav-gallery', label: 'Media Gallery', icon: Image, href: '/gallery', badge: null },
      { id: 'nav-events', label: 'Events', icon: Calendar, href: '/events', badge: null },
      { id: 'nav-prayers', label: 'Prayer Wall', icon: PrayingHandsIcon, href: '/prayer-wall', badge: '7' },
    ],
  },
  {
    id: 'group-reports',
    label: 'Reports',
    items: [
      { id: 'nav-reports', label: 'Financial Reports', icon: FileText, href: '/financial-reports', badge: null },
      { id: 'nav-settings', label: 'Settings', icon: Settings, href: '/settings', badge: null },
    ],
  },
];

// PrayingHands fallback
function PrayingHandsIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2L9 7l-4 1 3 3-1 4 4-2 4 2-1-4 3-3-4-1z"/>
    </svg>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          flex flex-col bg-card border-r border-border shadow-card transition-all duration-300 ease-in-out shrink-0
          ${collapsed ? 'w-16' : 'w-60'}
          hidden lg:flex
        `}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-border h-16 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2.5">
              <AppLogo size={30} />
              <div>
                <div className="font-extrabold text-sm text-primary leading-none">ZengwaConnect</div>
                <div className="text-xs text-muted-foreground">Ministry Platform</div>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link href="/">
              <AppLogo size={30} />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-6 h-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors shrink-0"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          {navGroups.map((group) => (
            <div key={group.id} className="mb-4">
              {!collapsed && (
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-4 mb-1.5">
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href && item.id === 'nav-dashboard';
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-150 group relative
                      ${isActive ? 'sidebar-active' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={18} className={isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} />
                    {!collapsed && (
                      <span className="text-sm font-medium flex-1 leading-none">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center leading-none">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className={`border-t border-border p-4 ${collapsed ? 'flex justify-center' : ''}`}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-sm font-bold">PA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Pastor Amani</p>
                <p className="text-xs text-muted-foreground truncate">Super Admin</p>
              </div>
              <button
                aria-label="Sign out"
                className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
              >
                <LogOut size={14} className="text-muted-foreground" />
              </button>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">PA</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Open mobile menu"
            >
              <LayoutDashboard size={18} className="text-foreground" />
            </button>
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search donors, campaigns..."
                className="pl-9 pr-4 py-2 rounded-xl border border-border bg-input text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button
              aria-label="View notifications"
              className="relative w-9 h-9 rounded-xl border border-border hover:bg-muted flex items-center justify-center transition-colors"
            >
              <Bell size={17} className="text-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-card" />
            </button>

            {/* Home link */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary border border-border px-3 py-2 rounded-xl hover:bg-muted transition-colors"
            >
              ← Back to Site
            </Link>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">PA</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
