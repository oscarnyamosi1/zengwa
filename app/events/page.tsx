'use client';

import React, { useState } from 'react';

import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { Calendar, MapPin, Clock, Users, ChevronRight, Tag } from 'lucide-react';
import { events } from '@/data/dummyData';

const eventTypes = ['All', 'Fundraiser', 'Training', 'Prayer', 'Community Drive', 'Health Outreach', 'Donor Relations'];

const typeColors: Record<string, string> = {
  Fundraiser: 'bg-gold/10 text-warning border-gold/20',
  Training: 'bg-primary/10 text-primary border-primary/20',
  Prayer: 'bg-accent/20 text-primary border-accent/30',
  'Community Drive': 'bg-muted text-muted-foreground border-border',
  'Health Outreach': 'bg-danger/10 text-danger border-danger/20',
  'Donor Relations': 'bg-secondary/10 text-primary border-secondary/20',
};

export default function EventsPage() {
  const [activeType, setActiveType] = useState('All');
  const [registering, setRegistering] = useState<string | null>(null);

  const filtered = activeType === 'All' ? events : events.filter((e) => e.type === activeType);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      {registering && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setRegistering(null)}>
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full shadow-card-lg" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-foreground mb-2">Register for Event</h3>
            <p className="text-muted-foreground text-sm mb-6">{events.find(e => e.id === registering)?.title}</p>
            <div className="space-y-4">
              <input type="text" placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              <input type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
              <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setRegistering(null)} className="flex-1 py-3 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors text-sm font-semibold">Cancel</button>
              <button onClick={() => setRegistering(null)} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-secondary transition-colors text-sm font-semibold">Confirm Registration</button>
            </div>
          </div>
        </div>
      )}
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-14 lg:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
            
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
                <h1 className="text-4xl text-white lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight flex items-center gap-3 whitespace-nowrap">
                  <Calendar size={40} />
                  Upcoming Events
                
                </h1>

            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Join Us in Person
            </h1>
            <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto">
              From fundraising galas to community prayer days — find an event near you and be part of the mission.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="py-6 bg-card border-b border-border sticky top-16 z-30">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeType === type
                      ? 'bg-primary text-primary-foreground shadow-card'
                      : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((event) => {
                const spotsLeft = event.capacity - event.attendees;
                const pct = Math.round((event.attendees / event.capacity) * 100);
                return (
                  <div key={event.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                    <div className="relative overflow-hidden">
                      <AppImage
                        src={event.image}
                        alt={event.alt}
                        width={500}
                        height={280}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border ${typeColors[event.type] || 'bg-muted text-muted-foreground border-border'} bg-card/90 backdrop-blur-sm`}>
                        <Tag size={10} className="inline mr-1" />
                        {event.type}
                      </div>
                      {event.free ? (
                        <div className="absolute top-3 right-3 bg-accent/90 text-primary px-2.5 py-1 rounded-full text-xs font-bold">FREE</div>
                      ) : (
                        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full text-xs font-bold border border-border">
                          {event.currency} {event.price?.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-foreground text-base mb-3 leading-snug">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>

                      <div className="space-y-2 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-primary shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-primary shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-primary shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      {/* Capacity */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="flex items-center gap-1 text-muted-foreground"><Users size={11} /> {event.attendees} registered</span>
                          <span className="text-muted-foreground">{spotsLeft} spots left</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full transition-all ${pct > 80 ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>

                      <button
                        onClick={() => setRegistering(event.id)}
                        disabled={spotsLeft === 0}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {spotsLeft === 0 ? 'Fully Booked' : 'Register Now'} <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
