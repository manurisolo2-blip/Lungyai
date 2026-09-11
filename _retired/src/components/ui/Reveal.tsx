import React, { useEffect, useRef, useState } from "react";

export interface RevealProps {
  children: React.ReactNode;
  /** Stagger in ms applied as a transition-delay. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

/**
 * Lightweight scroll reveal. One IntersectionObserver per node, disconnected
 * as soon as the element has shown itself once, so nothing keeps observing
 * a long page after the user has scrolled past it.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
};
