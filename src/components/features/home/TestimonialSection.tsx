import { useTestimonials } from "@/hooks/use-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestimonialSection() {
  const { data: testimonials } = useTestimonials();

  return (
    <section className="py-24 bg-background relative">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
              Client Love
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight">
              Don't just take our
              <br /> word for it.
            </h2>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials?.map((t: any) => (
              <CarouselItem
                key={t.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <Card className="h-full border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <CardContent className="flex flex-col justify-between h-full p-8">
                      <div>
                        <Quote className="w-10 h-10 text-primary/20 mb-6" />

                        {/* Star Rating */}
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < t.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }
                            />
                          ))}
                        </div>

                        <p className="text-lg font-light leading-relaxed mb-6 italic">
                          "{t.content}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-border/10">
                        <Avatar>
                          <AvatarImage src={t.avatarUrl} />
                          <AvatarFallback>{t.clientName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm font-heading">
                            {t.clientName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.role || "Client"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8 mr-4">
            <CarouselPrevious className="static translate-y-0 translate-x-0" />
            <CarouselNext className="static translate-y-0 translate-x-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
