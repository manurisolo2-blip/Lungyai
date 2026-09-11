import React, { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Check, Plus, Flame, Search } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CategoryId, MenuItem } from "@/types/lungyai";
import { categories, menuItems } from "@/data/menu";

type Filter = "all" | CategoryId;

interface TabDefinition {
  id: Filter;
  label: string;
}

const TABS: TabDefinition[] = [
  { id: "all", label: "Everything" },
  ...categories.map((category) => ({
    id: category.id as Filter,
    label:
      category.id === "insignias"
        ? "Signatures"
        : category.id === "duck-specials"
          ? "Duck & house"
          : category.id === "drinks-desserts"
            ? "Sweets & drinks"
            : category.name.replace(/ &.*/, "").replace("Wok Hei ", "Wok "),
  })),
];

export function CravStyleMenuGrid({ onSelect }: { onSelect?: (item: MenuItem) => void }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesTab = filter === "all" || item.category === filter;
      if (!matchesTab) return false;
      if (!needle) return true;
      return (
        item.name.toLowerCase().includes(needle) ||
        item.description.toLowerCase().includes(needle) ||
        item.thaiName.includes(needle)
      );
    });
  }, [filter, query]);

  const handleTabKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      setFilter(TABS[next].id);
      tablistRef.current
        ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
        ?.[next]?.focus();
    }
  };

  const handleAdd = (item: MenuItem, event: React.MouseEvent) => {
    event.stopPropagation();
    if (item.customizable || item.extrasAllowed) {
      onSelect?.(item);
      return;
    }
    addItem(item, 1, item.defaultSpice ?? 1);
    setJustAdded(item.id);
    window.setTimeout(() => setJustAdded((current) => (current === item.id ? null : current)), 1400);
  };

  return (
    <section id="menu" className="bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHeading
            eyebrow="The whole board"
            title="Full menu"
            thaiTitle="เมนูทั้งหมด"
            blurb="Nineteen plates off one wok line. Filter by section or search for the thing you already know you want."
            aside={
              <label className="relative block w-full min-w-[240px] lg:w-72">
                <span className="sr-only">Search the menu</span>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist-2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Khao soi, duck, papaya…"
                  className="h-12 w-full rounded-full border border-ink-line bg-ink-card pl-11 pr-4 text-sm text-bone placeholder:text-mist-2 focus:border-turmeric focus:outline-none"
                />
              </label>
            }
          />
        </Reveal>

        {/* Category tabs */}
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Filter the menu by section"
          className="rail mt-10 gap-2 border-b border-ink-line pb-5"
        >
          {TABS.map((tab, index) => {
            const selected = filter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`menu-tab-${tab.id}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onKeyDown={(event) => handleTabKeys(event, index)}
                onClick={() => setFilter(tab.id)}
                className={`pill ${
                  selected
                    ? "pill-turmeric"
                    : "border-ink-line bg-ink-card text-mist hover:border-ink-line-hi hover:text-bone"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <p className="mt-16 text-center text-sm text-mist">
            Nothing matches "{query}". Try "noodle", "duck" or clear the search.
          </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((item, index) => {
              const added = justAdded === item.id;
              const needsBuilding = Boolean(item.customizable || item.extrasAllowed);

              return (
                <Reveal as="li" key={item.id} delay={(index % 3) * 70}>
                  <article
                    onClick={() => onSelect?.(item)}
                    className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-ink-line bg-ink-card transition-all duration-500 hover:border-ink-line-hi hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,0.95)]"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-card/90 via-transparent to-transparent" />

                      {item.badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1.5 font-grotesk text-[9.5px] font-bold uppercase tracking-[0.16em] text-turmeric backdrop-blur">
                          {item.badge}
                        </span>
                      )}

                      {(item.defaultSpice ?? 0) >= 3 && (
                        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-chili px-2.5 py-1.5 font-grotesk text-[9.5px] font-bold uppercase tracking-[0.14em] text-white">
                          <Flame className="h-3 w-3" aria-hidden="true" />
                          Thai hot
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-thai text-xs text-turmeric/85">{item.thaiName}</p>

                      <div className="mt-1.5 flex items-baseline justify-between gap-4">
                        <h3 className="text-[1.45rem] font-bold leading-tight text-bone transition-colors group-hover:text-turmeric">
                          {item.name}
                        </h3>
                        <span className="tnum shrink-0 font-mono text-base font-bold text-bone">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mist">
                        {item.description}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink-line pt-5">
                        <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-mist-2">
                          {needsBuilding ? "Pick protein & heat" : "Straight to the pass"}
                        </span>

                        <button
                          type="button"
                          onClick={(event) => handleAdd(item, event)}
                          aria-label={
                            needsBuilding ? `Customise ${item.name}` : `Add ${item.name} to your order`
                          }
                          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all ${
                            added
                              ? "bg-pandan text-charcoal"
                              : "bg-chili text-white hover:bg-chili-deep"
                          }`}
                        >
                          {added ? (
                            <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                          ) : (
                            <Plus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
