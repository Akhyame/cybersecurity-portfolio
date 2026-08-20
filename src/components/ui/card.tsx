import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
};

export function Card({
  children,
  className = "",
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-border bg-surface/80 p-5 text-foreground shadow-[0_8px_30px_rgba(2,6,23,0.45)] backdrop-blur-sm",
        hoverable
          ? "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_10px_35px_rgba(34,211,238,0.12)]"
          : "transition-colors duration-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
