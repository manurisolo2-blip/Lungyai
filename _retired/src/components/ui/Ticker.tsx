import React from "react";

export interface TickerProps {
  items: string[];
  tone?: "chili" | "turmeric" | "ink";
  className?: string;
}

/**
 * Infinite marquee band. The list is rendered twice inside a width:max-content
 * track so the -50% keyframe loops seamlessly.
 */
export const Ticker: React.FC<TickerProps> = ({ items, tone = "chili", className = "" }) => {
  const palette =
    tone === "turmeric"
      ? "bg-turmeric text-charcoal"
      : tone === "ink"
        ? "bg-ink-raised text-bone border-y border-ink-line"
        : "bg-chili text-white";

  const sequence = [...items, ...items];

  return (
    <div
      className={`marquee-host relative overflow-hidden select-none ${palette} ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track py-3">
        {sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-6 whitespace-nowrap px-6 font-grotesk text-[0.7rem] font-bold uppercase tracking-[0.28em]"
          >
            {item}
            <span className="opacity-45">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
};
