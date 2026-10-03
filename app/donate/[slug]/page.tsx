'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// ----------------------------------------------------------------------
// 1. TYPES & DATA (Updated Interface)
// ----------------------------------------------------------------------
export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  slug: string;
  category: string;
  image: string[];
  alt: string;
  status: 'Completed' | 'In Progress' | 'Planned';
  progress: number;
  budget: number;
  spent: number;
  currency: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  beneficiaries: number;
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'Zengwa Primary School Block',
    thumbnail: "https://res.cloudinary.com/ezs2dy9g/image/upload/v1789657905/IMG-20260917-WA0010_ka8xas.jpg",
    slug: 'Zengwa Primary School Block',
    category: 'Education',
    image: [
      "https://res.cloudinary.com/ezs2dy9g/image/upload/v1789657905/IMG-20260917-WA0010_ka8xas.jpg",
      'https://img.rocket.new/generatedImages/rocket_gen_img_1fa810fe8-1784313443629.png'
    ],
    alt: 'Construction progress of school classroom block with concrete walls for  Zengwa Connect project',
    status: 'In Progress',
    progress: 69,
    budget: 1800000,
    spent: 1240000,
    currency: 'KES',
    description: 'Construction of a 4-classroom block with library and sanitation facilities to accommodate 200 additional students.',
    startDate: 'Jan 2026',
    endDate: 'Sep 2026',
    location: 'Zengwa Village, Kwale',
    beneficiaries: 200
  },
  {
    id: 'proj-002',
    title: 'Tree Planting — Kwale North',
    thumbnail: "https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187748/WhatsApp_Image_2026-08-02_at_12.29.17_PM_oidfiu.jpg",
    slug: 'Tree Planting — Kwale North',
    category: 'Church Planting',
    image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187748/WhatsApp_Image_2026-08-02_at_12.29.17_PM_oidfiu.jpg"],
    alt: "Trees planted on Zengwa connect projects' acquired piece of land",
    status: 'Completed',
    progress: 0,
    budget: 250000,
    spent: 92000,
    currency: 'KES',
    description: 'Planting trees in Kwale on a recently acquired piece of land for the Zengwa connect project.',
    startDate: 'Feb 2026',
    endDate: 'Dec 2026',
    location: 'Acquired piece of land - North Kwale ',
    beneficiaries: 450
  },
  {
    id: 'proj-003',
    title: 'Tree Planting — Kwale North',
    thumbnail: "https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187748/WhatsApp_Image_2026-08-02_at_12.29.17_PM_oidfiu.jpg",
    slug: 'Tree Planting — Kwale North',
    category: 'Church Planting',
    image: ["https://res.cloudinary.com/ezs2dy9g/image/upload/v1786187748/WhatsApp_Image_2026-08-02_at_12.29.17_PM_oidfiu.jpg"],
    alt: "Trees planted on Zengwa connect projects' acquired piece of land",
    status: 'In Progress',
    progress: 37,
    budget: 250000,
    spent: 92000,
    currency: 'KES',
    description: 'Planting trees in Kwale on a recently acquired piece of land for the Zengwa connect project.',
    startDate: 'Feb 2026',
    endDate: 'Dec 2026',
    location: 'Acquired piece of land - North Kwale ',
    beneficiaries: 450
  }
];

// ----------------------------------------------------------------------
// 2. UTILITY FUNCTIONS
// ----------------------------------------------------------------------
const formatCurrency = (amount: number, currency: string) => {
  if (currency === 'KES') {
    if (amount >= 1_000_000) {
      return `${currency} ${(amount / 1_000_000).toFixed(1)}M`;
    }
    if (amount >= 1_000) {
      return `${currency} ${(amount / 1_000).toFixed(0)}K`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  }
  // Fallback for other currencies
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// ----------------------------------------------------------------------
// 3. COMPONENT
// ----------------------------------------------------------------------
interface ProjectDetailPageProps {
  projectId?: string;
}

export default function ProjectDetailPage({ projectId = 'proj-001' }: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data based on ID
    const found = projects.find((p) => p.id === projectId);
    if (found) {
      setProject(found);
    } else {
      setProject(null);
    }
    setIsLoading(false);
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Project Not Found</h1>
        <p className="text-gray-500 mt-2">The project you are looking for does not exist.</p>
        <Link href="/projects" className="mt-4 text-blue-600 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  const progressPercentage = project.progress;
  const raisedAmount = project.spent;
  const goalAmount = project.budget;
  const formattedRaised = formatCurrency(raisedAmount, project.currency);
  const formattedGoal = formatCurrency(goalAmount, project.currency);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Image Section - Uses Thumbnail */}
          <div className="relative h-64 sm:h-80 w-full bg-gray-200">
            <img
              src={project.thumbnail}
              alt={project.alt}
              className="w-full h-full object-cover"
            />
            {/* Status Badge Overlay */}
            <div className="absolute top-4 left-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm ${
                  project.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {project.status}
              </span>
            </div>
            {/* Category Badge Overlay */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Title & Description */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {project.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Progress Section */}
            <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-2xl font-bold text-gray-900">{formattedRaised}</span>
                  <span className="text-gray-500 ml-1 text-sm font-medium">raised</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-500">
                    {progressPercentage}% of {formattedGoal}
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    progressPercentage >= 100
                      ? 'bg-green-500'
                      : progressPercentage > 50
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{project.currency} 0</span>
                <span>{formattedGoal}</span>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-gray-800">{project.location}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiaries</p>
                  <p className="text-sm font-semibold text-gray-800">{project.beneficiaries} people</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</p>
                  <p className="text-sm font-semibold text-gray-800">{project.startDate}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</p>
                  <p className="text-sm font-semibold text-gray-800">{project.endDate}</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-6 border-t border-gray-100">
              <button
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  alert(`Redirecting to donation page for: ${project.title}`);
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Support This Project
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center sm:text-left">
                Your contribution helps us reach our goal of {formattedGoal}.
              </p>
            </div>
          </div>
        </div>

        {/* Project Gallery - Uses the image array */}
        {project.image.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.image.map((img, idx) => (
                <div key={idx} className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-200 border border-gray-200">
                  <img
                    src={img}
                    alt={`${project.title} - gallery image ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
