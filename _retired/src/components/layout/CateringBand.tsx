import React from "react";
import { Phone, ArrowUpRight, Users, Truck, Clock3 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RESTAURANT_INFO } from "@/data/menu";

const CATERING_IMAGE =
  "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1400&q=80";

const POINTS = [
  {
    icon: Users,
    title: "Ten guests or five hundred",
    body: "Family-style curry trays, noodle pans and skewer platters, portioned so nobody at the back of the room gets the cold end.",
  },
  {
    icon: Truck,
    title: "Delivered hot, not lukewarm",
    body: "Insulated Khao Soi pots and separate crispy-noodle packs, so texture survives the drive to Brickell or Coral Gables.",
  },
  {
    icon: Clock3,
    title: "48 hours of notice",
    body: "Quote back the same day. Live wok stations for on-site events need a week and a power outlet.",
  },
];

export const CateringBand: React.FC = () => {
  return (
    <section id="catering" className="bg-paper px-4 py-20 text-charcoal sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHeading
            eyebrow="Catering & private events"
            title={
              <>
                Bring the wok
                <br />
                to your floor
              </>
            }
            thaiTitle="จัดเลี้ยงนอกสถานที่"
            blurb="Corporate lunches, film sets, private dinners and Miami rooftops. Same recipes, same chili levels, packed for travel."
            tone="paper"
            aside={
              <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-end">
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="pill pill-chili">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {RESTAURANT_INFO.phone}
                </a>
                <a href="#visit" className="pill pill-outline-ink">
                  Visit us first
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                </a>
              </div>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[32px] border border-paper-line">
              <img
                src={CATERING_IMAGE}
                alt="Wok-tossed chicken with cashews being plated for service"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent p-6 pt-16">
                <p className="font-display text-2xl font-bold leading-tight text-paper">
                  "Order everything at once. The wok decides the rhythm, not the ticket printer."
                </p>
                <p className="mt-3 eyebrow text-turmeric">Chef Bas</p>
              </div>
            </div>
          </Reveal>

          <ul className="grid gap-4 lg:col-span-7 lg:content-center">
            {POINTS.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 90}>
                <div className="flex gap-5 rounded-[26px] border border-paper-line bg-paper-2 p-6 transition-colors hover:border-charcoal/30 sm:p-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-charcoal text-turmeric">
                    <point.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold leading-tight text-charcoal">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{point.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
