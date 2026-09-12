import { useState } from "react";
import { Play } from "lucide-react";
import { ExternalLink } from "@/components/ExternalLink";

export interface YouTubeVideo {
  id: string;
  /** Short caption shown on the page. */
  caption: string;
  /** Original title, used for the accessible name and the iframe title. */
  title: string;
  author: string;
  authorUrl: string;
  vertical?: boolean;
}

/**
 * Click-to-play embed: only a thumbnail loads until someone presses play,
 * so YouTube's player, cookies and data stay out of the page until then.
 */
export function YouTubeFacade({ video, className = "" }: { video: YouTubeVideo; className?: string }) {
  const [active, setActive] = useState(false);
  const frame = video.vertical ? "aspect-[9/16]" : "aspect-video";

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-[6px] bg-bark ${frame}`}>
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play video: ${video.title}`}
            className="group absolute inset-0 h-full w-full"
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
              onError={(event) => {
                event.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
              }}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-sign text-glass shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
            >
              <Play className="h-7 w-7 translate-x-[2px]" fill="currentColor" strokeWidth={0} />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-[0.95rem] leading-loose">
        <span className="font-medium">{video.caption}</span>
        <span className="block opacity-90">
          by{" "}
          <ExternalLink className="underline underline-offset-4 hover:no-underline" href={video.authorUrl}>
            {video.author}
          </ExternalLink>{" "}
          on YouTube
        </span>
      </figcaption>
    </figure>
  );
}
