import { RESTAURANT } from "@/data/restaurant";
import { STOREFRONT_PHOTO } from "@/data/photos";
import { OpenNow } from "@/components/OpenNow";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="border-b border-line">
      <div className="mx-auto grid max-w-[1440px] lg:h-[min(calc(100svh-72px),860px)] lg:min-h-[620px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="order-2 flex flex-col justify-center px-5 py-12 sm:py-16 lg:order-1 lg:px-10">
          <OpenNow className="text-bark-soft" />

          <h1 id="hero-title" className="mt-4 max-w-[12ch] text-[clamp(2.75rem,5.4vw,5.25rem)]">
            Thai street food on Calle Ocho.
          </h1>

          <p className="mt-6 max-w-[38ch] text-[1.25rem] leading-relaxed text-bark-soft">
            Chef Bas cooks his grandfather's recipes from Ayutthaya in a small room in
            Little Havana. No reservations, and each table orders once.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              className="btn btn-sign"
              href={RESTAURANT.orderUrl}
              target="_blank"
              aria-describedby="opens-in-new-tab"
              rel="noopener noreferrer"
            >
              Order online
            </a>
            <a className="btn btn-quiet" href="#menu">
              See the menu
            </a>
          </div>

          <p className="mt-10 leading-snug text-bark-soft">
            {RESTAURANT.street}, Miami
            <br />
            <a className="link tabular-nums" href={RESTAURANT.phoneHref}>
              {RESTAURANT.phone}
            </a>
          </p>
        </div>

        <figure className="relative order-1 lg:order-2">
          <img
            src={STOREFRONT_PHOTO.src}
            alt={STOREFRONT_PHOTO.alt}
            width={STOREFRONT_PHOTO.width}
            height={STOREFRONT_PHOTO.height}
            fetchPriority="high"
            className="aspect-[3/2] h-full w-full object-cover lg:aspect-auto"
            style={{ objectPosition: STOREFRONT_PHOTO.position }}
          />
          <figcaption className="absolute bottom-0 right-0 bg-bark px-2.5 py-1 text-xs font-normal text-glass">
            Photo: {STOREFRONT_PHOTO.credit}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
