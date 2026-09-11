import React, { useState } from "react";
import { Check, ChevronRight, Thermometer } from "lucide-react";
import { InkStamp } from "@/components/ui/InkStamp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface LayerData {
  id: string;
  name: string;
  thaiName: string;
  role: string;
  detail: string;
  temperature: string;
  imageUrl: string;
}

const LAYERS: LayerData[] = [
  {
    id: "crispy-noodles",
    name: "Golden crispy noodles",
    thaiName: "บะหมี่กรอบสีทอง",
    role: "Texture & elevation",
    detail:
      "Hand-cut egg noodles dropped into rice bran oil for twelve seconds. The crown stays airy until you push it under the curry.",
    temperature: "350°F flash fry",
    imageUrl:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chicken",
    name: "Slow-braised drumstick",
    thaiName: "น่องไก่นุ่มละลาย",
    role: "Protein & tenderness",
    detail:
      "Bone-in free-range chicken held three hours with bruised lemongrass, black cardamom and palm sugar until it gives to a spoon.",
    temperature: "185°F gentle simmer",
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "curry",
    name: "Yellow coconut broth",
    thaiName: "น้ำแกงกะทิเข้มข้น",
    role: "The soul",
    detail:
      "Northern curry paste pounded with wild turmeric, ginger, shallot and coriander root, then loosened with double-pressed coconut cream.",
    temperature: "210°F aromatic boil",
    imageUrl:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "fresh-noodles",
    name: "Fresh egg noodles",
    thaiName: "บะหมี่ไข่เส้นเหนียวนุ่ม",
    role: "Foundation",
    detail:
      "Blanched forty seconds, drained hard, tossed in toasted garlic oil so the broth clings instead of sliding off.",
    temperature: "212°F flash blanch",
    imageUrl:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "condiments",
    name: "Pickles, shallot & chili oil",
    thaiName: "ผักกาดดอง หอมแดง พริกผัด",
    role: "Acid & smoke",
    detail:
      "House-fermented mustard greens, crimson shallot, a lime wedge and wok-roasted nam prik pao. This is the part most kitchens skip.",
    temperature: "Fresh & chilled",
    imageUrl:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  },
];

const SPECS = [
  {
    title: "18 fresh aromatics",
    body: "Galangal, lemongrass, dried chili, coriander seed, cracked cardamom — pounded, never blitzed.",
  },
  {
    title: "Two noodle textures",
    body: "Springy boiled noodles beneath, airy fried nest on top. Both cut from the same dough.",
  },
  {
    title: "No shortcuts",
    body: "Real house-pickled mustard greens and a fresh lime wedge on every single bowl.",
  },
];

export const KhaoSoiDeconstruction: React.FC = () => {
  const [index, setIndex] = useState(0);
  const layer = LAYERS[index];

  return (
    <section
      id="khao-soi"
      className="relative overflow-hidden border-y border-ink-line bg-ink-raised px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-turmeric/10 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHeading
            eyebrow="Anatomy of a legend · 5 layers"
            title={
              <>
                Khao Soi,
                <br />
                taken apart
              </>
            }
            thaiTitle="ข้าวซอยเชียงใหม่"
            blurb="The bowl that earned three consecutive Bib Gourmand nods. Pick a layer and see what goes into it before it ever reaches the pass."
            aside={
              <a href="#menu" className="pill pill-chili">
                Order it · $18.50
                <ChevronRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
              </a>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Layer picker */}
          <ol className="order-2 space-y-2.5 lg:order-1 lg:col-span-4">
            {LAYERS.map((item, itemIndex) => {
              const isActive = itemIndex === index;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    aria-pressed={isActive}
                    className={`w-full rounded-3xl border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-turmeric/60 bg-ink-card"
                        : "border-ink-line bg-ink/40 hover:border-ink-line-hi hover:bg-ink-card"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="eyebrow text-turmeric">
                        Layer {String(itemIndex + 1).padStart(2, "0")} · {item.role}
                      </span>
                      <span className="tnum inline-flex items-center gap-1 font-mono text-[10px] text-mist-2">
                        <Thermometer className="h-3 w-3" aria-hidden="true" />
                        {item.temperature}
                      </span>
                    </span>

                    <span className="mt-2 block font-display text-xl font-bold leading-tight text-bone">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block font-thai text-xs text-turmeric/70">
                      {item.thaiName}
                    </span>

                    {isActive && (
                      <span className="mt-3 block border-t border-ink-line pt-3 text-sm leading-relaxed text-mist">
                        {item.detail}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Visual */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative">
              <div className="pointer-events-none absolute -right-4 -top-8 z-10 hidden sm:block">
                <InkStamp
                  size={132}
                  title={"CHEF BAS\nOFFICIAL"}
                  subtitle="EST. CALLE OCHO"
                  perimeterText="KHAO SOI CHIANG MAI · MICHELIN BIB GOURMAND ·"
                  color="turmeric"
                />
              </div>

              <div className="relative aspect-square overflow-hidden rounded-[36px] border border-ink-line bg-ink">
                <img
                  key={layer.id}
                  src={layer.imageUrl}
                  alt={layer.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

                <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-ink-line bg-ink/85 p-5 backdrop-blur-md">
                  <span className="eyebrow text-turmeric">
                    Inspecting {String(index + 1).padStart(2, "0")} of 05
                  </span>
                  <p className="mt-2 font-display text-xl font-bold leading-tight text-bone">
                    {layer.name}
                  </p>
                  <p className="mt-1 font-thai text-xs text-mist">{layer.thaiName}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2">
                {LAYERS.map((item, dotIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(dotIndex)}
                    aria-label={`Show layer ${dotIndex + 1}: ${item.name}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dotIndex === index ? "w-9 bg-turmeric" : "w-2 bg-ink-line-hi hover:bg-mist-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="order-3 space-y-4 lg:col-span-3">
            <div className="rounded-[28px] border border-ink-line bg-ink-card p-6">
              <span className="eyebrow text-chili">Recipe standard</span>
              <h3 className="mt-2 text-2xl font-bold text-bone">Chiang Mai, unedited</h3>

              <ul className="mt-5 space-y-4">
                {SPECS.map((spec) => (
                  <li key={spec.title} className="flex gap-3">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-turmeric"
                      strokeWidth={2.6}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block text-sm font-bold text-bone">{spec.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-mist">
                        {spec.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-chili/35 bg-chili/10 p-6 text-center">
              <span className="tnum block font-display text-4xl font-black text-chili-soft">
                500°F
              </span>
              <p className="mt-1.5 font-grotesk text-[10px] font-bold uppercase tracking-[0.18em] text-mist">
                Wok heat · Little Havana
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
