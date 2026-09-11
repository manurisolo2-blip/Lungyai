import React, { useEffect, useState } from "react";
import { getServiceStatus, type ServiceStatus } from "@/lib/hours";

export interface OpenStatusProps {
  tone?: "ink" | "paper";
  className?: string;
  /** Compact renders the dot plus a two-word state, no full sentence. */
  compact?: boolean;
}

/** Live open/closed chip, recomputed every minute against Miami time. */
export const OpenStatus: React.FC<OpenStatusProps> = ({
  tone = "ink",
  className = "",
  compact = false,
}) => {
  const [status, setStatus] = useState<ServiceStatus>(() => getServiceStatus());

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getServiceStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const onPaper = tone === "paper";
  const dotColor = status.isOpen ? "bg-pandan" : "bg-chili";
  const textColor = status.isOpen
    ? onPaper
      ? "text-pandan-deep"
      : "text-pandan"
    : onPaper
      ? "text-chili-deep"
      : "text-chili-soft";

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      title={status.message}
    >
      <span className="relative grid h-2.5 w-2.5 shrink-0 place-items-center">
        <span className={`absolute inset-0 rounded-full ${dotColor} pulse-dot`} />
        <span className={`relative h-1.5 w-1.5 rounded-full ${dotColor}`} />
      </span>
      <span className={`font-grotesk text-[11px] font-bold uppercase tracking-[0.14em] ${textColor}`}>
        {compact ? (status.isOpen ? "Open now" : "Closed") : status.message}
      </span>
    </span>
  );
};
