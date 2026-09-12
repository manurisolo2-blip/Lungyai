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

/** The complete written menu, grouped by section. */
export function MenuList({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="flex flex-wrap items-center gap-x-1.5 text-[0.95rem] text-bark-soft">
        <SpiceTag spice="mild" /> and <SpiceTag spice="medium" /> mark the spicy dishes.
      </p>

      <div className="mt-10 gap-x-16 lg:columns-2">
        {MENU.map((section) => (
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
