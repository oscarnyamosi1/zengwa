'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  Save,
  Send,
  Users,
  Ticket,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  X,
} from 'lucide-react';

type EventForm = {
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate: string;
  time: string;
  location: string;
  type: string;
  image: string;
  alt: string;
  gallery: string[];
  capacity: number;
  free: boolean;
  price: number;
  currency: string;
};

type EventPayload = {
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  type: string;
  image: string;
  alt: string;
  gallery: string[];
  attendees: number;
  capacity: number;
  free: boolean;
  price?: number;
  currency?: string;
};

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://127.0.0.1:8000/api'
).replace(/\/+$/, '');

const EVENT_ENDPOINT = `${BACKEND_URL}/createevent/`;

const EVENT_TYPES = [
  'Conference',
  'Fundraising',
  'Workshop',
  'Community',
  'Education',
  'Networking',
  'Celebration',
  'Other',
];

const initialForm: EventForm = {
  title: '',
  slug: '',
  description: '',
  date: '',
  endDate: '',
  time: '',
  location: '',
  type: 'Community',
  image: '',
  alt: '',
  gallery: [],
  capacity: 100,
  free: true,
  price: 0,
  currency: 'KES',
};

function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180);
}

function formatEventDate(value: string): string {
  if (!value) return 'Event date';

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-KE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

export default function CreateEventPage() {
  const [form, setForm] = useState<EventForm>(initialForm);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [galleryInput, setGalleryInput] = useState('');
  const [previewMode, setPreviewMode] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [createdSlug, setCreatedSlug] = useState('');

  const [backendEventUrl, setBackendEventUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBackendEventUrl(window.location.origin);
    }
  }, []);

  const previewSlug = useMemo(
    () => slugify(form.slug || form.title),
    [form.slug, form.title],
  );

  const eventUrl = previewSlug
    ? `${backendEventUrl}/events/${previewSlug}/`
    : '';

  const updateField = <K extends keyof EventForm>(
    field: K,
    value: EventForm[K],
  ) => {
    setForm((previous) => {
      const next = { ...previous, [field]: value };

      if (field === 'title' && !slugManuallyEdited) {
        next.slug = slugify(String(value));
      }

      return next;
    });
  };

  const handleTitleChange = (value: string) => {
    setForm((previous) => ({
      ...previous,
      title: value,
      slug: slugManuallyEdited ? previous.slug : slugify(value),
    }));
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);

    setForm((previous) => ({
      ...previous,
      slug: slugify(value),
    }));
  };

  const resetSlugFromTitle = () => {
    setSlugManuallyEdited(false);

    setForm((previous) => ({
      ...previous,
      slug: slugify(previous.title),
    }));
  };

  const addGalleryImage = () => {
    const url = galleryInput.trim();

    if (!url) return;

    if (!/^https?:\/\/\S+/i.test(url)) {
      setError('Enter a valid gallery image URL starting with http:// or https://.');
      return;
    }

    if (form.gallery.includes(url)) {
      setError('That image has already been added.');
      return;
    }

    setForm((previous) => ({
      ...previous,
      gallery: [...previous.gallery, url],
    }));

    setGalleryInput('');
    setError('');
  };

  const removeGalleryImage = (index: number) => {
    setForm((previous) => ({
      ...previous,
      gallery: previous.gallery.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): string | null => {
    if (!form.title.trim()) return 'Enter an event title.';
    if (!slugify(form.slug)) return 'Enter a valid event slug.';
    if (!form.description.trim()) return 'Enter an event description.';
    if (!form.date) return 'Choose the event date.';
    if (form.endDate && form.endDate < form.date) {
      return 'The event end date cannot be before the start date.';
    }
    if (!form.time) return 'Choose the event time.';
    if (!form.location.trim()) return 'Enter the event location.';
    if (!form.type) return 'Choose an event category.';
    if (!form.image.trim()) return 'Add a cover image URL.';
    if (!/^https?:\/\/\S+/i.test(form.image.trim())) {
      return 'The cover image must be a valid HTTP or HTTPS URL.';
    }
    if (form.capacity < 1) return 'Capacity must be at least one person.';
    if (!form.free && form.price <= 0) {
      return 'Enter a ticket price greater than zero.';
    }

    return null;
  };

  const saveEvent = async (shouldPublish: boolean) => {
    setError('');
    setMessage('');
    setCreatedSlug('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const finalSlug = slugify(form.slug || form.title);

    const payload: EventPayload & { status?: string } = {
      title: form.title.trim(),
      slug: finalSlug,
      description: form.description.trim(),
      // Send ISO dates to Django; format them for display in the frontend.
      date: form.date,
      ...(form.endDate ? { endDate: form.endDate } : {}),
      time: form.time,
      location: form.location.trim(),
      type: form.type,
      image: form.image.trim(),
      alt: form.alt.trim() || form.title.trim(),
      gallery: form.gallery,
      attendees: 0,
      capacity: Number(form.capacity),
      free: form.free,
      ...(form.free
        ? {}
        : {
            price: Number(form.price),
            currency: form.currency,
          }),
      ...(shouldPublish ? { status: 'published' } : { status: 'draft' }),
    };

    setSaving(true);
    setPublishing(shouldPublish);

    try {
      const response = await fetch(EVENT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const detail =
          responseData?.detail ||
          responseData?.message ||
          responseData?.slug?.[0] ||
          responseData?.title?.[0] ||
          responseData?.non_field_errors?.[0] ||
          (typeof responseData === 'string' ? responseData : '');

        throw new Error(
          detail ||
            `Could not ${shouldPublish ? 'publish' : 'save'} the event. HTTP ${response.status}.`,
        );
      }

      // Prefer the slug returned by Django, if available.
      const savedSlug = slugify(responseData?.slug || finalSlug);

      setCreatedSlug(savedSlug);
      setMessage(
        shouldPublish
          ? 'Your event has been submitted for publishing.'
          : 'Your event has been saved successfully.',
      );

      setForm((previous) => ({
        ...previous,
        slug: savedSlug,
      }));

      setSlugManuallyEdited(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while saving the event.',
      );
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-[#202124]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Link
              href="/events"
              aria-label="Back to events"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="mb-1 text-sm text-gray-500">
                Events / Create event
              </p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Create an event
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Add the event details, prepare its public URL, and preview how
                it will appear to visitors.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPreviewMode((previous) => !previous)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium transition hover:bg-gray-50"
          >
            <Eye size={17} />
            {previewMode ? 'Hide preview' : 'Show preview'}
          </button>
        </header>

        {/* Feedback */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <p className="flex-1">{error}</p>
            <button
              type="button"
              onClick={() => setError('')}
              aria-label="Dismiss error"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{message}</p>

                {createdSlug && (
                  <div className="mt-2 space-y-1">
                    <p className="break-all">
                      <span className="font-medium">Slug: </span>
                      {createdSlug}
                    </p>

                    <p className="break-all">
                      <span className="font-medium">Event URL: </span>
                      {backendEventUrl}/events/{createdSlug}/
                    </p>

                    <Link
                      href={`/events/${createdSlug}`}
                      className="mt-2 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
                    >
                      View event page
                      <LinkIcon size={14} />
                    </Link>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMessage('')}
                aria-label="Dismiss message"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        )}

        <div
          className={`grid items-start gap-6 ${
            previewMode
              ? 'lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)]'
              : 'grid-cols-1'
          }`}
        >
          {/* Form */}
          <section className="min-w-0 space-y-6">
            {/* Basic details */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Basic information</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Give your event a clear title, description, and category.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium"
                  >
                    Event title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    maxLength={200}
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Donor Appreciation Breakfast"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                {/* Slug */}
                <div>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium"
                    >
                      Event slug <span className="text-red-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={resetSlugFromTitle}
                      className="text-xs font-medium text-gray-600 underline underline-offset-4 hover:text-black"
                    >
                      Generate from title
                    </button>
                  </div>

                  <div className="flex min-w-0 items-center rounded-xl border border-gray-200 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-100">
                    <span className="shrink-0 pl-3 text-sm text-gray-400">
                      /
                    </span>
                    <input
                      id="slug"
                      type="text"
                      required
                      maxLength={180}
                      value={form.slug}
                      onChange={(e) => handleSlugChange(e.target.value)}
                      placeholder="donor-appreciation-breakfast"
                      className="min-w-0 flex-1 rounded-xl bg-transparent px-2 py-3 text-sm outline-none"
                    />
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Generated from the title automatically. You can customize
                    it, but use lowercase letters, numbers, and hyphens.
                  </p>

                  <div className="mt-3 rounded-xl bg-gray-50 p-3">
                    <p className="mb-1 text-xs font-medium text-gray-500">
                      FRONTEND URL PREVIEW
                    </p>
                    <p className="break-all text-sm font-medium text-gray-800">
                      {backendEventUrl || 'https://yourdomain.com'}
                      /events/{previewSlug || 'your-event-slug'}/
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={5}
                    maxLength={5000}
                    value={form.description}
                    onChange={(e) =>
                      updateField('description', e.target.value)
                    }
                    placeholder="Tell people what the event is about, who should attend, and what they can expect."
                    className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                  <p className="mt-1 text-right text-xs text-gray-400">
                    {form.description.length}/5000
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-medium"
                  >
                    Event category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    value={form.type}
                    onChange={(e) => updateField('type', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date and location */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">
                  Date, time and location
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Tell visitors when and where the event will take place.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-medium"
                  >
                    Start date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => updateField('date', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-2 block text-sm font-medium"
                  >
                    End date <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    min={form.date || undefined}
                    value={form.endDate}
                    onChange={(e) => updateField('endDate', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-medium"
                  >
                    Start time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="time"
                      type="time"
                      required
                      value={form.time}
                      onChange={(e) => updateField('time', e.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium"
                  >
                    Venue or location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={17}
                      className="pointer-events-none absolute left-3 top-3.5 text-gray-400"
                    />
                    <input
                      id="location"
                      type="text"
                      required
                      value={form.location}
                      onChange={(e) =>
                        updateField('location', e.target.value)
                      }
                      placeholder="e.g. Kisii, Kenya or an online meeting"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <ImageIcon size={19} />
                  Event images
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add a cover image and optional gallery images using image URLs.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-medium"
                  >
                    Cover image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="image"
                    type="url"
                    required
                    value={form.image}
                    onChange={(e) => updateField('image', e.target.value)}
                    placeholder="https://example.com/event-cover.jpg"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="alt"
                    className="mb-2 block text-sm font-medium"
                  >
                    Image description / alt text
                  </label>
                  <input
                    id="alt"
                    type="text"
                    maxLength={250}
                    value={form.alt}
                    onChange={(e) => updateField('alt', e.target.value)}
                    placeholder="Describe what appears in the image"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                {form.image && (
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <img
                      src={form.image}
                      alt={form.alt || form.title || 'Event cover preview'}
                      className="max-h-72 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = 'block';
                      }}
                    />
                  </div>
                )}

                <div className="border-t border-gray-100 pt-5">
                  <label
                    htmlFor="gallery"
                    className="mb-2 block text-sm font-medium"
                  >
                    Gallery image URLs
                    <span className="ml-2 font-normal text-gray-400">
                      (optional)
                    </span>
                  </label>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      id="gallery"
                      type="url"
                      value={galleryInput}
                      onChange={(e) => setGalleryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addGalleryImage();
                        }
                      }}
                      placeholder="https://example.com/gallery-image.jpg"
                      className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                    <button
                      type="button"
                      onClick={addGalleryImage}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium transition hover:bg-gray-50"
                    >
                      <Plus size={16} />
                      Add image
                    </button>
                  </div>

                  {form.gallery.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {form.gallery.map((url, index) => (
                        <div
                          key={`${url}-${index}`}
                          className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-100 p-3"
                        >
                          <ImageIcon
                            size={17}
                            className="shrink-0 text-gray-400"
                          />
                          <p className="min-w-0 flex-1 break-all text-xs text-gray-600">
                            {url}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            aria-label={`Remove gallery image ${index + 1}`}
                            className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tickets and capacity */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <Ticket size={19} />
                  Tickets and attendance
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure the ticket price and the maximum number of attendees.
                </p>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateField('free', true)}
                  className={`rounded-xl border p-4 text-left transition ${
                    form.free
                      ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold">Free event</p>
                  <p className="mt-1 text-xs text-gray-500">
                    No ticket charge
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('free', false)}
                  className={`rounded-xl border p-4 text-left transition ${
                    !form.free
                      ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold">Paid event</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Charge for tickets
                  </p>
                </button>
              </div>

              {!form.free && (
                <div className="mb-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium"
                    >
                      Ticket price <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="price"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={form.price || ''}
                      onChange={(e) =>
                        updateField('price', Number(e.target.value))
                      }
                      placeholder="e.g. 1500"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="currency"
                      className="mb-2 block text-sm font-medium"
                    >
                      Currency
                    </label>
                    <select
                      id="currency"
                      value={form.currency}
                      onChange={(e) =>
                        updateField('currency', e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    >
                      <option value="KES">KES — Kenyan Shilling</option>
                      <option value="USD">USD — US Dollar</option>
                      <option value="EUR">EUR — Euro</option>
                      <option value="GBP">GBP — British Pound</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="capacity"
                  className="mb-2 block text-sm font-medium"
                >
                  Maximum attendees
                </label>
                <div className="relative">
                  <Users
                    size={17}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="capacity"
                    type="number"
                    min="1"
                    step="1"
                    required
                    value={form.capacity}
                    onChange={(e) =>
                      updateField(
                        'capacity',
                        Math.max(1, Number(e.target.value) || 1),
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 pl-10 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Registered attendees will start at zero. The backend should
                  update this count when registrations are completed.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={saving}
                onClick={() => saveEvent(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && !publishing ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                Save draft
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => saveEvent(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && publishing ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Send size={17} />
                )}
                {publishing ? 'Submitting...' : 'Publish event'}
              </button>
            </div>
          </section>

          {/* Live preview */}
          {previewMode && (
            <aside className="min-w-0 lg:sticky lg:top-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Live preview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  This preview updates as you edit the form.
                </p>
              </div>

              <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt={form.alt || form.title || 'Event cover'}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = 'block';
                      }}
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                      <ImageIcon size={36} strokeWidth={1.3} />
                      <span className="text-xs">Event cover image</span>
                    </div>
                  )}

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                      {form.type || 'Event'}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">
                      {form.free
                        ? 'FREE'
                        : formatCurrency(
                            Number(form.price) || 0,
                            form.currency,
                          )}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold leading-snug tracking-tight">
                    {form.title || 'Your event title'}
                  </h3>

                  <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-gray-600">
                    {form.description ||
                      'Your event description will appear here. Add details about what attendees can expect.'}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                    <div className="flex items-start gap-3 text-sm">
                      <CalendarDays
                        size={17}
                        className="mt-0.5 shrink-0 text-gray-500"
                      />
                      <div>
                        <p className="font-medium">
                          {formatEventDate(form.date)}
                        </p>
                        {form.endDate && form.endDate !== form.date && (
                          <p className="mt-1 text-xs text-gray-500">
                            Until {formatEventDate(form.endDate)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Clock
                        size={17}
                        className="shrink-0 text-gray-500"
                      />
                      <span>
                        {form.time
                          ? new Date(
                              `2000-01-01T${form.time}`,
                            ).toLocaleTimeString('en-KE', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })
                          : 'Event time'}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-gray-500"
                      />
                      <span>{form.location || 'Event location'}</span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-gray-50 p-3">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-gray-600">Registered</span>
                      <span className="font-semibold">0</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                      <span className="text-gray-600">Capacity</span>
                      <span className="font-semibold">
                        {form.capacity.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full w-0 rounded-full bg-gray-900" />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {form.capacity.toLocaleString()} spots available
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="mt-5 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white opacity-90"
                  >
                    Register Now
                  </button>

                  <p className="mt-3 text-center text-xs text-gray-400">
                    Registration button shown for preview only
                  </p>
                </div>
              </article>

              <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <LinkIcon size={16} className="text-gray-500" />
                  <h3 className="text-sm font-semibold">Event permalink</h3>
                </div>
                <p className="break-all text-sm leading-6 text-gray-600">
                  {backendEventUrl || 'https://yourdomain.com'}
                  /events/{previewSlug || 'your-event-slug'}/
                </p>
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Your frontend event detail page should use this slug to
                  retrieve the event from Django.
                </p>
              </div>

              {form.gallery.length > 0 && (
                <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4">
                  <h3 className="mb-3 text-sm font-semibold">
                    Gallery preview ({form.gallery.length})
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {form.gallery.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="aspect-square overflow-hidden rounded-lg bg-gray-100"
                      >
                        <img
                          src={url}
                          alt={`Event gallery image ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
