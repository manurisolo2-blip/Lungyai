import { YOUTUBE_VIDEOS } from "@/data/media";
import { YouTubeFacade } from "@/components/YouTubeFacade";

export function Watch() {
  const landscape = YOUTUBE_VIDEOS.filter((video) => !video.vertical);
  const vertical = YOUTUBE_VIDEOS.find((video) => video.vertical);

  return (
    <section id="watch" aria-labelledby="watch-title" className="on-bark bg-bark py-20 text-glass sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <h2 id="watch-title" className="text-[clamp(2.25rem,4.4vw,3.75rem)] text-glass">
          Seen on YouTube
        </h2>
        <p className="mt-3 max-w-[46ch] text-[1.125rem] text-smoke">
          Food creators filmed their visits.
        </p>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {landscape.map((video) => (
              <YouTubeFacade key={video.id} video={video} />
            ))}
          </div>
          {vertical && <YouTubeFacade video={vertical} className="mx-auto w-full max-w-[340px] lg:max-w-none" />}
        </div>
      </div>
    </section>
  );
}
