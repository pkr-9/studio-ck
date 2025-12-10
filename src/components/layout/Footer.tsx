import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { BrandIcon3D } from "@/components/ui/3d-pin";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/60 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* 1. Brand & Bio (Top on mobile) */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <div className="w-8 h-8">
                <BrandIcon3D className="w-full h-full" />
              </div>
              <span className="text-xl font-heading font-bold">
                PhotoStudio
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Capturing your most important moments with cinematic quality and
              professional reliability.
            </p>
            {/* Socials - highly visible on mobile */}
            <div className="flex gap-3 pt-2">
              <SocialIcon
                href="#"
                icon={<Instagram size={18} />}
                label="Instagram"
              />
              <SocialIcon
                href="#"
                icon={<Twitter size={18} />}
                label="Twitter"
              />
              <SocialIcon
                href="#"
                icon={<Linkedin size={18} />}
                label="LinkedIn"
              />
              <SocialIcon
                href="#"
                icon={<Facebook size={18} />}
                label="Facebook"
              />
            </div>
          </div>

          {/* 2. Services Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground/90">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <FooterLink to="/services/event-photography">
                Event Photography
              </FooterLink>
              <FooterLink to="/services/event-videography">
                Event Videography
              </FooterLink>
              <FooterLink to="/services/studio-portraits">
                Studio Portraits
              </FooterLink>
              <FooterLink to="/services/live-streaming">
                Live Streaming
              </FooterLink>
              <FooterLink to="/services/creative-editing">
                Editing & Retouching
              </FooterLink>
            </ul>
          </div>

          {/* 3. Company Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground/90">
              Studio
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <FooterLink to="/about">Our Team</FooterLink>
              <FooterLink to="/portfolio">Portfolio Gallery</FooterLink>
              <FooterLink to="/packages">Packages & Pricing</FooterLink>
              <FooterLink to="/contact">Inquiry Form</FooterLink>
              <FooterLink to="/faq">Common Questions</FooterLink>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div className="bg-muted/30 p-6 rounded-lg border border-border/50 md:bg-transparent md:p-0 md:border-0">
            <h3 className="font-heading font-semibold mb-4 text-foreground/90">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>
                  123 Creative Avenue,
                  <br />
                  Design District, NY 10012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="hover:text-primary transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a
                  href="mailto:hello@photostudio.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@photostudio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-border/60 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground text-center md:text-left">
          <p>&copy; {currentYear} PhotoStudio. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link
              to="/privacy"
              className="hover:text-foreground transition-colors py-1"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-foreground transition-colors py-1"
            >
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="hover:text-foreground transition-colors py-1"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// === Helper Components ===

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="p-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      {/* Increased padding for easier touch on mobile */}
      <Link
        to={to}
        className="block py-1 hover:text-foreground transition-colors hover:translate-x-1 duration-200"
      >
        {children}
      </Link>
    </li>
  );
}
