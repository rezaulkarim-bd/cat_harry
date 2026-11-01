"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Building2,
} from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

const USER_MENU_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/studios/new", icon: Plus },
  { label: "My Studio Listings", href: "/my-studios", icon: Building2 },
  { label: "My Bookings", href: "/bookings", icon: CalendarCheck },
];

export function SiteHeader({ user = null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // TODO: wire real auth here. Example shape:
  // const user = { name: "Harry Cat", email: "harry@studiospace.com", image: "/cat.png" }
  const isAuthed = Boolean(user);
  const displayName = user?.name ?? "";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <LogoMark />

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary transition-opacity",
                  isActive(link.href) ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          {!isAuthed ? (
            <>
              <Button variant="ghost" render={<Link href="/login" />}>
                Login
              </Button>
              <Button render={<Link href="/register" />}>Register</Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50"
                  />
                }
              >
                <Avatar>
                  {user.image ? <AvatarImage src={user.image} alt={displayName} /> : null}
                  <AvatarFallback>{initials || "?"}</AvatarFallback>
                </Avatar>
                <span className="max-w-32 truncate text-sm font-medium">
                  {displayName}
                </span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="truncate text-sm text-foreground">{displayName}</span>
                  {user.email ? (
                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {user.email}
                    </span>
                  ) : null}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {USER_MENU_LINKS.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    render={<Link href={item.href} />}
                  >
                    <item.icon />
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {/* TODO: hook up real logout */}
                <DropdownMenuItem variant="destructive" onClick={() => {}}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <LogoMark />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={<Link href={link.href} className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )} />}
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t p-4">
              {!isAuthed ? (
                <>
                  <Button variant="outline" className="w-full" render={<Link href="/login" />}>
                    Login
                  </Button>
                  <Button className="w-full" render={<Link href="/register" />}>
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 px-1 pb-1">
                    <Avatar>
                      {user.image ? <AvatarImage src={user.image} alt={displayName} /> : null}
                      <AvatarFallback>{initials || "?"}</AvatarFallback>
                    </Avatar>
                    <span className="truncate text-sm font-medium">{displayName}</span>
                  </div>
                  {USER_MENU_LINKS.map((item) => (
                    <SheetClose
                      key={item.href}
                      render={<Link
                        href={item.href}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      />}
                    >
                      <item.icon />
                      {item.label}
                    </SheetClose>
                  ))}
                  {/* TODO: hook up real logout */}
                  <Button variant="ghost" className="justify-start text-destructive hover:text-destructive">
                    <LogOut />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
