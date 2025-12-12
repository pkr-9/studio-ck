import { useStartup } from "@/context/StartupContext";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NeonRain } from "./HeroScenes";
import { motion } from "framer-motion";

interface HeroProps {
  headline: string;
  subhead: string;
}

export function Hero({ headline, subhead }: HeroProps) {
  const { stage, setStage } = useStartup();
  return (
    // Change 1: Use h-[100dvh] for full mobile screen height
    <section className="relative w-full h-[100dvh] overflow-hidden bg-transparent flex items-center justify-center">
      {/* === 3D Layer (Neon Rain) === */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none pt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "idle" ? 0 : 1 }} // Show when stage is NOT idle
        transition={{ duration: 1.5 }} // Slow fade for rain
      >
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          dpr={[1, 1.5]}
          onCreated={() => {
            // 3D Scene is ready. Trigger the sequence.
            // We add a small timeout to ensure the fade-in looks smooth.
            setTimeout(() => setStage("rain"), 100);

            // After Rain is visible (e.g. 1.5s later), trigger Text
            setTimeout(() => setStage("text"), 1600);
          }}
        >
          <ambientLight intensity={0.2} />
          <NeonRain />
          <fog attach="fog" args={["#020617", 5, 25]} />
          <Environment preset="night" />
        </Canvas>
      </motion.div>

      {/* === Content Layer === */}
      {/* Change 2: Added pt-20 to visually balance text vs the fixed Navbar */}
      <div className="container relative z-10 mx-auto px-6 pt-20">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col gap-4 items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity:
              stage === "text" || stage === "navbar" || stage === "complete"
                ? 1
                : 0,
            y:
              stage === "text" || stage === "navbar" || stage === "complete"
                ? 0
                : 20,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => {
            // Once text finishes animating, trigger Navbar
            if (stage === "text") setStage("navbar");
          }}
        >
          {/* Badge */}
          <div className="animate-in fade-in zoom-in duration-1000 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/30 px-4 py-1 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium tracking-wide text-foreground/90">
              Accepting Bookings for 2025
            </span>
          </div>

          <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-[0.9] drop-shadow-2xl">
            {headline}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl leading-relaxed font-light">
            {subhead}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-2 w-full sm:w-auto">
            <Button
              size="lg"
              className="h-14 px-10 text-lg rounded-full shadow-[0_0_30px_-5px_var(--primary)] hover:shadow-[0_0_50px_-10px_var(--primary)] transition-all duration-500"
              asChild
            >
              <Link to="/portfolio">View Portfolio</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg rounded-full bg-transparent border-foreground/20 hover:bg-foreground/5 backdrop-blur-sm"
              asChild
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
