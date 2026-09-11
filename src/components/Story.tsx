import { PRESS_REVIEW } from "@/data/restaurant";

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="bg-sidewalk py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <img
            src="/images/lung-yai-logo.png"
            alt="The Lung Yai Thai Tapas sign"
            width={300}
            height={271}
            loading="lazy"
            className="w-56 sm:w-72 lg:sticky lg:top-28"
          />
        </div>

        <div className="max-w-[62ch] lg:col-span-7 lg:col-start-6">
          <h2 id="story-title" className="text-[clamp(2.25rem,4.4vw,3.5rem)]">
            Our story
          </h2>

          <div className="mt-6 space-y-5 text-[1.125rem] leading-[1.7]">
            <p>
              Chef Bas and his brother came to Miami from Bangkok in 1994. For about twenty
              years he cooked in other restaurants, many of them his brother's.
            </p>
            <p>
              The recipes are older than that. As boys, the two of them worked in their
              grandfather's restaurant in Ayutthaya, a small place he kept going for almost
              fifty years to put nine children through school.
            </p>
            <p>In August 2015, Bas opened Lung Yai on Calle Ocho in his grandfather's memory.</p>
          </div>

          <figure className="mt-12">
            <blockquote>
              <p className="font-display text-[1.75rem] font-semibold leading-snug">
                “He was a country chef who taught with a gentle hand.”
              </p>
            </blockquote>
            <figcaption className="mt-3 text-bark-soft">
              Chef Bas on his grandfather, speaking to{" "}
              <cite className="not-italic">
                <a className="link" href={PRESS_REVIEW.href} target="_blank"
              aria-describedby="opens-in-new-tab" rel="noopener noreferrer">
                  {PRESS_REVIEW.outlet}
                </a>
              </cite>{" "}
              in {PRESS_REVIEW.date}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
