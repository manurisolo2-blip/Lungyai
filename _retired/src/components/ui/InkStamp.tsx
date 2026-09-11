import React, { useId } from "react";

export interface InkStampProps {
  className?: string;
  size?: number;
  title?: string;
  subtitle?: string;
  perimeterText?: string;
  color?: "turmeric" | "chili";
}

const COLORS: Record<NonNullable<InkStampProps["color"]>, string> = {
  turmeric: "#f5b841",
  chili: "#f0452a",
};

/** Rubber-stamp seal with text running around its perimeter. */
export const InkStamp: React.FC<InkStampProps> = ({
  className = "",
  size = 132,
  title = "CERTIFIED\nWOK HEI",
  subtitle = "EST. CALLE OCHO",
  perimeterText = "AUTHENTIC BANGKOK STREET TAPAS · MIAMI FL ·",
  color = "turmeric",
}) => {
  const pathId = useId().replace(/:/g, "");
  const center = 65;
  const radius = 45;
  const stroke = COLORS[color];

  return (
    <div
      className={`relative inline-grid -rotate-[10deg] place-items-center rounded-full border-2 border-dashed opacity-90 transition-transform duration-500 hover:rotate-0 ${className}`}
      style={{ width: size, height: size, borderColor: stroke }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 130 130" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <path
            id={pathId}
            d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>

        <circle
          cx={center}
          cy={center}
          r={radius - 8}
          fill="none"
          stroke={stroke}
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity="0.65"
        />

        <text fill={stroke} className="font-grotesk text-[8.5px] font-bold uppercase tracking-[0.2em]">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {perimeterText}
          </textPath>
        </text>
      </svg>

      <div className="relative z-10 px-3 text-center leading-none">
        <span
          className="block font-display text-sm font-black uppercase leading-[0.95] tracking-tight"
          style={{ color: stroke }}
        >
          {title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </span>
        <span
          className="mt-1 block font-grotesk text-[7.5px] font-bold uppercase tracking-[0.16em] opacity-80"
          style={{ color: stroke }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
};
