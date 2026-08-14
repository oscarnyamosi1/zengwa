import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, CheckCircle, Truck, Shield } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { recentDonations } from '@/data/dummyData';


// Trust indicators — compact, legible over the photograph
function TrustIndicators() {
    const items = [
        { icon: CheckCircle, text: '100% Faith & Charity Mission' },
        { icon: Truck, text: 'Free Impact Reports' },
        { icon: Shield, text: 'Secure Donation Channels' },
    ];

    return (
        <div className="flex flex-wrap gap-4 md:gap-6 mt-6">
            {items.map(({ icon: Icon, text }) => (
                <div key={`trust-${text}`} className="flex items-center gap-2 text-xs md:text-sm text-white/80 font-medium">
                    <Icon size={16} className="text-white/90 flex-shrink-0" strokeWidth={2.5} />
                    <span>{text}</span>
                </div>
            ))}
        </div>
    );
}

// Floating donation card — positioned bottom-right over the photograph
function DonationCard({ amount, progress }: { amount?: number; progress: number }) {
    const displayAmount = amount ?? 0;
    const formattedAmount = displayAmount > 0 ? displayAmount.toLocaleString() : '—';

    return (
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-30 w-[260px] lg:w-[300px]">
            <div className="bg-white/95 backdrop-blur-md rounded-sm shadow-sm p-4 lg:p-5 border border-white/30">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Heart size={16} className="text-primary" fill="currentColor" />
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Latest Donation</p>
                        <p className="text-lg font-bold text-foreground">KES {formattedAmount}</p>
                    </div>
                </div>

                <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 font-medium">
                    {Math.min(progress, 100)}% of goal reached
                </p>
            </div>
        </div>
    );
}

export default function HeroSection() {
    // Data-driven progress — using a sensible default if real data isn't available
    const donationProgress = 72;

    // Safely get the latest donation amount with a fallback
    const latestDonation = recentDonations?.at?.(-1);
    const latestAmount = latestDonation?.amount ?? 0;

    return (
        <section className="relative min-h-[760px] md:min-h-[820px] overflow-hidden bg-charcoal">
            {/* ─── BACKGROUND PHOTOGRAPH — full-bleed, z-0 ─── */}
            <div className="absolute inset-0 z-0">
                <AppImage
                    src="https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?w=1600&q=80"
                    alt=""
                    fill
                    priority
                    className="object-cover object-[65%_center] md:object-[60%_center]"
                    sizes="100vw"
                />
            </div>

            {/* ─── READABILITY OVERLAY — directional, z-10 ─── */}
            <div
                className="absolute inset-0 z-10"
                aria-hidden="true"
                style={{
                    background: `
                        linear-gradient(
                            90deg,
                            rgba(0, 0, 0, 0.72) 0%,
                            rgba(0, 0, 0, 0.55) 35%,
                            rgba(0, 0, 0, 0.25) 65%,
                            rgba(0, 0, 0, 0.10) 100%
                        )
                    `,
                }}
            />

            {/* ─── SUBTLE ATMOSPHERIC TEXTURE — minimal, z-10 ─── */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
                aria-hidden="true"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '180px',
                }}
            />


            {/* ─── MAIN CONTENT — left-aligned over the image, z-20 ─── */}
            <div className="relative z-20 flex min-h-[620px] md:min-h-[680px] items-center px-6 lg:px-10 xl:px-16">
                <div className="mx-auto w-full max-w-screen-2xl">
                    <div className="max-w-xl lg:max-w-2xl">
                      
                        {/* Headline */}
                        <h1 className="text-[42px] leading-[1.08] sm:text-[52px] md:text-[64px] lg:text-[76px] xl:text-[88px] font-bold text-white tracking-[-0.02em] mb-4">
                            Balanced Giving.
                            <br />
                            <span className="text-primary-light drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
                                Pure Impact.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg lg:max-w-xl mb-7 md:mb-9 drop-shadow-sm">
                            Discover how your generosity transforms children's lives through
                            Christian education, clean water, and community development in the
                            Coast region of Kenya.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            <Link
                                href="/donate"
                                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-200 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95"
                            >
                                <Heart size={18} className="flex-shrink-0" />
                                Donate Now
                            </Link>
                            <Link
                                href="/campaigns"
                                className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-200 border border-white/20 hover:border-white/40 active:scale-95"
                            >
                                Explore Campaigns
                                <ArrowRight size={18} className="flex-shrink-0" />
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <TrustIndicators />
                    </div>
                </div>
            </div>

            {/* ─── FLOATING DONATION CARD — bottom-right, z-30 ─── */}
            <DonationCard amount={latestAmount} progress={donationProgress} />
        </section>
    );
}