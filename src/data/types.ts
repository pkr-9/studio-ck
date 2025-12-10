// src/data/types.ts

// =========================================
// 1. SERVICES (Based on Doc Section 2)
// Source: [cite: 6, 7, 11, 14, 18, 21, 25, 27]
// =========================================

export type ServiceCategory =
    | "Photography"
    | "Videography"
    | "Editing"
    | "Livestreaming"
    | "Studio";

export interface Service {
    id: string;
    slug: string;           // For routing: /services/event-photography
    title: string;          // e.g., "Event Photography"
    shortDescription: string; // One-liner for cards
    fullDescription: string;  // Detailed text for ServiceDetail page
    iconName: string;       // Name of Lucide icon to render (e.g., "Camera", "Video")
    category: ServiceCategory;
    features: string[];     // List of specifics e.g., "Drone footage", "Gimbal shots" [cite: 13]
    isPopular?: boolean;    // For highlighting on Homepage
}

// =========================================
// 2. PACKAGES (Based on Doc Section 4)
// Source: [cite: 45, 47, 53, 59]
// =========================================

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

// =========================================
// 3. PORTFOLIO & GALLERY (Based on Doc Section 2 & 3)
// Source: [cite: 22, 40]
// =========================================

export type MediaType = "image" | "video";

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

// =========================================
// 4. TESTIMONIALS (Based on Doc Section 3 - UX)
// Source: [cite: 44, 134, 143]
// =========================================

export interface Testimonial {
    id: string;
    clientName: string;
    role?: string;          // e.g., "Bride", "Event Planner"
    company?: string;       // If corporate client
    content: string;        // The review text
    rating: number;         // 1-5 stars [cite: 134]
    avatarUrl?: string;     // Optional client photo
}

// =========================================
// 5. TEAM (Based on Doc Section 18 - Internal Roles)
// Source: [cite: 158, 160, 161, 162]
// =========================================

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

// =========================================
// 6. FAQ (Based on Doc Section 13)
// Source: [cite: 122-129]
// =========================================

export interface FAQItem {
    id: string;
    question: string;       // e.g., "Do you provide raw files?" [cite: 125]
    answer: string;         // e.g., "Raw files are available as an add-on..."
    category?: "Booking" | "Delivery" | "Rights";
}

// =========================================
// 7. BOOKING & INQUIRY (Based on Doc Section 12)
// Source: [cite: 114, 150]
// =========================================

export interface InquiryForm {
    name: string;
    email: string;
    phone?: string;
    eventType: string;      // e.g., Wedding, Corporate
    eventDate: Date | undefined;
    message?: string;
}
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
    imageUrl: string; // <--- NEW FIELD
}