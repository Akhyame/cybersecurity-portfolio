import type { ReactNode } from "react";

type BadgeTone = "neutral" | "cyan" | "blue" | "violet" | "success";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral:
    "border border-border/80 bg-surface/70 text-muted",
  cyan:
    "border border-primary/40 bg-primary/10 text-cyan-200",
  blue:
    "border border-secondary/40 bg-secondary/10 text-blue-200",
  violet:
    "border border-violet/40 bg-violet/10 text-violet-200",
  success:
    "border border-success/40 bg-success/10 text-emerald-200",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] uppercase transition-colors duration-200 ${toneClasses[tone]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
