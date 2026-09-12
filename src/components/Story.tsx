import { motion } from "framer-motion";
import { PRESS_REVIEW } from "@/data/restaurant";
import { revealGroup, revealItem } from "@/lib/reveal";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="bg-sidewalk py-20 sm:py-28">
      <motion.div
        {...revealGroup}
        className="mx-auto grid max-w-[1280px] gap-12 px-5 [perspective:1200px] lg:grid-cols-12 lg:px-10"
      >
        <div className="lg:col-span-4">
          {/* The sign swings towards you, like a shop board turning to face the street. */}
          <motion.img
            initial={{ opacity: 0, rotateY: -32, x: -12 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 1, ease: EASE_OUT }}
            style={{ transformOrigin: "left center" }}
            src="/images/lung-yai-logo.png"
            alt="The Lung Yai Thai Tapas sign"
            width={300}
            height={271}
            loading="lazy"
            className="w-56 sm:w-72 lg:sticky lg:top-28"
          />
        </div>

        <div className="max-w-[62ch] lg:col-span-7 lg:col-start-6">
          <motion.h2 {...revealItem} id="story-title" className="title-md">
            Our story
          </motion.h2>

          <div className="mt-6 space-y-5 text-[1.125rem] leading-[1.7]">
            <motion.p {...revealItem}>
              Bas Trisransi and his brother Bond came to Miami from Bangkok in 1994, to work for
              an uncle who had a place in South Beach. For about twenty years Bas cooked in other
              people's kitchens, many of them his brother's.
            </motion.p>
            <motion.p {...revealItem}>
              The recipes are older. As boys the two of them worked for their grandfather, Yung
              Lai, who kept a small restaurant in Ayutthaya, about fifty miles north of Bangkok,
              going for almost five decades to put nine children through school.
            </motion.p>
            <motion.p {...revealItem}>
              In August 2015 Bas opened Lung Yai, a forty-five seat room on Calle Ocho, in his
              grandfather's memory.
            </motion.p>
          </div>

          <motion.figure {...revealItem} className="mt-12">
            <blockquote>
              <p className="font-display text-[1.75rem] font-semibold leading-snug">
                “He was a country chef who taught with a gentle hand.”
              </p>
            </blockquote>
            <figcaption className="mt-3 text-bark-soft">
              Chef Bas on his grandfather, speaking to{" "}
              <cite className="not-italic">
                <a
                  className="link inline-flex min-h-11 items-center"
                  href={PRESS_REVIEW.href}
                  target="_blank"
                  aria-describedby="opens-in-new-tab"
                  rel="noopener noreferrer"
                >
                  {PRESS_REVIEW.outlet}
                </a>
              </cite>{" "}
              in {PRESS_REVIEW.date}
            </figcaption>
          </motion.figure>
        </div>
      </motion.div>
    </section>
  );
}
