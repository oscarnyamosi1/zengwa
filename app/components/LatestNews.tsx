import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const posts = [
{
  id: 'post-001',
  title: 'School Block Construction Reaches 72% — Completion Expected by September',
  category: 'Construction',
  date: '14 Jul 2026',
  readTime: '4 min read',
  excerpt: 'The second classroom block at Zengwa Primary School is progressing ahead of schedule, thanks to the generous support of 248 donors from 12 countries.',
  image: "https://images.unsplash.com/photo-1527248500553-b3aad29cd01f",
  alt: 'Construction site showing new school building with workers laying bricks and scaffolding in place',
  categoryColor: 'bg-warning/10 text-warning'
},
{
  id: 'post-002',
  title: '50 New Children Enrolled in Sponsorship Program for 2026 Academic Year',
  category: 'Sponsorship',
  date: '08 Jul 2026',
  readTime: '3 min read',
  excerpt: 'This year we welcomed 50 new children into our sponsorship program, each paired with a committed global donor who will walk with them through their education journey.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11e51961d-1767969209983.png",
  alt: 'Excited young African children in school uniforms holding up their new school bags and supplies on enrollment day',
  categoryColor: 'bg-accent/20 text-primary'
},
{
  id: 'post-003',
  title: 'Water Borehole Serves 1,200 Community Members Daily Since Installation',
  category: 'Water',
  date: '01 Jul 2026',
  readTime: '5 min read',
  excerpt: 'The borehole funded by our Clean Water campaign has been operational for 3 months, providing safe drinking water to over 1,200 people in Zengwa and surrounding villages.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1444ad8a7-1772110832391.png",
  alt: 'Children collecting clean water from a newly installed borehole pump in an African village',
  categoryColor: 'bg-primary/10 text-primary'
},
{
  id: 'post-004',
  title: 'Partnership with Kwale Diocese Strengthens Church Planting Initiative',
  category: 'Church',
  date: '24 Jun 2026',
  readTime: '3 min read',
  excerpt: 'A new memorandum of understanding with the Anglican Diocese of Kwale will accelerate our church planting goals, targeting 8 new congregations by end of 2027.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18daf0a55-1765652592016.png",
  alt: 'Community members gathered outside a small rural church in Kenya for a Sunday service',
  categoryColor: 'bg-gold/20 text-warning'
}];


export default function LatestNews() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
              <span className="w-8 h-0.5 bg-primary rounded" />
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
                src={post?.image}
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
