// src/lib/api.ts

export interface NavItem {
    label: string;
    href: string;
}

export interface NavData {
    primary: NavItem[];
    categories: NavItem[];
}

export interface HeroStats {
    timeseries: number[];
    labels: string[];
}

export interface CTA {
    label: string;
    href: string;
}

export interface KPI {
    label: string;
    value: string;
}

export interface HomeData {
    headline: string;
    subhead: string;
    ctas: CTA[];
    kpis: KPI[];
    heroStats: HeroStats;
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    longDescription?: string;
    heroImage?: string;
    benefits?: string[];
    deliverables?: string[];
    targetAudience?: string[];
    features?: string[];
    icon?: string;
    category: string;
    industries: string[];
}

export interface Product {
    sku: string;
    title: string;
    slug: string;
    shortDescription: string;
    price?: string | number;
    tags?: string[];
    category: "Hardware" | "Software";
    purchaseOptions?: string[];
    compliance?: string[];
    specs?: Record<string, string>;
    images?: string[];
}

export interface Industry {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    stats: string[];
}

export interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
}

export interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    client: string;
    industry: string;
    summary: string;
    kpis: KPI[];
    image?: string;
}

// The generic adapter
export async function fetchJSON<T>(path: string): Promise<T> {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }
    return response.json();
}