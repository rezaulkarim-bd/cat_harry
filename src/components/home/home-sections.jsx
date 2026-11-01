import {
  BadgeCheck,
  Clock,
  Headset,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

const BOOKING_STEPS = [
  {
    step: 1,
    title: "Discover Spaces",
    description:
      "Filter thousands of verified studios by craft, city, budget, and gear.",
    Icon: Search,
  },
  {
    step: 2,
    title: "Select Shoot Hours",
    description:
      "Pick the exact hourly slots you need from the host's live calendar.",
    Icon: Clock,
  },
  {
    step: 3,
    title: "Book Instantly",
    description:
      "Confirm your reservation in one tap — no back-and-forth, no phone calls.",
    Icon: Zap,
  },
  {
    step: 4,
    title: "Create & Produce",
    description:
      "Show up, plug in, and make something great. Cancel policy has your back.",
    Icon: Sparkles,
  },
];

export function BookingSteps() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <SectionHeading
        align="center"
        eyebrow="How Booking Works"
        title="From idea to production in four steps"
      />

      <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {BOOKING_STEPS.map(({ step, title, description, Icon }, index) => (
          <li key={step} className="relative flex flex-col items-center gap-4 text-center">
            {/* Connector arrow between steps (desktop) */}
            {index < BOOKING_STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-full top-8 hidden -translate-x-1/2 lg:block"
              >
                <span className="text-2xl text-border">→</span>
              </span>
            ) : null}

            <span className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="size-7" />
              <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {step}
              </span>
            </span>
            <div className="space-y-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const HOST_ASSURANCES = [
  {
    title: "Liability protection",
    description:
      "Every booking is covered by damage and liability protection up to $10,000 — your gear and your space stay safe.",
    Icon: ShieldCheck,
  },
  {
    title: "Verified profiles",
    description:
      "ID checks on every creator and host, plus ratings you can trust before you hand over the keys.",
    Icon: BadgeCheck,
  },
  {
    title: "Equipment safety",
    description:
      "Secure entry codes, checklists, and deposit rules keep sensitive equipment protected between sessions.",
    Icon: PackageCheck,
  },
  {
    title: "24/7 host support",
    description:
      "Real humans around the clock for schedule changes, disputes, or emergencies — before, during, and after the shoot.",
    Icon: Headset,
  },
];

export function HostGuarantee() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">
        <SectionHeading
          align="center"
          eyebrow="Host Guarantee & Creator Support"
          title="Opening your space shouldn't feel risky"
          subtitle="StudioSpace backs every listing and every booking with platform assurances, so hosts and creators can focus on the work."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOST_ASSURANCES.map(({ title, description, Icon }) => (
            <div key={title} className="rounded-xl bg-card p-6 ring-1 ring-foreground/10 shadow-xs">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

