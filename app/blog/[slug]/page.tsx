import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts } from "@/data/dummyData";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "image-paragraph";
      src: string;
      alt: string;
      caption?: string;
      text: string;
      imagePosition?: "left" | "right";
    }
  | {
      type: "paragraph-image";
      src: string;
      alt: string;
      caption?: string;
      text: string;
      imagePosition?: "left" | "right";
    }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "quote"; text: string; author?: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[];
  category: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  storyImages: string[];
  alt: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

// -------- Data --------
async function getPost(slug: string): Promise<BlogPost | null> {
  const posts: BlogPost[] = blogPosts;
  return posts.find((p) => p.slug === slug) ?? null;
}

// -------- SEO --------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.alt }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

// -------- Helpers --------
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// -------- Content Renderer --------
function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level === 3 ? "h3" : "h2";
            return (
              <Tag
                key={i}
                className={
                  block.level === 3
                    ? "text-xl font-bold text-gray-900"
                    : "text-2xl font-bold text-gray-900"
                }
              >
                {block.text}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p key={i} className="text-lg leading-relaxed text-gray-700">
                {block.text}
              </p>
            );

          case "image":
            return (
              <figure key={i} className="my-6">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "image-paragraph": {
            const isLeft = block.imagePosition !== "right";
            return (
              <div
                key={i}
                className="grid items-center gap-6 md:grid-cols-2"
              >
                <div className={isLeft ? "md:order-1" : "md:order-2"}>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
                <div className={isLeft ? "md:order-2" : "md:order-1"}>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {block.text}
                  </p>
                </div>
              </div>
            );
          }

          case "paragraph-image": {
            const isLeft = block.imagePosition !== "right";
            return (
              <div
                key={i}
                className="grid items-center gap-6 md:grid-cols-2"
              >
                <div className={isLeft ? "md:order-1" : "md:order-2"}>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {block.text}
                  </p>
                </div>
                <div className={isLeft ? "md:order-2" : "md:order-1"}>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                </div>
              </div>
            );
          }

          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-blue-600 bg-blue-50 py-4 pl-6 pr-4 italic"
              >
                <p className="text-lg text-gray-800">"{block.text}"</p>
                {block.author && (
                  <footer className="mt-2 text-sm font-semibold text-blue-700 not-italic">
                    — {block.author}
                  </footer>
                )}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

// -------- Page --------
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/blog" className="hover:text-blue-700">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{post.category}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
            {post.category}
          </span>
          <span className="text-gray-500">{post.readTime} min read</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{post.excerpt}</p>
      </header>

      {/* Hero image */}
      <figure className="mb-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.alt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>
      </figure>

      {/* Author */}
      <div className="mb-10 flex items-center gap-3 border-b border-gray-200 pb-6">
        <Image
          src={post.authorAvatar}
          alt={post.author}
          width={52}
          height={52}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-sm text-gray-500">
            {post.authorRole} · {formatDate(post.date)}
          </p>
        </div>
      </div>

      {/* Content blocks */}
      <article className="prose-lg">
        <ContentRenderer blocks={post.content} />
      </article>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Back link */}
      <div className="mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:gap-3 transition-all"
        >
          ← Back to all stories
        </Link>
      </div>
    </main>
  );
}