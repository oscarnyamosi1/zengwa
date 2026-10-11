'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon,
  Type, AlignLeft, Quote as QuoteIcon, Save, Send,
  CheckCircle2, XCircle, Clock, User, Mail, Eye, EyeOff,
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────
type BlockStatus = 'draft' | 'approved' | 'rejected';
type HeadingLevel = 2 | 3 | 4;
type HeadingSize = 'sm' | 'md' | 'lg';
type HeadingColor = 'default' | 'primary' | 'accent';
type HeadingRelevance = 'primary' | 'secondary' | 'tertiary';
type ImagePosition = 'left' | 'right';

interface BaseBlock {
  id: string;
  status: BlockStatus;
}

interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  text: string;
}

interface HeadingBlock extends BaseBlock {
  type: 'heading';
  text: string;
  level: HeadingLevel;
  size: HeadingSize;
  color: HeadingColor;
  relevance: HeadingRelevance;
}

interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt: string;
  caption: string;
}

interface ImageParagraphBlock extends BaseBlock {
  type: 'image-paragraph';
  src: string;
  alt: string;
  caption: string;
  text: string;
  imagePosition: ImagePosition;
}

interface ParagraphImageBlock extends BaseBlock {
  type: 'paragraph-image';
  src: string;
  alt: string;
  caption: string;
  text: string;
  imagePosition: ImagePosition;
}

interface QuoteBlock extends BaseBlock {
  type: 'quote';
  text: string;
  author: string;
}

type DraftBlock =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | ImageParagraphBlock
  | ParagraphImageBlock
  | QuoteBlock;

interface EditorMeta {
  name: string;
  email: string;
  role: string;
}

// ──────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  'Water Projects',
  'Child Sponsorship',
  'Ministry Updates',
  'Volunteers',
  'Church Planting',
  'Infrastructure',
];

const HEADING_SIZES: { value: HeadingSize; label: string }[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

const HEADING_COLORS: { value: HeadingColor; label: string; swatch: string }[] = [
  { value: 'default', label: 'Default', swatch: 'bg-gray-900' },
  { value: 'primary', label: 'Primary', swatch: 'bg-blue-600' },
  { value: 'accent', label: 'Accent', swatch: 'bg-amber-500' },
];

const HEADING_RELEVANCE: { value: HeadingRelevance; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
];

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────
const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `b-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function headingClasses(
  size: HeadingSize,
  color: HeadingColor,
  relevance: HeadingRelevance
) {
  const s = { sm: 'text-xl', md: 'text-2xl', lg: 'text-3xl' }[size];
  const c = {
    default: 'text-gray-900',
    primary: 'text-blue-700',
    accent: 'text-amber-600',
  }[color];
  const w = {
    primary: 'font-bold',
    secondary: 'font-semibold',
    tertiary: 'font-medium',
  }[relevance];
  return `${s} ${c} ${w} leading-snug`;
}

// ──────────────────────────────────────────────────────────────
// Small reusable UI atoms
// ──────────────────────────────────────────────────────────────
function Field({
  label,
  children,
  hint,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${props.className ?? ''}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${props.className ?? ''}`}
    />
  );
}

// ✅ FIX: widened T to allow string | number, and String() the key
function PillGroup<T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; swatch?: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              active
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
            }`}
          >
            {opt.swatch && (
              <span
                className={`inline-block h-3 w-3 rounded-full ${opt.swatch} ${
                  active ? 'ring-2 ring-white/60' : ''
                }`}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: BlockStatus }) {
  const config = {
    draft: { icon: Clock, cls: 'bg-gray-100 text-gray-700', label: 'Draft' },
    approved: {
      icon: CheckCircle2,
      cls: 'bg-green-100 text-green-700',
      label: 'Approved',
    },
    rejected: {
      icon: XCircle,
      cls: 'bg-red-100 text-red-700',
      label: 'Rejected',
    },
  }[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${config.cls}`}
    >
      <Icon size={12} /> {config.label}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────
