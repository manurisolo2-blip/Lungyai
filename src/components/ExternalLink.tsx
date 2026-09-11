import type { AnchorHTMLAttributes } from "react";

/** A single hidden sentence that every new-tab link points to through aria-describedby. */
export const NEW_TAB_NOTE_ID = "opens-in-new-tab";

export function NewTabNote() {
  return (
    <span id={NEW_TAB_NOTE_ID} hidden>
      Opens in a new tab
    </span>
  );
}

/** Links that leave the site open in a new tab and tell assistive tech they do. */
export function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer" aria-describedby={NEW_TAB_NOTE_ID} />
  );
}
