import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  ariaLabel?: string;
};

export function Section({
  children,
  id,
  className = "",
  ariaLabel,
}: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={`py-16 sm:py-20 ${className}`.trim()}>
      <div className="site-container">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  level?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  level = "h2",
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "mx-auto text-center" : "text-left";
  const maxWidthClass = align === "center" ? "max-w-3xl" : "max-w-2xl";
  const Heading = level;

  return (
    <header className={`${alignmentClass} ${maxWidthClass} ${className}`.trim()}>
      {eyebrow ? (
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
          {eyebrow}
        </p>
      ) : null}

      <Heading className="font-heading text-3xl font-semibold leading-tight tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </Heading>

      {description ? (
        <p
          className={[
            "mt-4 text-base leading-7 text-muted sm:text-lg",
            align === "center" ? "mx-auto max-w-2xl" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
