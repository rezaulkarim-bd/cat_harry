"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeftIcon, ChevronRightIcon, Plus } from "lucide-react";

import { HERO_SLIDES } from "@/lib/studios-data";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function HeroSlider() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    const autoplay = setInterval(() => api.scrollNext(), 6000);

    return () => {
      api.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [api]);

  function scrollTo(index) {
    api?.scrollTo(index);
  }

  return (
    <section className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {HERO_SLIDES.map((slide, index) => (
            <CarouselItem key={slide.headline}>
              <div
                className={cn(
                  "relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br px-6 py-20 text-center text-white md:min-h-[560px]",
                  index === 0 && "from-primary via-indigo-600 to-violet-700",
                  index === 1 && "from-fuchsia-600 via-purple-600 to-indigo-700",
                  index === 2 && "from-teal-500 via-emerald-600 to-cyan-700"
                )}
              >
                {/* Decorative studio glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-white/10 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-black/20 blur-3xl"
                />

                <div className="mx-auto max-w-3xl space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                    {slide.eyebrow}
                  </p>
                  <h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl">
                    {slide.headline}
                  </h1>
                  <p className="text-lg text-white/85 text-pretty">
                    {slide.subtext}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 text-foreground backdrop-blur"
          aria-label="Next slide"
        >
          <ChevronRightIcon />
        </Button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.headline}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index}
              className={cn(
                "h-2 rounded-full bg-white/50 transition-all",
                current === index ? "w-6 bg-white" : "w-2 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      </Carousel>

      {/* Primary CTAs */}
      <div className="absolute inset-x-0 bottom-14 hidden md:flex items-center justify-center gap-4">
        <Button size="lg" render={<Link href="/studios" />} className="shadow-lg">
          Explore Studios
          <ArrowRight />
        </Button>
        <Button
          size="lg"
          variant="outline"
          render={<Link href="/studios?become-host=1" />}
          className="border-white/40 bg-black/25 text-white backdrop-blur hover:bg-black/35 hover:text-white"
        >
          <Plus />
          Host Your Space
        </Button>
      </div>
    </section>
  );
}
