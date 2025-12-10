import { usePortfolio } from "@/hooks/use-content";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FeaturedWork() {
  const { data: portfolio } = usePortfolio();

  // Slice to get just 4 items for home
  const items = portfolio?.slice(0, 4) || [];

  return (
    <section className="py-24 bg-muted/5 relative">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
              Selected Works
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight">
              Captured Moments
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/portfolio">View Full Gallery</Link>
          </Button>
        </div>

        {/* Artistic Grid: 
            Item 1 is large (Featured), 
            Item 2 & 3 are stacked column, 
            Item 4 is wide.
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px]">
          {/* Item 1: Large Feature (Left) */}
          <div className="md:col-span-8 row-span-2 relative group overflow-hidden rounded-xl">
            <PortfolioCard item={items[0]} priority />
          </div>

          {/* Item 2: Vertical Stack (Right Top) */}
          <div className="md:col-span-4 row-span-1 relative group overflow-hidden rounded-xl">
            <PortfolioCard item={items[1]} />
          </div>

          {/* Item 3: Vertical Stack (Right Bottom) */}
          <div className="md:col-span-4 row-span-1 relative group overflow-hidden rounded-xl">
            <PortfolioCard item={items[2]} />
          </div>
        </div>

        {/* Mobile-only View More for UX */}
        <div className="mt-8 md:hidden text-center">
          <Button variant="ghost" asChild>
            <Link to="/portfolio">View All Projects →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({
  item,
  priority = false,
}: {
  item: any;
  priority?: boolean;
}) {
  if (!item) return null; // Safety check

  return (
    <Link to="/portfolio" className="block w-full h-full">
      <div className="w-full h-full relative bg-card">
        {/* Image */}
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading={priority ? "eager" : "lazy"}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Content (Bottom Left) */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
            {item.category}
          </span>
          <h3
            className={cn(
              "font-heading font-bold text-white",
              priority ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
            )}
          >
            {item.title}
          </h3>
          <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {item.clientName}
          </p>
        </div>

        {/* Video Indicator */}
        {item.mediaType === "video" && (
          <div className="absolute top-4 right-4 text-white/80 group-hover:text-primary transition-colors">
            <PlayCircle size={priority ? 48 : 32} />
          </div>
        )}
      </div>
    </Link>
  );
}
