import React from "react";
import { ArrowUpRight, Star, MapPin } from "lucide-react";
import { HoverHighlightText } from "@/components/ui/HoverHighlightText";
import { OpenStatus } from "@/components/ui/OpenStatus";

export interface HeroSectionProps {
  menuAnchorId?: string;
  cateringHref?: string;
  onOrderClick?: () => void;
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=2000&q=80";

const STATS: { value: string; label: string }[] = [
  { value: "×3", label: "Bib Gourmand · 22 · 23 · 25" },
  { value: "500°F", label: "Carbon-steel wok line" },
  { value: "4.6", label: "From 1,800+ Google reviews" },
];

export function HeroSection({
  menuAnchorId = "menu",
  cateringHref = "#catering",
  onOrderClick,
}: HeroSectionProps) {
  const scrollToMenu = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(menuAnchorId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onOrderClick?.();
  };

  return (
    <section
      id="top"
      aria-label="Lung Yai Thai Tapas"
      className="relative isolate flex min-h-[92svh] w-full flex-col justify-end overflow-hidden pb-10 pt-28 sm:pb-14"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-full w-full scale-105 object-cover object-center opacity-45 contrast-[1.15] saturate-[0.95]"
        />
        {/* Vertical settle into the page, plus a warm ember wash from the left */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/78 to-ink/55" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_8%_75%,rgba(240,69,42,0.28),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_92%_15%,rgba(245,184,65,0.18),transparent_65%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* Eyebrow row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-turmeric/40 bg-ink/60 px-3.5 py-1.5 backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-turmeric text-turmeric" aria-hidden="true" />
            <span className="eyebrow text-turmeric">Michelin Bib Gourmand ×3</span>
          </span>
          <OpenStatus />
          <span className="hidden items-center gap-1.5 text-xs text-mist sm:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-chili" aria-hidden="true" />
            Little Havana · 1731 SW 8th St
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-7 max-w-[15ch] text-[clamp(3.4rem,12.5vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.045em] text-bone">
          <span className="block">Bangkok</span>
          <span className="block">
            <HoverHighlightText
              as="span"
              text="at 500°F"
              baseClassName="block text-bone"
              highlightClassName="block text-chili"
              spotlightRadius={240}
              spotlightSoftness={0.82}
              enableGlow
            />
          </span>
        </h1>

        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-bone/80 sm:text-lg">
          Northern Thai street food, cooked to order on a screaming carbon-steel
          wok line. No diluted curries, no reservations, no apologies for the
          chili.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href={`#${menuAnchorId}`} onClick={scrollToMenu} className="pill pill-chili">
            Order Online
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
          </a>
          <a href={cateringHref} className="pill pill-ghost">
            Catering &amp; Events
          </a>
        </div>

        {/* Stat strip */}
        <dl className="mt-12 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-ink/85 px-4 py-4 backdrop-blur sm:px-6 sm:py-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="tnum block font-display text-2xl font-black leading-none text-turmeric sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-2 block font-grotesk text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-mist-2">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
