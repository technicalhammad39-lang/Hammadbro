import {
  Award,
  BadgeCheck,
  LucideIcon,
  ShieldCheck,
  Star,
} from 'lucide-react';

export interface Experience {
  company: string;
  duration: string;
  role: string;
  desc: string;
  dotColor: string;
}

export interface IconAndText {
  icon: LucideIcon;
  name: string;
}

export interface Blog {
  image: string;
  button: string;
  name: string;
  date: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  metaDescription: string;
  content: string[];
}

export interface PortfolioItem {
  image: string;
  title: string;
  href: string;
  desc: string;
  slug: string;
  category: string;
  overview: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
}

export interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface CardData {
  title: string;
  imageSrc: string;
  desc: string;
  icon: "Palette" | "Share2" | "PenTool" | "Printer" | "Monitor" | "FileText";
}

export const experiences: Experience[] = [
  {
    company: "Zangi Flex Printing Press",
    duration: "Aug 2024 - May 2026",
    role: "Graphic Designer",
    desc: "Worked on print-ready designs, banners, flyers, posters, business cards, flex designs, and marketing materials for clients. Focused on clean layouts, color balance, typography, and professional print output.",
    dotColor: "bg-[#FD853A]",
  },
  {
    company: "Fiverr / Upwork",
    duration: "May 2025 - Present",
    role: "Freelance Brand & Graphic Designer",
    desc: "Created logos, social media designs, brand visuals, marketing creatives, and client-focused design work for online businesses and personal brands.",
    dotColor: "bg-[#FD853A]",
  },
  {
    company: "Zabr Solution",
    duration: "Sep 2025 - Present",
    role: "Senior Graphic Designer",
    desc: "Designed premium visual assets, social media creatives, branding materials, and marketing graphics for business campaigns and digital presence.",
    dotColor: "bg-[#FD853A]",
  },
];

export const buttons: string[] = [
  "All",
  "Logo Design",
  "Brand Identity",
  "Social Media",
  "Print Design",
  "Business Profile",
  "Website Graphics",
];

export const iconAndText: IconAndText[] = [
  {
    icon: Star,
    name: "4.9 Average Rating",
  },
  {
    icon: Award,
    name: "100+ Designs Completed",
  },
  {
    icon: ShieldCheck,
    name: "Certified Graphic Designer",
  },
];

export const skills: string[] = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "CorelDRAW",
  "Figma",
  "Canva",
  "Brand Identity",
  "Logo Design",
  "Social Media Design",
  "Print Design",
  "Business Profile Design",
  "Poster Design",
  "Banner Design",
  "Typography",
  "Color Theory",
  "Layout Design",
  "Visual Branding",
];

export const blogs: Blog[] = [
  {
    image: "/Rectangle%206.svg",
    button: "Read More",
    name: "Hammad GFX",
    date: "15 May, 2026",
    title: "Why Your Brand Looks Unprofessional Even With Good Products",
    slug: "why-your-brand-looks-unprofessional",
    excerpt: "A weak visual identity can make even a good business look less trusted. Learn how design affects first impressions.",
    category: "Brand Identity",
    metaDescription: "Learn why weak visuals make good products look less trusted and how brand identity improves first impressions.",
    content: [
      "A good product still needs a strong first impression. If your logo, colors, typography, social posts, and print materials all look different, customers can feel uncertainty before they even understand your offer.",
      "Professional design creates trust because it gives your business a consistent visual language. The goal is not decoration. The goal is clarity, confidence, and memorability.",
      "Start by fixing the basics: a clean logo, a clear color system, readable typography, consistent social media templates, and marketing materials that feel connected. These details make your brand look ready to sell.",
    ],
  },
  {
    image: "/Frame%2060.svg",
    button: "Read More",
    name: "Hammad GFX",
    date: "16 May, 2026",
    title: "Logo vs Brand Identity: What Your Business Actually Needs",
    slug: "logo-vs-brand-identity",
    excerpt: "A logo is only one part of your brand. Learn the difference between logo design and a complete brand identity.",
    category: "Logo Design",
    metaDescription: "Understand the difference between a logo and complete brand identity before investing in design for your business.",
    content: [
      "A logo is the main mark people use to recognize your business, but a brand identity is the full visual system around it. That includes colors, typefaces, layout rules, image style, icons, and how everything works together.",
      "If you only need a mark for a small project, a logo can be enough. If you want your business to look consistent across social media, print, presentations, and ads, you need a brand identity system.",
      "The stronger option for growing businesses is usually identity design because it gives every future design a clear direction. That saves time and keeps your brand looking professional everywhere.",
    ],
  },
  {
    image: "/Rectangle%206%20%281%29.svg",
    button: "Read More",
    name: "Hammad GFX",
    date: "17 May, 2026",
    title: "How Social Media Design Builds Trust Before You Sell",
    slug: "social-media-design-builds-trust",
    excerpt: "Consistent social media visuals help your business look active, professional, and memorable.",
    category: "Social Media",
    metaDescription: "See how consistent social media design can build trust, brand recall, and confidence before customers buy.",
    content: [
      "People often judge a business from its social media before they send a message. If posts look random, low quality, or inconsistent, the business can feel less serious.",
      "Strong social media design uses repeated colors, typography, spacing, and layout patterns. This makes your content easier to recognize and helps your brand feel active and professional.",
      "A good design system also makes campaigns faster. You can create posts, ads, covers, carousels, and offers that all feel like they belong to the same brand.",
    ],
  },
];

