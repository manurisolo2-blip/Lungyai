import React from "react";

export interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  thaiTitle?: string;
  blurb?: string;
  /** Rendered on the opposite side on wide screens (links, counters, CTAs). */
  aside?: React.ReactNode;
  tone?: "ink" | "paper";
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/**
 * The single heading pattern used by every editorial band, so eyebrow size,
 * title scale and rule weight stay identical down the page.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  thaiTitle,
  blurb,
  aside,
  tone = "ink",
  align = "left",
  className = "",
  id,
}) => {
  const onPaper = tone === "paper";
  const centered = align === "center";

  return (
    <div
      id={id}
      className={`flex flex-col gap-6 ${
        centered ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between"
      } ${className}`}
    >
      <div className={centered ? "max-w-3xl" : "max-w-3xl"}>
        <span
          className={`eyebrow flex items-center gap-2.5 ${centered ? "justify-center" : ""} ${
            onPaper ? "text-chili-deep" : "text-turmeric"
          }`}
        >
          <span
            className={`inline-block h-px w-7 ${onPaper ? "bg-chili-deep/50" : "bg-turmeric/50"}`}
            aria-hidden="true"
          />
          {eyebrow}
        </span>

        <h2
          className={`mt-4 text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-[0.92] ${
            onPaper ? "text-charcoal" : "text-bone"
          }`}
        >
          {title}
        </h2>

        {thaiTitle && (
          <p
            className={`mt-2 font-thai text-lg ${
              onPaper ? "text-chili-deep/80" : "text-turmeric/85"
            }`}
          >
            {thaiTitle}
          </p>
        )}

        {blurb && (
          <p
            className={`mt-4 max-w-2xl text-[0.95rem] leading-relaxed ${
              onPaper ? "text-charcoal-soft" : "text-mist"
            } ${centered ? "mx-auto" : ""}`}
          >
            {blurb}
          </p>
        )}
      </div>

      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
};
