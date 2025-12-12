import { useTheme } from "@/components/ThemeProvider";

export function BackgroundPattern() {
  const { theme } = useTheme();

  // Opacity levels: Higher in light mode for visibility, lower in dark mode for subtlety
  const opacity = theme === "dark" ? 0.03 : 0.08;

  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none overflow-hidden h-screen w-screen bg-background">
      {/* Layer 1: The Fun Doodle Pattern */}
      <svg
        className="absolute inset-0 w-full h-full text-primary"
        style={{ opacity: opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="doodle-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(15)" // Angled for a dynamic look
          >
            {/* 1. Camera Icon */}
            <path
              d="M10 30 L30 30 L35 25 L45 25 L50 30 L70 30 L70 60 L10 60 Z M40 45 A 8 8 0 1 0 40 46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            {/* 2. Smiley Face (Fun element) */}
            <circle
              cx="80"
              cy="20"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M77 18 L77 20 M83 18 L83 20"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M76 23 Q80 28 84 23"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            {/* 3. Lightning/Flash (Energy) */}
            <path
              d="M15 80 L25 80 L20 95 L35 95 L15 115 L20 100 L10 100 Z"
              fill="currentColor"
            />

            {/* 4. Abstract Squiggle (Texture) */}
            <path
              d="M60 70 Q70 60 80 70 T100 70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* 5. Tiny Plus signs (Filler) */}
            <path
              d="M50 10 V20 M45 15 H55"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Fill the screen with the pattern */}
        <rect width="100%" height="100%" fill="url(#doodle-pattern)" />
      </svg>

      {/* Layer 2: Grain/Noise Texture (The "Raw/Paper" look) */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
