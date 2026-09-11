import React, { useEffect, useState } from "react";
import { MapPin, Phone, Navigation, Ban, Users2, Flame } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { RESTAURANT_INFO, RESTAURANT_TIMEZONE, WEEKLY_HOURS } from "@/data/menu";
import { formatWindow } from "@/lib/hours";

const MAPS_QUERY = encodeURIComponent("Lung Yai Thai Tapas, 1731 SW 8th St, Miami, FL 33135");
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

const HOUSE_RULES = [
  {
    icon: Ban,
    title: "Walk-ins only",
    body: "No reservations, ever. Give your name at the door and wait on Calle Ocho like everyone else.",
  },
  {
    icon: Users2,
    title: "Complete parties",
    body: "The room is small. You are seated once every person in your group has arrived.",
  },
  {
    icon: Flame,
    title: "One single order",
    body: "All food goes in at once so the wok can fire the table together. Drinks you can add whenever.",
  },
];

/** Today's index in the restaurant's timezone, so the highlight is honest. */
function useMiamiWeekday(): number {
  const read = () =>
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
      new Intl.DateTimeFormat("en-US", {
        timeZone: RESTAURANT_TIMEZONE,
        weekday: "short",
      }).format(new Date())
    );

  const [day, setDay] = useState(read);

  useEffect(() => {
    const id = window.setInterval(() => setDay(read()), 300_000);
    return () => window.clearInterval(id);
  }, []);

  return day;
}

export const LocationHours: React.FC = () => {
  const today = useMiamiWeekday();

  return (
    <section id="visit" className="border-t border-ink-line bg-ink-raised px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHeading
            eyebrow="Find us"
            title={
              <>
                1731 SW 8th St,
                <br />
                Little Havana
              </>
            }
            thaiTitle="ร้านอยู่ที่ไมอามี"
            blurb="Between 17th and 18th Avenue on Calle Ocho, four doors from the ventanita. Street parking after 7PM, a paid lot on 18th."
            aside={
              <div className="flex flex-wrap gap-3">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-chili"
                >
                  <Navigation className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                  Directions
                </a>
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="pill pill-ghost">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Map */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-[32px] border border-ink-line bg-ink-card">
              <iframe
                title="Map showing Lung Yai Thai Tapas on SW 8th Street, Miami"
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[340px] w-full border-0 grayscale-[0.35] contrast-[1.1]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-ink to-transparent p-5 pt-14">
                <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink/90 px-4 py-2 text-xs text-bone backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-chili" aria-hidden="true" />
                  {RESTAURANT_INFO.address}
                </span>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto font-grotesk text-[11px] font-bold uppercase tracking-[0.16em] text-turmeric underline-offset-4 hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal delay={100} className="lg:col-span-5">
            <div className="rounded-[32px] border border-ink-line bg-ink-card p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 border-b border-ink-line pb-5">
                <h3 className="text-2xl font-bold text-bone">Wok hours</h3>
                <OpenStatus compact />
              </div>

              <ul className="mt-5 space-y-1">
                {WEEKLY_HOURS.map((day) => {
                  const isToday = day.day === today;
                  const closed = day.windows.length === 0;
                  return (
                    <li
                      key={day.day}
                      className={`flex items-baseline justify-between gap-4 rounded-xl px-3 py-2.5 ${
                        isToday ? "bg-ink-hi" : ""
                      }`}
                    >
                      <span
                        className={`font-grotesk text-xs font-bold uppercase tracking-[0.14em] ${
                          isToday ? "text-turmeric" : "text-mist"
                        }`}
                      >
                        {day.name}
                        {isToday && <span className="ml-2 text-[10px] text-mist-2">today</span>}
                      </span>
                      <span
                        className={`tnum text-right font-mono text-xs ${
                          closed ? "text-chili-soft" : isToday ? "text-bone" : "text-mist"
                        }`}
                      >
                        {closed
                          ? "Closed"
                          : day.windows.map((w) => formatWindow(w)).join("  ·  ")}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 border-t border-ink-line pt-5 text-xs leading-relaxed text-mist-2">
                Kitchen stops taking food orders 20 minutes before close. Lunch
                service runs Friday through Sunday only.
              </p>
            </div>
          </Reveal>
        </div>

        {/* House rules */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {HOUSE_RULES.map((rule, index) => (
            <Reveal as="li" key={rule.title} delay={index * 80}>
              <div className="h-full rounded-[26px] border border-ink-line bg-ink-card p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-chili/15 text-chili">
                  <rule.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                </span>
                <h4 className="mt-4 text-lg font-bold text-bone">{rule.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist">{rule.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};
