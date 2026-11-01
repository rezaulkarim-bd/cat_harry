import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Mic,
  Music,
  Palette,
} from "lucide-react";

import { HOME_CATEGORIES } from "@/lib/studios-data";
import { cn } from "cn";
import { SectionHeading } from "@/components/home/featured-studios";

const CATEGORY_ICONS = {
  "photo-studios": Camera,
  "sound-stages": Clapperboard,
  "podcast-rooms": Mic,
  "music-suites": Music,
  "art-workshops": Palette,
};

function CategoryIcon({ Icon }) {
  return <Icon className="size-6" />;
}

export function CategoryGrid() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          eyebrow="Browse by Category"
          title="Find your space, by craft"
          subtitle="Every category is pre-filtered on the studios page — pick one and start shortlisting."
        />

        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {HOME_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/studios?category=${category.slug}`}
              className={cn(
                "group relative flex flex-col items-start gap-10 overflow-hidden rounded-xl border bg-gradient-to-br p-5 transition-all hover:-translate-y-0.5 hover:shadow-md",
                category.accent
              )}
            >
              <CategoryIcon Icon={CATEGORY_ICONS[category.slug]} />
              <span className="flex items-center justify-between gap-2 text-left text-sm font-semibold leading-tight">
                {category.label}
                <ArrowUpRight className="size-4 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
