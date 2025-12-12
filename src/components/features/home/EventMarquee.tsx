import { useShowcase } from "@/hooks/use-content";
import { motion } from "framer-motion";

export function EventMarquee() {
  const { data: showcase } = useShowcase();
  const images = showcase?.parties || [];

  // Duplicate images to create seamless loop
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
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {marqueeImages.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img
                src={src}
                alt="Party event"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 2: Moving Right (Slower) */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {marqueeImages.map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500"
            >
              <img
                src={src}
                alt="Party event"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
