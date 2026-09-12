import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { RESTAURANT } from "@/data/restaurant";
import { OpenNow } from "@/components/OpenNow";
import { ExternalLink } from "@/components/ExternalLink";

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#rules", label: "House rules" },
  { href: "#story", label: "Our story" },
];

const NAV_ID = "site-nav";
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/*
  Logo in one corner, the menu toggle in the other. The links live in a panel that slides in
  from the right, which keeps the bar clear over the hero video.
*/
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [inHero, setInHero] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();

  // The bar stays transparent while the hero is still underneath it.
  useEffect(() => {
    const hero = document.getElementById("top");
    const header = headerRef.current;
    if (!hero || !header) {
      setInHero(false);
      return;
    }
    const check = () => setInHero(hero.getBoundingClientRect().bottom > header.offsetHeight);
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Highlight the section that is currently in view.
  useEffect(() => {
    const targets = ["top", ...LINKS.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(entry.target.id === "top" ? null : `#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // While the panel is open the page behind it can't scroll or take focus, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const header = headerRef.current;
    const behind = [...(header?.parentElement?.children ?? [])].filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== header && !el.hasAttribute("data-nav-layer")
    );

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    // Hiding the scrollbar widens the viewport, so the page and the bar are padded by its width
    // to keep everything in place while the panel covers the edge.
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    root.style.paddingRight = `${scrollbar}px`;
    if (header) header.style.paddingRight = `${scrollbar}px`;
    // The smooth scroller keeps its own position, so it has to be paused as well.
    lenis?.stop();
    behind.forEach((el) => (el.inert = true));
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      root.style.paddingRight = "";
      if (header) header.style.paddingRight = "";
      lenis?.start();
      behind.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  // Over the hero or the open panel the bar has no background and light text.
  const onDark = inHero || open;
  const textShadow = inHero && !open ? "drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" : "";
  const close = () => setOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          onDark ? "border-transparent bg-transparent" : "border-line bg-glass/95 shadow-xs backdrop-blur-md"
        }`}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            onClick={close}
            className="shrink-0 transition-opacity hover:opacity-90"
            aria-label="Lung Yai Thai Tapas, back to top"
          >
            <img
              src="/images/lung-yai-logo.png"
              alt=""
              width={300}
              height={271}
              className="h-[62px] w-auto drop-shadow-sm md:h-[74px]"
            />
          </a>

          <div className="flex items-center gap-5">
            <a
              href={RESTAURANT.phoneHref}
              className={`hidden text-[1.2rem] font-normal tabular-nums transition-colors lg:inline ${textShadow} ${
                onDark ? "text-glass hover:text-curry" : "text-bark hover:text-sign"
              }`}
            >
              {RESTAURANT.phone}
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={NAV_ID}
              aria-label={open ? "Close navigation" : "Open navigation"}
              className={`-mr-3 grid h-14 w-14 place-items-center rounded-[4px] transition-colors ${
                onDark ? "text-glass hover:text-curry" : "text-bark hover:text-sign"
              }`}
            >
              {/* Two bars that cross into an X. */}
              <span aria-hidden="true" className={`relative block h-[18px] w-9 ${textShadow}`}>
                <span
                  className={`absolute right-0 top-[4px] h-[2px] w-9 rounded-full bg-current transition-all duration-300 ease-out ${
                    open ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-[4px] right-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out ${
                    open ? "w-9 -translate-y-[4px] -rotate-45" : "w-6"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-backdrop"
            data-nav-layer=""
            aria-hidden="true"
            className="fixed inset-0 z-[45] bg-bark/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
        )}
        {open && (
          <motion.div
            key="nav-panel"
            id={NAV_ID}
            data-nav-layer=""
            className="on-bark fixed inset-y-0 right-0 z-[46] flex w-full max-w-[30rem] flex-col overflow-y-auto bg-bark px-6 pb-10 pt-[calc(var(--header-h)+2rem)] text-glass sm:px-10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
          >
            <nav aria-label="Main">
              <ul className="border-t border-white/15">
                {LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    className="border-b border-white/15"
                    initial={{ opacity: 0, x: 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 + index * 0.06, ease: EASE_OUT }}
                  >
                    <a
                      href={link.href}
                      aria-current={active === link.href ? "location" : undefined}
                      onClick={close}
                      className="block py-5 font-display text-[clamp(2.25rem,8vw,3.25rem)] font-bold leading-none text-glass transition-colors hover:text-curry aria-[current=location]:text-curry"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-auto pt-12 text-smoke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <OpenNow className="text-glass" />
              <p className="mt-4">
                {RESTAURANT.street}
                <br />
                {RESTAURANT.city}
              </p>
              <p className="mt-1">
                <a className="link-on-bark tabular-nums" href={RESTAURANT.phoneHref}>
                  {RESTAURANT.phone}
                </a>
              </p>
              <ul className="mt-5 flex gap-6">
                <li>
                  <ExternalLink className="link-on-bark" href={RESTAURANT.instagram}>
                    Instagram
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink className="link-on-bark" href={RESTAURANT.facebook}>
                    Facebook
                  </ExternalLink>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
