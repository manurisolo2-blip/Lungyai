import { RESTAURANT } from "@/data/restaurant";

/** On phones the two things people come for stay in reach: calling and ordering. */
export function MobileOrderBar() {
  return (
    // A landmark of its own, so screen reader users can reach it directly.
    <nav aria-label="Call or order" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-glass px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <a className="btn btn-quiet" href={RESTAURANT.phoneHref}>
        Call
      </a>
      <a className="btn btn-sign" href={RESTAURANT.orderUrl} target="_blank"
              aria-describedby="opens-in-new-tab" rel="noopener noreferrer">
        Order online
      </a>
    </nav>
  );
}
