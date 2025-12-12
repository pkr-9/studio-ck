import { useStartup } from "@/context/StartupContext";
import { motion } from "framer-motion";
import { useHomeData } from "@/hooks/use-content";
import { Hero } from "@/components/features/home/Hero";
import { ServicesSection } from "@/components/features/home/ServicesSection";
import { FeaturedWork } from "@/components/features/home/FeaturedWork";
import { ProcessSection } from "@/components/features/home/ProcessSection";
import { TestimonialSection } from "@/components/features/home/TestimonialSection";
import { FAQSection } from "@/components/features/home/FAQSection";
import { WeddingSpotlight } from "@/components/features/home/WeddingSpotlight";
import { EventMarquee } from "@/components/features/home/EventMarquee";
import { GatheringTabs } from "@/components/features/home/GatheringTabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data, isLoading } = useHomeData();
  const { stage } = useStartup();

  if (isLoading) return <HomeSkeleton />;

  const showContent = stage === "complete";

  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        headline={data?.headline || "CAPTURING CHAOS"}
        subhead={data?.subhead || "Visual storytelling for the modern era."}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <WeddingSpotlight />

        <section className="py-20 bg-transparent">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
                  Our Philosophy
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                  Reliable. Timeless.
                  <br />
                  <span className="text-muted-foreground">
                    Emotionally Resonant.
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  We don't just take photos; we preserve feelings. Our mission
                  is to deliver visual stories with professional service,
                  predictable delivery, and flexible packages that suit both
                  consumers and businesses.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ValueItem icon={ShieldCheck} text="Data Safety & Privacy" />
                  <ValueItem icon={Clock} text="Fast Turnaround" />
                  <ValueItem icon={Heart} text="Creative Collaboration" />
                  <ValueItem icon={CheckCircle2} text="Clear Communication" />
                </div>
              </div>

              {/* Right: Abstract Visual (Placeholder for now) */}
              <div className="relative h-[400px] w-full bg-secondary/30 rounded-2xl overflow-hidden border border-border/50">
                {/* Decorative Gradient Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-foreground/20 font-heading text-9xl font-black select-none">
                    2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EventMarquee />

        <ServicesSection />

        <GatheringTabs />

        <ProcessSection />

        <FeaturedWork />

        <TestimonialSection />

        <FAQSection />

        <section className="py-24 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-transparent from-primary/10 via-background to-background z-0" />

          <div className="container px-6 mx-auto relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">
              Ready to tell your story?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              From intimate portraits to full-scale event production, our
              calendar fills up quickly. Secure your date today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full"
                asChild
              >
                <Link to="/contact">
                  Book a Consultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur-sm"
                asChild
              >
                <Link to="/packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

// === Helper Components ===

function ValueItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
      <Icon className="w-5 h-5 text-primary" />
      <span className="font-medium text-sm">{text}</span>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-10">
      <Skeleton className="w-full h-[90vh]" />
      <div className="container mx-auto px-6">
        <Skeleton className="w-full h-64 rounded-xl" />
      </div>
    </div>
  );
}
