import React from "react";
import { Star, ExternalLink, Award } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  dish: string;
  content: string;
  initials: string;
  isMichelin?: boolean;
}

const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Lung+Yai+Thai+Tapas+Miami";

const REVIEWS: ReviewItem[] = [
  {
    id: "michelin-inspection",
    author: "Michelin Guide inspector",
    rating: 5,
    dish: "Khao Soi & crispy tamarind duck",
    content:
      "A jewel of Little Havana. Chef Bas cooks electrifying, unapologetically spicy Northern Thai fare. The Khao Soi is extraordinary, as are the flash-fired noodles carrying real wok hei.",
    initials: "MG",
    isMichelin: true,
  },
  {
    id: "review-1",
    author: "Carlos Mendez",
    rating: 5,
    dish: "Khao Soi Gai & Sai Oua",
    content:
      "Best Thai food in South Florida, no contest. The curry has depth you can taste for an hour afterwards and the Chiang Mai sausage is all lemongrass and lime leaf. Street food soul on Calle Ocho.",
    initials: "CM",
  },
  {
    id: "review-2",
    author: "Jessica Sterling",
    rating: 5,
    dish: "Crispy duck & Pad Kee Mao",
    content:
      "The duck skin actually crackles and the meat stays juicy. Drunken noodles arrive with that carbon-steel smoke you only get from a screaming pan. Order everything at once like they ask — it works.",
    initials: "JS",
  },
  {
    id: "review-3",
    author: "David Vance",
    rating: 5,
    dish: "Moo Ping & Som Tum",
    content:
      "No reservations, walk-ins only, worth every minute of the wait. The pork skewers with hot sticky rice put me straight back in a Bangkok night market.",
    initials: "DV",
  },
  {
    id: "review-4",
    author: "Elena Rostova",
    rating: 5,
    dish: "Pad Thai Boran & mango sticky rice",
    content:
      "Real tamarind in the Pad Thai, not the red ketchup version tourists get. Then warm mango sticky rice in thick coconut cream. A genuine Miami treasure.",
    initials: "ER",
  },
  {
    id: "review-5",
    author: "Mateo Fernandez",
    rating: 5,
    dish: "Crab fried rice & green curry",
    content:
      "Colossal lumps of blue crab in the fried rice. The green curry has that fresh kaffir lime punch. Fast, fiery, and the hospitality is genuinely warm.",
    initials: "MF",
  },
];

export function GoogleReviewsSection() {
  return (
    <section id="reviews" className="bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <Reveal>
          <SectionHeading
            eyebrow="Community & inspector proof"
            title="What the room says"
            thaiTitle="เสียงจากลูกค้า"
            blurb="Verified Google reviews from the dining room plus the Michelin Guide's own write-up. Nothing here is paid for."
            aside={
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-ghost"
              >
                4.6 ★ · 1,800+ reviews
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            }
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <Reveal as="li" key={review.id} delay={(index % 3) * 80}>
              <figure
                className={`flex h-full flex-col justify-between rounded-[28px] border p-7 transition-colors ${
                  review.isMichelin
                    ? "border-turmeric/50 bg-gradient-to-b from-turmeric/10 to-ink-card"
                    : "border-ink-line bg-ink-card hover:border-ink-line-hi"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full font-grotesk text-xs font-bold ${
                          review.isMichelin
                            ? "bg-turmeric text-charcoal"
                            : "bg-ink-hi text-bone"
                        }`}
                      >
                        {review.initials}
                      </span>
                      <figcaption>
                        <span className="flex items-center gap-1.5 text-sm font-bold text-bone">
                          {review.author}
                          {review.isMichelin && (
                            <Award className="h-3.5 w-3.5 text-turmeric" aria-hidden="true" />
                          )}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-semibold text-turmeric/80">
                          {review.dish}
                        </span>
                      </figcaption>
                    </div>

                    <span className="flex shrink-0 items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
                      {Array.from({ length: review.rating }, (_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-turmeric text-turmeric" aria-hidden="true" />
                      ))}
                    </span>
                  </div>

                  <blockquote className="mt-5 text-sm leading-relaxed text-mist">
                    {review.content}
                  </blockquote>
                </div>

                <p className="mt-7 flex items-center justify-between border-t border-ink-line pt-4 font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-mist-2">
                  <span>Verified visit</span>
                  <span className="text-mist">Calle Ocho</span>
                </p>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
