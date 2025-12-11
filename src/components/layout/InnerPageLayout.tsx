import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

export const InnerPageLayout = () => {
  const location = useLocation();

  // Check if the current page is the Homepage
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-body text-foreground">
      {/* 1. The Fixed Navbar */}
      <Navbar />

      {/* 2. The Dynamic Page Content */}
      {/* Logic: If it's Home, NO padding (0). If it's another page, ADD padding (pt-20) */}
      <main className={cn("flex-grow", !isHomePage && "pt-20")}>
        <Outlet />
      </main>

      {/* 3. The Footer */}
      <Footer />

      {/* 4. Utilities */}
      <ScrollRestoration />
    </div>
  );
};
