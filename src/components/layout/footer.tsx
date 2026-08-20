import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-background/80">
      <div className="site-container flex flex-col gap-8 py-10 sm:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-lg font-medium text-foreground">Siham Akhyame</p>
            <p className="mt-1 text-sm text-muted">
              Cybersecurity Student | Hands-on Security Projects &amp; Labs
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              Building, securing, testing, validating, and documenting practical systems with a focus on resilient security operations and hands-on engineering.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 text-sm">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1 py-1"
              >
                {item.label}
              </Link>
            ))}

            <a
              href="https://github.com/Akhyame"
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1 py-1"
            >
              GitHub
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/60 pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Siham Akhyame. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
