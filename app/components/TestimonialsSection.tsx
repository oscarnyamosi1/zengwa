import React from 'react';
import { Star, Quote } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  id: 'testi-001',
  name: 'Margaret Wanjiku',
  role: 'Monthly Donor — Nairobi, Kenya',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f5c84a8b-1772712488589.png",
  alt: 'Portrait of a Kenyan woman smiling warmly, wearing a colorful headscarf',
  quote: 'Sponsoring little Grace has been the most rewarding thing I have ever done. The monthly updates with her photos and school progress reports make it feel real and personal.',
  rating: 5,
  campaign: 'Child Sponsorship'
},
{
  id: 'testi-002',
  name: 'David Omondi',
  role: 'Community Volunteer — Kwale',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d2cc09b4-1763294485121.png",
  alt: 'Portrait of a young Kenyan man with a warm smile wearing a casual shirt',
  quote: 'The new borehole changed everything for our village. Women used to walk 8km for water. Now our children come to school clean and healthy. This is what real change looks like.',
  rating: 5,
  campaign: 'Clean Water Project'
},
{
  id: 'testi-003',
  name: 'Mwashinga Sarah',
  role: 'Partner Donor — London, UK',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11287cdb4-1772690426652.png",
  alt: 'Portrait of a British woman with blonde hair smiling professionally',
  quote: 'The transparency of ZengwaConnect is remarkable. I can see exactly where my money goes, read the field reports, and even video-call with the teachers. Unmatched accountability.',
  rating: 5,
  campaign: 'School Construction'
}];


export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase mb-3">
            <span className="w-8 h-0.5 bg-primary rounded" />
            Testimonials
            <span className="w-8 h-0.5 bg-primary rounded" />
          </div>
          <h2 className="text-section-title text-foreground">Voices of Impact</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Real stories from donors, volunteers, and community members whose lives have been changed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.map((testi) =>
          <div
            key={testi?.id}
            className="bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-shadow">
            
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AppImage
                  src={testi?.avatar}
                  alt={testi?.alt}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent" />
                
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testi?.name}</p>
                    <p className="text-xs text-muted-foreground">{testi?.role}</p>
                  </div>
                </div>
                <Quote size={20} className="text-accent shrink-0" />
              </div>

              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5]?.map((s) =>
              <Star key={`tstar-${testi?.id}-${s}`} size={13} className="fill-gold text-gold" />
              )}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
                "{testi?.quote}"
              </p>

              <div className="pt-3 border-t border-border">
                <span className="text-xs font-semibold text-primary bg-muted px-2.5 py-1 rounded-full">
                  {testi?.campaign}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
