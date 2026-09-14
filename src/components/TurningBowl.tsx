import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import { KHAO_SOI_TURN, type TurnFrames } from "@/data/khaoSoi";

type FrameFormat = "avif" | "webp";

const frameUrl = (frames: TurnFrames, index: number, format: FrameFormat) =>
  `${frames.dir}/${String(index).padStart(3, "0")}.${format}`;

/** Every index once, halving the gap each round, so the frames that arrive first cover the whole turn. */
function loadOrder(count: number): number[] {
  const order: number[] = [];
  const queued = new Set<number>();
  for (let gap = count - 1; gap >= 1; gap = Math.floor(gap / 2)) {
    for (let index = 0; index < count; index += gap) {
      if (!queued.has(index)) {
        queued.add(index);
        order.push(index);
      }
    }
  }
  return order;
}

async function decodeFrame(url: string, signal: AbortSignal): Promise<ImageBitmap> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  // Decoded once here, off the main thread where the browser can, so scrubbing only has to draw.
  return createImageBitmap(await response.blob());
}

interface TurningBowlProps {
  /** 0 to 1 through the turn. Without it the bowl rests on its first frame and nothing else loads. */
  progress?: MotionValue<number>;
  size: keyof typeof KHAO_SOI_TURN.sizes;
  className?: string;
}

/*
  A bowl of khao soi that turns as the page scrolls: frames cut out of a turntable clip
  (scripts/turntable-frames.py), drawn on a canvas. Loading starts a screen ahead of the bowl,
  coarse frames first; until a frame has arrived its nearest loaded neighbour stands in, and
  between two frames the next one is faded over the last so the turn never steps.
*/
export function TurningBowl({ progress, size, className = "" }: TurningBowlProps) {
  const frames = KHAO_SOI_TURN.sizes[size];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!progress || !canvas || !context || typeof createImageBitmap !== "function") return;

    const bitmaps: (ImageBitmap | undefined)[] = new Array(frames.count);
    const controller = new AbortController();
    let frameRequest = 0;
    let lastDrawn = "";
    let shown = false;

    const draw = () => {
      frameRequest = 0;
      const position = Math.min(Math.max(progress.get(), 0), 1) * (frames.count - 1);
      const lower = Math.floor(position);

      let base = -1;
      for (let step = 0; step < frames.count && base === -1; step += 1) {
        if (bitmaps[lower - step]) base = lower - step;
        else if (bitmaps[lower + step]) base = lower + step;
      }
      if (base === -1) return;

      const next = base === lower ? bitmaps[lower + 1] : undefined;
      const mix = next ? Math.round((position - lower) * 24) / 24 : 0;
      const key = `${base}:${mix}`;
      if (key === lastDrawn) return;
      lastDrawn = key;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 1;
      context.drawImage(bitmaps[base]!, 0, 0, canvas.width, canvas.height);
      if (next && mix > 0) {
        context.globalAlpha = mix;
        context.drawImage(next, 0, 0, canvas.width, canvas.height);
        context.globalAlpha = 1;
      }
      if (!shown) {
        shown = true;
        setDrawn(true);
      }
    };

    const redraw = () => {
      lastDrawn = "";
      if (!frameRequest) frameRequest = requestAnimationFrame(draw);
    };
    const onProgress = () => {
      if (!frameRequest) frameRequest = requestAnimationFrame(draw);
    };

    const load = async () => {
      // The first frame settles the format: AVIF where the browser decodes it, WebP everywhere else.
      let format: FrameFormat = "avif";
      try {
        bitmaps[0] = await decodeFrame(frameUrl(frames, 0, format), controller.signal);
      } catch {
        if (controller.signal.aborted) return;
        format = "webp";
        try {
          bitmaps[0] = await decodeFrame(frameUrl(frames, 0, format), controller.signal);
        } catch {
          return;
        }
      }
      redraw();

      const order = loadOrder(frames.count);
      let cursor = 1;
      const worker = async () => {
        while (cursor < order.length && !controller.signal.aborted) {
          const index = order[cursor++];
          try {
            bitmaps[index] = await decodeFrame(frameUrl(frames, index, format), controller.signal);
            redraw();
          } catch {
            // A frame that fails to load is covered by its neighbours.
          }
        }
      };
      await Promise.all(Array.from({ length: 4 }, worker));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        void load();
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(canvas);
    const unsubscribe = progress.on("change", onProgress);

    return () => {
      observer.disconnect();
      unsubscribe();
      controller.abort();
      cancelAnimationFrame(frameRequest);
      bitmaps.forEach((bitmap) => bitmap?.close());
    };
  }, [progress, frames]);

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${frames.width} / ${frames.height}` }}>
      {/* Contact shadow, so the cut-out sits on the page instead of floating over it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[20%] -bottom-[4%] h-[13%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(42,26,17,0.34),rgba(42,26,17,0))]"
      />
      {/* First frame: holds the space until the canvas draws, and is the whole bowl for reduced motion. */}
      <picture>
        <source type="image/avif" srcSet={frameUrl(frames, 0, "avif")} />
        <img
          src={frameUrl(frames, 0, "webp")}
          alt={progress ? "" : KHAO_SOI_TURN.alt}
          width={frames.width}
          height={frames.height}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full ${drawn ? "invisible" : ""}`}
        />
      </picture>
      {progress && (
        <canvas
          ref={canvasRef}
          width={frames.width}
          height={frames.height}
          role="img"
          aria-label={KHAO_SOI_TURN.alt}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
