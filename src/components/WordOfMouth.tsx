import { motion } from "framer-motion";
import { PRESS_QUOTES } from "@/data/restaurant";
import { VISIT_VIDEO } from "@/data/media";
import { YouTubeFacade } from "@/components/YouTubeFacade";
import { ExternalLink } from "@/components/ExternalLink";
import { revealGroup, revealItem, revealTilt } from "@/lib/reveal";

/*
  What other people say, in one place: two press lines and one visit filmed by a food creator.
  Both quotes are word for word from the linked articles.
*/
export function WordOfMouth() {
  return (
    <section id="word-of-mouth" aria-labelledby="word-of-mouth-title" className="rim-top on-bark bg-bark py-20 text-glass sm:py-24">
      <motion.div
        {...revealGroup}
        className="mx-auto grid max-w-[1440px] gap-12 px-5 [perspective:1200px] lg:grid-cols-12 lg:gap-16 lg:px-10"
      >
        <div className="lg:col-span-7">
          <motion.h2 {...revealItem} id="word-of-mouth-title" className="title-md text-glass">
            Word of mouth
          </motion.h2>

          <div className="mt-10 space-y-10">
            {PRESS_QUOTES.map((item) => (
              <motion.figure key={item.source} {...revealItem}>
                <blockquote>
                  <p className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-snug text-glass">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-smoke">
                  <ExternalLink className="link-on-bark inline-flex min-h-11 items-center" href={item.href}>
                    {item.source}
                  </ExternalLink>
                  {item.detail && `, ${item.detail}`}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <motion.div {...revealTilt} className="lg:col-span-5">
          <YouTubeFacade video={VISIT_VIDEO} />
        </motion.div>
      </motion.div>
    </section>
  );
}