export default function NewBlogPostPage() {
  // --- Post metadata ---
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagsInput, setTagsInput] = useState('');
  const [featured, setFeatured] = useState(false);

  // --- Cover picture ---
  const [coverImage, setCoverImage] = useState('');
  const [coverAlt, setCoverAlt] = useState('');
  const [storyImages, setStoryImages] = useState<string[]>([]);
  const [newStoryImage, setNewStoryImage] = useState('');

  // --- Author ---
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');

  // --- Editor / contact ---
  const [editor, setEditor] = useState<EditorMeta>({
    name: '',
    email: '',
    role: '',
  });

  // --- Blocks ---
  const [blocks, setBlocks] = useState<DraftBlock[]>([]);

  // --- UI ---
  const [showPreview, setShowPreview] = useState(true);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const tags = useMemo(
    () =>
      tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput]
  );

  // ── Block operations ──
  const addBlock = (type: DraftBlock['type']) => {
    const base = { id: uid(), status: 'draft' as BlockStatus };
    let block: DraftBlock;
    switch (type) {
      case 'paragraph':
        block = { ...base, type: 'paragraph', text: '' };
        break;
      case 'heading':
        block = {
          ...base,
          type: 'heading',
          text: '',
          level: 2,
          size: 'md',
          color: 'default',
          relevance: 'primary',
        };
        break;
      case 'image':
        block = { ...base, type: 'image', src: '', alt: '', caption: '' };
        break;
      case 'image-paragraph':
        block = {
          ...base,
          type: 'image-paragraph',
          src: '',
          alt: '',
          caption: '',
          text: '',
          imagePosition: 'left',
        };
        break;
      case 'paragraph-image':
        block = {
          ...base,
          type: 'paragraph-image',
          src: '',
          alt: '',
          caption: '',
          text: '',
          imagePosition: 'right',
        };
        break;
      case 'quote':
        block = { ...base, type: 'quote', text: '', author: '' };
        break;
    }
    setBlocks((prev) => [...prev, block]);
  };

  const updateBlock = <T extends DraftBlock>(id: string, patch: Partial<T>) =>
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? ({ ...b, ...patch } as DraftBlock) : b))
    );

  const removeBlock = (id: string) =>
    setBlocks((prev) => prev.filter((b) => b.id !== id));

  const moveBlock = (id: string, dir: -1 | 1) =>
    setBlocks((prev) => {
      const i = prev.findIndex((b) => b.id === id);
      if (i < 0) return prev;
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const setBlockStatus = (id: string, status: BlockStatus) =>
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );

  // ── Save handlers (wire to your Django API) ──


  // const saveDraft = () => {
  //   const payload = {
  //     title,
  //     slug,
  //     excerpt,
  //     category,
  //     tags,
  //     featured,
  //     image: coverImage,
  //     alt: coverAlt,
  //     storyImages,
  //     author,
  //     authorRole,
  //     authorAvatar,
  //     editor,
  //     content: blocks.map(({ id, ...rest }) => rest),
  //   };
  //   console.log('SAVE DRAFT →', payload);
  //   setSavedAt(new Date().toLocaleTimeString());
  // };


  const saveDraft = async () => {
    const payload = {
      title,
      slug,
      excerpt,
      category,
      tags,
      featured,
      image: coverImage,
      alt: coverAlt,
      storyImages,
      author,
      authorRole,
      authorAvatar,
      editor,
      content: blocks.map(({ id, ...rest }) => rest),
    };

    try {
      const response = await fetch(`${BACKEND_URL}/createblog/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || data?.message || 'Failed to save blog');
      }

      console.log('BLOG CREATED:', data);

      setSavedAt(new Date().toLocaleTimeString());

      alert('Blog saved successfully');
    } catch (error) {
      console.error('SAVE BLOG ERROR:', error);

      alert(
        error instanceof Error
          ? error.message
          : 'Something went wrong while saving the blog'
      );
    }
  };

  const publish = () => {
    if (!blocks.every((b) => b.status === 'approved')) {
      const ok = confirm(
        'Some blocks are not approved yet. Publish anyway?'
      );
      if (!ok) return;
    }
    console.log('PUBLISH →', { title, slug, editor, blocks });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">
              ← Back to blog
            </Link>
            <h1 className="text-lg font-bold">New Post</h1>
          </div>
          <div className="flex items-center gap-2">
            {savedAt && (
              <span className="text-xs text-gray-400">Saved {savedAt}</span>
            )}
            <button
              onClick={() => setShowPreview((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPreview ? 'Hide preview' : 'Show preview'}
            </button>
            <button
              onClick={saveDraft}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <Save size={14} /> Save draft
            </button>
            <button
              onClick={publish}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Send size={14} /> Publish
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mx-auto grid max-w-7xl gap-8 px-4 py-8 ${
          showPreview ? 'lg:grid-cols-[minmax(0,1fr)_420px]' : ''
        }`}
      >
        {/* ─────────── Editor Column ─────────── */}
        <div className="space-y-6">
          {/* Basic info */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Post details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="Title">
                  <TextInput
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '')
                      );
                    }}
                    placeholder="How Clean Water Changed Everything..."
                  />
                </Field>
              </div>
              <Field label="Slug" hint="Used in the URL: /blog/your-slug">
                <TextInput
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="how-clean-water-changed-everything"
                />
              </Field>
              <Field label="Category">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Excerpt">
                  <TextArea
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="A short summary that appears in the blog list..."
                  />
                </Field>
              </div>
              <Field label="Tags" hint="Comma separated, e.g. Water, Community">
                <TextInput
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Water, Community, Impact"
                />
              </Field>
              <div className="flex items-end">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Mark as <span className="font-semibold">Featured</span>
                </label>
              </div>
            </div>
          </section>

          {/* Cover picture */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Cover picture</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Cover image URL">
                <TextInput
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://..."
                />
              </Field>
              <Field label="Alt description" hint="For accessibility & SEO">
                <TextInput
                  value={coverAlt}
                  onChange={(e) => setCoverAlt(e.target.value)}
                  placeholder="Community members celebrating..."
                />
              </Field>
            </div>

            {coverImage && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
                <div className="relative aspect-[16/9] bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt={coverAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold">Story gallery</h3>
              <div className="flex gap-2">
                <TextInput
                  value={newStoryImage}
                  onChange={(e) => setNewStoryImage(e.target.value)}
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newStoryImage.trim()) return;
                    setStoryImages((s) => [...s, newStoryImage.trim()]);
                    setNewStoryImage('');
                  }}
                  className="shrink-0 rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  <Plus size={14} />
                </button>
              </div>
              {storyImages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {storyImages.map((src, i) => (
                    <div
                      key={i}
                      className="group relative h-20 w-28 overflow-hidden rounded-lg border border-gray-200"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setStoryImages((s) => s.filter((_, idx) => idx !== i))
                        }
                        className="absolute right-1 top-1 hidden rounded-full bg-black/60 p-1 text-white group-hover:block"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Author + Editor */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <User size={16} /> Author
              </h2>
              <div className="space-y-3">
                <Field label="Name">
                  <TextInput
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Pastor James Mwangi"
                  />
                </Field>
                <Field label="Role">
                  <TextInput
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Founder & Director"
                  />
                </Field>
                <Field label="Avatar URL">
                  <TextInput
                    value={authorAvatar}
                    onChange={(e) => setAuthorAvatar(e.target.value)}
                    placeholder="https://..."
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <Mail size={16} /> Editor & contact
              </h2>
              <div className="space-y-3">
                <Field label="Editor name">
                  <TextInput
                    value={editor.name}
                    onChange={(e) =>
                      setEditor((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="Grace Odhiambo"
                  />
                </Field>
                <Field label="Editor role">
                  <TextInput
                    value={editor.role}
                    onChange={(e) =>
                      setEditor((s) => ({ ...s, role: e.target.value }))
                    }
                    placeholder="Content Editor"
                  />
                </Field>
                <Field label="Contact email">
                  <TextInput
                    type="email"
                    value={editor.email}
                    onChange={(e) =>
                      setEditor((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="editor@ministry.org"
                  />
                </Field>
              </div>
            </div>
          </section>

          {/* Content builder */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Content</h2>
              <span className="text-xs text-gray-500">
                {blocks.length} block{blocks.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* Add-block toolbar */}
            <div className="mb-6 flex flex-wrap gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3">
              <span className="py-1.5 pr-2 text-xs font-semibold uppercase text-gray-500">
                Add:
              </span>
              {[
                { type: 'paragraph', icon: AlignLeft, label: 'Paragraph' },
                { type: 'heading', icon: Type, label: 'Heading' },
                { type: 'image', icon: ImageIcon, label: 'Image' },
                {
                  type: 'image-paragraph',
                  icon: ImageIcon,
                  label: 'Image + Paragraph',
                },
                {
                  type: 'paragraph-image',
                  icon: ImageIcon,
                  label: 'Paragraph + Image',
                },
                { type: 'quote', icon: QuoteIcon, label: 'Quote' },
              ].map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addBlock(type as DraftBlock['type'])}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:border-blue-400 hover:text-blue-700"
                >
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

            {/* Blocks */}
            {blocks.length === 0 ? (
              <p className="rounded-xl border border-dashed border-gray-300 py-10 text-center text-sm text-gray-400">
                No content yet. Add a block above to start writing.
              </p>
            ) : (
              <div className="space-y-4">
                {blocks.map((block, i) => (
                  <BlockEditor
                    key={block.id}
                    index={i}
                    total={blocks.length}
                    block={block}
                    onChange={(patch) => updateBlock(block.id, patch)}
                    onRemove={() => removeBlock(block.id)}
                    onMove={(dir) => moveBlock(block.id, dir)}
                    onStatus={(s) => setBlockStatus(block.id, s)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ─────────── Preview Column ─────────── */}
        {showPreview && (
          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
                Live preview
              </h2>

              {coverImage && (
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt={coverAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {category && (
                <span className="mb-2 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {category}
                </span>
              )}

              <h1 className="mb-2 text-2xl font-bold leading-tight">
                {title || 'Untitled post'}
              </h1>
              {excerpt && (
                <p className="mb-4 text-sm text-gray-600">{excerpt}</p>
              )}

              {author && (
                <div className="mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                  {authorAvatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={authorAvatar}
                      alt={author}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-xs font-semibold">{author}</p>
                    <p className="text-xs text-gray-500">{authorRole}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {blocks.map((b) => (
                  <PreviewBlock key={b.id} block={b} />
                ))}
              </div>

              {editor.name && (
                <div className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500">
                  Edited by <span className="font-semibold">{editor.name}</span>
                  {editor.email && (
                    <>
                      {' · '}
                      <a
                        href={`mailto:${editor.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {editor.email}
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Block editor card
// ──────────────────────────────────────────────────────────────
function BlockEditor({
  block,
  index,
  total,
  onChange,
  onRemove,
  onMove,
  onStatus,
}: {
  block: DraftBlock;
  index: number;
  total: number;
  onChange: (patch: Partial<DraftBlock>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  onStatus: (s: BlockStatus) => void;
}) {
  const borderByStatus = {
    draft: 'border-gray-200',
    approved: 'border-green-300',
    rejected: 'border-red-300',
  }[block.status];

  return (
    <div className={`rounded-xl border-2 ${borderByStatus} bg-white p-4`}>
      {/* Header row */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-bold uppercase text-gray-600">
            #{index + 1} · {block.type.replace('-', ' ')}
          </span>
          <StatusBadge status={block.status} />
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(-1)}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
            title="Move up"
          >
            <ArrowUp size={14} />
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
            title="Move down"
          >
            <ArrowDown size={14} />
          </button>
          <button
            type="button"
            onClick={() => onStatus('approved')}
            className="rounded-md p-1.5 text-green-600 hover:bg-green-50"
            title="Approve"
          >
            <CheckCircle2 size={14} />
          </button>
          <button
            type="button"
            onClick={() => onStatus('rejected')}
            className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
            title="Reject"
          >
            <XCircle size={14} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded-md p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Type-specific fields */}
      {block.type === 'paragraph' && (
        <TextArea
          rows={3}
          value={block.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="Write your paragraph..."
        />
      )}

      {block.type === 'heading' && (
        <div className="space-y-3">
          <Field label="Heading text">
            <TextInput
              value={block.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="A Community Transformed"
            />
          </Field>

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Level
              </span>
              <PillGroup<HeadingLevel>
                value={block.level}
                onChange={(v) => onChange({ level: v })}
                options={[
                  { value: 2, label: 'H2' },
                  { value: 3, label: 'H3' },
                  { value: 4, label: 'H4' },
                ]}
              />
            </div>
            <div>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Size
              </span>
              <PillGroup<HeadingSize>
                value={block.size}
                onChange={(v) => onChange({ size: v })}
                options={HEADING_SIZES}
              />
            </div>
            <div>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
                Color
              </span>
              <PillGroup<HeadingColor>
                value={block.color}
                onChange={(v) => onChange({ color: v })}
                options={HEADING_COLORS}
              />
            </div>
          </div>

          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Relevance
            </span>
            <PillGroup<HeadingRelevance>
              value={block.relevance}
              onChange={(v) => onChange({ relevance: v })}
              options={HEADING_RELEVANCE}
            />
          </div>

          {block.text && (
            <div className="mt-2 rounded-lg bg-gray-50 p-3">
              <p
                className={headingClasses(
                  block.size,
                  block.color,
                  block.relevance
                )}
              >
                {block.text}
              </p>
            </div>
          )}
        </div>
      )}

      {block.type === 'image' && (
        <div className="space-y-3">
          <Field label="Image URL">
            <TextInput
              value={block.src}
              onChange={(e) => onChange({ src: e.target.value })}
              placeholder="https://..."
            />
          </Field>
          <Field label="Alt text" hint="Describe the image for accessibility">
            <TextInput
              value={block.alt}
              onChange={(e) => onChange({ alt: e.target.value })}
              placeholder="Solar panels installed on the school roof"
            />
          </Field>
          <Field label="Caption (optional)">
            <TextInput
              value={block.caption}
              onChange={(e) => onChange({ caption: e.target.value })}
              placeholder="The moment water first flowed"
            />
          </Field>
        </div>
      )}

      {(block.type === 'image-paragraph' ||
        block.type === 'paragraph-image') && (
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Image URL">
              <TextInput
                value={block.src}
                onChange={(e) => onChange({ src: e.target.value })}
                placeholder="https://..."
              />
            </Field>
            <Field label="Alt text">
              <TextInput
                value={block.alt}
                onChange={(e) => onChange({ alt: e.target.value })}
                placeholder="Villagers gathered around the borehole"
              />
            </Field>
          </div>
          <Field label="Image caption (optional)">
            <TextInput
              value={block.caption}
              onChange={(e) => onChange({ caption: e.target.value })}
              placeholder="The moment water first flowed"
            />
          </Field>
          <Field label="Paragraph text">
            <TextArea
              rows={3}
              value={block.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="Write the paragraph that goes beside the image..."
            />
          </Field>
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Image position
            </span>
            <PillGroup<ImagePosition>
              value={block.imagePosition}
              onChange={(v) => onChange({ imagePosition: v })}
              options={[
                { value: 'left', label: 'Left of text' },
                { value: 'right', label: 'Right of text' },
              ]}
            />
          </div>
        </div>
      )}

      {block.type === 'quote' && (
        <div className="space-y-3">
          <Field label="Quote text">
            <TextArea
              rows={2}
              value={block.text}
              onChange={(e) => onChange({ text: e.target.value })}
              placeholder="This borehole is not just water — it is life."
            />
          </Field>
          <Field label="Attributed to (optional)">
            <TextInput
              value={block.author}
              onChange={(e) => onChange({ author: e.target.value })}
              placeholder="Pastor James Mwangi"
            />
          </Field>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Preview renderer
// ──────────────────────────────────────────────────────────────
function PreviewBlock({ block }: { block: DraftBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-sm leading-relaxed text-gray-700">{block.text}</p>
      );

    case 'heading':
      return (
        <h3
          className={headingClasses(block.size, block.color, block.relevance)}
        >
          {block.text}
        </h3>
      );

    case 'image':
      return (
        <figure>
          {block.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={block.src}
              alt={block.alt}
              className="w-full rounded-lg object-cover"
            />
          )}
          {block.caption && (
            <figcaption className="mt-1 text-center text-xs italic text-gray-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'image-paragraph':
    case 'paragraph-image': {
      const imageFirst = block.imagePosition === 'left';
      const img = (
        <div key="img">
          {block.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={block.src}
              alt={block.alt}
              className="w-full rounded-lg object-cover"
            />
          )}
          {block.caption && (
            <p className="mt-1 text-center text-xs italic text-gray-500">
              {block.caption}
            </p>
          )}
        </div>
      );
      const txt = (
        <p key="txt" className="text-sm leading-relaxed text-gray-700">
          {block.text}
        </p>
      );
      return (
        <div className="grid grid-cols-2 items-start gap-3">
          {imageFirst ? [img, txt] : [txt, img]}
        </div>
      );
    }

    case 'quote':
      return (
        <blockquote className="border-l-4 border-blue-600 bg-blue-50 py-2 pl-3 pr-2 text-sm italic text-gray-800">
          "{block.text}"
          {block.author && (
            <footer className="mt-1 text-xs font-semibold not-italic text-blue-700">
              — {block.author}
            </footer>
          )}
        </blockquote>
      );
  }
}