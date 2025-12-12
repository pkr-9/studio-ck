import { useShowcase } from "@/hooks/use-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function WeddingSpotlight() {
  const { data: showcase } = useShowcase();

  return (
    <section className="relative w-full py-24 bg-background">
      <div className="container mx-auto px-6 mb-8 flex items-end justify-between">
        <div>
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
            The Big Day
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-black">
            Weddings & Unions
          </h2>
        </div>
        <p className="hidden md:block text-muted-foreground max-w-sm text-right">
          Cinematic documentation of your most important day.
        </p>
      </div>

      <Carousel
        className="w-full"
        plugins={[Autoplay({ delay: 4000 })]}
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent>
          {showcase?.weddings.map((item) => (
            <CarouselItem
              key={item.id}
              className="md:basis-4/5 lg:basis-3/4 pl-4"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl group">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <h3 className="text-white text-2xl md:text-4xl font-heading font-bold">
                    {item.caption}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Navigation buttons positioned creatively */}
        <div className="absolute bottom-12 right-12 hidden md:flex gap-2">
          <CarouselPrevious
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
          />
          <CarouselNext
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
          />
        </div>
      </Carousel>
    </section>
  );
}
