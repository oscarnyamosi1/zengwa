import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  alt: string;
  date: string;
  readTime: number;
  featured?: boolean;
}

async function getPosts(): Promise<BlogPost[]> {
  const backendUrl = (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://127.0.0.1:8000/api'
  ).replace(/\/+$/, '');

  try {
    const response = await fetch(`${backendUrl}/getblogposts/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.status);
      return [];
    }

    const data = await response.json();

    // Supports a plain array or Django REST Framework pagination.
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.results)) {
      return data.results;
    }

    if (Array.isArray(data.posts)) {
      return data.posts;
    }

    return [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function LatestNews() {
  const posts = await getPosts();
  const latestPosts = posts.slice(0, 4);

  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 xl:px-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Latest News
            </div>

            <h2 className="text-section-title text-foreground">
              Ministry Updates
            </h2>
          </div>

          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary sm:flex"
          >
            View All Posts
            <ArrowRight size={16} />
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block"
              >
                <article className="campaign-card-hover group h-full overflow-hidden rounded-sm border border-border bg-card shadow-card">
                  <div className="overflow-hidden">
                    <AppImage
                      src={post.image}
                      alt={post.alt || post.title}
                      width={400}
                      height={200}
                      className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        {post.category}
                      </span>

                      <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={11} />
                        {post.readTime} min read
                      </div>
                    </div>

                    <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>

                    <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-1.5 border-t border-border pt-2 text-xs text-muted-foreground">
                      <Calendar size={11} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card px-6 py-12 text-center">
            <h3 className="mb-2 font-semibold text-foreground">
              No news available
            </h3>
            <p className="text-sm text-muted-foreground">
              We could not load the latest ministry updates. Please check back
              later.
            </p>
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            View All Posts
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
