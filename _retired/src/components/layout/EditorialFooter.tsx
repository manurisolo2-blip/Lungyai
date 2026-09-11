import React, { useId, useState } from "react";
import { ArrowUp, Instagram, MapPin, Phone } from "lucide-react";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { RESTAURANT_INFO, WEEKLY_HOURS } from "@/data/menu";
import { formatWindow } from "@/lib/hours";
import { NAV_LINKS } from "@/components/layout/TopBar";

export interface EditorialFooterProps {
  onOpenCart?: () => void;
}

export function EditorialFooter({ onOpenCart }: EditorialFooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const emailFieldId = useId();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    window.setTimeout(() => setSubscribed(false), 4500);
  };

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className="relative overflow-hidden border-t border-ink-line bg-ink px-4 pb-28 pt-20 sm:px-6 md:pb-14 lg:px-10"
    >
      {/* Ember wash behind the wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(240,69,42,0.22),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* Top: identity + newsletter */}
        <div className="grid gap-12 border-b border-ink-line pb-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow text-turmeric">Michelin Bib Gourmand · 22 · 23 · 25</span>
            <p className="mt-4 max-w-md font-display text-3xl font-bold leading-[1.1] text-bone sm:text-4xl">
              Bangkok street cooking, served loud on Calle Ocho since the first
              wok went on the burner.
            </p>
            <OpenStatus className="mt-6" />

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="pill pill-chili">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {RESTAURANT_INFO.phone}
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="pill pill-ghost"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow text-mist-2">Explore</h2>
            <ul className="mt-5 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block text-sm font-semibold text-mist transition-colors hover:text-turmeric"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onOpenCart}
                  className="inline-block cursor-pointer text-left text-sm font-semibold text-mist transition-colors hover:text-turmeric"
                >
                  Your order
                </button>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h2 className="eyebrow text-mist-2">Street dispatch</h2>
            <p className="mt-5 text-sm leading-relaxed text-mist">
              Regional specials, pop-up curries and the occasional off-menu
              tasting night. Roughly one email a month, no marketing filler.
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <label htmlFor={emailFieldId} className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2 rounded-full border border-ink-line bg-ink-card p-1.5 focus-within:border-turmeric">
                <input
                  id={emailFieldId}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@miami.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-10 min-w-0 flex-1 bg-transparent pl-4 text-sm text-bone placeholder:text-mist-2 focus:outline-none"
                />
                <button type="submit" className="pill pill-turmeric shrink-0 px-5">
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="mt-3 text-xs font-semibold text-pandan">
                  Khop khun krub. You are on the list.
                </p>
              )}
            </form>

            <div className="mt-7 rounded-3xl border border-ink-line bg-ink-card p-5">
              <span className="eyebrow text-mist-2">Hours</span>
              <ul className="mt-3 space-y-1.5">
                {WEEKLY_HOURS.map((day) => (
                  <li key={day.day} className="flex items-baseline justify-between gap-4 text-xs">
                    <span className="font-grotesk font-semibold uppercase tracking-wider text-mist-2">
                      {day.short}
                    </span>
                    <span
                      className={`tnum font-mono text-[11px] ${
                        day.windows.length === 0 ? "text-chili-soft" : "text-mist"
                      }`}
                    >
                      {day.windows.length === 0
                        ? "Closed"
                        : day.windows.map((w) => formatWindow(w)).join(" · ")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="pointer-events-none select-none py-10">
          <span
            aria-hidden="true"
            className="block text-center font-display text-[clamp(3.5rem,15.5vw,15rem)] font-black uppercase leading-[0.78] tracking-[-0.05em] text-bone/90"
          >
            Lung Yai
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-ink-line pt-7 text-xs text-mist-2 sm:flex-row">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Lung Yai Thai Tapas.</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-chili" aria-hidden="true" />
              {RESTAURANT_INFO.address}
            </span>
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-grotesk text-[11px] font-bold uppercase tracking-[0.16em] text-mist transition-colors hover:text-turmeric"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
