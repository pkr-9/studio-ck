//         // 1 -----------------------------------------------------
// import { Canvas } from "@react-three/fiber";
// import { Environment, ContactShadows } from "@react-three/drei";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { FloatingLens, StereoPillars } from "./HeroScenes";
// import { useIsMobile } from "@/hooks/use-mobile";

// type HeroLayout = "left" | "center" | "right";

// interface HeroProps {
//   layout?: HeroLayout;
//   headline: string;
//   subhead: string;
// }

// export function Hero({ layout = "center", headline, subhead }: HeroProps) {
//   const isMobile = useIsMobile();

//   // On mobile, force center layout but we might adjust camera zoom in 3D scene
//   const activeLayout = isMobile ? "center" : layout;

//   return (
//     <section className="relative w-full h-[85vh] overflow-hidden bg-background flex items-center">
//       {/* === 1. The 3D Layer === */}
//       <div className="absolute inset-0 z-0">
//         <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 2]}>
//           <ambientLight intensity={0.5} />
//           {/* Top light for drama */}
//           <spotLight
//             position={[0, 15, 0]}
//             angle={0.3}
//             penumbra={1}
//             intensity={2}
//             color="#ffffff"
//           />
//           {/* Side fill lights for the Midnight theme colors */}
//           <pointLight position={[-10, 0, 5]} intensity={1} color="#8b5cf6" />
//           <pointLight position={[10, 0, 5]} intensity={1} color="#3b82f6" />

//           {/* Conditional 3D Content */}
//           {activeLayout === "left" && <FloatingLens position={[3.5, 0, 0]} />}
//           {activeLayout === "right" && <FloatingLens position={[-3.5, 0, 0]} />}
//           {activeLayout === "center" && <StereoPillars />}

//           {/* Environment reflection */}
//           <Environment preset="night" />
//         </Canvas>
//       </div>

//       {/* === 2. The Content Layer === */}
//       <div className="container relative z-10 mx-auto px-6 pointer-events-none">
//         <div
//           className={cn(
//             "max-w-3xl flex flex-col gap-8 pointer-events-auto transition-all duration-500",
//             // Layout Alignment Classes
//             activeLayout === "left" && "items-start text-left mr-auto",
//             activeLayout === "center" && "items-center text-center mx-auto",
//             activeLayout === "right" && "items-end text-right ml-auto"
//           )}
//         >
//           {/* Floating Badge */}
//           <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <span className="inline-flex items-center rounded-full border border-primary/20 bg-background/50 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md shadow-[0_0_15px_rgba(109,92,232,0.3)]">
//               <span className="relative flex h-2 w-2 mr-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
//               </span>
//               Accepting Bookings for 2025
//             </span>
//           </div>

//           <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] drop-shadow-sm animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
//             {headline}
//           </h1>

//           <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
//             {subhead}
//           </p>

//           <div className="flex flex-wrap justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
//             <Button
//               size="lg"
//               className="h-14 px-8 text-base shadow-[0_4px_20px_rgba(109,92,232,0.4)] hover:shadow-[0_4px_25px_rgba(109,92,232,0.6)] transition-shadow"
//               asChild
//             >
//               <Link to="/portfolio">View Portfolio</Link>
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="h-14 px-8 text-base bg-background/30 backdrop-blur-sm border-white/10 hover:bg-background/50"
//               asChild
//             >
//               <Link to="/contact">Get in Touch</Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Vignette Overlay for Focus */}
//       <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_20%,rgba(8,12,23,0.6)_100%)] pointer-events-none" />
//     </section>
//   );
// }

// // 2 ----------------------------------------------------
// import { Canvas } from "@react-three/fiber";
// import { Environment, ContactShadows, Stars } from "@react-three/drei";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { LiquidLens, LiquidFlow } from "./HeroScenes"; // Import the new Liquid scenes
// import { useIsMobile } from "@/hooks/use-mobile";

// type HeroLayout = "left" | "center" | "right";

