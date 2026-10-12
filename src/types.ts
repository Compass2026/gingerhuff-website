import type { ServicePageId } from './content/service-pages';
export type PageId = 'home' | 'about' | 'services' | 'window-treatments' | 'portfolio' | 'blog' | 'faq' | 'contact' | 'privacy' | 'not-found' | ServicePageId;

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  /** Detail pages for this practice area. */
  detailPages: ServicePageId[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  location: string;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  stars: number;
}

export interface BlogPost {
  metaTitle?: string;
  h1?: string;
  datePublished?: string;
  dateModified?: string;
  cta?: { text: string; url: string | null };
  compass?: { draft_id: string; release_hash: string; keyword_id: string; version: number };
  slug: string;
  author?: string;
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
