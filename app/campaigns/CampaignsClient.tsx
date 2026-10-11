
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import {
  Heart,
  Star,
  Clock,
  Users,
  TrendingUp,
} from 'lucide-react';
import { formatKES } from '@/data/format';
import type { Campaign } from '@/data/types/campaign';

const categories = [
  'All',
  'Education',
  'Water & Health',
  'Sponsorship',
  'Health',
  'Church',
  'Infrastructure',
];

const sortOptions = [
  'Most Funded',
  'Newest',
  'Ending Soon',
  'Most Donors',
] as const;

type SortOption = (typeof sortOptions)[number];

type CampaignWithDate = Campaign & {
  created_at?: string;
  createdAt?: string;
  date?: string;
};

type Props = {
  campaigns?: Campaign[];
};

export default function CampaignsClient({
  campaigns = [],
}: Props) {
  const safeCampaigns = Array.isArray(campaigns)
    ? campaigns
    : [];

  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('Most Funded');

  const filtered = useMemo(() => {
    const result = safeCampaigns.filter(
      (campaign) =>
        activeCategory === 'All' ||
        campaign.category === activeCategory
    );

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'Most Funded': {
          const aProgress =
            a.goal > 0 ? a.raised / a.goal : 0;
          const bProgress =
            b.goal > 0 ? b.raised / b.goal : 0;

          return bProgress - aProgress;
        }

        case 'Most Donors':
          return b.donors - a.donors;

        case 'Ending Soon':
          return a.daysLeft - b.daysLeft;

        case 'Newest': {
          const campaignA = a as CampaignWithDate;
          const campaignB = b as CampaignWithDate;

          const dateA = new Date(
            campaignA.created_at ??
              campaignA.createdAt ??
              campaignA.date ??
              0
          ).getTime();

          const dateB = new Date(
            campaignB.created_at ??
              campaignB.createdAt ??
              campaignB.date ??
              0
          ).getTime();

          return dateB - dateA;
        }

        default:
          return 0;
      }
    });
}, [safeCampaigns, activeCategory, sortBy]);

  return (
    <>
      {/* Filters */}
      <section className="sticky top-16 z-30 border-b border-border bg-card/95 py-5 backdrop-blur-xl">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* Campaign grid */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-16">
          <p className="mb-6 text-sm text-muted-foreground" aria-live="polite">
            {filtered.length}{' '}
            {filtered.length === 1 ? 'campaign' : 'campaigns'} found
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <Heart
                size={32}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                No campaigns found
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                There are no campaigns in this category yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSortBy('Most Funded');
                }}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                View all campaigns
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((campaign) => {
                const goal = Number(campaign.goal) || 0;
                const raised = Number(campaign.raised) || 0;
                const donors = Number(campaign.donors) || 0;
                const daysLeft = Number(campaign.daysLeft) || 0;

                const percentage =
                  goal > 0
                    ? Math.round((raised / goal) * 100)
                    : 0;

                const progress = Math.min(
                  Math.max(percentage, 0),
                  100
                );

                const image = campaign.image?.[0];

                return (
                  <article
                    key={campaign.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden">
                      {image ? (
                        <AppImage
                          src={image}
                          alt={campaign.alt || campaign.title}
                          width={500}
                          height={280}
                          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-52 items-center justify-center bg-muted text-muted-foreground">
                          <Heart size={36} />
                        </div>
                      )}

                      {campaign.badge && (
                        <span
                          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                            campaign.badgeColor || 'bg-card text-foreground'
                          }`}
                        >
                          {campaign.badge}
                        </span>
                      )}

                      <span className="absolute right-3 top-3 rounded-full border border-border bg-card/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                        {campaign.category}
                      </span>

                      {daysLeft > 0 && daysLeft <= 30 && (
                        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-foreground">
                          <Clock size={12} />
                          {daysLeft} days left
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h2 className="mb-2 text-base font-semibold leading-snug text-foreground">
                        {campaign.title}
                      </h2>

                      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {campaign.description}
                      </p>

                      {/* Funding progress */}
                      <div className="mb-5">
                        <div
                          className="mb-2 h-2 overflow-hidden rounded-full bg-muted"
                          role="progressbar"
                          aria-label={`${campaign.title} funding progress`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={progress}
                        >
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-semibold text-primary">
                            {formatKES(raised)}
                          </span>
                          <span className="text-muted-foreground">
                            {percentage}% of {formatKES(goal)}
                          </span>
                        </div>
                      </div>

                      {/* Campaign statistics */}
                      <div className="mb-5 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Users size={13} className="text-primary" />
                          {donors} donors
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {daysLeft > 0
                            ? `${daysLeft} days left`
                            : 'Deadline passed'}
                        </span>

                        <span className="flex items-center gap-1">
                          <Star
                            size={13}
                            className="fill-current text-amber-500"
                          />
                          {campaign.updates} updates
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href="/donate"
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          <Heart size={15} />
                          Donate
                        </Link>

                        <button
                          type="button"
                          aria-label={`View progress for ${campaign.title}`}
                          title="View campaign progress"
                          onClick={() =>
                            window.location.assign('/donate')
                          }
                          className="rounded-xl border border-border px-3 py-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <TrendingUp size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
