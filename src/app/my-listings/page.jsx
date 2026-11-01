// Private Route — /my-listings (READ). Management UI (edit/delete) lands with
// the rest of the CRUD work; this stub keeps the /add-studio redirect working.
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

export const metadata = { title: "My Studio Listings — StudioSpace" };

export default function MyListingsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <SectionHeading eyebrow="Host Dashboard" title="My Studio Listings" />
      <div className="mt-8 flex items-center gap-3 rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
        <LayoutDashboard className="size-5 shrink-0" />
        <p>
          Listing management (edit, delete, live data) comes with the next
          CRUD step. In the meantime, view the public pages.
        </p>
        <Link
          href="/studios"
          className="ml-auto flex shrink-0 items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
        >
          Explore Studios <ArrowRight className="size-4" />
        </Link>
      </div>
    </main>
  );
}