export const portfolioCategories: string[] = [
  "All",
  "Logo Design",
  "Brand Identity",
  "Social Media",
  "Print Design",
  "Business Profile",
  "Website Graphics",
];

export const portfolioData: PortfolioItem[] = [
  {
    image: "/Frame%2026.svg",
    title: "Brand Identity Design",
    href: "/portfolio/brand-identity-design",
    slug: "brand-identity-design",
    category: "Brand Identity",
    desc: "A complete visual identity system including logo, colors, typography, and brand direction.",
    overview: "A premium visual identity system created to help a business look more professional, consistent, and memorable across digital and print platforms.",
    services: ["Logo System", "Brand Colors", "Typography", "Visual Direction"],
    challenge: "The business needed a consistent identity that looked trustworthy across social media, print, and customer-facing materials.",
    solution: "I built a clean identity direction with a memorable logo system, strong color palette, readable typography, and practical brand usage rules.",
    result: "The final identity gave the brand a stronger first impression and a cleaner foundation for future marketing designs.",
  },
  {
    image: "/Frame%2026.svg",
    title: "Logo Design Collection",
    href: "/portfolio/logo-design-collection",
    slug: "logo-design-collection",
    category: "Logo Design",
    desc: "A collection of clean, memorable, and professional logo concepts for different brands.",
    overview: "A curated logo design collection focused on clarity, memorability, and professional brand presentation.",
    services: ["Logo Concepts", "Icon Marks", "Wordmarks", "Final Files"],
    challenge: "Each brand needed a logo that could work across profile images, print material, packaging, and digital marketing.",
    solution: "I explored simple shapes, balanced typography, and scalable marks that remain clear at small and large sizes.",
    result: "The collection delivers flexible logo systems that create stronger recognition for different business types.",
  },
  {
    image: "/Frame%2060.svg",
    title: "Social Media Campaign",
    href: "/portfolio/social-media-campaign",
    slug: "social-media-campaign",
    category: "Social Media",
    desc: "Scroll-stopping social media visuals, ad creatives, and campaign posts for online growth.",
    overview: "A campaign design package built to make a brand look active, consistent, and professional online.",
    services: ["Posts", "Ads", "Covers", "Carousels"],
    challenge: "The brand needed social creatives that felt connected and could communicate offers quickly in busy feeds.",
    solution: "I designed a reusable visual system with bold hierarchy, clean spacing, brand colors, and campaign-specific layouts.",
    result: "The campaign visuals improved brand consistency and made promotions easier to understand at a glance.",
  },
  {
    image: "/Rectangle%206.svg",
    title: "Business Profile Design",
    href: "/portfolio/business-profile-design",
    slug: "business-profile-design",
    category: "Business Profile",
    desc: "Professional company profile layouts designed to present businesses with trust and clarity.",
    overview: "A corporate profile layout created to present company services, strengths, and trust signals in a clean format.",
    services: ["Company Profile", "Pitch Deck", "Corporate Layout", "PDF Design"],
    challenge: "The business needed a profile document that looked professional and explained services without clutter.",
    solution: "I created structured pages with strong headings, controlled spacing, brand visuals, and easy-to-read sections.",
    result: "The profile became easier to share with clients and helped the business communicate with more confidence.",
  },
  {
    image: "/Rectangle%206%20%281%29.svg",
    title: "Restaurant Menu Design",
    href: "/portfolio/restaurant-menu-design",
    slug: "restaurant-menu-design",
    category: "Print Design",
    desc: "Modern food menu design with clean hierarchy, premium layout, and print-ready formatting.",
    overview: "A print-ready restaurant menu designed with clear sections, readable pricing, and a premium visual feel.",
    services: ["Menu Layout", "Print Setup", "Typography", "Food Visual Direction"],
    challenge: "The menu needed to organize many items without feeling crowded or difficult to read.",
    solution: "I used clear hierarchy, clean spacing, grouped categories, and warm visual accents to improve scanning.",
    result: "The final menu looked professional, easier to read, and ready for high-quality print output.",
  },
  {
    image: "/Frame%2026.svg",
    title: "Real Estate Flyer Design",
    href: "/portfolio/real-estate-flyer-design",
    slug: "real-estate-flyer-design",
    category: "Print Design",
    desc: "High-impact real estate flyers designed for promotion, trust, and lead generation.",
    overview: "A promotional flyer design created to highlight property value, key details, and lead-generation contact points.",
    services: ["Flyer Design", "Print Layout", "Marketing Visuals", "Lead CTA"],
    challenge: "The flyer needed to look premium while making property information easy to understand quickly.",
    solution: "I used bold image placement, strong CTA areas, clean typography, and trust-focused layout sections.",
    result: "The flyer became a practical marketing asset for both digital sharing and print distribution.",
  },
  {
    image: "/Frame%2060.svg",
    title: "YouTube Thumbnail Package",
    href: "/portfolio/youtube-thumbnail-package",
    slug: "youtube-thumbnail-package",
    category: "Website Graphics",
    desc: "Attention-grabbing thumbnail designs created to increase clicks and content visibility.",
    overview: "A thumbnail package designed to improve visual impact, clarity, and click-through potential for video content.",
    services: ["Thumbnails", "Digital Graphics", "Visual Hooks", "Layout Templates"],
    challenge: "The thumbnails needed to stand out in crowded feeds while staying readable on small screens.",
    solution: "I created bold compositions with strong contrast, readable text, clean subject focus, and consistent style.",
    result: "The package gave the channel a more professional and recognizable content presentation.",
  },
  {
    image: "/Rectangle%206.svg",
    title: "Poster & Banner Design",
    href: "/portfolio/poster-banner-design",
    slug: "poster-banner-design",
    category: "Print Design",
    desc: "Professional posters and banners for promotions, events, campaigns, and brand awareness.",
    overview: "A poster and banner design set created for promotional visibility across print and digital placements.",
    services: ["Poster Design", "Banner Design", "Campaign Layout", "Print Files"],
    challenge: "The visuals needed to communicate the offer quickly and remain attractive from a distance.",
    solution: "I used large headings, direct messaging, strong color contrast, and print-ready layout balance.",
    result: "The designs worked as high-visibility marketing assets for campaigns, events, and local promotion.",
  },
];

