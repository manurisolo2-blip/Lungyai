import { SISTER_RESTAURANTS } from "@/data/restaurant";

/* Takes the slot the reference layout gives to catering. Wording follows lungyai.com. */
export function NewRestaurants() {
  return (
    <section aria-labelledby="new-restaurants-title" className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 lg:grid-cols-12 lg:px-10">
        <h2 id="new-restaurants-title" className="text-[clamp(1.9rem,3vw,2.5rem)] lg:col-span-4">
          Meet the new restaurants
        </h2>

        <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
          {SISTER_RESTAURANTS.map((place) => (
            <li key={place.name}>
              <h3 className="text-[1.6rem] font-semibold">{place.name}</h3>
              <p className="mt-1 text-bark-soft">{place.description}</p>
              <a
                className="link mt-3 inline-block"
                href={place.href}
                target="_blank"
              aria-describedby="opens-in-new-tab"
                rel="noopener noreferrer"
              >
                {new URL(place.href).hostname}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
