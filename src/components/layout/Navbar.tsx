import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BrandIcon3D } from "@/components/ui/3d-pin";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/packages", label: "Pricing" },
  { href: "/about", label: "Studio" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/20 backdrop-blur-md border-none py-2 shadow-lg supports-[backdrop-filter]:bg-background/20" // Frosted Glass
          : "bg-transparent border-none py-3 md:py-4" // Fully Transparent
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* === LEFT: Logo === */}
        <Link to="/" className="flex items-center gap-2 group relative z-50">
          <div className="w-9 h-9 md:w-10 md:h-10 relative">
            <BrandIcon3D className="w-full h-full" />
          </div>
          <span className="text-lg md:text-xl font-heading font-bold tracking-tight group-hover:opacity-80 transition-opacity">
            PhotoStudio
          </span>
        </Link>

        {/* === CENTER: Desktop Nav === */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-2",
                location.pathname === link.href
                  ? "text-primary font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:content-['']"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* === RIGHT: Actions (Desktop) === */}
        <div className="hidden md:flex items-center gap-3">
          <div className="h-6 w-px bg-border/40 mx-1" />
          <ModeToggle />
          <Button
            asChild
            size="sm"
            className="ml-2 px-6 font-semibold shadow-md shadow-primary/20"
          >
            <Link to="/contact">Book Now</Link>
          </Button>
        </div>

        {/* === RIGHT: Actions (Mobile) === */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] max-w-[400px] flex flex-col p-0 border-l border-border/20 bg-background/95 backdrop-blur-xl"
            >
              <div className="p-6 pt-12 flex-grow overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        to={link.href}
                        className={cn(
                          "text-2xl font-heading font-medium py-4 border-b border-border/10 transition-colors",
                          location.pathname === link.href
                            ? "text-primary pl-4 border-l-4 border-l-primary bg-primary/5"
                            : "text-foreground/80 hover:text-primary hover:pl-2"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}

                  <SheetClose asChild>
                    <Link
                      to="/contact"
                      className="text-2xl font-heading font-medium py-4 text-foreground/80 hover:text-primary hover:pl-2 transition-all"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </div>
              </div>

              <div className="p-6 bg-muted/10 border-t border-border/20">
                <SheetClose asChild>
                  <Button
                    size="lg"
                    className="w-full text-lg h-12 shadow-lg shadow-primary/20"
                    asChild
                  >
                    <Link to="/contact">Book a Session</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