export const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    rating: 5,
    text: "Hammad created clean and professional brand visuals for our business. The designs looked premium, consistent, and ready to use across social media and print.",
  },
  {
    name: "Ali Raza",
    role: "Startup Founder",
    rating: 5,
    text: "The logo and social media designs gave our brand a much stronger first impression. Communication was smooth and the final work looked professional.",
  },
  {
    name: "Mahesh Pokale",
    role: "Marketing Manager",
    rating: 5,
    text: "Excellent graphic design work. Hammad understood the brand direction clearly and delivered visuals that were modern, clean, and impactful.",
  },
];

export const cardData: CardData[] = [
  {
    title: "Brand Identity Design",
    desc: "Logo, colors, typography, and complete visual direction.",
    imageSrc: "/Frame%2077.svg",
    icon: "Palette",
  },
  {
    title: "Social Media Design",
    desc: "Posts, banners, ads, covers, and campaign creatives.",
    imageSrc: "/Frame%2060.svg",
    icon: "Share2",
  },
  {
    title: "Logo Design",
    desc: "Clean and memorable logos for strong first impressions.",
    imageSrc: "/Frame%2026.svg",
    icon: "PenTool",
  },
  {
    title: "Print Design",
    desc: "Flyers, posters, business cards, and print-ready layouts.",
    imageSrc: "/Rectangle%206.svg",
    icon: "Printer",
  },
  {
    title: "Website Graphics",
    desc: "Hero banners, icons, thumbnails, and digital visuals.",
    imageSrc: "/Rectangle%206%20%281%29.svg",
    icon: "Monitor",
  },
  {
    title: "Business Profile Design",
    desc: "Company profiles, pitch decks, and corporate layouts.",
    imageSrc: "/Frame%2026.svg",
    icon: "FileText",
  },
];

export const getPortfolioProject = (slug: string) =>
  portfolioData.find((project) => project.slug === slug);

export const getBlogPost = (slug: string) =>
  blogs.find((post) => post.slug === slug);

export const BadgeIcon = BadgeCheck;
