import { useRef, useState, useEffect } from "react";
import { useServices } from "@/hooks/use-content";
import { cn } from "@/lib/utils";
import { Camera, Video, Mic2, Wand2, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const IconMap: Record<string, any> = {
  Camera: Camera,
  Video: Video,
  Radio: Mic2,
  Wand: Wand2,
  User: User,
};

export function ServicesSection() {
  const { data: services, isLoading } = useServices();

  if (isLoading) return <ServicesSkeleton />;

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />

      <div className="container px-6 mx-auto">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
            What We Do
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black mb-4">
            Core Services
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            We deliver beautiful, reliable, and emotionally resonant visual
            stories.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

// === Sub-Component for Individual Card Logic ===
function ServiceCard({ service }: { service: any }) {
  const Icon = IconMap[service.iconName] || Camera;
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const [isHovered, setHovered] = useState(false);

  // Framer Motion Hook: Detects when element is in center of viewport
  // margin: "-20%" acts as a "focus zone" in the middle of the screen
  const isInView = useInView(ref, {
    margin: "-20% 0px -20% 0px",
    amount: 0.5, // Trigger when 50% of the card is visible
  });

  // Determine Active State:
  // Mobile = controlled by Scroll Position (In View)
  // Desktop = controlled by Mouse Hover
  const isActive = isMobile ? isInView : isHovered;

  return (
    <div ref={ref} className="h-full">
      <Link
        to={`/services#${service.slug}`}
        className="relative h-[400px] w-full block overflow-hidden rounded-2xl border border-border/20 bg-card"
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
      >
        {/* === IMAGE LAYER (The Lens Focus Effect) === */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.imageUrl}
            alt={service.title}
            className={cn(
              "h-full w-full object-cover transition-all duration-700 ease-out will-change-transform",
              isActive
                ? "grayscale-0 blur-0 scale-110 opacity-100" // Active State (Clear)
                : "grayscale blur-[2px] scale-100 opacity-60" // Idle State (Blurred)
            )}
          />
          {/* Overlay Gradient: Always present for text readability, but lighter when active */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-500",
              isActive ? "opacity-60" : "opacity-90"
            )}
          />

          {/* Colored tint: Only visible when active */}
          <div
            className={cn(
              "absolute inset-0 bg-primary/20 mix-blend-overlay transition-opacity duration-500",
              isActive ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* === CONTENT LAYER === */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          {/* Icon Container - Floats up when active */}
          <div
            className={cn(
              "mb-auto transform transition-transform duration-500",
              isActive ? "-translate-y-2" : "translate-y-0"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-lg backdrop-blur-md border flex items-center justify-center transition-colors duration-300",
                isActive
                  ? "bg-primary text-white border-primary"
                  : "bg-background/10 text-primary-foreground border-white/10"
              )}
            >
              <Icon size={24} />
            </div>
          </div>

          {/* Text Content - Slides up when active */}
          <div
            className={cn(
              "transform transition-transform duration-500",
              isActive ? "translate-y-0" : "translate-y-4"
            )}
          >
            <h3
              className={cn(
                "text-2xl font-heading font-bold mb-2 transition-colors",
                isActive ? "text-white" : "text-foreground"
              )}
            >
              {service.title}
            </h3>

            <p
              className={cn(
                "text-sm leading-relaxed mb-6 line-clamp-2 transition-colors",
                isActive ? "text-white/90" : "text-muted-foreground"
              )}
            >
              {service.shortDescription}
            </p>

            {/* Button Reveal */}
            <div
              className={cn(
                "flex items-center gap-2 text-sm font-bold text-primary transition-all duration-500 delay-100",
                isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <span className="uppercase tracking-widest">Explore</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <section className="py-24 container px-6">
      <Skeleton className="h-12 w-1/3 mb-4 mx-auto" />
      <Skeleton className="h-6 w-1/2 mb-16 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
        ))}
      </div>
    </section>
  );
}
