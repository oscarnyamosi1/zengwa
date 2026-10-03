import Image from 'next/image';
import { Campaign, ContentBlock } from '@/data/dummyData';

// Simulated backend fetch — replace with your real API call
async function getCampaign(id: string): Promise<Campaign> {
  // const res = await fetch(`${process.env.API_URL}/campaigns/${id}`);
  // return res.json();

  // Mock data for demo
  return {
    id,
    category: 'UrgentEducation',
    title: 'School block under construction in Zengwa village',
    subtitle: 'Zengwa Primary School Block',
    heroImage: '/images/zengwa-hero.jpg',
    description:
      'We are building a second classroom block to accommodate 200 additional students who currently study under trees. The new block will have 4 classrooms, a library, and sanitation facilities.',
    content: [
      {
        type: 'paragraph',
        text: 'In the heart of Zengwa village, over 200 children gather every morning under the shade of ancient acacia trees, their lessons interrupted by rain, dust, and the scorching sun.',
      },
      {
        type: 'image',
        src: '/images/students-under-trees.jpg',
        alt: 'Students studying under trees',
        caption: 'Students currently studying under trees',
      },
      {
        type: 'paragraph',
        text: 'The new classroom block will change everything. With four spacious classrooms, a well-stocked library, and modern sanitation facilities, this project will provide a safe and conducive learning environment.',
      },
      {
        type: 'image',
        src: '/images/construction-progress.jpg',
        alt: 'Construction progress',
        caption: 'Current construction progress - foundation complete',
      },
      {
        type: 'paragraph',
        text: 'Your contribution brings us closer to completing this vital project. Together, we can ensure every child in Zengwa has access to quality education.',
      },
    ],
    funding: {
      raised: 1_200_000,
      goal: 1_800_000,
      currency: 'KES',
      percentage: 69,
      donors: 248,
      daysLeft: 42,
      updates: 8,
    },
  };
}

// Renders dynamic content blocks in the order the backend specifies
function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === 'paragraph') {
          return (
            <p key={index} className="text-gray-700 leading-relaxed text-base">
              {block.text}
            </p>
          );
        }

        if (block.type === 'image') {
          return (
            <figure key={index} className="my-6">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={block.src}
                  alt={block.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
              {block.caption && (
                <figcaption className="text-sm text-gray-500 text-center mt-2 italic">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}

function formatCurrency(amount: number, currency: string) {
  if (currency === 'KES') {
    return `KES ${(amount / 1_000_000).toFixed(1)}M`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export default async function CampaignPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = await getCampaign(params.id);
  const { funding } = campaign;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      {campaign.heroImage && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={campaign.heroImage}
            alt={campaign.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {campaign.category}
        </span>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          {campaign.title}
        </h1>
        <h2 className="text-lg md:text-xl text-gray-600 mb-6">
          {campaign.subtitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: description + dynamic content */}
          <div className="lg:col-span-2">
            <p className="text-gray-800 text-lg leading-relaxed mb-8 font-medium">
              {campaign.description}
            </p>

            <ContentRenderer blocks={campaign.content} />
          </div>

          {/* Right column: donation sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              {/* Progress bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${funding.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {funding.percentage}% of{' '}
                  {formatCurrency(funding.goal, funding.currency)}
                </p>
              </div>

              {/* Raised amount */}
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {formatCurrency(funding.raised, funding.currency)}
              </p>
              <p className="text-sm text-gray-500 mb-6">raised so far</p>

              {/* Stats */}
              <div className="flex justify-between text-sm text-gray-700 border-t border-b border-gray-100 py-4 mb-6">
                <div className="text-center flex-1">
                  <p className="font-semibold text-gray-900">{funding.donors}</p>
                  <p className="text-xs text-gray-500">donors</p>
                </div>
                <div className="text-center flex-1 border-l border-r border-gray-100">
                  <p className="font-semibold text-gray-900">
                    {funding.daysLeft}
                  </p>
                  <p className="text-xs text-gray-500">days left</p>
                </div>
                <div className="text-center flex-1">
                  <p className="font-semibold text-gray-900">
                    {funding.updates}
                  </p>
                  <p className="text-xs text-gray-500">updates</p>
                </div>
              </div>

              {/* Donate button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">
                Donate
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}