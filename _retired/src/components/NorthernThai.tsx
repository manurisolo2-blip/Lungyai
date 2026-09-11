import { MENU } from "@/data/restaurant";
import { PHOTOS } from "@/data/photos";

export function NorthernThai() {
  const section = MENU.find((s) => s.id === "north");
  if (!section) return null;

  const featured = section.dishes.find((dish) => dish.photo && PHOTOS[dish.photo]);
  const photo = featured?.photo ? PHOTOS[featured.photo] : undefined;

  return (
    <section aria-labelledby="north-title" className="bg-sidewalk py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 lg:grid-cols-12 lg:px-10">
        {photo && featured && (
          <figure className="lg:col-span-6">
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              className="arch aspect-[5/4] w-full bg-line object-cover"
              style={{ objectPosition: photo.position }}
            />
            <figcaption className="mt-3 text-[0.95rem] text-bark-soft">{featured.name}</figcaption>
          </figure>
        )}

        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="north-title" className="text-[clamp(2rem,3.6vw,3rem)]">
            From the north
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.125rem] text-bark-soft">
            Next to the red and green curries everyone knows, the kitchen cooks a few
            less familiar dishes from northern Thailand.
          </p>

          <ul className="mt-8 border-t border-bark">
            {section.dishes.map((dish) => (
              <li key={dish.name} className="border-b border-line py-5">
                <h3 className="text-[1.45rem] font-semibold">
                  {dish.name}
                  {dish.thai && (
                    <span lang="th" className="ml-3 font-sans text-base font-normal text-bark-soft">
                      {dish.thai}
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-bark-soft">{dish.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
