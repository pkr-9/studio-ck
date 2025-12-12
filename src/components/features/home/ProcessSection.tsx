import { useProcess } from "@/hooks/use-content";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Camera,
  Edit3,
  DownloadCloud,
  CalendarCheck,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";

// Map icon strings from JSON to actual Lucide components
const IconMap: Record<string, any> = {
  MessageSquare,
  Camera,
  Edit3,
  DownloadCloud,
  CalendarCheck,
  Package,
};

export function ProcessSection() {
  const { data: steps, isLoading } = useProcess();

  if (isLoading) return null; // Or a Skeleton component

  return (
    <section className="py-24 relative overflow-hidden bg-secondary/20">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
            The Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black mb-4">
            How We Work
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            From the first hello to the final delivery, we make the process
            seamless and transparent.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10" />

          {steps?.map((step: any, index: number) => {
            const Icon = IconMap[step.iconName] || Package;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div className="w-24 h-24 rounded-full bg-background border-4 border-secondary flex items-center justify-center mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/50 shadow-lg">
                  <Icon className="w-10 h-10 text-primary" />

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm border-2 border-background">
                    {step.stepNumber}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
