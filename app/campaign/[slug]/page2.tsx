import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Heart,
  Star,
  Clock,
  Users,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  FileText,
  Share2,
  Facebook,
  Twitter,
  Link2,
  CheckCircle2,
  Calendar,
  Target,
  ArrowLeft,
  Quote,
  BookOpen,
} from 'lucide-react';

import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { campaigns, impactStats } from '@/data/dummyData';

/* ─────────────────────────────────────────────────────────────
   Campaign type
   ───────────────────────────────────────────────────────────── */
export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  image: string[];
  alt: string;
  raised: number;
  donors: number;
  goal: number;
  daysLeft: number;
  badge: string;
  badgeColor: string;
  currency: string;
  description: string;
  updates: number;
  rating: number;
  reviews: string[];
}

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */
function formatKES(amount: number): string {
  if (amount >= 1_000_000) return `KES ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `KES ${(amount / 1_000).toFixed(0)}K`;
  return `KES ${amount.toLocaleString()}`;
}

/* ─────────────────────────────────────────────────────────────
   Static params — pre-render every campaign at build time
   ───────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return campaigns.map((c: Campaign) => ({ slug: c.slug }));
}

/* ─────────────────────────────────────────────────────────────
   SEO Metadata
   ───────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const campaign = campaigns.find((c: Campaign) => c.slug === params.slug);
  if (!campaign) return { title: 'Campaign Not Found' };

  return {
    title: `${campaign.title} | Active Campaigns`,
    description: campaign.description,
    openGraph: {
      title: campaign.title,
      description: campaign.description,
      images: campaign.image[0] ? [{ url: campaign.image[0] }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: campaign.title,
      description: campaign.description,
      images: campaign.image[0] ? [campaign.image[0]] : [],
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   Page
   ───────────────────────────────────────────────────────────── */
export default function CampaignDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const campaign = campaigns.find(
    (c: Campaign) => c.slug === params.slug
  ) as Campaign | undefined;

  if (!campaign) notFound();

  const pct = Math.round((campaign.raised / campaign.goal) * 100);
  const remaining = Math.max(campaign.goal - campaign.raised, 0);
  const totalDonors = impactStats.donorsCount;

  const related = campaigns
    .filter(
      (c: Campaign) =>
        c.slug !== campaign.slug && c.category === campaign.category
    )
    .slice(0, 3);

  const sampleUpdates = [
    {
      date: '2 days ago',
      title: 'Progress Update: 75% Funded!',
      body: 'Thanks to your generosity, we have reached 75% of our goal. Construction is underway and the first phase is nearly complete.',
    },
    {
      date: '2 weeks ago',
      title: 'Groundbreaking Ceremony Held',
      body: 'We officially broke ground last week. Community members, local leaders, and our team gathered to mark the occasion.',
    },
    {
      date: '1 month ago',
      title: 'Campaign Launched',
      body: 'We are excited to launch this campaign. Your support will directly impact hundreds of lives in the community.',
    },
  ];

  const sampleDonors = [
    { name: 'Anonymous', amount: 50000, time: '2 hours ago' },
    { name: 'Grace W.', amount: 25000, time: '5 hours ago' },
    { name: 'David K.', amount: 10000, time: '1 day ago' },
    { name: 'Anonymous', amount: 5000, time: '2 days ago' },
    { name: 'Mercy A.', amount: 2000, time: '3 days ago' },
    { name: 'Peter N.', amount: 1000, time: '4 days ago' },
  ];

  const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <main>
        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 pt-6">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            Back to all campaigns
          </Link>
        </div>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative bg-primary overflow-hidden py-12 lg:py-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent blur-2xl" />
          </div>

          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${campaign.badgeColor}`}
              >
                {campaign.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-xs font-semibold text-primary-foreground">
                {campaign.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-xs font-semibold text-primary-foreground">
                <Star size={11} className="fill-gold text-gold" />
                {campaign.rating.toFixed(1)} rating
              </span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight max-w-4xl">
              {campaign.title}
            </h1>

            <p className="text-white/75 text-base lg:text-lg leading-relaxed max-w-2xl mb-6">
              {campaign.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/donate?campaign=${campaign.slug}`}
                className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2"
              >
                <Heart size={16} /> Donate Now
              </Link>
              <button className="border border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary-foreground/10 transition-colors flex items-center gap-2">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </section>

        {/* ── Main Grid ──────────────────────────────────────── */}
        <section className="py-10 lg:py-14">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ══ LEFT COLUMN ═════════════════════════════════ */}
              <div className="lg:col-span-2 space-y-8">
                {/* ── Image Gallery (all images) ──────────────── */}
                <div className="rounded-2xl overflow-hidden border border-border shadow-card bg-card">
                  <div className="relative">
                    <AppImage
                      src={campaign.image[0] || null}
                      alt={campaign.alt}
                      width={1200}
                      height={640}
                      className="w-full h-72 lg:h-[420px] object-cover"
                    />
                    <div
                      className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold ${campaign.badgeColor}`}
                    >
                      {campaign.badge}
                    </div>
                    {campaign.daysLeft <= 30 && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-danger/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                        <Clock size={12} />
                        {campaign.daysLeft} days left
                      </div>
                    )}
                  </div>

                  {/* All images grid */}
                  {campaign.image.length > 1 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 p-3 bg-muted/30">
                      {campaign.image.map((img, i) => (
                        <div key={i} className="relative overflow-hidden rounded-lg">
                          <AppImage
                            src={img}
                            alt={`${campaign.alt} — image ${i + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-20 lg:h-24 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Stats Bar ───────────────────────────────── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Raised', value: formatKES(campaign.raised) },
                    { label: 'Goal', value: formatKES(campaign.goal) },
                    {
                      label: 'Donors',
                      value: campaign.donors.toLocaleString(),
                    },
                    { label: 'Days Left', value: campaign.daysLeft.toString() },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-card border border-border rounded-xl p-4 text-center"
                    >
                      <p className="text-2xl font-black text-primary mb-1">
                        {s.value}
                      </p>
                      <p className="text-muted-foreground text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* ── Progress Bar ────────────────────────────── */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                      <Target size={16} className="text-primary" />
                      Funding Progress
                    </h3>
                    <span className="text-xs font-bold text-primary">
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 mb-3 overflow-hidden">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      <span className="font-bold text-primary">
                        {campaign.currency} {campaign.raised.toLocaleString()}
                      </span>{' '}
                      raised
                    </span>
                    <span>
                      Goal: {campaign.currency}{' '}
                      {campaign.goal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* ── Story ───────────────────────────────────── */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-primary" />
                    About This Campaign
                  </h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
                    <p>{campaign.description}</p>
                    <p>
                      This campaign is part of our broader mission to bring hope
                      and practical support to communities across Kenya. Every
                      contribution, no matter the size, directly impacts lives
                      and moves us closer to our goal.
                    </p>
                    <p>
                      We work closely with local partners and community leaders
                      to ensure funds are used efficiently and transparently.
                      Regular updates and financial reports are published so you
                      can see exactly how your generosity is making a
                      difference.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
                    {[
                      { label: 'Category', value: campaign.category },
                      {
                        label: 'Days Left',
                        value: `${campaign.daysLeft} days`,
                      },
                      {
                        label: 'Updates',
                        value: `${campaign.updates} posted`,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-muted/40 rounded-xl p-4"
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className="font-bold text-foreground text-sm">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Updates ─────────────────────────────────── */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <Megaphone size={18} className="text-primary" />
                    Campaign Updates
                    {campaign.updates > 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                        {campaign.updates}
                      </span>
                    )}
                  </h2>

                  <div className="space-y-5">
                    {sampleUpdates
                      .slice(0, Math.max(campaign.updates, 1))
                      .map((update, i) => (
                        <div
                          key={i}
                          className="relative pl-6 pb-5 border-l-2 border-border last:pb-0 last:border-l-transparent"
                        >
                          <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar
                              size={13}
                              className="text-muted-foreground"
                            />
                            <span className="text-xs text-muted-foreground">
                              {update.date}
                            </span>
                          </div>
                          <h3 className="font-bold text-foreground text-sm mb-1">
                            {update.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {update.body}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* ── Donors ──────────────────────────────────── */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Users size={18} className="text-primary" />
                      Recent Donors
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      {campaign.donors.toLocaleString()} total donors
                    </span>
                  </div>

                  <div className="divide-y divide-border">
                    {sampleDonors.map((donor, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {donor.name === 'Anonymous'
                              ? '?'
                              : donor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">
                              {donor.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {donor.time}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-primary text-sm">
                          {campaign.currency} {donor.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Reviews ─────────────────────────────────── */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Star size={18} className="text-primary" />
                      Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.round(campaign.rating)
                                ? 'fill-gold text-gold'
                                : 'text-muted-foreground/30'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {campaign.rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({campaign.reviews.length} reviews)
                      </span>
                    </div>
                  </div>

                  {campaign.reviews.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-6 text-center">
                      No reviews yet. Be the first to share your experience.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {campaign.reviews.map((review, i) => (
                        <div
                          key={i}
                          className="bg-muted/40 rounded-xl p-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Quote size={14} className="text-primary" />
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <Star
                                  key={s}
                                  size={11}
                                  className="fill-gold text-gold"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {review}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ══ RIGHT COLUMN — Sticky Sidebar ═══════════════ */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Donation Card */}
                  <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                    <div className="mb-5">
                      <p className="text-3xl font-black text-primary mb-1">
                        {formatKES(campaign.raised)}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        raised of {formatKES(campaign.goal)} goal
                      </p>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-5">
                      <span className="font-bold text-primary">
                        {pct}% funded
                      </span>
                      <span>{formatKES(remaining)} to go</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="text-center bg-muted/40 rounded-xl p-3">
                        <Users
                          size={16}
                          className="text-primary mx-auto mb-1"
                        />
                        <p className="text-sm font-bold text-foreground">
                          {campaign.donors.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Donors
                        </p>
                      </div>
                      <div className="text-center bg-muted/40 rounded-xl p-3">
                        <Clock
                          size={16}
                          className="text-primary mx-auto mb-1"
                        />
                        <p className="text-sm font-bold text-foreground">
                          {campaign.daysLeft}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Days Left
                        </p>
                      </div>
                      <div className="text-center bg-muted/40 rounded-xl p-3">
                        <TrendingUp
                          size={16}
                          className="text-primary mx-auto mb-1"
                        />
                        <p className="text-sm font-bold text-foreground">
                          {campaign.updates}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Updates
                        </p>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      Choose an amount
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {presetAmounts.map((amount) => (
                        <Link
                          key={amount}
                          href={`/donate?campaign=${campaign.slug}&amount=${amount}`}
                          className="py-2.5 rounded-xl border border-border text-center text-xs font-bold text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {formatKES(amount)}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/donate?campaign=${campaign.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-bold hover:bg-secondary transition-colors active:scale-[0.98] mb-3"
                    >
                      <Heart size={16} />
                      Donate Now
                    </Link>

                    <Link
                      href="/child-sponsorship"
                      className="w-full flex items-center justify-center gap-2 border border-border text-foreground py-3 rounded-xl text-sm font-semibold hover:border-primary/30 hover:text-primary transition-colors"
                    >
                      Sponsor a Child Instead
                    </Link>

                    {pct >= 100 && (
                      <div className="mt-4 flex items-center gap-2 bg-success/10 border border-success/30 text-success px-4 py-3 rounded-xl text-xs font-semibold">
                        <Target size={14} />
                        Goal reached! Thank you to all our donors.
                      </div>
                    )}
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                    <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                      <ShieldCheck size={16} className="text-primary" />
                      Why Give With Confidence
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {[
                        'Secure M-Pesa, Stripe & PayPal payments',
                        'Tax-deductible receipt sent instantly',
                        'Monthly financial reports published',
                        '100% of your gift goes to the field',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <CheckCircle2
                            size={15}
                            className="text-primary shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Share Card */}
                  <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                    <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                      <Share2 size={16} className="text-primary" />
                      Share This Campaign
                    </h3>
                    <div className="flex gap-3">
                      {[
                        { icon: Facebook, label: 'Facebook' },
                        { icon: Twitter, label: 'Twitter' },
                        { icon: Link2, label: 'Copy Link' },
                      ].map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          aria-label={label}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors text-xs font-semibold"
                        >
                          <Icon size={14} />
                          <span className="hidden sm:inline">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Campaign Meta */}
                  <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
                    <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                      <FileText size={16} className="text-primary" />
                      Campaign Details
                    </h3>
                    <dl className="space-y-2.5 text-xs">
                      {[
                        { label: 'Campaign ID', value: campaign.id },
                        { label: 'Slug', value: campaign.slug },
                        { label: 'Currency', value: campaign.currency },
                        {
                          label: 'Total Donors (All)',
                          value: totalDonors.toLocaleString(),
                        },
                        { label: 'Rating', value: campaign.rating.toFixed(1) },
                        {
                          label: 'Reviews',
                          value: campaign.reviews.length.toString(),
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex justify-between gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0"
                        >
                          <dt className="text-muted-foreground">
                            {row.label}
                          </dt>
                          <dd className="font-semibold text-foreground text-right break-all">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Campaigns ───────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-12 lg:py-16 border-t border-border">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  Related Campaigns
                </h2>
                <Link
                  href="/campaigns"
                  className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((c) => {
                  const rPct = Math.round((c.raised / c.goal) * 100);
                  return (
                    <Link
                      key={c.id}
                      href={`/campaigns/${c.slug}`}
                      className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                    >
                      <div className="relative overflow-hidden">
                        <AppImage
                          src={c.image[0] || null}
                          alt={c.alt}
                          width={500}
                          height={280}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${c.badgeColor}`}
                        >
                          {c.badge}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-foreground text-sm mb-2 leading-snug line-clamp-2">
                          {c.title}
                        </h3>

                        <div className="mb-3">
                          <div className="w-full bg-muted rounded-full h-2 mb-1.5">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${Math.min(rPct, 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-primary">
                              {formatKES(c.raised)}
                            </span>
                            <span className="text-muted-foreground">
                              {rPct}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Users size={12} className="text-primary" />
                            <span>{c.donors} donors</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            <span>{c.daysLeft} days left</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Trust Section ───────────────────────────────────── */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: '🔒',
                  title: 'Secure Donation Channel',
                  desc: 'M-Pesa, Stripe & PayPal. All transactions encrypted and secure.',
                },
                {
                  icon: '📊',
                  title: 'Full Transparency',
                  desc: 'Monthly financial reports published. Every shilling accounted for.',
                },
                {
                  icon: '🧾',
                  title: 'Instant Receipts',
                  desc: 'Tax-deductible receipts sent immediately to your email.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-card border border-border rounded-sm shadow-card"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}