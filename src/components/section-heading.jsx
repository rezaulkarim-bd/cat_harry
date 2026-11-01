import { cn } from "cn";

// Single source of truth for section headings across the site (font, size,
// and color live here; alignment is the only variation).
export function SectionHeading({ eyebrow, title, subtitle, align = "left", action = null }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      )}
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
        {subtitle ? (
          <p className={cn("max-w-xl text-muted-foreground", align === "center" && "mx-auto")}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
