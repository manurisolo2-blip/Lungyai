import React, { useEffect, useState } from "react";
import { X, Flame, Plus, Minus, Check, Award } from "lucide-react";
import type { MenuItem, ProteinOption, ExtraOption, SpiceLevel } from "@/types/lungyai";
import { defaultExtraOptions } from "@/data/menu";
import { useCart } from "@/components/cart/CartContext";

interface QuickOrderModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const SPICE_STEPS: { level: SpiceLevel; label: string }[] = [
  { level: 0, label: "None" },
  { level: 1, label: "Mild" },
  { level: 2, label: "Medium" },
  { level: 3, label: "Thai hot" },
];

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({ item, onClose }) => {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [spice, setSpice] = useState<SpiceLevel>(1);
  const [protein, setProtein] = useState<ProteinOption | undefined>(undefined);
  const [extras, setExtras] = useState<ExtraOption[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!item) return;
    setQuantity(1);
    setSpice(item.defaultSpice ?? 1);
    setProtein(item.proteinOptions?.[0]);
    setExtras([]);
    setNotes("");
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const toggleExtra = (extra: ExtraOption) =>
    setExtras((current) =>
      current.some((e) => e.id === extra.id)
        ? current.filter((e) => e.id !== extra.id)
        : [...current, extra]
    );

  const unitPrice =
    item.price + (protein?.extraPrice ?? 0) + extras.reduce((sum, e) => sum + e.price, 0);
  const lineTotal = unitPrice * quantity;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/85 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="relative mx-auto flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-[32px] border border-ink-line bg-ink-raised shadow-2xl"
      >
        {/* Hero */}
        <div className="relative h-56 shrink-0 overflow-hidden sm:h-64">
          <img src={item.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-raised via-ink-raised/35 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ink/80 text-bone backdrop-blur transition-colors hover:bg-ink"
          >
            <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>

          {item.badge && (
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-turmeric backdrop-blur">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              {item.badge}
            </span>
          )}

          <div className="absolute inset-x-5 bottom-4">
            <p className="font-thai text-xs text-turmeric">{item.thaiName}</p>
            <h2 className="mt-0.5 text-3xl font-bold leading-tight text-bone">{item.name}</h2>
          </div>
        </div>

        {/* Options */}
        <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
          <p className="text-sm leading-relaxed text-mist">{item.description}</p>

          <fieldset>
            <legend className="eyebrow flex items-center gap-2 text-bone">
              <Flame className="h-3.5 w-3.5 text-chili" aria-hidden="true" />
              Heat level
            </legend>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {SPICE_STEPS.map((step) => (
                <button
                  key={step.level}
                  type="button"
                  onClick={() => setSpice(step.level)}
                  aria-pressed={spice === step.level}
                  className={`rounded-2xl border px-2 py-3 text-center font-grotesk text-[11px] font-bold uppercase tracking-[0.06em] transition-colors ${
                    spice === step.level
                      ? "border-chili bg-chili text-white"
                      : "border-ink-line bg-ink-card text-mist hover:text-bone"
                  }`}
                >
                  {step.label}
                </button>
              ))}
            </div>
          </fieldset>

          {item.proteinOptions && item.proteinOptions.length > 0 && (
            <fieldset>
              <legend className="eyebrow text-bone">Choose your protein</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {item.proteinOptions.map((option) => {
                  const selected = protein?.id === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setProtein(option)}
                      aria-pressed={selected}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                        selected
                          ? "border-turmeric bg-ink-card"
                          : "border-ink-line bg-ink-card/50 hover:border-ink-line-hi"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                            selected ? "border-turmeric bg-turmeric" : "border-mist-2"
                          }`}
                        >
                          {selected && <span className="h-1.5 w-1.5 rounded-full bg-charcoal" />}
                        </span>
                        <span className="truncate text-xs text-bone">{option.name}</span>
                      </span>
                      {option.extraPrice > 0 && (
                        <span className="tnum shrink-0 font-mono text-xs font-bold text-turmeric">
                          +${option.extraPrice.toFixed(2)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {item.extrasAllowed && (
            <fieldset>
              <legend className="eyebrow text-bone">Add to the plate</legend>
              <div className="mt-3 space-y-2">
                {defaultExtraOptions.map((extra) => {
                  const checked = extras.some((e) => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      aria-pressed={checked}
                      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                        checked
                          ? "border-turmeric/70 bg-ink-card"
                          : "border-ink-line bg-ink-card/50 hover:border-ink-line-hi"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`grid h-4 w-4 shrink-0 place-items-center rounded border ${
                            checked ? "border-turmeric bg-turmeric text-charcoal" : "border-mist-2"
                          }`}
                        >
                          {checked && <Check className="h-3 w-3" strokeWidth={3.2} />}
                        </span>
                        <span className="truncate text-xs text-bone">{extra.name}</span>
                      </span>
                      <span className="tnum shrink-0 font-mono text-xs font-bold text-turmeric">
                        +${extra.price.toFixed(2)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div>
            <label htmlFor="dish-notes" className="eyebrow block text-bone">
              Allergies or wok notes
            </label>
            <input
              id="dish-notes"
              type="text"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="No peanuts, extra lime, chili oil on the side…"
              className="mt-3 h-12 w-full rounded-full border border-ink-line bg-ink-card px-5 text-xs text-bone placeholder:text-mist-2 focus:border-turmeric focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center gap-3 border-t border-ink-line bg-ink px-5 py-4">
          <div className="flex items-center rounded-full border border-ink-line bg-ink-card p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Fewer"
              className="grid h-9 w-9 place-items-center rounded-full text-mist transition-colors hover:bg-ink-hi hover:text-bone"
            >
              <Minus className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
            </button>
            <span className="tnum w-8 text-center font-mono text-sm font-bold text-bone">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="More"
              className="grid h-9 w-9 place-items-center rounded-full text-mist transition-colors hover:bg-ink-hi hover:text-bone"
            >
              <Plus className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addItem(item, quantity, spice, protein, extras, notes);
              onClose();
            }}
            className="pill pill-chili flex-1 justify-between px-6"
          >
            <span>Add to order</span>
            <span className="tnum font-mono text-sm">${lineTotal.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
