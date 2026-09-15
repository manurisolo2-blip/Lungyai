import { motion } from "framer-motion";
import { AWARDS } from "@/data/restaurant";
import { revealGroup, revealItem } from "@/lib/reveal";

export function Recognition() {
  const michelin = AWARDS.find((award) => award.source === "Michelin Guide");
  const newTimes = AWARDS.filter((award) => award.source === "Miami New Times");

  return (
    <section aria-label="Awards" className="border-b border-line">
      <motion.div
        {...revealGroup}
        className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:gap-10 lg:px-10"
      >
        <motion.img
          {...revealItem}
          src="/images/michelin-2022-2023-2025.png"
          alt="Michelin Guide Bib Gourmand badges for 2022, 2023 and 2025"
          width={300}
          height={100}
          className="h-12 w-auto self-start sm:self-auto"
        />

        {/* Each award wraps as a whole line instead of breaking between its years. */}
        <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-10">
          {michelin && (
            <motion.li {...revealItem} className="sm:whitespace-nowrap">
              <a className="link" href={michelin.href} target="_blank" aria-describedby="opens-in-new-tab" rel="noopener noreferrer">
                Michelin Guide Bib Gourmand
              </a>{" "}
              <span className="whitespace-nowrap">{michelin.years}</span>
            </motion.li>
          )}
          <motion.li {...revealItem} className="sm:whitespace-nowrap">
            Miami New Times Best Thai Restaurant,{" "}
            <span className="whitespace-nowrap">
              {newTimes.map((award, index) => (
                <span key={award.years}>
                  {index > 0 && " and "}
                  <a className="link" href={award.href} target="_blank" aria-describedby="opens-in-new-tab" rel="noopener noreferrer">
                    {award.years}
                  </a>
                </span>
              ))}
            </span>
          </motion.li>
        </ul>
      </motion.div>
    </section>
  );
}
