import { motion } from "framer-motion";
import { HOUSE_RULES } from "@/data/restaurant";
import { revealGroup, revealItem, revealTilt } from "@/lib/reveal";

/*
  The one loud element on the page. Built like the front door: a dark glass
  panel with white lettering, framed in the curry yellow of the brand palette.
  The numbers stay because the list really is a sequence, from arriving to leaving.
*/
export function HouseRules() {
  return (
    <section id="rules" aria-labelledby="rules-title" className="bg-curry p-3 [perspective:1600px] sm:p-4 lg:p-5">
      <motion.div
        {...revealGroup}
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
        className="on-bark bg-bark text-glass"
      >
        <motion.div
          {...revealTilt}
          className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-10 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-28"
        >
          <div className="lg:col-span-4">
            <h2 id="rules-title" className="title-lg text-glass">
              How a visit works
            </h2>
            <p className="mt-5 max-w-[34ch] text-[1.125rem] text-smoke">
              The room is small and the wait can be long. These are the house rules
              that keep the line moving.
            </p>
          </div>

          <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {HOUSE_RULES.map((rule, index) => (
              <motion.li
                key={rule.title}
                {...revealItem}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-white/20 pt-6"
              >
                <span aria-hidden="true" className="font-display text-5xl font-bold leading-none text-curry">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[1.5rem] font-semibold text-glass">{rule.title}</h3>
                  <p className="mt-2 text-smoke">{rule.detail}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.p {...revealItem} className="font-display text-2xl font-semibold text-curry lg:col-span-8 lg:col-start-5">
            That’s all. Enjoy.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
