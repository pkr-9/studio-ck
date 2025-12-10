import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn("", className)}
      aria-label="Studio CK Home"
    ></Link>
  );
}
