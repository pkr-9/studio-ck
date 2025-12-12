import { StartupProvider } from "@/context/StartupContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Outlet, // Import Outlet
  Route,
} from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackgroundPattern } from "@/components/layout/BackgroundPattern";

// Pages
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
// import About from "@/pages/About";
// import Contact from "@/pages/Contact";
import { InnerPageLayout } from "./components/layout/InnerPageLayout";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <StartupProvider>
      <div className="min-h-screen relative font-sans antialiased">
        <BackgroundPattern />
        <div className="relative z-10">
          <Outlet />
        </div>

        <Toaster />
        <Sonner />
      </div>
    </StartupProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    // Wrap everything in RootLayout
    <Route element={<RootLayout />} errorElement={<NotFound />}>
      {/* Your InnerPageLayout likely contains Navbar and Footer */}
      <Route element={<InnerPageLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> */}
      </Route>
    </Route>
  )
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
