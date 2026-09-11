import React from "react";
import { ArrowUpRight, Snowflake } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { menuItems } from "@/data/menu";
import type { MenuItem } from "@/types/lungyai";

export interface PromoBandProps {
  onSelect: (item: MenuItem) => void;
}

const COOLER_IMAGE =
  "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80";
const DESSERT_IMAGE =
  "https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=900&q=80";

/**
 * The seasonal promo band. Structurally the reference site's drinks strip;
 * visually it is the one turmeric-on-charcoal moment in the page, so it reads
 * as an interruption rather than another dish section.
 */
export const PromoBand: React.FC<PromoBandProps> = ({ onSelect }) => {
  const chaYen = menuItems.find((item) => item.id === "thai-iced-tea");

  return (
    <section
      aria-labelledby="promo-title"
      className="relative overflow-hidden bg-turmeric text-charcoal"
    >
      {/* Faint concentric rings, like condensation on a metal cup */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border-[60px] border-charcoal/5"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-32 h-[520px] w-[520px] rounded-full border-[48px] border-charcoal/5"
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Copy */}
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2 rounded-full bg-charcoal px-3.5 py-2 text-turmeric">
            <Snowflake className="h-3.5 w-3.5" aria-hidden="true" />
            Now pouring · Season of Cha Yen
          </span>

          <h2
            id="promo-title"
            className="mt-6 text-[clamp(2.6rem,7vw,5rem)] font-black leading-[0.9] text-charcoal"
          >
            Ice for the
            <br />
            chili you
            <br />
            just ordered
          </h2>

          <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-charcoal/75">
            Star-anise black tea brewed each morning and poured over crushed ice,
            longan coolers, salted lime soda and chilled Singha. Built to reset
            your palate between two bowls of drunken noodles.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => chaYen && onSelect(chaYen)}
              className="pill pill-ink"
            >
              Pour me one
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </button>
            <a href="#menu" className="pill pill-outline-ink">
              See all drinks
            </a>
          </div>
        </Reveal>

        {/* Image pair */}
        <Reveal delay={120} className="relative">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
            <div className="absolute inset-0 overflow-hidden rounded-[32px] border-4 border-charcoal/10 shadow-[0_40px_80px_-40px_rgba(23,19,28,0.6)]">
              <img
                src={COOLER_IMAGE}
                alt="Thai iced tea poured over crushed ice"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-4 hidden h-40 w-40 -rotate-6 overflow-hidden rounded-3xl border-4 border-turmeric shadow-xl sm:block lg:-left-10 lg:h-48 lg:w-48">
              <img
                src={DESSERT_IMAGE}
                alt="Mango sticky rice with coconut cream"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="tnum absolute -right-3 -top-5 grid h-24 w-24 rotate-[8deg] place-items-center rounded-full bg-chili text-center font-grotesk text-[11px] font-bold uppercase leading-tight tracking-wider text-white shadow-lg lg:h-28 lg:w-28">
              From
              <br />
              <span className="font-mono text-xl">$5.50</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
