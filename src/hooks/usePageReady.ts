import { useEffect, useState } from "react";

/* Set by the inline loading screen in index.html when it starts lifting off the page. */
const READY_EVENT = "lungyai:ready";

function loaderLifted(): boolean {
  return document.documentElement.dataset.ready === "true" || !document.getElementById("loader");
}

/** False while the loading screen still covers the page, so entrance animations wait for it. */
export function usePageReady(): boolean {
  const [ready, setReady] = useState(loaderLifted);

  useEffect(() => {
    if (ready) return;
    const onReady = () => setReady(true);
    window.addEventListener(READY_EVENT, onReady);
    // The event can fire between the first render and this effect.
    if (loaderLifted()) setReady(true);
    return () => window.removeEventListener(READY_EVENT, onReady);
  }, [ready]);

  return ready;
}
