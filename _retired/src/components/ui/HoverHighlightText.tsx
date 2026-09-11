import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "framer-motion";

export type HoverHighlightTextProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  baseClassName?: string;
  highlightClassName?: string;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  enableGlow?: boolean;
};

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 150,
  damping: 24,
  mass: 0.6,
};

export function HoverHighlightText({
  text,
  as = "h1",
  baseClassName = "",
  highlightClassName = "",
  spotlightRadius = 220,
  spotlightSoftness = 0.84,
  enableGlow = true,
}: HoverHighlightTextProps) {
  const [active, setActive] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, DEFAULT_SPRING);
  const smoothY = useSpring(y, DEFAULT_SPRING);

  const safeRadius = Math.max(48, spotlightRadius);
  const solidStop = Math.round(spotlightSoftness * 48);
  const fadeStop = Math.round(spotlightSoftness * 100);
  const maskImage = useMotionTemplate`radial-gradient(${safeRadius}px circle at ${smoothX}px ${smoothY}px, black 0%, black ${solidStop}%, transparent ${fadeStop}%)`;
  const glow = useMotionTemplate`radial-gradient(${safeRadius * 1.2}px circle at ${smoothX}px ${smoothY}px, rgba(240,69,42,0.28), transparent 70%)`;

  const Tag = as;

  function updatePointer(clientX: number, clientY: number) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    x.set(clientX - rect.left);
    y.set(clientY - rect.top);
  }

  return (
    <div
      ref={ref}
      onPointerEnter={(e) => {
        setActive(true);
        updatePointer(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => updatePointer(e.clientX, e.clientY)}
      onPointerLeave={() => setActive(false)}
      className="relative inline-block select-none cursor-default"
    >
      {/* Glow */}
      {enableGlow && active && (
        <motion.div
          style={{ background: glow }}
          className="absolute -inset-6 pointer-events-none z-0 blur-lg transition-opacity duration-300"
        />
      )}

      {/* Base Layer */}
      <Tag className={`relative z-10 ${baseClassName}`}>{text}</Tag>

      {/* Highlight Spotlight Layer */}
      <motion.div
        aria-hidden="true"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: active ? 1 : 0,
        }}
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200"
      >
        <Tag className={highlightClassName}>{text}</Tag>
      </motion.div>
    </div>
  );
}
