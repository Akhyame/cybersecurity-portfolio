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

        <div className="relative mt-2 w-full lg:ml-auto lg:flex lg:h-full lg:items-center lg:justify-end">
          <div className="pointer-events-none absolute inset-y-0 right-[-8%] w-[120%] bg-gradient-to-l from-background via-background/70 to-transparent lg:right-[-14%]" />
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[320px] lg:h-[520px] lg:w-[46%] lg:ml-auto">
            <Image
              src="/images/siham-akhyame-portrait.png"
              alt="Professional portrait of Siham Akhyame"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 46vw"
              className="object-cover object-[center_24%]"
              style={{
                objectPosition: "center 18%",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/10 to-transparent" />
          </div>
        </div>
      </div>
    </Section>
  );
}
