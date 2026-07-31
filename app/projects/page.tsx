'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { Heart, MapPin, Users, Calendar, ChevronRight, CheckCircle, Clock, Lightbulb } from 'lucide-react';
import { projects } from '@/data/dummyData';

const categories = ['All', 'Education', 'Water & Health', 'Health', 'Church Planting', 'Infrastructure'];

const statusConfig = {
  'Completed': { color: 'bg-accent/20 text-primary border-accent/30', icon: CheckCircle },
  'In Progress': { color: 'bg-primary/10 text-primary border-primary/20', icon: Clock },
  'Planned': { color: 'bg-warning/10 text-warning border-warning/30', icon: Lightbulb },
};

function formatKES(amount: number): string {
  if (amount >= 1000000) return `KES ${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `KES ${(amount / 1000).toFixed(0)}K`;
  return `KES ${amount.toLocaleString()}`;
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-16 lg:py-24">
          <div className="herosection absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
          
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
           
                <h1 className="text-4xl text-white lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight flex items-center gap-3 whitespace-nowrap">
                  <MapPin size={40} className="shrink-0" />
                  On the Ground
                </h1>

            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Our Projects
            </h1>
            <p className="text-white/75 text-lg max-w-2xl mx-auto">
              Every project represents a real need in our community. See exactly where your donations go and the impact they create.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { label: 'Total Projects', value: projects.length.toString() },
                { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length.toString() },
                { label: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length.toString() },
                { label: 'Lives Impacted', value: projects.reduce((a, p) => a + p.beneficiaries, 0).toLocaleString() },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 bg-background sticky top-16 z-30 border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-card'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((project) => {
                const statusCfg = statusConfig[project.status];
                const StatusIcon = statusCfg.icon;
                return (
                  <div key={project.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                    <div className="relative overflow-hidden">
                      <AppImage
                        src={project.image}
                        alt={project.alt}
                        width={500}
                        height={280}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusCfg.color} bg-card/90 backdrop-blur-sm`}>
                        <StatusIcon size={12} />
                        {project.status}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-semibold text-primary border border-border">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-foreground text-base mb-2 leading-snug">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-semibold text-primary">{formatKES(project.spent)} raised</span>
                          <span className="text-muted-foreground">{project.progress}% of {formatKES(project.budget)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-primary shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-primary shrink-0" />
                          <span>{project.beneficiaries.toLocaleString()} beneficiaries</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-primary shrink-0" />
                          <span>{project.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-primary shrink-0" />
                          <span>End: {project.endDate}</span>
                        </div>
                      </div>

                      <Link
                        href="/donate"
                        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors active:scale-95"
                      >
                        <Heart size={14} />
                        Support This Project
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Every Project Needs Your Support</h2>
            <p className="text-primary-foreground/75 max-w-xl mx-auto mb-8">
              Your donation goes directly to the field — no overhead, no waste. 100% of project funds reach the community.
            </p>
            <Link href="/donate" className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-8 py-3 rounded-xl hover:bg-accent/90 transition-colors">
              <Heart size={16} /> Donate to a Project <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
