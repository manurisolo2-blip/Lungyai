import type { MotionProps } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/*
  One scroll reveal used across the page, so every section enters with the same rhythm.
  Wrap a block in revealGroup and give each child revealItem: they arrive in order, once.
  MotionConfig reducedMotion="user" drops the movement and leaves a plain fade.
*/
export const revealGroup: MotionProps = {
  initial: "hidden",
  whileInView: "shown",
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  variants: {
    hidden: {},
    shown: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  },
};

/** A child of revealGroup: fades up into place. */
export const revealItem: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 28 },
    shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  },
};

/** For photos and panels: adds a touch of depth, as if the block tips upright. */
export const revealTilt: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 36, rotateX: 7 },
    shown: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.85, ease: EASE_OUT } },
  },
};

/** A block that reveals on its own, without a group around it. */
export function reveal(delay = 0): MotionProps {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -12% 0px" },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  };
}
