import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { KHAO_SOI_PARTS, type KhaoSoiPart } from "@/data/khaoSoi";
import { RESTAURANT } from "@/data/restaurant";
import { ExternalLink } from "@/components/ExternalLink";
import { TurningBowl } from "@/components/TurningBowl";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const TITLE = "Inside a bowl of khao soi";

function PartImage({ part, className }: { part: KhaoSoiPart; className: string }) {
  return (
    <picture className="contents">
      <source
        type="image/avif"
        srcSet={`${part.image}-400.avif 400w, ${part.image}-600.avif 600w`}
        sizes="(min-width: 1024px) 200px, 45vw"
      />
      <source
        type="image/webp"
        srcSet={`${part.image}-400.webp 400w, ${part.image}-600.webp 600w`}
        sizes="(min-width: 1024px) 200px, 45vw"
      />
      {/* Decorative: the part's name is printed right next to it. */}
      <img src={`${part.image}.jpg`} alt="" width={600} height={600} loading="lazy" decoding="async" className={className} />
    </picture>
  );
}

/* One ingredient flying out of the bowl. Scroll drives --t; CSS turns it into a position on the ring. */
function FlyingPart({ part, index, progress }: { part: KhaoSoiPart; index: number; progress: MotionValue<number> }) {
  const start = 0.14 + index * 0.1;
  const end = start + 0.2;
  const t = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.04], [0, 1]);
  const labelOpacity = useTransform(progress, [end - 0.05, end], [0, 1]);
  const spin = useTransform(t, [0, 1], [index % 2 === 0 ? "-38deg" : "38deg", "0deg"]);
  const radians = (part.angle * Math.PI) / 180;

  const style = {
    "--t": t,
    "--cos": Math.cos(radians).toFixed(4),
    "--sin": Math.sin(radians).toFixed(4),
    "--spin": spin,
    opacity,
  } as unknown as CSSProperties;

  return (
    <motion.li className="breakdown-part" style={style}>
      <PartImage
        part={part}
        className="aspect-square w-full rounded-full border-[5px] border-glass object-cover shadow-[0_18px_36px_-18px_rgba(42,26,17,0.75)]"
      />
      <motion.div
        style={{ opacity: labelOpacity }}
        className="absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 text-center"
      >
        <p className="font-display text-[1.2rem] font-bold leading-tight text-bark">{part.name}</p>
        <p lang="th" className="text-[0.95rem] text-bark">
          {part.thai}
        </p>
      </motion.div>
    </motion.li>
  );
}

function PinnedBreakdown() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.3 });
  // Big at first, then it makes room for the ingredients on the ring.
  const bowlScale = useTransform(progress, [0, 0.3], [1.12, 0.68]);
  // The turn starts as the section comes up the screen, not only once it is pinned.
  const { scrollYProgress: enteringProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const turn = useSpring(enteringProgress, { stiffness: 150, damping: 30, mass: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="khao-soi"
      aria-labelledby="khao-soi-title"
      className="on-curry relative bg-curry"
      style={{ height: "280vh" }}
    >
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 items-center gap-8 px-10">
          <div className="col-span-4">
            <h2 id="khao-soi-title" className="title-xl text-bark">
              {TITLE}
            </h2>
            <p className="mt-5 max-w-[30ch] text-[1.2rem] text-bark">
              Keep scrolling to take it apart.
            </p>
            <div aria-hidden="true" className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-bark/15">
              <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-bark" />
            </div>
            <ExternalLink className="btn btn-bark mt-10" href={RESTAURANT.orderUrl}>
              Order khao soi
            </ExternalLink>
          </div>

          <div className="col-span-8">
            <div className="breakdown-stage relative mx-auto aspect-square w-[min(100%,calc(100svh-150px))]">
              <div className="absolute inset-0 grid place-items-center">
                {/* Sits a little low: the noodles rise above the rim, and the side labels stay clear of it. */}
                <motion.div style={{ scale: bowlScale, y: "7%" }} className="w-[64cqw]">
                  <TurningBowl progress={turn} size="large" />
                </motion.div>
              </div>
              <ul className="absolute inset-0">
                {KHAO_SOI_PARTS.map((part, index) => (
                  <FlyingPart key={part.id} part={part} index={index} progress={progress} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  Phones, tablets and reduced motion: same content, no pinning. The bowl turns while it crosses
  the screen, and stays still for reduced motion.
*/
function StaticBreakdown({ reduced }: { reduced: boolean }) {
  const bowlRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bowlRef, offset: ["start end", "end start"] });
  const turn = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="khao-soi" aria-labelledby="khao-soi-title" className="on-curry bg-curry py-20 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-5">
        <h2 id="khao-soi-title" className="title-xl text-bark">
          {TITLE}
        </h2>
        <p className="mt-3 text-[1.125rem] text-bark">Six things go into it.</p>

        <div ref={bowlRef} className="mx-auto mt-10 max-w-xl">
          <TurningBowl progress={reduced ? undefined : turn} size="small" />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3">
          {KHAO_SOI_PARTS.map((part, index) => (
            <motion.li
              key={part.id}
              className="text-center"
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <PartImage
                part={part}
                className="mx-auto aspect-square w-[78%] rounded-full border-[5px] border-glass object-cover"
              />
              <p className="mt-3 font-display text-[1.2rem] font-bold leading-tight text-bark">{part.name}</p>
              <p lang="th" className="text-bark">
                {part.thai}
              </p>
              <p className="mt-1 text-[0.95rem] text-bark">{part.note}</p>
            </motion.li>
          ))}
        </ul>

        <ExternalLink className="btn btn-bark mt-12" href={RESTAURANT.orderUrl}>
          Order khao soi
        </ExternalLink>
      </div>
    </section>
  );
}

export function KhaoSoiScroll() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = Boolean(useReducedMotion());
  return wide && !reduced ? <PinnedBreakdown /> : <StaticBreakdown reduced={reduced} />;
}
