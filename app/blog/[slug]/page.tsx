import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "image-paragraph" | "paragraph-image";
      src: string;
      alt: string;
      caption?: string;
      text: string;
      imagePosition?: "left" | "right";
    }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "quote"; text: string; author?: string };

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: ContentBlock[] | string;
  category: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  image?: string;
  storyImages?: string[];
  alt?: string;
  date: string;
  readTime: number;
  tags: string[];
  featured: boolean;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/+$/, "");

function isContentBlock(value: unknown): value is ContentBlock {
  if (!value || typeof value !== "object") return false;

  const block = value as Record<string, unknown>;

  return (
    typeof block.type === "string" &&
    ["paragraph", "image", "image-paragraph", "paragraph-image", "heading", "quote"].includes(
      block.type
    )
  );
}

function normalizePost(raw: Record<string, unknown>): BlogPost {
  const rawContent = raw.content;

  let content: ContentBlock[] | string = [];

  if (Array.isArray(rawContent)) {
    content = rawContent.filter(isContentBlock);
  } else if (typeof rawContent === "string") {
    content = rawContent;
  }

  const rawTags = raw.tags;

  return {
    id: (raw.id as string | number) ?? "",
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? "Untitled story"),
    excerpt: String(raw.excerpt ?? ""),
    content,
    category: String(raw.category ?? "Ministry Updates"),
    author: String(raw.author ?? "Ministry Team"),
    authorRole: String(raw.authorRole ?? raw.author_role ?? ""),
    authorAvatar: String(
      raw.authorAvatar ?? raw.author_avatar ?? ""
    ),
    image: String(raw.image ?? ""),
    storyImages: Array.isArray(raw.storyImages)
      ? raw.storyImages.filter(
          (item): item is string => typeof item === "string"
        )
      : Array.isArray(raw.story_images)
        ? raw.story_images.filter(
            (item): item is string => typeof item === "string"
          )
        : [],
    alt: String(raw.alt ?? raw.title ?? "Blog story"),
    date: String(raw.date ?? raw.created_at ?? ""),
    readTime: Number(raw.readTime ?? raw.read_time ?? 1),
    tags: Array.isArray(rawTags)
      ? rawTags.map(String)
      : [],
    featured: Boolean(raw.featured),
  };
}

async function getPost(slug: string): Promise<BlogPost | null> {
  if (!BACKEND_URL) {
    throw new Error(
      "BACKEND_URL is missing. Add it to your .env.local file."
    );
  }

  const response = await fetch(`${BACKEND_URL}/getblogposts/`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Django blog API returned ${response.status} ${response.statusText}`
    );
  }

  const data: unknown = await response.json();

  let records: unknown[] = [];

  if (Array.isArray(data)) {
    records = data;
  } else if (data && typeof data === "object") {
    const payload = data as Record<string, unknown>;

    if (Array.isArray(payload.results)) {
      records = payload.results;
    } else if (Array.isArray(payload.data)) {
      records = payload.data;
    } else if (Array.isArray(payload.posts)) {
      records = payload.posts;
    } else if (payload.slug) {
      records = [payload];
    }
  }

  const posts = records
    .filter(
      (item): item is Record<string, unknown> =>
        Boolean(item) && typeof item === "object"
    )
    .map(normalizePost);

  return (
    posts.find(
      (post) => post.slug.toLowerCase() === slug.toLowerCase()
    ) ?? null
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) return dateStr;

  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Story Not Found | Ministry Blog",
      robots: { index: false, follow: false },
    };
  }

  const metadata: Metadata = {
    title: `${post.title} | Ministry Blog`,
    description: post.excerpt || `Read ${post.title} on our ministry blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      ...(post.image ? { images: [{ url: post.image, alt: post.alt }] } : {}),
      ...(post.date
        ? { publishedTime: post.date }
        : {}),
    },
  };

  return metadata;
}

