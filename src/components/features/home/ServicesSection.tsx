import { useServices } from "@/hooks/use-content";
import { cn } from "@/lib/utils";
import { Camera, Video, Mic2, Wand2, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

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
    <section className="py-24 bg-background relative overflow-hidden">
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
          {services?.map((service) => {
            const Icon = IconMap[service.iconName] || Camera;

            return (
              <Link
                key={service.id}
                to={`/services#${service.slug}`}
                className="group relative h-[400px] w-full block overflow-hidden rounded-2xl border border-border/20 bg-card"
              >
                {/* === IMAGE LAYER (The Lens Focus Effect) === */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="h-full w-full object-cover transition-all duration-700 ease-out 
                      filter grayscale blur-[2px] scale-100 opacity-60
                      group-hover:grayscale-0 group-hover:blur-0 group-hover:scale-110 group-hover:opacity-100"
                  />
                  {/* Overlay Gradient: Dark at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent transition-opacity duration-500 group-hover:opacity-60" />

                  {/* Colored tint on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </div>

                {/* === CONTENT LAYER === */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  {/* Icon Container - Floats up on hover */}
                  <div className="mb-auto transform translate-y-0 transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="w-12 h-12 rounded-lg bg-background/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-primary-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* Text Content - Slides up slightly */}
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-heading font-bold mb-2 text-foreground group-hover:text-white transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 group-hover:text-white/90 transition-colors">
                      {service.shortDescription}
                    </p>

                    {/* Button Reveal */}
                    <div className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <span className="uppercase tracking-widest">Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
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
