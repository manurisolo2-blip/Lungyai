import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin ember line pinned under the header, tracking read progress. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-turmeric via-chili to-neon"
    />
  );
};
