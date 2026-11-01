import { Suspense } from "react";
import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedStudios } from "@/components/home/featured-studios";
import { CategoryGrid } from "@/components/home/category-grid";
import { BookingSteps, HostGuarantee } from "@/components/home/home-sections";
import { Skeleton } from "@/components/ui/skeleton";

function FeaturedStudiosSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      <Skeleton className="h-8 w-72" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-72 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSlider />

      {/* DB-backed section streams in; skeleton shows during prerender */}
      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>

      <CategoryGrid />
      <BookingSteps />
      <HostGuarantee />
    </main>
  );
}
