import { useRef, useState } from "react";
import { useShowcase } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function EventMarquee() {
  const { data: showcase } = useShowcase();
  const images = showcase?.parties || [];

  // Duplicate images to create seamless loop (triple buffer for safety)
  const marqueeImages = [...images, ...images, ...images];

  return (
    <section className="py-24 overflow-hidden bg-secondary/10">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-black mb-4">
          Life in Motion
        </h2>
        <p className="text-muted-foreground">
          Birthdays, Anniversaries, Concerts, and Private Parties.
        </p>
      </div>

      {/* Row 1: Moving Left */}
      <div className="flex overflow-hidden mb-4">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-33.33%"] }} // Adjusted for triple buffer
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {marqueeImages.map((src, idx) => (
            <MarqueeItem key={`row1-${idx}`} src={src} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: Moving Right (Slower) */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["-33.33%", "0%"] }} // Adjusted for triple buffer
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {marqueeImages.map((src, idx) => (
            <MarqueeItem key={`row2-${idx}`} src={src} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// === Sub-Component for Focus Zone Logic ===
function MarqueeItem({ src }: { src: string }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const [isHovered, setHovered] = useState(false);

  // Focus Zone Logic (Same as ServicesSection)
  // Detects when the element is in the vertical center of the viewport
  const isInView = useInView(ref, {
    margin: "-20% 0px -20% 0px", // Focus zone: middle 60% of screen height
    amount: 0.5, // Trigger when 50% of the item is visible
  });

  // Determine Active State
  // Mobile = Controlled by Scroll Position (In View)
  // Desktop = Controlled by Mouse Hover
  const isActive = isMobile ? isInView : isHovered;

  return (
    <div
      ref={ref}
      className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] shrink-0 rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <img
        src={src}
        alt="Party event"
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out will-change-transform",
          isActive
            ? "grayscale-0 scale-110 opacity-100" // Active State
            : "grayscale scale-100 opacity-60" // Idle State
        )}
      />

      {/* Optional: Tint Overlay that vanishes on active */}
      <div
        className={cn(
          "absolute inset-0 bg-secondary/10 transition-opacity duration-500",
          isActive ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}
