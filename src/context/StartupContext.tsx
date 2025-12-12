// src/context/StartupContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

type Stage = "idle" | "rain" | "text" | "navbar" | "complete";

interface StartupContextType {
  stage: Stage;
  setStage: (stage: Stage) => void;
  isHome: boolean;
}

const StartupContext = createContext<StartupContextType | null>(null);

export function StartupProvider({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<Stage>("idle");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    // If we represent NOT on the home page, skip the animation sequence
    if (!isHome) {
      setStage("complete");
    } else {
      // If we navigate back to home, decide if we want to replay (reset to idle)
      // or keep it loaded. Usually replaying feels "heavy", so we might skip reset.
      // Uncomment the line below to FORCE replay every time you visit Home:
      // setStage("idle");
    }
  }, [location.pathname]);

  return (
    <StartupContext.Provider value={{ stage, setStage, isHome }}>
      {children}
    </StartupContext.Provider>
  );
}

export function useStartup() {
  const context = useContext(StartupContext);
  if (!context)
    throw new Error("useStartup must be used within StartupProvider");
  return context;
}
