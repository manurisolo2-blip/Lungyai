import { useRef } from "react";
import { useLenis } from "lenis/react";
import { ChevronDown } from "lucide-react";
import { MENU, RESTAURANT } from "@/data/restaurant";
import { PHOTOS } from "@/data/photos";
import { Picture } from "@/components/Picture";
import { ExternalLink } from "@/components/ExternalLink";
import { MenuList, SpiceTag } from "@/components/Menu";

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
  const dish = ALL_DISHES.find((item) => item.photo === key);
  return dish && PHOTOS[key] ? [{ dish, photo: PHOTOS[key] }] : [];
});

/*
  The menu leads with a handful of photos. The full written menu stays one click away for
  descriptions and the dishes without a photo.
*/
export function DishGallery() {
  const fullMenuRef = useRef<HTMLDetailsElement>(null);
  const totalDishes = ALL_DISHES.length;
  const lenis = useLenis();

  const openFullMenu = () => {
    const details = fullMenuRef.current;
    if (!details) return;
    details.open = true;
    if (lenis) {
      lenis.scrollTo(details);
    } else {
      details.scrollIntoView({ block: "start" });
    }
    details.querySelector("summary")?.focus({ preventScroll: true });
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="menu-title" className="text-[clamp(2.5rem,5vw,4.25rem)]">
              The menu
            </h2>
            <p className="mt-3 max-w-[46ch] text-[1.125rem] text-bark-soft">
              Prices, and anything sold out today, are on the ordering page.
            </p>
          </div>
          <ExternalLink className="btn btn-sign" href={RESTAURANT.orderUrl}>
            Order online
          </ExternalLink>
        </div>

        <ul className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map(({ dish, photo }, index) => {
            const featured = index === 0;
            return (
              <li
                key={dish.name}
                className={`group relative overflow-hidden rounded-[6px] bg-sidewalk ${
                  featured ? "col-span-2 row-span-2" : ""
                }`}
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
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bark/95 via-bark/80 to-transparent px-3 pb-3 pt-14 sm:px-4 sm:pb-4 sm:pt-20">
                  <h3
                    className={`font-display font-bold leading-tight text-glass ${
                      featured ? "text-[clamp(1.75rem,3.2vw,2.75rem)]" : "text-[1.1rem] sm:text-[1.3rem]"
                    }`}
                  >
                    {dish.name}
                  </h3>
                  {dish.thai && (
                    <p lang="th" className="text-[0.9rem] text-smoke">
                      {dish.thai}
                    </p>
                  )}
                  {dish.spice && <SpiceTag spice={dish.spice} onPhoto />}
                </div>
              </li>
            );
          })}

          {/* Closes the last row of the grid at every breakpoint and points to the written menu. */}
          <li className="col-span-2 flex flex-col justify-end gap-4 rounded-[6px] bg-sign p-5 text-glass sm:p-7">
            <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-bold leading-tight text-glass">
              All {totalDishes} dishes
            </h3>
            <p className="max-w-[36ch]">
              The written menu has descriptions, spice levels and the dishes we have no photo of.
            </p>
            <button
              type="button"
              onClick={openFullMenu}
              className="btn btn-glass self-start focus-visible:outline-glass"
            >
              Read the full menu
            </button>
          </li>
        </ul>

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
