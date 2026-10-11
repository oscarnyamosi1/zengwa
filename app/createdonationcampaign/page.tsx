'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Plus, Trash2, Save, Send, Eye, EyeOff, Image as ImageIcon,
  HeartHandshake, AlertCircle, CheckCircle2, X,
} from 'lucide-react';
import type { Campaign, CampaignReview, CampaignStorySection } from '@/types/campaign';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const starterSections: CampaignStorySection[] = [];

const inputClass =
  'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';
const labelClass = 'block text-sm font-medium text-slate-700';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={labelClass}>
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-slate-500">{hint}</span>}
    </label>
  );
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function money(value: number, currency = '') {
  const formatted = Math.round(value).toLocaleString('en-KE');
  return currency ? `${currency} ${formatted}` : formatted;
}

export default function CreateDonationCampaignPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [projectName, setProjectName] = useState('');
  const [category, setCategory] = useState('');
  const [badge, setBadge] = useState('');
  const [currency, setCurrency] = useState('');
  const [goal, setGoal] = useState('');
  const [raised, setRaised] = useState('');
  const [donors, setDonors] = useState('');
  const [daysLeft, setDaysLeft] = useState('');
  const [updates, setUpdates] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [alt, setAlt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('');
  const [sections, setSections] = useState<CampaignStorySection[]>(starterSections);
  const [reviews, setReviews] = useState<CampaignReview[]>([]);
  const [showPreview, setShowPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const goalValue = Math.max(0, Number(goal) || 0);
  const raisedValue = Math.max(0, Number(raised) || 0);
  const progress = goalValue > 0 ? Math.min(100, Math.round((raisedValue / goalValue) * 100)) : 0;

  const campaign: Campaign = useMemo(() => ({
    id: 'camp-' + slugify(slug || title),
    slug: slugify(slug),
    title: projectName,
    campaignTitle: title,
    category,
    thumbnail,
    image: images,
    alt,
    raised: raisedValue,
    donors: Math.max(0, Number(donors) || 0),
    goal: goalValue,
    daysLeft: Math.max(0, Number(daysLeft) || 0),
    badge,
    badgeColor: badge.toLowerCase() === 'urgent' ? 'bg-danger text-white' : 'bg-blue-600 text-white',
    currency,
    description,
    updates: Math.max(0, Number(updates) || 0),
    rating: reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0,
    reviews,
    story: sections,
  }), [slug, title, projectName, category, thumbnail, images, alt, raisedValue, donors, goalValue, daysLeft, badge, currency, description, updates, reviews, sections]);

  const updateSection = (id: string, patch: Partial<CampaignStorySection>) => {
    setSections((current) => current.map((section) => section.id === id ? { ...section, ...patch } : section));
  };

  const addSection = (type: CampaignStorySection['type']) => {
    setSections((current) => [...current, {
      id: `section-${Date.now()}`,
      type,
      heading: '',
      text: '',
      image: '',
      imageAlt: '',
      caption: '',
    }]);
  };

  const addReview = () => {
    setReviews((current) => [...current, {
      id: `review-${Date.now()}`, author: '', message: '', rating: 5, date: '',
    }]);
  };

  const saveCampaign = async (status: 'draft' | 'published') => {
    setNotice(null);
    if (!title.trim() || !slug.trim() || !projectName.trim()) {
      setNotice({ type: 'error', message: 'Please fill in the campaign title, URL slug, and project name.' });
      return;
    }
    if (!currency) {
      setNotice({ type: 'error', message: 'Please choose the campaign currency.' });
      return;
    }
    if (goalValue <= 0) {
      setNotice({ type: 'error', message: 'The fundraising goal must be greater than zero.' });
      return;
    }

    const payload = { ...campaign, status };
    if (!BACKEND_URL) {
      console.log('Campaign payload (configure NEXT_PUBLIC_BACKEND_URL to submit it):', payload);
      setNotice({
        type: 'error',
        message: 'NEXT_PUBLIC_BACKEND_URL is not set. The campaign payload was logged to the console, but nothing was sent to Django.',
      });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${BACKEND_URL}/createcampaign/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.detail || data?.message || 'Could not save the campaign. Check your naming it is possible it exists.');
      }
      setNotice({ type: 'success', message: status === 'draft' ? 'Campaign draft saved successfully.' : 'Campaign submitted for publishing successfully.' });
    } catch (error) {
      setNotice({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong while saving the campaign.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-black/[0.07] bg-white/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/campaign" aria-label="Back to campaigns" className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50">
              <ArrowLeft size={17} />
            </Link>
            <div>
              <p className="text-xs font-medium text-slate-500">Zengwa Christian Education Centre</p>
              <h1 className="text-base font-semibold tracking-tight sm:text-lg">Create donation campaign</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setShowPreview((value) => !value)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
              {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
              <span className="hidden sm:inline">{showPreview ? 'Hide preview' : 'Show preview'}</span>
            </button>
            <button type="button" disabled={saving} onClick={() => saveCampaign('draft')} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50">
              <Save size={15} /> Save draft
            </button>
            <button type="button" disabled={saving} onClick={() => saveCampaign('published')} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50">
              <Send size={15} /> {saving ? 'Saving…' : 'Submit campaign'}
            </button>
          </div>
        </div>
      </header>

      <div className={`mx-auto grid max-w-[1500px] items-start gap-6 px-4 py-6 sm:px-6 lg:gap-8 ${showPreview ? 'xl:grid-cols-[minmax(0,1fr)_390px]' : ''}`}>
        <div className="space-y-6">
          {notice && (
            <div role="status" className={`flex items-start gap-3 rounded-2xl border p-4 text-sm ${notice.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
              {notice.type === 'success' ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
              <span>{notice.message}</span>
              <button onClick={() => setNotice(null)} className="ml-auto" aria-label="Dismiss notice"><X size={16} /></button>
            </div>
          )}

          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading number="01" title="Campaign details" subtitle="The core information supporters see first." />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="Campaign headline">
                  <input className={inputClass} value={title} onChange={(e) => { setTitle(e.target.value); if (!slug || slug === slugify(title)) setSlug(slugify(e.target.value)); }} placeholder="e.g. Help build classrooms for local children" />
                </Field>
              </div>
              <Field label="URL slug" hint="Used in /campaign/your-slug">
                <input className={inputClass} value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="e.g. build-a-community-library" />
              </Field>
              <Field label="Project / card title">
                <input className={inputClass} value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g. Community Library Project" />
              </Field>
              <Field label="Category">
                <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose a campaign category</option>
                  {['Education', 'Water & Health', 'Child Sponsorship', 'Church', 'Infrastructure', 'Community'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
              <Field label="Campaign badge">
                <select className={inputClass} value={badge} onChange={(e) => setBadge(e.target.value)}>
                  <option value="">Choose a badge (optional)</option>
                  {['Urgent', 'Featured', 'Active', 'Completed'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Short description" hint="Keep this concise; it appears on the campaign page and can be used in the card.">
                  <textarea className={inputClass} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Field>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading number="02" title="Fundraising target" subtitle="Enter current figures and the campaign goal." />
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Currency">
                <select className={inputClass} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="">Choose currency</option><option value="KES">KES — Kenyan Shilling</option><option value="USD">USD — US Dollar</option>
                </select>
              </Field>
              <Field label="Fundraising goal">
                <input className={inputClass} type="number" min="1" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g. 500000" />
              </Field>
              <Field label="Amount raised">
                <input className={inputClass} type="number" min="0" value={raised} onChange={(e) => setRaised(e.target.value)} placeholder="0 if fundraising has not started" />
              </Field>
              <Field label="Number of donors">
                <input className={inputClass} type="number" min="0" value={donors} onChange={(e) => setDonors(e.target.value)} placeholder="e.g. 0" />
              </Field>
              <Field label="Days remaining">
                <input className={inputClass} type="number" min="0" value={daysLeft} onChange={(e) => setDaysLeft(e.target.value)} placeholder="e.g. 30" />
              </Field>
              <Field label="Campaign updates">
                <input className={inputClass} type="number" min="0" value={updates} onChange={(e) => setUpdates(e.target.value)} placeholder="e.g. 0" />
              </Field>
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm"><span className="font-medium text-slate-700">Funding progress</span><span className="font-semibold">{progress}%</span></div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} /></div>
              <div className="mt-2 flex justify-between gap-3 text-xs text-slate-500"><span>{money(raisedValue, currency)} raised</span><span>Goal: {money(goalValue, currency)}</span></div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading number="03" title="Campaign images" subtitle="Add a cover image and supporting images for the story." />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Field label="Cover image URL">
                  <input className={inputClass} value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} placeholder="https://example.com/cover-image.jpg" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Image alt text" hint="Describe the image for screen readers and search engines.">
                  <input className={inputClass} value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe what the image shows" />
                </Field>
              </div>
            </div>
            {thumbnail && <img src={thumbnail} alt={alt} className="mt-4 aspect-[16/7] w-full rounded-xl border border-slate-100 bg-slate-100 object-cover" />}
            <div className="mt-6">
              <p className="text-sm font-semibold">Gallery</p>
              <div className="mt-2 flex gap-2">
                <input className={inputClass + ' mt-0 min-w-0'} value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="Paste image URL" />
                <button type="button" onClick={() => { if (newImage.trim()) { setImages((current) => [...current, newImage.trim()]); setNewImage(''); } }} className="shrink-0 rounded-xl bg-slate-900 px-4 text-white hover:bg-slate-700" aria-label="Add image"><Plus size={17} /></button>
              </div>
              {images.length > 0 && <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">{images.map((src, index) => (
                <div key={`${src}-${index}`} className="group relative overflow-hidden rounded-xl border border-slate-200">
                  <img src={src} alt={`Campaign gallery image ${index + 1}`} className="aspect-[4/3] w-full object-cover" />
                  <button type="button" onClick={() => setImages((current) => current.filter((_, i) => i !== index))} aria-label="Remove image" className="absolute right-2 top-2 rounded-lg bg-black/65 p-1.5 text-white opacity-100 transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"><Trash2 size={14} /></button>
                </div>
              ))}</div>}
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <SectionHeading number="04" title="Campaign story" subtitle="Build the long-form campaign page with text and images." />
              <div className="flex gap-2">
                <button type="button" onClick={() => addSection('paragraph')} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50"><Plus size={13} /> Text</button>
                <button type="button" onClick={() => addSection('image')} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50"><ImageIcon size={13} /> Image section</button>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {sections.map((section, index) => (
                <div key={section.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-3 flex items-center justify-between gap-2"><span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Section {index + 1} · {section.type}</span><button type="button" onClick={() => setSections((current) => current.filter((item) => item.id !== section.id))} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Delete section"><Trash2 size={15} /></button></div>
                  <div className="space-y-3">
                    <Field label="Heading"><input className={inputClass} value={section.heading} onChange={(e) => updateSection(section.id, { heading: e.target.value })} placeholder="Section heading (optional)" /></Field>
                    <Field label="Story text"><textarea className={inputClass} rows={3} value={section.text} onChange={(e) => updateSection(section.id, { text: e.target.value })} placeholder="Explain the need, who will benefit, and how donations will help..." /></Field>
                    {section.type === 'image' && <>
                      <Field label="Image URL"><input className={inputClass} value={section.image} onChange={(e) => updateSection(section.id, { image: e.target.value })} placeholder="https://example.com/cover-image.jpg" /></Field>
                      <Field label="Image alt text"><input className={inputClass} value={section.imageAlt} onChange={(e) => updateSection(section.id, { imageAlt: e.target.value })} placeholder="Describe the image for screen readers" /></Field>
                      <Field label="Image caption"><input className={inputClass} value={section.caption} onChange={(e) => updateSection(section.id, { caption: e.target.value })} placeholder="Caption shown below the image" /></Field>
                      {section.image && <img src={section.image} alt={section.imageAlt} className="max-h-64 w-full rounded-lg object-cover" />}
                    </>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <SectionHeading number="05" title="Supporter reviews" subtitle="Store each review as a structured object with its own author and rating." />
              <button type="button" onClick={addReview} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50"><Plus size={13} /> Add review</button>
            </div>
            <div className="mt-5 space-y-3">
              {reviews.map((review, index) => (
                <div key={review.id} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[1fr_1fr_100px_auto]">
                  <Field label={`Reviewer ${index + 1}`}><input className={inputClass} value={review.author} onChange={(e) => setReviews((current) => current.map((item) => item.id === review.id ? { ...item, author: e.target.value } : item))} placeholder="e.g. Jane M." /></Field>
                  <Field label="Review message"><input className={inputClass} value={review.message} onChange={(e) => setReviews((current) => current.map((item) => item.id === review.id ? { ...item, message: e.target.value } : item))} placeholder="Enter the review message" /></Field>
                  <Field label="Rating"><select className={inputClass} value={review.rating} onChange={(e) => setReviews((current) => current.map((item) => item.id === review.id ? { ...item, rating: Number(e.target.value) } : item))}>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} / 5</option>)}</select></Field>
                  <button type="button" onClick={() => setReviews((current) => current.filter((item) => item.id !== review.id))} className="mt-6 h-10 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Remove review"><Trash2 size={15} /></button>
                  <div className="sm:col-span-4"><Field label="Review date (optional)"><input className={inputClass} type="date" value={review.date} onChange={(e) => setReviews((current) => current.map((item) => item.id === review.id ? { ...item, date: e.target.value } : item))} /></Field></div>
                </div>
              ))}
              {reviews.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No reviews added yet.</p>}
            </div>
          </section>

          <div className="flex flex-wrap justify-end gap-2 pb-6">
            <button type="button" disabled={saving} onClick={() => saveCampaign('draft')} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"><Save size={15} /> Save draft</button>
            <button type="button" disabled={saving} onClick={() => saveCampaign('published')} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"><Send size={15} /> {saving ? 'Saving…' : 'Submit campaign'}</button>
          </div>
        </div>

        {showPreview && (
          <aside className="xl:sticky xl:top-24">
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live preview</p><p className="mt-0.5 text-sm font-semibold">Campaign card</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Preview</span></div>
              {thumbnail ? <img src={thumbnail} alt={alt} className="aspect-[16/10] w-full object-cover" /> : <div className="flex aspect-[16/10] items-center justify-center bg-slate-100 text-slate-400"><ImageIcon size={30} /></div>}
              <div className="p-5">
                <div className="flex flex-wrap gap-2"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge.toLowerCase() === 'urgent' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{badge}</span><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{category}</span></div>
                <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight">{projectName || 'Your project title will appear here'}</h2>
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">{description}</p>
                <div className="mt-5 flex items-end justify-between gap-3"><div><p className="text-xl font-bold tracking-tight">{money(raisedValue, currency)}</p><p className="mt-0.5 text-xs text-slate-500">raised of {money(goalValue, currency)}</p></div><p className="text-sm font-semibold text-blue-700">{progress}%</p></div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} /></div>
                <div className="mt-4 flex items-center justify-between border-b border-slate-100 pb-4 text-xs text-slate-500"><span>{Number(donors) || 0} donors</span><span>{Number(daysLeft) || 0} days left</span></div>
                <button type="button" onClick={() => setNotice({ type: 'success', message: 'Preview only: donations are not processed from this editor.' })} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"><HeartHandshake size={16} /> Donate Now</button>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold">Campaign page preview</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{title || 'Your campaign headline will appear here'}</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
              <div className="mt-4 space-y-3">{sections.filter((section) => section.heading || section.text || section.image).map((section) => <div key={section.id}>{section.heading && <p className="text-sm font-semibold">{section.heading}</p>}{section.text && <p className="mt-1 text-xs leading-5 text-slate-600">{section.text}</p>}{section.type === 'image' && section.image && <img src={section.image} alt={section.imageAlt} className="mt-2 max-h-36 w-full rounded-lg object-cover" />}</div>)}</div>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return <div className="flex items-start gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">{number}</span><div><h2 className="text-base font-semibold tracking-tight sm:text-lg">{title}</h2><p className="mt-1 text-sm leading-5 text-slate-500">{subtitle}</p></div></div>;
}