// interface HeroProps {
//   layout?: HeroLayout;
//   headline: string;
//   subhead: string;
// }

// export function Hero({ layout = "left", headline, subhead }: HeroProps) {
//   const isMobile = useIsMobile();
//   const activeLayout = isMobile ? "center" : layout;

//   return (
//     <section className="relative w-full h-[90vh] overflow-hidden bg-background flex items-center">
//       {/* === 1. The 3D Layer === */}
//       <div className="absolute inset-0 z-0">
//         <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
//           {/* Lighting is crucial for the Liquid effect */}
//           <ambientLight intensity={0.3} />
//           {/* Blue rim light from left */}
//           <spotLight
//             position={[-10, 5, 5]}
//             angle={0.5}
//             penumbra={1}
//             color="#3b82f6"
//             intensity={5}
//           />
//           {/* Violet rim light from right */}
//           <spotLight
//             position={[10, 5, 5]}
//             angle={0.5}
//             penumbra={1}
//             color="#8b5cf6"
//             intensity={5}
//           />

//           {/* Conditional Rendering Logic */}
//           {activeLayout === "left" && <LiquidLens position={[3, 0, 0]} />}
//           {activeLayout === "right" && <LiquidLens position={[-3, 0, 0]} />}
//           {activeLayout === "center" && <LiquidFlow />}

//           <ContactShadows
//             position={[0, -3.5, 0]}
//             opacity={0.6}
//             scale={30}
//             blur={2}
//             far={4}
//             color="#000"
//           />

//           {/* Warehouse gives great reflections for metal/liquid */}
//           <Environment preset="warehouse" background={false} />

//           {/* Subtle starfield for the "Midnight" theme */}
//           <Stars
//             radius={100}
//             depth={50}
//             count={5000}
//             factor={4}
//             saturation={0}
//             fade
//             speed={1}
//           />
//         </Canvas>
//       </div>

//       {/* === 2. The Content Layer === */}
//       <div className="container relative z-10 mx-10 px-6 pointer-events-none">
//         <div
//           className={cn(
//             "max-w-2xl flex flex-col gap-6 pointer-events-auto",
//             activeLayout === "left" && "items-start text-left mr-auto",
//             activeLayout === "center" && "items-center text-center mx-auto",
//             activeLayout === "right" && "items-end text-right ml-auto"
//           )}
//         >
//           {/* "Unprofessional" / Organic Badge */}
//           <div className="inline-flex items-center rounded-full border border-primary/40 bg-background/50 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.3)]">
//             Raw • Organic • Timeless
//           </div>

//           <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.95] drop-shadow-2xl">
//             {headline}
//           </h1>

//           <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-light">
//             {subhead}
//           </p>

//           <div className="flex flex-wrap gap-4 pt-6">
//             <Button
//               size="lg"
//               className="h-14 px-8 rounded-full border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-500 backdrop-blur-md"
//               asChild
//             >
//               <Link to="/portfolio">See The Flow</Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Vignette Overlay for Focus */}
//       <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)] pointer-events-none" />
//     </section>
//   );
// }

// 3 ----------------------------------------------------
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NeonRain } from "./HeroScenes";

interface HeroProps {
  headline: string;
  subhead: string;
}

export function Hero({ headline, subhead }: HeroProps) {
  return (
    // Change 1: Use h-[100dvh] for full mobile screen height
    <section className="relative w-full h-[100dvh] overflow-hidden bg-transparent flex items-center justify-center">
      {/* === 3D Layer (Neon Rain) === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 12], fov: 45 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.2} />
          <NeonRain />
          <fog attach="fog" args={["#020617", 5, 25]} />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* === Content Layer === */}
      {/* Change 2: Added pt-20 to visually balance text vs the fixed Navbar */}
      <div className="container relative z-10 mx-auto px-6 pt-0">
        <div className="max-w-4xl mx-auto flex flex-col gap-4 items-center text-center">
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
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
