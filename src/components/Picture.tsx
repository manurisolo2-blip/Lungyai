import type { Photo } from "@/data/photos";

interface PictureProps {
  photo: Photo;
  /** The rendered width at each breakpoint, so the browser can pick the smallest file. */
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

/** WebP at several widths with a JPEG fallback, declared dimensions to avoid layout shift. */
export function Picture({ photo, sizes, className = "", loading = "lazy", fetchPriority }: PictureProps) {
  const srcSet = photo.widths.map((w) => `${photo.base}-${w}.webp ${w}w`).join(", ");

  return (
    <picture className="contents">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
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
