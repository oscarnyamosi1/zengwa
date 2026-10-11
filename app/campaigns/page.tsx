
import type { Metadata } from 'next';
import CampaignsClient from './CampaignsClient';
import type { Campaign } from '@/data/types/campaign';

export const metadata: Metadata = {
  title: 'Campaigns | Zengwa Connect',
  description:
    'Discover fundraising campaigns and support education, healthcare, sponsorship, churches, and community development.',
};

export const dynamic = 'force-dynamic';

async function getCampaigns(): Promise<Campaign[]> {
  // const backendUrl = process.env.BACKEND_URL?.replace(/\/+$/, '');
  const backendUrl = process.env.BACKEND_URL

  if (!backendUrl) {
    console.error(
      'BACKEND_URL is missing. Configure it in your .env.local file.'
    );
    return [];
  }

  try {
    const response = await fetch(`${backendUrl}/getcampaigns/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch campaigns: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data: unknown = await response.json();

    // API returns a plain array.
    if (Array.isArray(data)) {
      return data as Campaign[];
    }

    // API returns Django REST Framework pagination.
    if (
      typeof data === 'object' &&
      data !== null &&
      'results' in data &&
      Array.isArray(data.results)
    ) {
      return data.results as Campaign[];
    }

    // API returns { campaigns: [...] }.
    if (
      typeof data === 'object' &&
      data !== null &&
      'campaigns' in data &&
      Array.isArray(data.campaigns)
    ) {
      return data.campaigns as Campaign[];
    }

    // API returns { data: [...] }.
    if (
      typeof data === 'object' &&
      data !== null &&
      'data' in data &&
      Array.isArray(data.data)
    ) {
      return data.data as Campaign[];
    }

    console.error('Unexpected campaigns API response:', data);
    return [];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return <CampaignsClient campaigns={campaigns} />;
}
