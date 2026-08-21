"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const galleryItems = [
  {
    src: "/images/projects/kubernetes-multi-tenant-security-platform/pod-security-admission-rejection.jpg",
    title: "Pod Security Admission Enforcement",
    caption:
      "Insecure workload rejected by the tenant Pod Security baseline.",
    alt: "Pod security admission rejection evidence screenshot",
  },
  {
    src: "/images/projects/kubernetes-multi-tenant-security-platform/hubble-orange-to-atlas-dropped.jpg",
    title: "Inter-Tenant Network Isolation",
    caption:
      "Cilium Hubble shows Orange-to-Atlas traffic being dropped.",
    alt: "Hubble network policy evidence showing dropped traffic",
  },
  {
    src: "/images/projects/kubernetes-multi-tenant-security-platform/rbac-cross-tenant-access-denied.jpg",
    title: "Cross-Tenant RBAC Denial",
    caption:
      "Tenant-scoped access denied outside the allowed namespace scope.",
    alt: "RBAC cross-tenant access denied screenshot",
  },
  {
    src: "/images/projects/kubernetes-multi-tenant-security-platform/argocd-rif-provisioning.jpg",
    title: "GitOps Tenant Provisioning",
    caption:
      "Rif was provisioned with Git, Argo CD ApplicationSet, and the reusable Helm chart.",
    alt: "GitOps provisioning of Rif across Argo CD and Helm",
  },
  {
    src: "/images/projects/kubernetes-multi-tenant-security-platform/final-four-tenants-health-validation.jpg",
    title: "Four-Tenant Health Validation",
    caption:
      "Atlas, Orange, MarocTech, and Rif remained healthy with tenant isolation and persistent storage.",
    alt: "Four-tenant health validation screenshot",
  },
];

export function EvidenceGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex]);

  const selectedItem = selectedIndex === null ? null : galleryItems[selectedIndex];

  return (
    <div id="evidence" className="scroll-mt-28">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {galleryItems.map((item, index) => (
          <Card key={item.title} className="overflow-hidden p-0">
            <button
              ref={index === 0 ? triggerRef : undefined}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Open evidence: ${item.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-muted">{item.caption}</p>
              </div>
            </button>
          </Card>
        ))}
      </div>

      {selectedItem ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl rounded-2xl border border-border bg-background/95 p-3 shadow-[0_18px_45px_rgba(15,23,42,0.6)]">
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-lg text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Close evidence image"
            >
              ×
            </button>

            <div className="relative max-h-[80vh] overflow-hidden rounded-xl bg-slate-950">
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                width={1600}
                height={1000}
                className="max-h-[75vh] w-full rounded-xl object-contain"
              />
            </div>

            <div className="px-2 pb-2 pt-4">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {selectedItem.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {selectedItem.caption}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
