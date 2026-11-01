"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Aperture, Send } from "lucide-react";

import { cn } from "cn";
import { NAV_LINKS } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const POPULAR_CATEGORIES = [
  { label: "Recording Studios", href: "/studios?category=recording" },
  { label: "Podcast Studios", href: "/studios?category=podcast" },
  { label: "Dance Studios", href: "/studios?category=dance" },
  { label: "Photography Studios", href: "/studios?category=photography" },
  { label: "Rehearsal Spaces", href: "/studios?category=rehearsal" },
  { label: "Production Suites", href: "/studios?category=production" },
];

function XLogo({ className }) {
  // Official X (formerly Twitter) logo — not the old bird.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YouTubeLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedInLogo({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "X (formerly Twitter)", href: "https://x.com", icon: XLogo },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramLogo },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeLogo },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInLogo },
];

function LogoMark({ className }) {
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

// Rendered inside a Suspense boundary in the bottom bar because `new Date()`
// is a prerender-blocking value under Cache Components.
function CurrentYear() {
  return new Date().getFullYear();
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // TODO: wire up real newsletter subscription API
  function handleSubscribe(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  }

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand + mission + socials */}
          <div className="space-y-4">
            <LogoMark />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your all-in-one platform to discover, book, and manage creative
              studio spaces — from recording and podcasting to dance and
              photography.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon-sm"
                  render={<a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} />}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <social.icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick navigation */}
          <nav aria-label="Quick links" className="space-y-3">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular categories */}
          <nav aria-label="Popular studio categories" className="space-y-3">
            <h3 className="text-sm font-semibold">Popular Categories</h3>
            <ul className="space-y-2">
              {POPULAR_CATEGORIES.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Stay in the Loop</h3>
            <p className="text-sm text-muted-foreground">
              New studios, booking tips, and exclusive deals — straight to your
              inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email address"
                className="bg-background"
              />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <Send />
              </Button>
            </form>
            {subscribed ? (
              <p className="text-sm text-primary" role="status">
                You&apos;re subscribed — welcome aboard!
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                No spam. Unsubscribe anytime.
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar: copyright & terms */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; <Suspense fallback="2026"><CurrentYear /></Suspense>{" "}
            StudioSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
