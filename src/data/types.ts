export type MediaType = "image" | "video";

export type ServiceCategory =
    | "Photography"
    | "Videography"
    | "Editing"
    | "Livestreaming"
    | "Studio";

export interface Service {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    iconName: string;
    category: ServiceCategory;
    features: string[];
    isPopular?: boolean;
    imageUrl: string;
}

export interface ProcessStep {
    id: string;
    stepNumber: string; // e.g., "01"
    title: string;      // e.g., "Discovery Call"
    description: string; // e.g., "We define the scope..."
    iconName?: string;  // Lucid icon name
}
export interface Package {
    id: string;
    name: string;           // e.g., "Basic Event", "Premium Wedding"
    description: string;    // Brief summary
    price: number;          // Base price
    currency: string;       // "USD", "INR", etc.
    durationHours: number;  // e.g., 3, 6, 10 [cite: 48, 54, 152]
    deliverables: string[]; // e.g., "150 edited images", "Online gallery" [cite: 49, 50]
    turnaroundDays: number; // e.g., 7-10 days [cite: 52, 58, 65]
    isPopular?: boolean;    // To highlight the "Standard" or "Premium" option
    recommendedFor: string; // e.g., "Small party", "Full Wedding" [cite: 47, 59]
}

export interface PortfolioItem {
    id: string;
    title: string;          // Project name e.g., "Smith Wedding"
    category: ServiceCategory;
    coverImage: string;     // Thumbnail URL
    mediaType: MediaType;
    galleryImages?: string[]; // Array of image URLs for a lightbox/modal
    videoUrl?: string;      // If it's a video project
    clientName?: string;
    date?: string;
}

export interface Testimonial {
    id: string;
    clientName: string;
    role?: string;          // e.g., "Bride", "Event Planner"
    company?: string;       // If corporate client
    content: string;        // The review text
    rating: number;         // 1-5 stars [cite: 134]
    avatarUrl?: string;     // Optional client photo
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;           // e.g., "Lead Photographer", "Senior Editor" [cite: 160, 162]
    bio: string;
    imageUrl: string;
    socialLinks?: {
        instagram?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export interface FAQItem {
    id: string;
    question: string;       // e.g., "Do you provide raw files?" [cite: 125]
    answer: string;         // e.g., "Raw files are available as an add-on..."
    category?: "Booking" | "Delivery" | "Rights";
}

export interface InquiryForm {
    name: string;
    email: string;
    phone?: string;
    eventType: string;      // e.g., Wedding, Corporate
    eventDate: Date | undefined;
    message?: string;
}
export interface NavData {
    logoUrl: string;
    links: Array<{
        label: string;
        href: string;
    }>;
}

export interface HomeData {
    headline: string;
    subhead: string;
    heroImageUrl: string;
    featuredServices: Service[];
    featuredPortfolio: PortfolioItem[];
}

export interface ShowcaseData {
    weddings: { id: string; image: string; caption: string }[];
    parties: string[];
    gatherings: {
        corporate: { id: string; src: string }[];
        political: { id: string; src: string }[];
        traditional: { id: string; src: string }[];
    };
}