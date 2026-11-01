import Link from "next/link";
import { ArrowRight, Camera, Clock, MapPin, Star } from "lucide-react";

import { getFeaturedStudios } from "@/lib/studios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function SectionHeading({ eyebrow, title, subtitle, action = null }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
        {subtitle ? (
          <p className="max-w-xl text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function StudioCard({ studio }) {
  return (
    <Card className="group overflow-hidden pt-0">
      {/* Image area: renders <img> when a real image URL exists, otherwise a
          gradient placeholder. TODO: swap to next/image with a remotePattern
          for your CDN once real image hosts are known. */}
      <div
        className={`relative aspect-video overflow-hidden bg-gradient-to-br ${studio.accent ?? "from-muted to-muted-foreground/30"}`}
      >
        {studio.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={studio.image}
            alt={studio.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-white/50 transition-transform duration-500 group-hover:scale-110">
            <Camera className="size-10" />
          </span>
        )}
        {studio.isNew ? (
          <Badge className="absolute left-3 top-3 bg-background/90 text-foreground backdrop-blur">
            New
          </Badge>
        ) : null}
      </div>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{studio.category}</Badge>
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {Number(studio.rating).toFixed(1)}
            {studio.reviews ? (
              <span className="text-muted-foreground">({studio.reviews})</span>
            ) : null}
          </span>
        </div>

        <h3 className="line-clamp-1 font-semibold leading-snug group-hover:text-primary">
          {studio.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-4" />${studio.hourlyRate}/hr
          </span>
          <span className="flex min-w-0 items-center gap-1">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">{studio.location}</span>
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          render={<Link href={`/studios/${studio._id}`} />}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Featured Studios"
        title="Top-rated spaces, ready to shoot"
        subtitle="Hand-picked from our most-booked hosts — verified profiles, pro equipment, and instant booking."
        action={
          <Button variant="ghost" render={<Link href="/studios" />}>
            View all studios
            <ArrowRight />
          </Button>
        }
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <StudioCard key={studio._id} studio={studio} />
        ))}
      </div>
    </section>
  );
}

export { SectionHeading };
