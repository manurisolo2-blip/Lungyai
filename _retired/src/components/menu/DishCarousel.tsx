import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Flame, Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { menuItems, type DishCollection } from "@/data/menu";
import type { MenuItem } from "@/types/lungyai";

export interface DishCarouselProps {
  collection: DishCollection;
  onSelect: (item: MenuItem) => void;
  tone?: "ink" | "paper";
  id?: string;
}

function spiceDots(level: number | undefined) {
  const value = level ?? 0;
  return Array.from({ length: 3 }, (_, i) => i < value);
}

/**
 * Horizontal dish rail with an index counter and arrow controls — the same
 * browsing pattern as the reference site's "crowd favorites" strip, rebuilt
 * on native scroll-snap so it stays keyboard- and touch-native.
 */
export const DishCarousel: React.FC<DishCarouselProps> = ({
  collection,
  onSelect,
  tone = "ink",
  id,
}) => {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { addItem } = useCart();

  const dishes = collection.itemIds
    .map((itemId) => menuItems.find((item) => item.id === itemId))
    .filter((item): item is MenuItem => Boolean(item));

  const onPaper = tone === "paper";

  const syncIndex = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    if (!card) return;
    const stride = card.offsetWidth + 20; // card + rail gap
    setActiveIndex(Math.min(dishes.length - 1, Math.round(rail.scrollLeft / stride)));
  }, [dishes.length]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener("scroll", syncIndex, { passive: true });
    return () => rail.removeEventListener("scroll", syncIndex);
  }, [syncIndex]);

  const scrollByCards = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    if (!card) return;
    rail.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
  };

  const handleOrder = (dish: MenuItem, event: React.MouseEvent) => {
    event.stopPropagation();
    if (dish.customizable || dish.extrasAllowed) {
      onSelect(dish);
    } else {
      addItem(dish, 1, dish.defaultSpice ?? 1);
    }
  };

  return (
    <section
      id={id}
      className={`px-4 py-20 sm:px-6 sm:py-24 lg:px-10 ${
        onPaper ? "bg-paper text-charcoal" : "bg-ink text-bone"
      }`}
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHeading
            eyebrow={collection.eyebrow}
            title={collection.title}
            thaiTitle={collection.thaiTitle}
            blurb={collection.blurb}
            tone={tone}
            aside={
              <div className="flex items-center gap-4">
                <span
                  className={`tnum font-mono text-sm ${onPaper ? "text-charcoal-soft" : "text-mist"}`}
                  aria-live="polite"
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                  <span className="opacity-40"> / </span>
                  {String(dishes.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2">
                  {([-1, 1] as const).map((direction) => (
                    <button
                      key={direction}
                      type="button"
                      onClick={() => scrollByCards(direction)}
                      aria-label={direction === -1 ? "Previous dish" : "Next dish"}
                      className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                        onPaper
                          ? "border-paper-line text-charcoal hover:border-charcoal hover:bg-paper-2"
                          : "border-ink-line text-bone hover:border-ink-line-hi hover:bg-ink-card"
                      }`}
                    >
                      {direction === -1 ? (
                        <ArrowLeft className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                      ) : (
                        <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            }
          />
        </Reveal>

        <div
          ref={railRef}
          className="rail mt-12 -mx-4 px-4 sm:mx-0 sm:px-0"
          role="group"
          aria-label={`${collection.title} dishes`}
        >
          {dishes.map((dish, index) => (
            <article
              key={dish.id}
              onClick={() => onSelect(dish)}
              className={`group w-[82vw] max-w-[420px] cursor-pointer overflow-hidden rounded-[28px] border transition-all duration-500 sm:w-[46vw] lg:w-[31.5%] ${
                onPaper
                  ? "border-paper-line bg-paper-2 hover:border-charcoal/40 hover:shadow-[0_28px_60px_-30px_rgba(23,19,28,0.5)]"
                  : "border-ink-line bg-ink-card hover:border-ink-line-hi hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.9)]"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                {dish.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-turmeric backdrop-blur">
                    {dish.badge}
                  </span>
                )}

                <span className="tnum absolute bottom-4 left-4 font-mono text-lg font-bold text-white drop-shadow">
                  ${dish.price.toFixed(2)}
                </span>

                {(dish.defaultSpice ?? 0) > 0 && (
                  <span
                    className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1.5 backdrop-blur"
                    title={`Spice level ${dish.defaultSpice} of 3`}
                  >
                    {spiceDots(dish.defaultSpice).map((filled, i) => (
                      <Flame
                        key={i}
                        className={`h-3 w-3 ${filled ? "fill-chili text-chili" : "text-mist-2"}`}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="sr-only">Spice level {dish.defaultSpice} of 3</span>
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 p-6">
                <p
                  className={`font-thai text-sm ${onPaper ? "text-chili-deep" : "text-turmeric/85"}`}
                >
                  {dish.thaiName}
                </p>
                <h3
                  className={`text-[1.65rem] font-bold leading-[1.05] ${
                    onPaper ? "text-charcoal" : "text-bone"
                  }`}
                >
                  {dish.name}
                </h3>
                <p
                  className={`line-clamp-3 text-sm leading-relaxed ${
                    onPaper ? "text-charcoal-soft" : "text-mist"
                  }`}
                >
                  {dish.description}
                </p>

                <button
                  type="button"
                  onClick={(event) => handleOrder(dish, event)}
                  className={`pill mt-2 w-full ${onPaper ? "pill-ink" : "pill-turmeric"}`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
                  {dish.customizable || dish.extrasAllowed ? "Build it" : "Order now"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
