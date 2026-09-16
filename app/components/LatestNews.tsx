import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { posts } from "@/data/dummyData"

export default function LatestNews() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
              
              Latest News
            </div>
            <h2 className="text-section-title text-foreground">Ministry Updates</h2>
          </div>
          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors">
            
            View All Posts
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts?.map((post) =>
          <article
            key={post?.id}
            className="campaign-card-hover bg-card rounded-sm overflow-hidden border border-border shadow-card group">
            
              <div className="overflow-hidden">
                <AppImage
                src={post?.image[0]}
                alt={post?.alt}
                width={400}
                height={200}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" />
              
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post?.categoryColor}`}>
                    {post?.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={11} />
                    {post?.readTime}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                  {post?.excerpt}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
                  <Calendar size={11} />
                  {post?.date}
                </div>
              </div>
            </article>
          )}
        </div>

        <div className="sm:hidden text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>);

}
