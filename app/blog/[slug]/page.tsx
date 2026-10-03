import Image from 'next/image';

// --- Data Types ---
export interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'Construction' | 'Church' | 'Water' | 'Sponsorship';
  date: string;
  thumbnail: string;
  readTime: string;
  excerpt: string;
  image: string[];
  alt: string;
  categoryColor: string;
}

// Extra funding/engagement data (not part of Post, but needed for the sidebar)
interface CampaignMeta {
  subtitle: string;
  raised: number;
  donors: number;
  goal: number;
  daysLeft: number;
  badge: string;
  badgeColor: string;
  currency: string;
  updates: number;
  rating: number;
  reviews: string[];
}

interface ContentBlock {
  type: 'paragraph' | 'image';
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

// Combined type used by the page
interface PostWithMeta extends Post {
  meta: CampaignMeta;
  content: ContentBlock[];
}

// --- Mock Data (Post + Meta + Content) ---
async function getPost(slug: string): Promise<PostWithMeta> {
  // In a real app, fetch from your API using the slug
  // const res = await fetch(`${process.env.API_URL}/posts/${slug}`);
  // return res.json();

  return {
    // --- Post fields ---
    id: 'sponsorship-2026',
    slug: '50-new-children-enrolled-sponsorship-2026',
    title:
      '50 New Children Enrolled in Sponsorship Program for 2026 Academic Year',
    category: 'Sponsorship',
    date: '08 Jul 2026',
    thumbnail: '/images/sponsorship-thumb.jpg',
    readTime: '3 min read',
    excerpt:
      'This year we welcomed 50 new children into our sponsorship program, each paired with a committed global donor who will walk with them through their education journey.',
    image: [
      '/images/sponsorship-hero.jpg',
      '/images/children-with-bags.jpg',
      '/images/enrollment-day.jpg',
    ],
    alt: 'Excited young African children in school uniforms holding up their new school bags and supplies on enrollment day',
    categoryColor: 'bg-orange-100 text-orange-700',

    // --- Extra meta for the sidebar ---
    meta: {
      subtitle: 'Sponsorship Program Update',
      raised: 850000,
      donors: 124,
      goal: 1500000,
      daysLeft: 60,
      badge: 'New',
      badgeColor: 'bg-green-100 text-green-700',
      currency: 'KES',
      updates: 3,
      rating: 4.8,
      reviews: [
        'Amazing initiative! The children are so happy.',
        'Transparent and impactful. Highly recommend supporting.',
        'Seeing the smiles on their faces is priceless.',
      ],
    },

    // --- Rich content blocks ---
    content: [
      {
        type: 'paragraph',
        text: 'On a bright morning in July 2026, 50 excited young children gathered at the community center, their faces beaming with joy. Each held a brand new school bag filled with supplies like notebooks, pencils, uniforms, and hope for a brighter future.',
      },
      {
        type: 'image',
        src: '/images/children-with-bags.jpg',
        alt: 'Children holding up their new school bags',
        caption: 'The new cohort of sponsored children on enrollment day',
      },
      {
        type: 'paragraph',
        text: 'The sponsorship program pairs each child with a dedicated donor who commits to covering their educational expenses for the entire academic year. This includes tuition, books, uniforms, and a daily meal. For many of these children, it is the first time they have ever owned a new school bag.',
      },
      {
        type: 'image',
        src: '/images/enrollment-day.jpg',
        alt: 'Enrollment day celebrations',
        caption: 'Parents and community members celebrating the enrollment',
      },
      {
        type: 'paragraph',
        text: 'We are deeply grateful to our global community of donors. Your generosity has already changed the lives of these 50 children, and we look forward to sharing their progress throughout the year. There are still 30 children on our waiting list — with your help, we can enroll them before the school term begins.',
      },
    ],
  };
}

// --- Helper Components ---
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
                  src={block.src!}
                  alt={block.alt || ''}
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

// --- Page Component ---
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  const { meta } = post;

  const percentage = Math.round((meta.raised / meta.goal) * 100);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-96">
        <Image
          src={post.image[0]}
          alt={post.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 max-w-5xl mx-auto">
          <span
            className={`inline-block ${meta.badgeColor} text-xs font-semibold px-3 py-1 rounded-full mb-3`}
          >
            {meta.badge}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span className="capitalize">{post.category}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Category Badge & Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={`inline-block ${post.categoryColor} text-xs font-semibold px-3 py-1 rounded-full`}
          >
            {post.category}
          </span>
          <span className="text-sm text-gray-500">{post.readTime}</span>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          {post.title}
        </h1>
        <h2 className="text-lg md:text-xl text-gray-600 mb-6">
          {meta.subtitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: excerpt + dynamic content */}
          <div className="lg:col-span-2">
            <p className="text-gray-800 text-lg leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>

            <ContentRenderer blocks={post.content} />

            {/* Reviews / Testimonials Section */}
            {meta.reviews.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What Donors Are Saying
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(meta.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {meta.rating} out of 5
                  </span>
                </div>
                <div className="space-y-4">
                  {meta.reviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                    >
                      <p className="text-gray-700 italic">"{review}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: donation sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              {/* Progress bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {percentage}% of {formatCurrency(meta.goal, meta.currency)}
                </p>
              </div>

              {/* Raised amount */}
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {formatCurrency(meta.raised, meta.currency)}
              </p>
              <p className="text-sm text-gray-500 mb-6">raised so far</p>

              {/* Stats */}
              <div className="flex justify-between text-sm text-gray-700 border-t border-b border-gray-100 py-4 mb-6">
                <div className="text-center flex-1">
                  <p className="font-semibold text-gray-900">{meta.donors}</p>
                  <p className="text-xs text-gray-500">donors</p>
                </div>
                <div className="text-center flex-1 border-l border-r border-gray-100">
                  <p className="font-semibold text-gray-900">
                    {meta.daysLeft}
                  </p>
                  <p className="text-xs text-gray-500">days left</p>
                </div>
                <div className="text-center flex-1">
                  <p className="font-semibold text-gray-900">
                    {meta.updates}
                  </p>
                  <p className="text-xs text-gray-500">updates</p>
                </div>
              </div>

              {/* Donate button */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">
                Donate
              </button>

              {/* Additional info */}
              <p className="text-xs text-gray-400 text-center mt-4">
                Every contribution makes a difference
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}