function ContentRenderer({
  blocks,
}: {
  blocks: ContentBlock[];
}) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const Heading = block.level === 3 ? "h3" : "h2";

            return (
              <Heading
                key={index}
                className={
                  block.level === 3
                    ? "text-xl font-bold text-gray-900"
                    : "text-2xl font-bold text-gray-900"
                }
              >
                {block.text}
              </Heading>
            );
          }

          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg leading-relaxed text-gray-700"
              >
                {block.text}
              </p>
            );

          case "image":
            return (
              <figure key={index} className="my-6">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
                  <SafeImage
                    src={block.src}
                    alt={block.alt}
                    className="object-cover"
                    priority={false}
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm italic text-gray-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "image-paragraph":
          case "paragraph-image": {
            const imageFirst = block.type === "image-paragraph";
            const imageLeft = block.imagePosition !== "right";

            const image = (
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  <SafeImage
                    src={block.src}
                    alt={block.alt}
                    className="object-cover"
                    priority={false}
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm italic text-gray-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

            const paragraph = (
              <p className="text-lg leading-relaxed text-gray-700">
                {block.text}
              </p>
            );

            return (
              <div
                key={index}
                className="grid items-center gap-6 md:grid-cols-2"
              >
                <div
                  className={
                    imageFirst
                      ? imageLeft
                        ? "md:order-1"
                        : "md:order-2"
                      : imageLeft
                        ? "md:order-2"
                        : "md:order-1"
                  }
                >
                  {imageFirst ? image : paragraph}
                </div>

                <div
                  className={
                    imageFirst
                      ? imageLeft
                        ? "md:order-2"
                        : "md:order-1"
                      : imageLeft
                        ? "md:order-1"
                        : "md:order-2"
                  }
                >
                  {imageFirst ? paragraph : image}
                </div>
              </div>
            );
          }

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-blue-600 bg-blue-50 py-4 pl-6 pr-4 italic"
              >
                <p className="text-lg text-gray-800">
                  “{block.text}”
                </p>
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

function SafeImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority: boolean;
}) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 bg-gray-100 ${className ?? ""}`}
      />
    );
  }

  // Use unoptimized for externally hosted images so the URL can be
  // rendered without requiring every backend image host in next.config.
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 800px"
      className={className}
      priority={priority}
      unoptimized
    />
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const contentBlocks = Array.isArray(post.content)
    ? post.content
    : [];

  const textContent =
    typeof post.content === "string" ? post.content : "";

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/blog" className="hover:text-blue-700">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{post.category}</span>
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
            {post.category}
          </span>
          <span className="text-gray-500">
            {post.readTime} min read
          </span>
        </div>

        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg text-gray-600">
            {post.excerpt}
          </p>
        )}
      </header>

      {post.image && (
        <figure className="mb-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
            <SafeImage
              src={post.image}
              alt={post.alt || post.title}
              className="object-cover"
              priority
            />
          </div>
        </figure>
      )}

      <div className="mb-10 flex items-center gap-3 border-b border-gray-200 pb-6">
        {post.authorAvatar && (
          <div className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full bg-gray-100">
            <SafeImage
              src={post.authorAvatar}
              alt={post.author}
              className="object-cover"
              priority={false}
            />
          </div>
        )}

        <div>
          <p className="font-semibold">{post.author}</p>
          <p className="text-sm text-gray-500">
            {post.authorRole ? `${post.authorRole} · ` : ""}
            {formatDate(post.date)}
          </p>
        </div>
      </div>

      <article className="prose-lg">
        {contentBlocks.length > 0 ? (
          <ContentRenderer blocks={contentBlocks} />
        ) : textContent ? (
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
            {textContent}
          </div>
        ) : (
          <p className="text-gray-500">
            The full story is not available yet.
          </p>
        )}
      </article>

      {post.storyImages.length > 0 && (
        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {post.storyImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
            >
              <SafeImage
                src={src}
                alt={`${post.title} — photo ${index + 1}`}
                className="object-cover"
                priority={false}
              />
            </div>
          ))}
        </section>
      )}

      {post.tags.length > 0 && (
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

      <div className="mt-12 border-t border-gray-200 pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-semibold text-blue-700 transition-all hover:gap-3"
        >
          ← Back to all stories
        </Link>
      </div>
    </main>
  );
}