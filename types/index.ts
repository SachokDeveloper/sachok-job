export type SocialPlatform = "x" | "instagram" | "tiktok" | "youtube";

export interface Job {
  id: string;
  title: string;
  company: string;
  verified: boolean;
  remote: boolean;
  employment: string;
  salary: string;
  tags: string[];
  spotsLeft: number;
  applied: number;
  totalSlots: number;
}

export interface AudienceAgeSlice {
  label: string;
  pct: number;
  color: string;
}

export interface CountrySlice {
  name: string;
  pct: number;
}

export interface SocialLink {
  platform: string;
  handle: string;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  handle: string;
  platform: SocialPlatform;
  location: string;
  skills: string[];
  activelyLooking: boolean;
  about: string;
  niche: string;
  language: string;
  contentType: string;
  experience: string;
  email: string;
  website: string;
  responseRate: string;
  responseTime: string;
  memberSince: string;
  profileViews: string;
  completedDeals: number;
  socials: SocialLink[];
  totalFollowers: string;
  engagementRate: string;
  avgViews: string;
  avgLikes: string;
  avgComments: string;
  topCountries: CountrySlice[];
  audienceAge: AudienceAgeSlice[];
  audienceGender: { male: number; female: number };
  featuredVideo: {
    title: string;
    views: string;
    likes: string;
    comments: string;
  };
}
