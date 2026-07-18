import React from 'react';
import { Heart } from 'lucide-react';

const tickerItems = [
  { id: 'tick-001', text: 'Margaret W. donated KES 5,000 to School Block B' },
  { id: 'tick-002', text: 'Anonymous donated USD 50 to Clean Water Borehole' },
  { id: 'tick-003', text: 'Sarah T. donated GBP 30 to School Block B' },
  { id: 'tick-004', text: 'David O. donated KES 2,500 to Child Sponsorship' },
  { id: 'tick-005', text: 'James K. donated KES 10,000 to General Ministry Fund' },
  { id: 'tick-006', text: 'Amelia N. donated EUR 25 to Community Health' },
  { id: 'tick-007', text: 'Peter M. donated KES 1,500 to Church Planting' },
];

export default function RecentDonorsTicker() {
  return (
    <section className="bg-muted border-y border-border py-3 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="shrink-0 bg-primary text-primary-foreground px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <Heart size={13} />
          Live Giving
        </div>
        <div className="flex items-center gap-8 overflow-hidden whitespace-nowrap">
          {[...tickerItems, ...tickerItems]?.map((item, i) => (
            <span
              key={`ticker-${item?.id}-${i}`}
              className="text-xs text-muted-foreground font-medium shrink-0"
            >
              🙏 {item?.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
