import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const InnerPageLayout = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-body text-foreground">
      {/* 1. The Fixed Navbar with 3D Logo */}
      <Navbar />

      {/* 2. The Dynamic Page Content */}
      {/* Added pt-20 to prevent content from hiding behind fixed navbar */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>

      {/* 3. The Footer with 3D Branding */}
      <Footer />

      {/* 4. Utilities */}
      <ScrollRestoration />
    </div>
  );
};
