import { useEffect, useState } from "react";
import { getServiceStatus } from "@/lib/hours";

/** Plain-language open/closed line, checked against Miami time every minute. */
export function OpenNow({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState(getServiceStatus);

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getServiceStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={className}>
      {/* The words carry the meaning; the dot is only a quick visual cue. */}
      <span
        aria-hidden="true"
        className={`mr-2 inline-block h-2 w-2 -translate-y-px rounded-full align-middle ${
          status.isOpen ? "bg-curry" : "bg-smoke/50"
        }`}
      />
      {status.message}
    </p>
  );
}
