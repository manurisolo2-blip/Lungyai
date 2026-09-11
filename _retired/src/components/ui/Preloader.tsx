import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const toExit = window.setTimeout(() => setExiting(true), 1100);
    const toRemove = window.setTimeout(() => {
      setRemoved(true);
      onComplete();
    }, 1650);

    return () => {
      window.clearTimeout(toExit);
      window.clearTimeout(toRemove);
    };
  }, [onComplete]);

  if (removed) return null;

  const dismiss = () => {
    setExiting(true);
    window.setTimeout(() => {
      setRemoved(true);
      onComplete();
    }, 420);
  };

  return (
    <div
      onClick={dismiss}
      aria-hidden="true"
      className={`fixed inset-0 z-[60] grid cursor-pointer place-items-center bg-ink transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        exiting ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-chili/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center px-6 text-center">
        <span className="eyebrow text-turmeric">Michelin Bib Gourmand · 22 · 23 · 25</span>

        <h1 className="mt-5 font-display text-5xl font-black uppercase leading-none tracking-[-0.04em] text-bone sm:text-7xl">
          Lung Yai
        </h1>
        <p className="mt-3 font-thai text-base text-turmeric/85">อาหารไทยรสจัดจ้าน</p>

        <span className="mt-8 grid h-14 w-14 place-items-center rounded-full border border-chili/50 bg-chili/15 text-chili">
          <Flame className="h-6 w-6" aria-hidden="true" />
        </span>

        <p className="mt-8 font-grotesk text-[10px] font-bold uppercase tracking-[0.28em] text-mist-2">
          Calle Ocho · Little Havana · Miami
        </p>

        <span className="mt-6 block h-px w-40 overflow-hidden bg-ink-line">
          <span className="block h-full w-full origin-left animate-[ly-marquee_1.1s_ease-in-out_infinite] bg-gradient-to-r from-turmeric to-chili" />
        </span>
      </div>
    </div>
  );
};
