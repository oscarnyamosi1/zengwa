'use client';

import React from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { Heart, Users, BookOpen, Droplets, Church, Shield, ChevronRight, MapPin, Calendar, Award } from 'lucide-react';
import { teamMembers, testimonials, impactStats } from '@/data/dummyData';
import Icon from '@/components/ui/AppIcon';



const values = [
{ icon: Heart, title: 'Compassion', description: 'We serve with genuine love for every person, reflecting the heart of Christ in all we do.' },
{ icon: Shield, title: 'Integrity', description: 'Every donation is accounted for. We publish full financial reports and welcome scrutiny.' },
{ icon: Users, title: 'Community', description: 'We work with communities, not for them — building local capacity and ownership.' },
{ icon: BookOpen, title: 'Education', description: 'We believe education is the most powerful tool to break the cycle of poverty.' },
{ icon: Droplets, title: 'Sustainability', description: 'Every project is designed to be maintained and owned by the local community long-term.' },
{ icon: Church, title: 'Faith', description: 'Our work is rooted in the Gospel. We serve because Christ first served us.' }];


const milestones = [
{ year: '2025', title: 'Digital Platform', description: 'Online giving platform launched, connecting donors worldwide to our mission.' },
{ year: '2026', title: 'Today', description: '84 sponsored children, 28 communities reached, and 1 year of God\'s faithfulness.' }];


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-20 lg:py-28">
          <div className="herosection absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent blur-2xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
         
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
           
                <h1 className="text-4xl text-white lg:text-5xl font-bold text-primary-foreground mb-4 leading-tight flex items-center gap-3 whitespace-nowrap">
                  <Church size={40} className="shrink-0" />
                  Our Story
                </h1>

            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              1 Year of Transforming<br />Lives in the Coast of Kenya
            </h1>
            <p className="text-primary-foreground text-primary-foreground/75 text-lg max-w-2xl mx-auto mb-8">
              What began as a small school under a tree has grown into a ministry touching hundreds of lives through education, clean water, healthcare, and the Gospel.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate" className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2">
                <Heart size={16} /> Support Our Mission
              </Link>
              <Link href="/contact" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:bg-primary-foreground/10 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-12 bg-card border-b border-border">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
              { label: 'Children Sponsored', value: impactStats?.childrenSponsored?.toLocaleString(), icon: Heart },
              { label: 'Communities Reached', value: impactStats?.communitiesReached?.toString(), icon: MapPin },
              { label: 'Years of Service', value: impactStats?.yearsOfService?.toString(), icon: Calendar },
              { label: 'Countries Supporting', value: impactStats?.countriesRepresented?.toString(), icon: Award }]?.
              map((stat) => {
                const Icon = stat?.icon;
                return (
                  <div key={stat?.label} className="text-center p-6 rounded-2xl bg-background border border-border">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-primary mb-1">{stat?.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{stat?.label}</p>
                  </div>);

              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-20">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-4">
                  
                  Who We Are
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Zengwa Christian Education Centre
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Founded in 2025 by Evangelist Anne Kemunto and Mohammed Beni, Zengwa Christian Education Centre is a faith-based NGO operating in Kwale County, Coast  region of Kenya ( one of the most remote and underserved regions in Africa.)
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We believe that every child deserves quality education, clean water, healthcare, and the knowledge of God&apos;s love. Through the generosity of donors worldwide, we are making this a reality one life at a time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
                    <h3 className="font-bold text-primary mb-2 text-lg">Our Mission</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      To transform lives in the Coast region of Kenya through Christian education, community development, and the proclamation of the Gospel.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-accent/10 border border-accent/30">
                    <h3 className="font-bold text-primary mb-2 text-lg">Our Vision</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A Coast region of Kenya where every child is educated, every family has clean water, and every community knows the love of Jesus Christ.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <AppImage
                  src="https://res.cloudinary.com/ezs2dy9g/image/upload/v1790154083/IMG-20260920-WA0010_wlig0q.jpg"
                  alt="Group of smiling Kenyan school children in green uniforms standing outside a classroom"
                  width={600}
                  height={450}
                  className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-card-lg" />
                
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-sm p-4 shadow-card-lg">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Scripture</p>
                  <p className="text-sm font-medium text-foreground italic max-w-48">
                    &ldquo;To know Christ and to make Him known."&rdquo;
                  </p>
                  <p className="text-sm font-medium text-foreground italic max-w-48">
                    &ldquo;Train up a child in the way he should go...&rdquo;
                  </p>
                  <p className="text-xs text-primary font-semibold mt-1">— Proverbs 22:6</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
                
                What Drives Us
                
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values?.map((value) => {
                const Icon = value?.icon;
                return (
                  <div key={value?.title} className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{value?.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value?.description}</p>
                  </div>);

              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-20">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
                
                Our Journey
                
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">1 Year of Faithfulness</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones?.map((m, i) =>
              <div key={m?.year} className={`relative p-6 rounded-2xl border shadow-card ${i === milestones?.length - 1 ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border'}`}>
                  <div className={`text-4xl font-black mb-3 ${i === milestones?.length - 1 ? 'text-accent' : 'text-primary/20'}`}>{m?.year}</div>
                  <h3 className={`font-bold text-lg mb-2 ${i === milestones?.length - 1 ? 'text-primary-foreground' : 'text-foreground'}`}>{m?.title}</h3>
                  <p className={`text-sm leading-relaxed ${i === milestones?.length - 1 ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>{m?.description}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
                
                The People
                
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Meet Our Team</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Dedicated servants who give their lives to see Coast  region of Kenya transformed.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers?.map((member) =>
              <div key={member?.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group">
                  <AppImage
                  src={member?.image}
                  alt={member?.alt}
                  width={300}
                  height={300}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-base mb-0.5">{member?.name}</h3>
                    <p className="text-primary text-sm font-semibold mb-3">{member?.role}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">{member?.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 lg:py-20">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
                
                Trusted Worldwide
                
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">What Our Supporters Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials?.map((t) =>
              <div key={t?.id} className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <p className="text-muted-foreground text-sm leading-relaxed italic mb-5">&ldquo;{t?.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <AppImage src={t?.image} alt={t?.alt} width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t?.name}</p>
                      <p className="text-xs text-muted-foreground">{t?.role} {t?.flag}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">Join Our Mission</h2>
            <p className="text-primary-foreground max-w-xl mx-auto mb-8">
              Whether you give, volunteer, or pray you are part of the story God is writing in Coast  region of Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/donate" className="bg-accent text-primary font-semibold px-8 py-3 rounded-xl hover:bg-accent/90 transition-colors flex items-center gap-2">
                <Heart size={16} /> Donate Now
              </Link>
              <Link href="/volunteer" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:bg-primary-foreground/10 transition-colors flex items-center gap-2">
                <Users size={16} /> Volunteer <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>);

}