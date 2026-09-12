import { motion } from "framer-motion";
import { RESTAURANT, SISTER_RESTAURANTS } from "@/data/restaurant";
import { PHOTOS, STOREFRONT_PHOTO } from "@/data/photos";
import { HERO_VIDEO } from "@/data/media";
import { KHAO_SOI_CREDITS } from "@/data/khaoSoi";
import { weeklyHoursRows } from "@/lib/hours";
import { ExternalLink } from "@/components/ExternalLink";
import { revealGroup, revealItem } from "@/lib/reveal";

interface Credit {
  label: string;
  credit: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl: string;
}

const HEADING = "font-display text-[1.25rem] font-semibold text-glass";

export function SiteFooter() {
  const credits: Credit[] = [...Object.values(PHOTOS), ...KHAO_SOI_CREDITS, HERO_VIDEO];

  return (
    <footer className="on-bark bg-bark pb-28 pt-16 text-smoke md:pb-14">
      <motion.div
        {...revealGroup}
        className="mx-auto grid max-w-[1440px] gap-x-10 gap-y-12 px-5 sm:grid-cols-2 lg:grid-cols-12 lg:px-10"
      >
        <motion.div {...revealItem} className="lg:col-span-3">
          <img
            src="/images/lung-yai-logo.png"
            alt="Lung Yai Thai Tapas"
            width={300}
            height={271}
            loading="lazy"
            className="w-28"
          />
          <p className="mt-6 text-glass">
            {RESTAURANT.street}
            <br />
            {RESTAURANT.city}
          </p>
          <p className="mt-1">
            <a className="link-on-bark inline-flex min-h-11 items-center tabular-nums" href={RESTAURANT.phoneHref}>
              {RESTAURANT.phone}
            </a>
          </p>
        </motion.div>

        <motion.div {...revealItem} className="lg:col-span-3">
          <h2 className={HEADING}>Hours</h2>
          <dl className="mt-4 space-y-3">
            {weeklyHoursRows().map((row) => (
              <div key={row.days}>
                <dt className="text-glass">{row.days}</dt>
                <dd className="tabular-nums">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div {...revealItem} className="lg:col-span-2">
          <h2 className={HEADING}>Online</h2>
          <ul className="mt-2">
            <li>
              <ExternalLink className="link-on-bark inline-flex min-h-11 items-center" href={RESTAURANT.orderUrl}>
                Order online
              </ExternalLink>
            </li>
            <li>
              <ExternalLink className="link-on-bark inline-flex min-h-11 items-center" href={RESTAURANT.instagram}>
                Instagram
              </ExternalLink>
            </li>
          </ul>
        </motion.div>

        {/* Wording follows lungyai.com, which lists the family's newer places. */}
        <motion.div {...revealItem} className="lg:col-span-4">
          <h2 className={HEADING}>Meet the new restaurants</h2>
          <ul className="mt-4 space-y-4">
            {SISTER_RESTAURANTS.map((place) => (
              <li key={place.name}>
                <ExternalLink className="link-on-bark inline-flex min-h-11 items-center font-normal" href={place.href}>
                  {place.name}
                </ExternalLink>
                <p className="mt-0.5">{place.description}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <div className="mx-auto mt-14 max-w-[1440px] px-5 lg:px-10">
        <div className="border-t border-white/15 pt-3 text-[0.875rem] leading-relaxed">
          <details>
            <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center font-medium text-glass underline underline-offset-4 [&::-webkit-details-marker]:hidden">
              Photo and video credits
            </summary>
            <p className="mt-2 max-w-[80ch]">
              Storefront photo by {STOREFRONT_PHOTO.credit}. The other photos and the wok video come from
              Wikimedia Commons and show each dish or place, not our own plates. Some are cropped or resized.
            </p>
            <ul className="mt-3 gap-x-10 text-[0.9375rem] leading-[2] md:columns-2">
              {credits.map((item) => (
                <li key={`${item.label}-${item.sourceUrl}`} className="break-inside-avoid">
                  {item.label}:{" "}
                  <ExternalLink className="link-on-bark" href={item.sourceUrl}>
                    {item.credit}
                  </ExternalLink>
                  {item.license && item.licenseUrl && (
                    <>
                      {" "}(
                      <ExternalLink className="link-on-bark" href={item.licenseUrl}>
                        {item.license}
                      </ExternalLink>
                      )
                    </>
                  )}
                </li>
              ))}
            </ul>
          </details>
          <p className="mt-2">© {new Date().getFullYear()} Lung Yai Thai Tapas</p>
        </div>
      </div>
    </footer>
  );
}
