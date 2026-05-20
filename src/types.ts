export type Theme = 'dark' | 'light';

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  beanType: string;
  beanVariety: string;
  price: number;
  weight: string;
  roast: 'light' | 'medium' | 'dark';
  process: string;
  score: number;
  notes: string[];
  description: string;
  badge?: string;
  image: string;
  images: string[];
  acidity: number;
  body: number;
  sweetness: number;
  bitterness: number;
  featured: boolean;
}

export interface CartItem extends Product {
  qty: number;
  selectedSize: string;
  selectedGrind: string;
}

export interface JournalPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export interface Origin {
  id: string;
  country: string;
  region: string;
  altitude: string;
  harvest: string;
  variety: string;
  description: string;
  image: string;
  mapX: number;
  mapY: number;
  products: string[];
}

export type Page = 'home' | 'shop' | 'product' | 'origins' | 'journal' | 'checkout';
