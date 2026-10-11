export interface CampaignReview {
  id: string;
  author: string;
  message: string;
  rating: number;
  date?: string;
  avatar?: string;
}

export interface CampaignStorySection {
  id: string;
  type: 'paragraph' | 'image';
  heading: string;
  text: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  campaignTitle?: string;
  category: string;
  thumbnail: string;
  image: string[];
  alt: string;
  raised: number;
  donors: number;
  goal: number;
  daysLeft: number;
  badge: string;
  badgeColor: string;
  currency: string;
  description: string;
  updates: number;
  rating: number;
  reviews: CampaignReview[];
  story?: CampaignStorySection[];
  status?: 'draft' | 'published';
}
