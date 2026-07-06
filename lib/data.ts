export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  postedAt: string;
  tags: string[];
  logoColor: string;
  logoInitial: string;
};

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    postedAt: "2 days ago",
    tags: ["React", "TypeScript", "Remote"],
    logoColor: "bg-primary-50 text-primary-600",
    logoInitial: "T",
  },
  {
    id: "job-2",
    title: "Product Marketing Manager",
    company: "BrightWave",
    location: "New York, NY",
    type: "Full-time",
    salary: "$95k - $130k",
    postedAt: "1 day ago",
    tags: ["Marketing", "SaaS", "Hybrid"],
    logoColor: "bg-purple-50 text-purple-600",
    logoInitial: "B",
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "PixelWorks Studio",
    location: "Austin, TX",
    type: "Contract",
    salary: "$70k - $95k",
    postedAt: "3 days ago",
    tags: ["Figma", "Design System", "Remote"],
    logoColor: "bg-amber-50 text-amber-600",
    logoInitial: "P",
  },
  {
    id: "job-4",
    title: "Data Analyst",
    company: "Northline Analytics",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85k - $110k",
    postedAt: "5 days ago",
    tags: ["SQL", "Python", "On-site"],
    logoColor: "bg-emerald-50 text-emerald-600",
    logoInitial: "N",
  },
];

export type Candidate = {
  id: string;
  name: string;
  handle: string;
  platform: "Instagram" | "TikTok" | "YouTube" | "X";
  category: string;
  followers: string;
  engagement: string;
  location: string;
  bio: string;
  avatarColor: string;
  price: string;
  rating: number;
};

export const candidates: Candidate[] = [
  {
    id: "candidate-1",
    name: "Maya Rodriguez",
    handle: "@mayacreates",
    platform: "Instagram",
    category: "Lifestyle & Fashion",
    followers: "245K",
    engagement: "6.8%",
    location: "Los Angeles, CA",
    bio: "Lifestyle and fashion content creator focused on sustainable brands and everyday style inspiration.",
    avatarColor: "from-pink-400 to-rose-500",
    price: "$450 / post",
    rating: 4.9,
  },
  {
    id: "candidate-2",
    name: "Jordan Blake",
    handle: "@jblaketech",
    platform: "YouTube",
    category: "Tech Reviews",
    followers: "512K",
    engagement: "5.2%",
    location: "Seattle, WA",
    bio: "In-depth tech reviews, unboxings, and productivity workflows for creative professionals.",
    avatarColor: "from-blue-400 to-indigo-500",
    price: "$900 / video",
    rating: 4.8,
  },
  {
    id: "candidate-3",
    name: "Sophia Chen",
    handle: "@sophiaeats",
    platform: "TikTok",
    category: "Food & Cooking",
    followers: "1.2M",
    engagement: "9.1%",
    location: "New York, NY",
    bio: "Quick and easy recipes, restaurant reviews, and food trends for busy people who love to eat well.",
    avatarColor: "from-orange-400 to-amber-500",
    price: "$650 / video",
    rating: 5.0,
  },
  {
    id: "candidate-4",
    name: "Marcus Lee",
    handle: "@marcusfit",
    platform: "Instagram",
    category: "Fitness & Health",
    followers: "380K",
    engagement: "7.4%",
    location: "Miami, FL",
    bio: "Certified trainer sharing workout programs, nutrition tips, and motivation for a healthier lifestyle.",
    avatarColor: "from-teal-400 to-emerald-500",
    price: "$500 / post",
    rating: 4.7,
  },
  {
    id: "candidate-5",
    name: "Emma Wilson",
    handle: "@emmatravels",
    platform: "YouTube",
    category: "Travel & Adventure",
    followers: "890K",
    engagement: "6.1%",
    location: "Denver, CO",
    bio: "Budget travel guides, hidden gems, and adventure vlogs from around the world.",
    avatarColor: "from-violet-400 to-purple-500",
    price: "$800 / video",
    rating: 4.9,
  },
  {
    id: "candidate-6",
    name: "Liam Carter",
    handle: "@liamgames",
    platform: "TikTok",
    category: "Gaming",
    followers: "670K",
    engagement: "8.3%",
    location: "Austin, TX",
    bio: "Gaming highlights, reviews, and livestream clips for the mobile and console gaming community.",
    avatarColor: "from-cyan-400 to-blue-500",
    price: "$550 / video",
    rating: 4.6,
  },
];

export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Marketing & Advertising",
  "Manufacturing",
  "Hospitality",
  "Real Estate",
  "Media & Entertainment",
];

export const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Chicago, IL",
  "Seattle, WA",
  "Miami, FL",
  "Denver, CO",
  "Boston, MA",
  "Remote",
];

export const faqCategories = [
  {
    id: "general",
    label: "General",
    faqs: [
      {
        q: "What is Sachok?",
        a: "Sachok is a job marketplace that connects job seekers and employers, and also helps brands discover and hire social media creators for collaborations.",
      },
      {
        q: "Is Sachok free to use?",
        a: "Creating an account and browsing jobs or candidates is free. Employers may choose paid plans for advanced features like featured listings.",
      },
    ],
  },
  {
    id: "account",
    label: "Account",
    faqs: [
      {
        q: "How do I create an account?",
        a: "Click Create Account on the homepage, choose whether you're a job seeker or employer, and fill in your details to get started.",
      },
      {
        q: "How do I reset my password?",
        a: "On the login page, click Forgot Password and follow the instructions sent to your registered email.",
      },
    ],
  },
  {
    id: "jobs",
    label: "Jobs & Applications",
    faqs: [
      {
        q: "How do I apply to a job?",
        a: "Browse open positions on the homepage or job search page, then click Apply on any listing that matches your skills.",
      },
      {
        q: "Can I track my applications?",
        a: "Yes, once logged in you can track application status from your dashboard.",
      },
    ],
  },
  {
    id: "creators",
    label: "Social Media Creators",
    faqs: [
      {
        q: "How does hiring a creator work?",
        a: "Browse candidates on the People from Social Media page, filter by platform, category, or location, and click Make an Offer on a profile.",
      },
      {
        q: "How is engagement rate calculated?",
        a: "Engagement rate reflects average likes, comments, and shares relative to a creator's total following.",
      },
    ],
  },
];
