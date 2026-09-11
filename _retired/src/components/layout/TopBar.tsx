import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, ArrowUpRight, MapPin, ShoppingBag, Flame } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { RESTAURANT_INFO, WEEKLY_HOURS } from "@/data/menu";
import { formatWindow } from "@/lib/hours";

export interface NavLink {
  href: string;
  label: string;
  meta: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#menu", label: "Menu", meta: "Every plate on the wok line" },
  { href: "#signatures", label: "Signatures", meta: "The six that made the name" },
  { href: "#khao-soi", label: "Khao Soi", meta: "Five layers, taken apart" },
  { href: "#catering", label: "Catering", meta: "Ten guests or five hundred" },
  { href: "#visit", label: "Visit", meta: "Calle Ocho, hours & map" },
];

export function TopBar({ onOpenCart }: { onOpenCart?: () => void }) {
  const { totalItemCount, openCart } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    if (latest <= 80 || drawerOpen) {
      setHidden(false);
      return;
    }
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;
    if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  // Lock the page and trap Escape while the drawer is up.
  useEffect(() => {
    if (!drawerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  const handleCart = () => (onOpenCart ? onOpenCart() : openCart());

  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-turmeric focus:px-5 focus:py-3 focus:font-grotesk focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-charcoal"
      >
        Skip to the menu
      </a>

      <motion.header
        initial={false}
        animate={{ y: hidden ? "-105%" : "0%" }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 w-full select-none will-change-transform transition-colors duration-300 ${
          scrolled
            ? "border-b border-ink-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/90 to-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[76px] w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10"
        >
          {/* Wordmark */}
          <a
            href="#top"
            aria-label="Lung Yai Thai Tapas — back to top"
            className="group flex min-w-0 shrink-0 items-center gap-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-chili text-white transition-transform duration-300 group-hover:rotate-12">
              <Flame className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-[1.45rem] font-black leading-none tracking-[-0.03em] text-bone transition-colors group-hover:text-turmeric sm:text-[1.7rem]">
                Lung&nbsp;Yai
              </span>
              <span className="hidden text-[9.5px] font-bold uppercase tracking-[0.28em] text-mist-2 sm:block font-grotesk">
                Thai Tapas · Est. Calle Ocho
              </span>
            </span>
          </a>

          {/* Centre navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative block px-3.5 py-2 font-grotesk text-[11.5px] font-bold uppercase tracking-[0.16em] text-mist transition-colors hover:text-bone"
                >
                  {link.label}
                  <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-chili transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <OpenStatus compact className="hidden xl:inline-flex" />

            <button
              type="button"
              onClick={handleCart}
              aria-label={
                totalItemCount > 0
                  ? `Open your order, ${totalItemCount} items`
                  : "Open your order, currently empty"
              }
              className="relative grid h-11 w-11 place-items-center rounded-full border border-ink-line bg-ink-card text-bone transition-colors hover:border-ink-line-hi hover:bg-ink-hi"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />
              {totalItemCount > 0 && (
                <span className="tnum absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-chili px-1 font-mono text-[10px] font-bold text-white ring-2 ring-ink">
                  {totalItemCount}
                </span>
              )}
            </button>

            <a href="#menu" className="pill pill-chili hidden sm:inline-flex">
              Order Now
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-line bg-ink-card text-bone transition-colors hover:border-ink-line-hi hover:bg-ink-hi lg:hidden"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Slide-over navigation */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col justify-between overflow-y-auto border-l border-ink-line bg-ink-raised p-6 sm:p-8"
            >
              <div>
                <div className="flex items-start justify-between gap-4 border-b border-ink-line pb-5">
                  <div>
                    <span className="eyebrow text-turmeric">Navigate</span>
                    <p className="mt-2 font-display text-3xl font-black leading-none text-bone">
                      Lung Yai
                    </p>
                    <OpenStatus className="mt-3" />
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label="Close navigation"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-line text-mist transition-colors hover:border-chili hover:text-bone"
                  >
                    <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>

                <ul className="mt-6 space-y-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setDrawerOpen(false)}
                        className="group flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-ink-card"
                      >
                        <span>
                          <span className="block font-display text-2xl font-bold leading-tight text-bone transition-colors group-hover:text-turmeric">
                            {link.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-mist-2">{link.meta}</span>
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 shrink-0 text-chili opacity-0 transition-all group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-3xl border border-ink-line bg-ink-card p-5">
                  <span className="eyebrow text-turmeric">This week</span>
                  <ul className="mt-3 space-y-1.5">
                    {WEEKLY_HOURS.map((day) => (
                      <li
                        key={day.day}
                        className="flex items-baseline justify-between gap-4 text-xs"
                      >
                        <span className="font-grotesk font-semibold uppercase tracking-wider text-mist">
                          {day.short}
                        </span>
                        <span
                          className={`tnum text-right font-mono text-[11px] ${
                            day.windows.length === 0 ? "text-chili-soft" : "text-bone"
                          }`}
                        >
                          {day.windows.length === 0
                            ? "Closed"
                            : day.windows.map((w) => formatWindow(w)).join(" · ")}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-start gap-2 border-t border-ink-line pt-4 text-xs text-mist">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chili" aria-hidden="true" />
                    <span>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-2.5">
                <a href="#menu" onClick={() => setDrawerOpen(false)} className="pill pill-chili w-full">
                  Order Now
                </a>
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="pill pill-ghost w-full">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
