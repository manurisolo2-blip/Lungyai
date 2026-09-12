import { PRESS_QUOTES } from "@/data/restaurant";
import { VISIT_VIDEO } from "@/data/media";
import { YouTubeFacade } from "@/components/YouTubeFacade";
import { ExternalLink } from "@/components/ExternalLink";

/*
  What other people say, in one place: two press lines and one visit filmed by a food creator.
  Both quotes are word for word from the linked articles.
*/
export function WordOfMouth() {
  return (
    <section id="word-of-mouth" aria-labelledby="word-of-mouth-title" className="on-bark bg-bark py-20 text-glass sm:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-7">
          <h2 id="word-of-mouth-title" className="title-md text-glass">
            Word of mouth
          </h2>

          <div className="mt-10 space-y-10">
            {PRESS_QUOTES.map((item) => (
              <figure key={item.source}>
                <blockquote>
                  <p className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] font-semibold leading-snug text-glass">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-smoke">
                  <ExternalLink className="link-on-bark" href={item.href}>
                    {item.source}
                  </ExternalLink>
                  {item.detail && `, ${item.detail}`}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <YouTubeFacade video={VISIT_VIDEO} />
        </div>
      </div>
    </section>
  );
}
