import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { MENU, type Spice } from "@/data/restaurant";

const SPICE_LABEL: Record<Spice, string> = {
  mild: "Mild",
  medium: "Medium",
};

function ChiliMark() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" className="shrink-0">
      <path
        d="M6.2 5.1c2.6-.3 4.8.6 6.2 2.6 1.2 1.8 1.5 4 .9 6.3-1.6-2.4-3.9-3.4-6.1-4.1C5 9.3 4.3 7.2 6.2 5.1Z"
        fill="currentColor"
      />
      <path d="M6.6 5.2C6.3 3.8 6.9 2.6 8.3 2" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Orange text on light surfaces; a filled orange chip on photos, where colored text would not pass contrast. */
export function SpiceTag({ spice, onPhoto = false }: { spice: Spice; onPhoto?: boolean }) {
  if (onPhoto) {
    return (
      <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-sign px-2 py-0.5 text-[0.8rem] font-normal text-glass">
        <ChiliMark />
        {SPICE_LABEL[spice]}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[0.875rem] font-normal text-sign-ink">
      <ChiliMark />
      {SPICE_LABEL[spice]}
    </span>
  );
}

/** The complete written menu, grouped by section, with a filter for 38 dishes. */
export function MenuList({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const term = query.trim().toLowerCase();

  const sections = useMemo(() => {
    if (!term) return MENU;
    return MENU.map((section) => ({
      ...section,
      dishes: section.dishes.filter((dish) =>
        [dish.name, dish.thai ?? "", dish.description].join(" ").toLowerCase().includes(term)
      ),
    })).filter((section) => section.dishes.length > 0);
  }, [term]);

  const matches = sections.reduce((count, section) => count + section.dishes.length, 0);

  return (
    <div className={className}>
      <p className="flex flex-wrap items-center gap-x-1.5 text-[0.95rem] text-bark-soft">
        <SpiceTag spice="mild" /> and <SpiceTag spice="medium" /> mark the spicy dishes.
      </p>

      {/* Search and the section links are for reading on screen, so printing leaves them out. */}
      <div className="menu-tools mt-5 flex flex-wrap items-center gap-3">
        <div className="relative">
          <label className="sr-only" htmlFor={searchId}>
            Search the menu
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-bark-soft"
            strokeWidth={1.75}
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dishes, pork, noodles..."
            className="h-11 w-[min(20rem,100%)] rounded-full border border-line bg-glass pl-9 pr-9 text-[0.95rem] text-bark placeholder:text-bark-soft focus-visible:border-bark"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear the search"
              className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-bark-soft transition-colors hover:text-bark"
            >
              <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>

        {!term && (
          <nav aria-label="Jump to a part of the menu" className="flex flex-wrap gap-2">
            {MENU.map((section) => (
              <a
                key={section.id}
                href={`#menu-${section.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[0.95rem] transition-colors hover:border-bark hover:bg-bark hover:text-glass"
              >
                {section.title}
              </a>
            ))}
          </nav>
        )}
      </div>

      <p aria-live="polite" className={term ? "mt-4 text-[0.95rem] text-bark-soft" : "sr-only"}>
        {term
          ? `${matches} ${matches === 1 ? "dish" : "dishes"} match "${query.trim()}"`
          : `${MENU.reduce((count, section) => count + section.dishes.length, 0)} dishes`}
      </p>

      {term && matches === 0 && (
        <p className="mt-6 text-[1.125rem]">
          Nothing on the card matches that. Try "pork", "noodles" or "curry".
        </p>
      )}

      <div className="mt-10 gap-x-16 lg:columns-2">
        {sections.map((section) => (
          <section
            key={section.id}
            id={`menu-${section.id}`}
            aria-labelledby={`menu-${section.id}-title`}
            tabIndex={-1}
            className="mb-14 break-inside-avoid outline-none"
          >
            <h3 id={`menu-${section.id}-title`} className="flex flex-wrap items-baseline gap-x-3 text-[1.9rem]">
              {section.title}
              <span lang="th" className="font-sans text-base font-normal text-bark-soft">
                {section.thai}
              </span>
            </h3>
            {section.note && <p className="mt-2 text-[0.95rem] text-bark-soft">{section.note}</p>}

            <ul className="mt-4 border-t border-bark">
              {section.dishes.map((dish) => (
                <li key={dish.name} className="border-b border-line py-4">
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[1.125rem] font-medium">{dish.name}</span>
                    {dish.thai && (
                      <span lang="th" className="text-[0.95rem] text-bark-soft">
                        {dish.thai}
                      </span>
                    )}
                    {dish.spice && <SpiceTag spice={dish.spice} />}
                  </p>
                  <p className="mt-1 text-[0.975rem] text-bark-soft">{dish.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
