import type { Photo } from "@/data/photos";

interface PictureProps {
  photo: Photo;
  /** The rendered width at each breakpoint, so the browser can pick the smallest file. */
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

/** AVIF, then WebP, then JPEG, at several widths, with dimensions declared to avoid layout shift. */
export function Picture({ photo, sizes, className = "", loading = "lazy", fetchPriority }: PictureProps) {
  const srcSet = (format: "avif" | "webp") =>
    photo.widths.map((w) => `${photo.base}-${w}.${format} ${w}w`).join(", ");

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${photo.base}.jpg`}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </picture>
  );
}
