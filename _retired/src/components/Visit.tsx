import { useEffect, useState } from "react";
import { RESTAURANT, WEEKLY_HOURS } from "@/data/restaurant";
import { formatWindow, miamiNow } from "@/lib/hours";
import { OpenNow } from "@/components/OpenNow";
import { ExternalLink } from "@/components/ExternalLink";

export function Visit() {
  const [today, setToday] = useState(() => miamiNow().day);

  useEffect(() => {
    const id = window.setInterval(() => setToday(miamiNow().day), 300_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="visit" aria-labelledby="visit-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <h2 id="visit-title" className="text-[clamp(2.5rem,5vw,4.25rem)]">
            Hours and directions
          </h2>

          <address className="mt-6 text-[1.25rem] not-italic leading-snug">
            {RESTAURANT.street}
            <br />
            {RESTAURANT.city}
            <br />
            <span className="text-bark-soft">Little Havana, on Calle Ocho</span>
          </address>
          <p className="mt-4 text-[1.25rem]">
            <a className="link tabular-nums" href={RESTAURANT.phoneHref}>
              {RESTAURANT.phone}
            </a>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalLink className="btn btn-sign" href={RESTAURANT.mapsUrl}>
              Get directions
            </ExternalLink>
            <ExternalLink className="btn btn-quiet" href={RESTAURANT.orderUrl}>
              Order for pickup
            </ExternalLink>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <OpenNow className="font-normal" />

          <table className="mt-4 w-full border-collapse text-left tabular-nums">
            <caption className="sr-only">Opening hours by day</caption>
            <thead>
              <tr className="border-b-2 border-bark">
                <th scope="col" className="py-2 pl-2 font-medium">
                  Day
                </th>
                <th scope="col" className="py-2 font-medium">
                  Lunch
                </th>
                <th scope="col" className="py-2 font-medium">
                  Dinner
                </th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_HOURS.map((day) => {
                const lunch = day.windows.find((w) => w.label === "Lunch");
                const dinner = day.windows.find((w) => w.label === "Dinner");
                const isToday = day.day === today;

                return (
                  <tr
                    key={day.day}
                    aria-current={isToday ? "date" : undefined}
                    className={`border-b border-line ${isToday ? "bg-sidewalk" : ""}`}
                  >
                    <th scope="row" className="py-3 pl-2 pr-4 font-normal">
                      {day.name}
                      {isToday && <span className="ml-2 text-[0.875rem] text-bark-soft">today</span>}
                    </th>
                    {day.windows.length === 0 ? (
                      <td colSpan={2} className="py-3">
                        Closed
                      </td>
                    ) : (
                      <>
                        <td className={`py-3 ${lunch ? "" : "text-bark-soft"}`}>
                          {lunch ? formatWindow(lunch) : "Closed"}
                        </td>
                        <td className={`py-3 ${dinner ? "" : "text-bark-soft"}`}>
                          {dinner ? formatWindow(dinner) : "Closed"}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p className="mt-5 text-[0.95rem] text-bark-soft">
            The easiest times to get a table are noon to 3pm and 5 to 7pm.
          </p>
        </div>
      </div>
    </section>
  );
}
