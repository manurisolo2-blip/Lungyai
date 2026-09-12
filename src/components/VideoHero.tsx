import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";
import { HERO_VIDEO } from "@/data/media";
import { OpenNow } from "@/components/OpenNow";
import { ExternalLink } from "@/components/ExternalLink";
import { usePageReady } from "@/hooks/usePageReady";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/* The loading screen lifts from the bottom up, so the text starts once it is being uncovered. */
const REVEAL_DELAY = 0.3;
const HEADLINE = ["Thai street food", "on Calle Ocho."];

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
};
const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

/*
  Full-bleed wok footage behind the headline. Following the skill's auto-play rule, the
  loop is muted, has a visible pause control, stops when scrolled away, and never starts
  for people who ask for reduced motion or have data saver on (they get the still poster).
*/
export function VideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const connection = (navigator as NavigatorWithConnection).connection;
  const expensive = Boolean(connection?.saveData) || SLOW_CONNECTIONS.includes(connection?.effectiveType ?? "");
  // No autoplay, and no video download at all, for reduced motion, data saver or a slow connection.
  const autoplayAllowed = !prefersReducedMotion && !expensive;
  const [playing, setPlaying] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [loadSource, setLoadSource] = useState(false);
  const ready = usePageReady();

  /*
    The clip is the heaviest thing on the page, so it is only asked for once the loading
    screen is gone and the browser is idle. Until then the poster carries the hero.
  */
  useEffect(() => {
    if (!ready || !autoplayAllowed) return;
    if (typeof window.requestIdleCallback !== "function") {
      const timer = window.setTimeout(() => setLoadSource(true), 500);
      return () => window.clearTimeout(timer);
    }
    const idle = window.requestIdleCallback(() => setLoadSource(true), { timeout: 1500 });
    return () => window.cancelIdleCallback(idle);
  }, [ready, autoplayAllowed]);

  // Parallax on the way out: the text leaves faster than the footage behind it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const still = Boolean(prefersReducedMotion);
  const textY = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["0%", "-24%"]);
  const textFade = useTransform(scrollYProgress, [0, 0.75], still ? [1, 1] : [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], still ? ["0%", "0%"] : ["0%", "14%"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!autoplayAllowed || pausedByUser) {
      video.pause();
      return;
    }

    if (!loadSource) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => setPlaying(false));
        else video.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplayAllowed, loadSource, pausedByUser]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setPausedByUser(false);
      video.play().catch(() => setPlaying(false));
    } else {
      setPausedByUser(true);
      video.pause();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="on-bark relative isolate flex min-h-[max(520px,100svh)] items-end overflow-hidden bg-bark text-glass lg:items-center"
    >
      {/* Settles from a slight zoom while the loading screen lifts, then trails the scroll. */}
      <motion.video
        ref={videoRef}
        style={{ y: videoY }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: ready ? 1 : 1.08 }}
        transition={{ duration: 1.8, ease: EASE_OUT }}
        poster={HERO_VIDEO.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {loadSource && <source src={HERO_VIDEO.src} type="video/mp4" />}
      </motion.video>

      {/* Legibility scrim: text sits where the overlay is darkest (checked for 4.5:1 on bright flames). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(42,26,17,0.94)_0%,rgba(42,26,17,0.78)_50%,rgba(42,26,17,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(42,26,17,0.92)_0%,rgba(42,26,17,0.72)_48%,rgba(42,26,17,0.12)_100%)]"
      />

      <motion.div
        style={{ y: textY, opacity: textFade }}
        className="mx-auto w-full max-w-[1440px] px-5 pb-28 pt-28 md:pb-16 lg:px-10 lg:py-24"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.5, delay: REVEAL_DELAY }}
        >
          <OpenNow className="inline-block rounded-full bg-glass/10 px-3.5 py-1.5 text-[0.95rem] text-glass backdrop-blur-sm" />
        </motion.div>

        <h1 id="hero-title" className="mt-5 text-[clamp(2.75rem,7.5vw,6.75rem)] leading-[0.98] text-glass">
          {HEADLINE.map((line, index) => (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, y: 28 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.7, delay: REVEAL_DELAY + 0.1 + index * 0.09, ease: EASE_OUT }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-[40ch] text-[1.25rem] leading-relaxed text-smoke"
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: REVEAL_DELAY + 0.32, ease: EASE_OUT }}
        >
          Chef Bas cooks his grandfather's recipes from Ayutthaya on a hot wok in Little
          Havana. No reservations, and each table orders once.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: REVEAL_DELAY + 0.44, ease: EASE_OUT }}
        >
          <ExternalLink className="btn btn-sign hidden md:inline-flex" href={RESTAURANT.orderUrl}>
            Order online
          </ExternalLink>
          <a className="btn btn-glass" href="#menu">
            See the menu
          </a>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute bottom-5 right-5 grid h-11 w-11 place-items-center rounded-full border border-glass/60 bg-bark/60 text-glass backdrop-blur-sm transition-colors hover:bg-bark"
      >
        {playing ? (
          <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
        ) : (
          <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" strokeWidth={0} aria-hidden="true" />
        )}
      </button>
    </section>
  );
}
