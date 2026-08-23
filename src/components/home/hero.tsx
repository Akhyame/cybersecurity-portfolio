import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

export function Hero() {
  return (
    <Section className="relative overflow-hidden py-10 sm:py-14 lg:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full">
        <div className="absolute left-[-10%] top-10 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute right-[-4%] top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative grid items-center gap-10 lg:min-h-[580px] lg:grid-cols-[1.2fr_1fr] lg:gap-6">
        <div className="relative z-10 max-w-xl lg:max-w-[34rem]">
          <Badge tone="cyan" className="mb-6">
            CYBERSECURITY PORTFOLIO
          </Badge>

          <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            Siham Akhyame
          </h1>

          <div className="mt-5 space-y-2 text-lg text-muted sm:text-xl">
            <p>Cybersecurity Student</p>
            <p>Hands-on Security Projects &amp; Labs</p>
          </div>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
            I build and document practical cybersecurity projects focused on
            cloud-native security, network isolation, access control,
            automation, and observability.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects" variant="primary">
              View Projects
            </ButtonLink>

            <ButtonLink href="https://github.com/Akhyame" variant="secondary">
              GitHub
            </ButtonLink>

            <ButtonLink href="/resume" variant="ghost">
              Resume
            </ButtonLink>

            <ButtonLink href="/contact" variant="secondary">
              Contact
            </ButtonLink>
          </div>
        </div>

        <div className="relative mt-2 flex w-full items-center justify-center lg:ml-auto lg:h-full lg:justify-end">
          <div className="relative h-[420px] w-full max-w-[360px] overflow-hidden sm:h-[460px] sm:max-w-[420px] lg:ml-auto lg:h-[540px] lg:w-[76%] lg:max-w-[560px]">
            <Image
              src="/images/siham-portfolio-portrait-final.png"
              alt="Professional portrait of Siham Akhyame"
              fill
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 38vw"
              className="object-cover object-[center_18%] mix-blend-lighten"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        </div>
      </div>
    </Section>
  );
}
