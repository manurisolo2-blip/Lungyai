import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PHOTOS, STOREFRONT_PHOTO, type Photo } from "@/data/photos";
import { Picture } from "@/components/Picture";

/* A photo that drifts a few percent against the scroll. Off for reduced motion; never used on text. */
function DriftPhoto({ photo, caption, sizes, className }: { photo: Photo; caption: string; sizes: string; className: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <figure ref={ref} className={`relative overflow-hidden rounded-[6px] bg-sidewalk ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[8%]">
        <Picture photo={photo} sizes={sizes} className="h-full w-full object-cover" />
      </motion.div>
      <figcaption className="absolute bottom-0 left-0 bg-bark/85 px-2.5 py-1 text-[0.8125rem] text-glass">
        {caption}
      </figcaption>
    </figure>
  );
}

export function CalleOcho() {
  return (
    <section aria-labelledby="calle-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <h2 id="calle-title" className="text-[clamp(2.25rem,4.4vw,3.75rem)]">
            On Calle Ocho
          </h2>
          <p className="mt-4 max-w-[32ch] text-[1.125rem] text-bark-soft">
            A small pine-wood front on SW 8th Street, in the middle of Little Havana.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-8 lg:grid-cols-3">
          <DriftPhoto
            photo={STOREFRONT_PHOTO}
            caption="1731 SW 8th St"
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="col-span-2 aspect-[3/2] lg:row-span-2 lg:aspect-auto"
          />
          <DriftPhoto
            photo={PHOTOS["calle-ocho-gallo"]}
            caption="A painted rooster on Calle Ocho"
            sizes="(min-width: 1024px) 19vw, 50vw"
            className="aspect-[4/5]"
          />
          <DriftPhoto
            photo={PHOTOS["little-havana-mural"]}
            caption="A mural in Little Havana"
            sizes="(min-width: 1024px) 19vw, 50vw"
            className="aspect-[4/5]"
          />
          <DriftPhoto
            photo={PHOTOS["calle-ocho-street"]}
            caption="SW 8th Street"
            sizes="(min-width: 1024px) 57vw, 100vw"
            className="col-span-2 aspect-[21/9] lg:col-span-3"
          />
        </div>
      </div>
    </section>
  );
}
