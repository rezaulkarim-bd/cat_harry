import Link from "next/link";

import { Aperture } from "lucide-react";
import { cn } from "cn";

// Shared brand mark so the header, footer, and mobile menus always match.
export function LogoMark({ className }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Aperture className="size-5" />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Studio<span className="text-primary">Space</span>
      </span>
    </Link>
  );
}
