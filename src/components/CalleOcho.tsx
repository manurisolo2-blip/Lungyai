import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PHOTOS, STOREFRONT_PHOTO, type Photo } from "@/data/photos";
import { Picture } from "@/components/Picture";
import { revealGroup, revealItem, revealTilt } from "@/lib/reveal";

/* A photo that drifts a few percent against the scroll. Off for reduced motion; never used on text. */
function DriftPhoto({ photo, caption, sizes, className }: { photo: Photo; caption: string; sizes: string; className: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <motion.figure {...revealTilt} ref={ref} className={`relative overflow-hidden rounded-[6px] bg-sidewalk ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[8%]">
        <Picture photo={photo} sizes={sizes} className="h-full w-full object-cover" />
      </motion.div>
      <figcaption className="absolute bottom-0 left-0 bg-bark/85 px-3 py-1.5 text-[0.875rem] text-glass">
        {caption}
      </figcaption>
    </motion.figure>
  );
}

/* The door and the street it opens onto. Two photos only: both are the place itself, not the neighbourhood. */
export function CalleOcho() {
  return (
    <section aria-labelledby="calle-title" className="py-20 sm:py-28">
      <motion.div
        {...revealGroup}
        className="mx-auto grid max-w-[1440px] gap-10 px-5 [perspective:1400px] lg:grid-cols-12 lg:px-10"
      >
        <div className="lg:col-span-3">
          <motion.h2 {...revealItem} id="calle-title" className="title-md">
            On Calle Ocho
          </motion.h2>
          <motion.p {...revealItem} className="mt-4 max-w-[30ch] text-[1.125rem] text-bark-soft">
            A small pine-wood front on SW 8th Street, in the middle of Little Havana.
          </motion.p>
        </div>

        <div className="grid gap-3 sm:gap-4 lg:col-span-9">
          <DriftPhoto
            photo={STOREFRONT_PHOTO}
            caption="1731 SW 8th St"
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="aspect-[3/2] lg:aspect-[16/9]"
          />
          <DriftPhoto
            photo={PHOTOS["calle-ocho-street"]}
            caption="SW 8th Street"
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="aspect-[21/9]"
          />
        </div>
      </motion.div>
    </section>
  );
}
