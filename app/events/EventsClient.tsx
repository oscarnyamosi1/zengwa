
'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Tag,
} from 'lucide-react';
import type { EventItem } from './page';

const eventTypes = [
  'All',
  'Conference',
  'Fundraising',
  'Workshop',
  'Community',
  'Education',
  'Networking',
  'Celebration',
  'Other',
];

const typeColors: Record<string, string> = {
  Conference: 'bg-primary/10 text-primary border-primary/20',
  Fundraising: 'bg-gold/10 text-warning border-gold/20',
  Workshop: 'bg-accent/20 text-primary border-accent/30',
  Community: 'bg-muted text-muted-foreground border-border',
  Education: 'bg-secondary/10 text-primary border-secondary/20',
  Networking: 'bg-primary/10 text-primary border-primary/20',
  Celebration: 'bg-gold/10 text-warning border-gold/20',
  Other: 'bg-muted text-muted-foreground border-border',
};

interface EventsClientProps {
  events: EventItem[];
}

export default function EventsClient({ events }: EventsClientProps) {
  const [activeType, setActiveType] = useState('All');
  const [registering, setRegistering] = useState<EventItem | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const filtered =
    activeType === 'All'
      ? events
      : events.filter((event) => event.type === activeType);

  function closeRegistration() {
    setRegistering(null);
    setFullName('');
    setEmail('');
    setPhone('');
  }

  function handleRegistrationSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    // Connect this form to your event-registration API when available.
    // This currently validates the fields but does not save a registration.
    alert(
      'The registration form is ready, but it needs a backend registration endpoint to complete your booking.'
    );
  }

  return (
    <>
      {registering && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeRegistration}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              id="registration-title"
              className="mb-2 text-xl font-bold text-foreground"
            >
              Register for Event
            </h3>

            <p className="mb-6 text-sm text-muted-foreground">
              {registering.title}
            </p>

            <form onSubmit={handleRegistrationSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your full name"
                  aria-label="Your full name"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <input
                  type="tel"
                  placeholder="Phone number"
                  aria-label="Phone number"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeRegistration}
                  className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="sticky top-16 z-30 border-b border-border bg-card py-6">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 xl:px-16">
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                aria-pressed={activeType === type}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  activeType === type
                    ? 'bg-primary text-primary-foreground shadow-card'
                    : 'border border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 xl:px-16">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <Calendar
                size={40}
                className="mx-auto mb-4 text-muted-foreground"
              />

              <h2 className="mb-2 text-xl font-bold text-foreground">
                No events found
              </h2>

              <p className="text-sm text-muted-foreground">
                {events.length === 0
                  ? 'There are no events available at the moment. Please check back later.'
                  : `There are currently no ${activeType.toLowerCase()} events.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((event) => {
                const spotsLeft = Math.max(
                  0,
                  event.capacity - event.attendees
                );

                const pct =
                  event.capacity > 0
                    ? Math.min(
                        100,
                        Math.round(
                          (event.attendees / event.capacity) * 100
                        )
                      )
                    : 0;

                return (
                  <article
                    key={event.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover"
                  >
                    <div className="relative overflow-hidden">
                      <AppImage
                        src={event.image}
                        alt={event.alt || event.title}
                        width={500}
                        height={280}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div
                        className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                          typeColors[event.type] ||
                          'border-border bg-card/90 text-muted-foreground'
                        }`}
                      >
                        <Tag size={10} className="mr-1 inline" />
                        {event.type}
                      </div>

                      {event.free ? (
                        <div className="absolute right-3 top-3 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-bold text-primary">
                          FREE
                        </div>
                      ) : (
                        <div className="absolute right-3 top-3 rounded-full border border-border bg-card/90 px-2.5 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
                          {event.currency}{' '}
                          {event.price != null
                            ? event.price.toLocaleString()
                            : 'Price unavailable'}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="mb-3 text-base font-bold leading-snug text-foreground">
                        {event.title}
                      </h3>

                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>

                      <div className="mb-4 space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar
                            size={12}
                            className="shrink-0 text-primary"
                          />
                          <span>{event.date}</span>
                        </div>

                        {event.time && (
                          <div className="flex items-center gap-2">
                            <Clock
                              size={12}
                              className="shrink-0 text-primary"
                            />
                            <span>{event.time}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <MapPin
                            size={12}
                            className="shrink-0 text-primary"
                          />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="mb-1.5 flex justify-between text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Users size={11} />
                            {event.attendees} registered
                          </span>

                          <span className="text-muted-foreground">
                            {spotsLeft} spots left
                          </span>
                        </div>

                        <div className="h-1.5 w-full rounded-full bg-muted">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              pct > 80 ? 'bg-danger' : 'bg-primary'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setRegistering(event)}
                        disabled={spotsLeft === 0}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-secondary active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {spotsLeft === 0 ? 'Fully Booked' : 'Register Now'}
                        <ChevronRight size={14} />
                      </button>
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
