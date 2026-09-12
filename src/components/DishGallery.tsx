import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { MENU, RESTAURANT } from "@/data/restaurant";
import { PHOTOS } from "@/data/photos";
import { Picture } from "@/components/Picture";
import { ExternalLink } from "@/components/ExternalLink";
import { MenuList, SpiceTag } from "@/components/Menu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { revealGroup, revealItem } from "@/lib/reveal";

/*
  Photo keys in display order, picked by hand. The first takes the large tile, so it is the
  strongest photo and a square original that holds up at that size; the rest alternate warm and
  pale plates. One large tile plus six keeps every row full at 2, 3 and 4 columns.
*/
const GALLERY_ORDER = [
  "nam-prik-ong",
  "green-curry",
  "pad-kee-mao",
  "grilled-pork",
  "larb-e-sarn",
  "som-tam",
  "panang-curry",
];

const ALL_DISHES = MENU.flatMap((section) => section.dishes);
const GALLERY = GALLERY_ORDER.flatMap((key) => {
  for (const section of MENU) {
    const dish = section.dishes.find((item) => item.photo === key);
    if (dish && PHOTOS[key]) return [{ dish, photo: PHOTOS[key], section }];
  }
  return [];
});

/*
  The menu leads with a handful of photos. Each one opens the written menu at its own part of
  the card, so the photo is a way in rather than a dead end.
*/
const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.4 };

/* A tile that leans towards the pointer, so the photo feels like a card you can pick up. */
function Tile({
  item,
  featured,
  onOpen,
}: {
  item: (typeof GALLERY)[number];
  featured: boolean;
  onOpen: () => void;
}) {
  const { dish, photo, section } = item;
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const canTilt = finePointer && !reduced;
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);

  const followPointer = (event: ReactPointerEvent<HTMLLIElement>) => {
    if (!canTilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 13);
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -10);
  };
  const level = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.li
      {...revealItem}
      onPointerMove={followPointer}
      onPointerLeave={level}
      style={canTilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`group relative overflow-hidden rounded-[6px] bg-sidewalk ${
        featured ? "col-span-2 row-span-2" : ""
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${dish.name}: read it on the full menu, under ${section.title}`}
        className="block h-full w-full text-left"
      >
        <Picture
          photo={photo}
          sizes={
            featured
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          }
          className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {/* Marks the tile as a way into the written menu, on touch as well as on hover. */}
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-bark/60 text-glass backdrop-blur-sm transition-colors group-hover:bg-sign sm:right-3 sm:top-3"
        >
          <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 block bg-gradient-to-t from-bark/95 via-bark/80 to-transparent px-3 pb-3 pt-14 sm:px-4 sm:pb-4 sm:pt-20">
          <span
            className={`block font-display font-bold leading-tight text-glass ${
              featured ? "text-[clamp(1.75rem,3.2vw,2.75rem)]" : "text-[1.1rem] sm:text-[1.3rem]"
            }`}
          >
            {dish.name}
          </span>
          {dish.thai && (
            <span lang="th" className="block text-[0.9rem] text-smoke">
              {dish.thai}
            </span>
          )}
          {dish.spice && <SpiceTag spice={dish.spice} onPhoto />}
        </span>
      </button>
    </motion.li>
  );
}

export function DishGallery() {
  const fullMenuRef = useRef<HTMLDetailsElement>(null);
  const totalDishes = ALL_DISHES.length;
  const lenis = useLenis();

  // Printing should give the whole card, so open it before the print dialog reads the page.
  useEffect(() => {
    const openForPrint = () => {
      if (fullMenuRef.current) fullMenuRef.current.open = true;
    };
    window.addEventListener("beforeprint", openForPrint);
    return () => window.removeEventListener("beforeprint", openForPrint);
  }, []);

  const openFullMenu = (anchorId?: string) => {
    const details = fullMenuRef.current;
    if (!details) return;
    details.open = true;
    const target = (anchorId && document.getElementById(anchorId)) || details;
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ block: "start" });
    const focusable = target === details ? details.querySelector("summary") : (target as HTMLElement);
    focusable?.focus({ preventScroll: true });
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <motion.div {...revealGroup} className="flex flex-wrap items-end justify-between gap-6">
          <motion.div {...revealItem}>
            <h2 id="menu-title" className="title-xl">
              The menu
            </h2>
            <p className="mt-3 max-w-[46ch] text-[1.125rem] text-bark-soft">
              Prices, and anything sold out today, are on the ordering page.
            </p>
          </motion.div>
          <motion.div {...revealItem}>
            <ExternalLink className="btn btn-sign" href={RESTAURANT.orderUrl}>
              Order online
            </ExternalLink>
          </motion.div>
        </motion.div>

        <motion.ul
          {...revealGroup}
          className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {GALLERY.map((item, index) => (
            <Tile
              key={item.dish.name}
              item={item}
              featured={index === 0}
              onOpen={() => openFullMenu(`menu-${item.section.id}`)}
            />
          ))}

          {/* Closes the last row of the grid at every breakpoint and points to the written menu. */}
          <motion.li {...revealItem} className="col-span-2 flex flex-col justify-end gap-4 rounded-[6px] bg-sign p-5 text-glass sm:p-7">
            <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-tight text-glass">
              All {totalDishes} dishes
            </h3>
            <p className="max-w-[36ch]">
              The written menu has descriptions, spice levels and the dishes we have no photo of.
            </p>
            <button
              type="button"
              onClick={() => openFullMenu()}
              className="btn btn-glass self-start focus-visible:outline-glass"
            >
              Read the full menu
            </button>
          </motion.li>
        </motion.ul>

        <details ref={fullMenuRef} className="group/menu mt-16 border-t-2 border-bark pt-2">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold [&::-webkit-details-marker]:hidden">
            <span>
              Full menu with descriptions{" "}
              <span className="font-sans text-base font-normal text-bark-soft">({totalDishes} dishes)</span>
            </span>
            <ChevronDown
              className="h-6 w-6 shrink-0 transition-transform duration-300 group-open/menu:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <MenuList className="mt-8" />
        </details>
      </div>
    </section>
  );
}
