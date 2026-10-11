import Link from "next/link";
import type { Metadata } from "next";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import AppImage from "@/components/ui/AppImage";
import { Clock, ChevronRight, BookOpen, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ministry Blog | Stories of Transformation",
  description:
    "Read stories of transformation, ministry updates, child sponsorship, and community projects across the Coast region of Kenya.",
};

interface BlogPost {
  id: string | number;
  title?: string;
  slug?: string;
  category?: string;
  image?: string;
  alt?: string;
  featured?: boolean;
  excerpt?: string;
  readTime?: number | string;
  author?: string;
  authorAvatar?: string;
  date?: string;
  tags?: string[];
}

const categories = [
  "All",
  "Water Projects",
  "Child Sponsorship",
  "Ministry Updates",
  "Volunteers",
  "Church Planting",
  "Infrastructure",
];

async function getBlogPosts(): Promise<BlogPost[]> {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    console.error("BACKEND_URL is not configured.");
    return [];
  }

  try {
    const response = await fetch(
      `${backendUrl.replace(/\/+$/, "")}/getblogposts/`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch blog posts:",
        response.status,
        response.statusText
      );
      return [];
    }

    const data = await response.json();

    // Support APIs returning an array or a paginated/object response.
    if (Array.isArray(data)) {
      return data;
    }

    if (Array.isArray(data.results)) {
      return data.results;
    }

    if (Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="bg-accent/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-accent/20">
        {post.category || "Ministry Updates"}
      </span>

      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock size={11} />
        {post.readTime || 1} min read
      </span>
    </div>
  );
}

function AuthorDetails({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {post.authorAvatar && (
        <AppImage
          src={post.authorAvatar}
          alt={`${post.author || "Author"} profile photo`}
          width={featured ? 32 : 28}
          height={featured ? 32 : 28}
          className={`${
            featured ? "w-8 h-8" : "w-7 h-7"
          } rounded-full object-cover`}
        />
      )}

      <div>
        <p className="text-xs font-semibold text-foreground">
          {post.author || "Ministry Team"}
        </p>
        <p className="text-xs text-muted-foreground">
          {post.date || ""}
        </p>
      </div>
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = categories.includes(category || "")
    ? category || "All"
    : "All";

  const blogPosts = await getBlogPosts();

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter(
          (post) => post.category === activeCategory
        );

  const featured = blogPosts.filter((post) => post.featured);

  const rest =
    activeCategory === "All"
      ? filtered.filter((post) => !post.featured)
      : filtered;

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
     
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Stories of Transformation
            </h1>

            <p className="text-white/75 text-lg max-w-xl mx-auto">
              Real stories from the field and how your generosity
              is changing lives in the Coast region of Kenya.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {activeCategory === "All" && featured.length > 0 && (
          <section className="py-12 lg:py-16">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Featured Stories
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featured.map((post) => (
                  <article
                    key={post.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                  >
                    <div className="relative overflow-hidden">
                      {post.image && (
                        <AppImage
                          src={post.image}
                          alt={post.alt || post.title || "Featured story"}
                          width={700}
                          height={380}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                        Featured
                      </div>
                    </div>

                    <div className="p-6">
                      <PostMeta post={post} />

                      <h3 className="font-bold text-foreground text-xl mb-3 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between gap-3">
                        <AuthorDetails post={post} featured />

                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline shrink-0"
                        >
                          Read More
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter: URL-based, server-rendered */}
        <section className="py-6 bg-card border-y border-border sticky top-16 z-30">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            <nav
              aria-label="Filter blog posts by category"
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const href =
                  cat === "All"
                    ? "/blog"
                    : `/blog?category=${encodeURIComponent(cat)}`;

                return (
                  <Link
                    key={cat}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-card"
                        : "bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </nav>
          </div>
        </section>

        {/* All Posts */}
        <section className="py-12 lg:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 xl:px-16">
            {rest.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <article
                    key={post.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group"
                  >
                    <div className="relative overflow-hidden">
                      {post.image && (
                        <AppImage
                          src={post.image}
                          alt={post.alt || post.title || "Blog story"}
                          width={500}
                          height={280}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    <div className="p-5">
                      <PostMeta post={post} />

                      <h2 className="font-bold text-foreground text-base mb-2 leading-snug line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full"
                            >
                              <Tag size={9} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
                        <AuthorDetails post={post} />

                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
                        >
                          Read
                          <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen
                  size={40}
                  className="mx-auto mb-4 text-muted-foreground"
                />

                <h2 className="text-xl font-semibold text-foreground mb-2">
                  No stories found
                </h2>

                <p className="text-muted-foreground mb-5">
                  {blogPosts.length === 0
                    ? "There are no blog posts available right now. Please try again later."
                    : `There are no posts in the ${activeCategory} category yet.`}
                </p>

                {activeCategory !== "All" && (
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
                  >
                    View all stories
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}