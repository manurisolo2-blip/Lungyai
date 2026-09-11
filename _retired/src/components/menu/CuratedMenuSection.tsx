import React, { useState } from "react";
import { Plus, ArrowUpRight, Award } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MenuItem } from "@/types/lungyai";
import { menuItems } from "@/data/menu";

interface SignatureDish {
  id: string;
  name: string;
  thaiName: string;
  price: number;
  technique: string;
  description: string;
  note: string;
  imageUrl: string;
  badge: string;
}

const SIGNATURES: SignatureDish[] = [
  {
    id: "khao-soi-gai",
    name: "Khao Soi Chiang Mai",
    thaiName: "ข้าวซอยไก่เชียงใหม่",
    price: 18.5,
    technique: "3h braise",
    description:
      "Chicken drumstick softened over three hours in northern yellow curry, fresh egg noodles underneath, a fried nest on top.",
    note: "golden noodle nest over velvety coconut broth",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
    badge: "Michelin Recommended",
  },
  {
    id: "crispy-tamarind-duck",
    name: "Crispy Tamarind Duck",
    thaiName: "เป็ดกรอบซอสมะขาม",
    price: 27.0,
    technique: "Crackling skin",
    description:
      "Half duck roasted until the skin shatters, finished in a sweet-sour tamarind reduction with flash-fried holy basil.",
    note: "tamarind reduction and toasted cashews",
    imageUrl:
      "https://images.unsplash.com/photo-1514944298350-93ff912a2334?auto=format&fit=crop&w=1000&q=80",
    badge: "Chef Signature",
  },
  {
    id: "pad-kee-mao",
    name: "Pad Kee Mao",
    thaiName: "ผัดขี้เมาเส้นใหญ่",
    price: 17.5,
    technique: "500°F wok hei",
    description:
      "Wide rice noodles blistered over full flame with holy basil, smashed garlic and green peppercorns.",
    note: "blistered noodles, charred basil, real heat",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
    badge: "Spicy Favorite",
  },
  {
    id: "moo-ping-skewers",
    name: "Moo Ping & Sticky Rice",
    thaiName: "หมูปิ้งข้าวเหนียวนุ่ม",
    price: 13.5,
    technique: "24h marinade",
    description:
      "Pork shoulder marinated a full day in condensed milk, garlic and cilantro root, grilled over charcoal.",
    note: "banana leaf, charcoal smoke, nam jim jaew",
    imageUrl:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=80",
    badge: "House Specialty",
  },
  {
    id: "pad-kra-pao",
    name: "Pad Kra Pao & Kai Dao",
    thaiName: "ผัดกะเพราราดข้าวไข่ดาว",
    price: 17.0,
    technique: "Crispy Thai egg",
    description:
      "Hand-minced pork seared with bird's eye chili and holy basil, over jasmine rice with a lace-edged fried egg.",
    note: "runny yolk against explosive wok garlic",
    imageUrl:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=80",
    badge: "Chef Signature",
  },
  {
    id: "sai-oua-sausage",
    name: "Sai Oua",
    thaiName: "ไส้อั่วสมุนไพรเชียงใหม่",
    price: 13.0,
    technique: "Stone-pounded herbs",
    description:
      "Coarse pork sausage packed with kaffir lime zest, lemongrass and turmeric, sliced straight off the grill.",
    note: "rustic herb texture, raw ginger, raw chili",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    badge: "Michelin Recommended",
  },
];

interface CuratedMenuSectionProps {
  onOpenDishModal: (dish: MenuItem) => void;
}

export const CuratedMenuSection: React.FC<CuratedMenuSectionProps> = ({ onOpenDishModal }) => {
  const { addItem } = useCart();
  const [active, setActive] = useState<SignatureDish>(SIGNATURES[0]);

  const quickAdd = (dish: SignatureDish, event: React.MouseEvent) => {
    event.stopPropagation();
    const full = menuItems.find((item) => item.id === dish.id);
    if (!full) return;
    if (full.customizable || full.extrasAllowed) onOpenDishModal(full);
    else addItem(full, 1, full.defaultSpice ?? 1);
  };

  return (
    <section
      id="signatures"
      className="relative overflow-hidden border-y border-ink-line bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/3 h-[520px] w-[520px] -translate-x-1/3 rounded-full bg-chili/15 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] translate-x-1/3 rounded-full bg-turmeric/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHeading
            eyebrow="Chef Bas · The live-fire six"
            title="Signatures"
            thaiTitle="หกจานที่สร้างชื่อ"
            blurb="Six plates that carry the room. Hover or tap one to see the technique behind it, then send it straight to your table order."
            aside={
              <a href="#menu" className="pill pill-ghost">
                Full menu
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
              </a>
            }
          />
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Ordered list */}
          <ol className="lg:col-span-7">
            {SIGNATURES.map((dish, index) => {
              const isActive = active.id === dish.id;
              return (
                <li key={dish.id} className="relative border-b border-ink-line">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 hidden h-14 w-[3px] -translate-y-1/2 rounded-r-full bg-chili transition-opacity duration-300 lg:block ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div
                    onMouseEnter={() => setActive(dish)}
                    className={`flex items-center justify-between gap-4 pr-4 transition-colors duration-300 sm:pr-6 ${
                      isActive ? "bg-ink-card" : "hover:bg-ink-raised"
                    }`}
                  >
                    <button
                      type="button"
                      onFocus={() => setActive(dish)}
                      onClick={() => setActive(dish)}
                      aria-pressed={isActive}
                      className="group min-w-0 flex-1 px-4 py-6 text-left sm:px-6"
                    >
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="tnum font-mono text-xs font-bold text-chili">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-thai text-xs text-turmeric/85">{dish.thaiName}</span>
                        <span className="rounded-full border border-ink-line px-2.5 py-1 font-grotesk text-[9.5px] font-bold uppercase tracking-[0.16em] text-mist">
                          {dish.technique}
                        </span>
                      </span>

                      <span
                        className={`mt-2 block font-display text-[1.75rem] font-bold leading-[1.05] transition-colors sm:text-[2.1rem] ${
                          isActive ? "text-turmeric" : "text-bone"
                        }`}
                      >
                        {dish.name}
                      </span>

                      <span className="mt-1.5 block text-sm italic text-mist">{dish.note}</span>
                    </button>

                    <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                      <span className="tnum font-mono text-base font-bold text-bone sm:text-lg">
                        ${dish.price.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={(event) => quickAdd(dish, event)}
                        aria-label={`Add ${dish.name} to your order`}
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all ${
                          isActive
                            ? "bg-chili text-white hover:bg-chili-deep"
                            : "border border-ink-line text-mist hover:border-ink-line-hi hover:text-bone"
                        }`}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.8} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Live preview */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <article className="overflow-hidden rounded-[32px] border border-ink-line bg-ink-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  key={active.id}
                  src={active.imageUrl}
                  alt={active.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/20 to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-turmeric backdrop-blur">
                  <Award className="h-3.5 w-3.5" aria-hidden="true" />
                  {active.badge}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <p className="font-thai text-sm text-turmeric/85">{active.thaiName}</p>
                <h3 className="mt-1 text-3xl font-bold leading-tight text-bone">{active.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{active.description}</p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink-line pt-5">
                  <span>
                    <span className="eyebrow block text-mist-2">Price</span>
                    <span className="tnum mt-1 block font-mono text-2xl font-bold text-turmeric">
                      ${active.price.toFixed(2)}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={(event) => quickAdd(active, event)}
                    className="pill pill-chili"
                  >
                    Add to order
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
