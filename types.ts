
export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image_url: string; // Changed from imageUrl
  aspect_ratio: 'square' | 'video' | 'portrait' | 'tall'; // Changed from aspectRatio
  created_at?: string;
}

export interface Article {
  id: string;
  published_date: string; // Changed from date
  category: string;
  title: string;
  summary: string;
  content: string;
  hero_image: string; // Changed from heroImage
  read_time: string; // Changed from readTime
  created_at?: string;
}

export type BlogPost = Article;

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface AppConfig {
  header: {
    logoText: string;
    navLinks: NavLink[];
    ctaLabel: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    avatarUrl: string; // This is not in DB table site_config explicitly as root column, but inside config JSON. Keep camelCase for config JSON internal structure or change? DB site_config is jsonb.
    primaryCta: string;
    secondaryCta: string;
  };
  lab: {
    title: string;
    description: string;
    projects: Project[];
  };
  blog: {
    title: string;
    viewAllLabel: string;
    articles: Article[];
  };
  footerCta: {
    title: string;
    description: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    socials: { label: string; href: string; }[];
  };
  author: Author;
}
