'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import AppImage from '@/components/ui/AppImage';
import { Clock, ChevronRight, BookOpen, Tag } from 'lucide-react';
import { blogPosts } from '@/data/dummyData';

const categories = ['All', 'Water Projects', 'Child Sponsorship', 'Ministry Updates', 'Volunteers', 'Church Planting', 'Infrastructure'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? blogPosts : blogPosts?.filter((p) => p?.category === activeCategory);
  const featured = blogPosts?.filter((p) => p?.featured);
  const rest = filtered?.filter((p) => !p?.featured || activeCategory !== 'All');

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        {/* Hero */}
        <section className="relative bg-primary overflow-hidden py-14 lg:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16 text-center">
            <h1 className="inline-flex items-center gap-2 bg-primary-foreground/10 border-primary-foreground/20 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              <BookOpen size={40} className="shrink-0" />
                Ministry Blog
            </h1>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Stories of Transformation
            </h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Real stories from the field — how your generosity is changing lives in Coast  region of Kenya.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {activeCategory === 'All' && (
          <section className="py-12 lg:py-16">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Featured Stories</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featured?.map((post, i) => (
                  <div key={post?.id} className={`bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group ${i === 0 ? 'lg:row-span-1' : ''}`}>
                    <div className="relative overflow-hidden">
                      <AppImage
                        src={post?.image}
                        alt={post?.alt}
                        width={700}
                        height={380}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-accent/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-accent/20">{post?.category}</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={11} /> {post?.readTime} min read</span>
                      </div>
                      <h3 className="font-bold text-foreground text-xl mb-3 leading-snug">{post?.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{post?.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AppImage src={post?.authorAvatar} alt={`${post?.author} profile photo`} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-xs font-semibold text-foreground">{post?.author}</p>
                            <p className="text-xs text-muted-foreground">{post?.date}</p>
                          </div>
                        </div>
                        <Link href={`/blog/${post?.id}`} className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
                          Read More <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-6 bg-card border-y border-border sticky top-16 z-30">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="flex flex-wrap gap-2">
              {categories?.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-card'
                      : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(activeCategory === 'All' ? rest : filtered)?.map((post) => (
                <div key={post?.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group">
                  <div className="relative overflow-hidden">
                    <AppImage
                      src={post?.image}
                      alt={post?.alt}
                      width={500}
                      height={280}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-accent/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-accent/20">{post?.category}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={11} /> {post?.readTime} min</span>
                    </div>
                    <h3 className="font-bold text-foreground text-base mb-2 leading-snug line-clamp-2">{post?.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{post?.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post?.tags?.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          <Tag size={9} /> {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <AppImage src={post?.authorAvatar} alt={`${post?.author} profile photo`} width={28} height={28} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{post?.author}</p>
                          <p className="text-xs text-muted-foreground">{post?.date}</p>
                        </div>
                      </div>
                      <Link href={`/blog/${post?.id}`} className="text-primary text-xs font-semibold hover:underline flex items-center gap-1">
                        Read <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>
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
