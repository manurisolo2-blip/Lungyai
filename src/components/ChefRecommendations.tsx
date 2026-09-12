import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MENU } from "@/data/restaurant";
import { PHOTOS } from "@/data/photos";
import { Picture } from "@/components/Picture";
import { revealGroup, revealItem } from "@/lib/reveal";

const RAIL_GAP = 24;
/** How far the cards at the edges of the strip turn away from you. */
const MAX_TILT = 13;

export function ChefRecommendations() {
  const section = MENU.find((s) => s.id === "chef");
  const dishes = (section?.dishes ?? []).filter((dish) => dish.photo && PHOTOS[dish.photo]);

  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncRail = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft < 8);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8);

    // Each card turns towards the middle of the strip, so the row has depth as it moves.
    const middle = rail.scrollLeft + rail.clientWidth / 2;
    for (const child of Array.from(rail.children)) {
      const card = child as HTMLElement;
      const offset = (card.offsetLeft + card.offsetWidth / 2 - middle) / rail.clientWidth;
      const clamped = Math.max(-1, Math.min(1, offset));
      card.style.setProperty("--tilt", `${(-clamped * MAX_TILT).toFixed(2)}deg`);
    }
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    syncRail();
    rail.addEventListener("scroll", syncRail, { passive: true });
    window.addEventListener("resize", syncRail);
    return () => {
      rail.removeEventListener("scroll", syncRail);
      window.removeEventListener("resize", syncRail);
    };
  }, [syncRail]);

  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current;
    const card = rail?.firstElementChild as HTMLElement | null;
    if (!rail || !card) return;
    rail.scrollBy({ left: direction * (card.offsetWidth + RAIL_GAP), behavior: "smooth" });
  };

  const arrowClass =
    "grid h-11 w-11 place-items-center rounded-[4px] border border-bark text-bark transition-colors hover:bg-bark hover:text-glass disabled:cursor-default disabled:border-line disabled:text-line disabled:hover:bg-transparent";

  return (
    <section aria-labelledby="recommended-title" className="py-20 sm:py-24">
      <motion.div {...revealGroup} className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.div {...revealItem}>
            <h2 id="recommended-title" className="title-md">
              Chef's recommendations
            </h2>
            <p className="mt-3 max-w-[52ch] text-bark-soft">First time here? Start with these.</p>
          </motion.div>

          <motion.div {...revealItem} className="flex gap-2">
            <button type="button" onClick={() => scrollByCard(-1)} disabled={atStart} aria-label="Previous dishes" className={arrowClass}>
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollByCard(1)} disabled={atEnd} aria-label="More dishes" className={arrowClass}>
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        <motion.ul
          {...revealItem}
          ref={railRef}
          tabIndex={0}
          aria-label="Chef's recommendations. Scroll sideways for more dishes."
          className="rail mt-10"
        >
          {dishes.map((dish) => (
            <li key={dish.name} className="rail-card group">
              <div className="overflow-hidden rounded-[6px] bg-sidewalk">
                <Picture
                  photo={PHOTOS[dish.photo!]}
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 80vw"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-4 text-[1.5rem] font-semibold">{dish.name}</h3>
              {dish.thai && (
                <p lang="th" className="text-bark-soft">
                  {dish.thai}
                </p>
              )}
              <p className="mt-2 max-w-[42ch] text-[0.975rem] leading-relaxed text-bark-soft">{dish.description}</p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
