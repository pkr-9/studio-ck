// src/hooks/use-content.ts
import { useQuery } from "@tanstack/react-query";
import { fetchJSON, NavData, HomeData, Service, Product, Industry, Testimonial, CaseStudy } from "@/lib/api";
import { PortfolioItem } from "@/data/types";

export function usePortfolio() {
    return useQuery({
        queryKey: ["portfolio"],
        queryFn: () => fetchJSON<PortfolioItem[]>("/data/portfolio.json"),
    });
}

export function useServices() {
    return useQuery({
        queryKey: ["services"],
        queryFn: () => fetchJSON<Service[]>("/data/services.json"),
    });
}

// export function useNavData() {
//     return useQuery({
//         queryKey: ["nav"],
//         queryFn: () => fetchJSON<NavData>("/data/nav.json"),
//         staleTime: 1000 * 60 * 60, // 1 hour
//     });
// }

export function useHomeData() {
    return useQuery({
        queryKey: ["home"],
        queryFn: () => fetchJSON<HomeData>("/data/home.json"),
    });
}



// export function useProducts() {
//     return useQuery({
//         queryKey: ["products"],
//         queryFn: () => fetchJSON<Product[]>("/data/products.json"),
//     });
// }



// export function useCaseStudies() {
//     return useQuery({
//         queryKey: ["case-studies"],
//         queryFn: () => fetchJSON<CaseStudy[]>("/data/case-studies.json"),
//     });
// }

// export function useTestimonials() {
//     return useQuery({
//         queryKey: ["testimonials"],
//         queryFn: () => fetchJSON<Testimonial[]>("/data/testimonials.json"),
//     });
// }

// export function useIndustries() {
//     return useQuery({
//         queryKey: ["industries"],
//         queryFn: () => fetchJSON<Industry[]>("/data/industries.json"),
//     });
// }

// export function useProductBySlug(slug: string | undefined) {
//     return useQuery({
//         queryKey: ["product", slug],
//         queryFn: async () => {
//             if (!slug) throw new Error("No slug provided");
//             const products = await fetchJSON<Product[]>("/data/products.json");
//             const product = products.find((p) => p.slug === slug);
//             if (!product) throw new Error("Product not found");
//             return product;
//         },
//         enabled: !!slug,
//         retry: false, // Don't retry if not found
//     });
// }

// export function useServiceBySlug(slug: string | undefined) {
//     return useQuery({
//         queryKey: ["service", slug],
//         queryFn: async () => {
//             if (!slug) throw new Error("No slug provided");
//             const services = await fetchJSON<Service[]>("/data/services.json");
//             const service = services.find((s) => s.slug === slug);
//             if (!service) throw new Error("Service not found");
//             return service;
//         },
//         enabled: !!slug,
//         retry: false,
//     });
// }

// export function useCaseStudyBySlug(slug: string | undefined) {
//     return useQuery({
//         queryKey: ["case-study", slug],
//         queryFn: async () => {
//             if (!slug) throw new Error("No slug provided");
//             const studies = await fetchJSON<CaseStudy[]>("/data/case-studies.json");
//             const study = studies.find((s) => s.slug === slug);
//             if (!study) throw new Error("Case Study not found");
//             return study;
//         },
//         enabled: !!slug,
//         retry: false,
//     });
// }