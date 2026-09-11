import React from "react";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "./CartContext";

export const CartToast: React.FC = () => {
  const { toastMessage, clearToast, openCart } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 right-4 z-50 max-w-[calc(100vw-2rem)] sm:right-8 md:bottom-8"
    >
      <div className="flex items-center gap-3 rounded-full border border-ink-line bg-ink-card/95 py-2 pl-4 pr-2 shadow-2xl backdrop-blur-xl">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-pandan" aria-hidden="true" />
        <span className="truncate text-xs font-medium text-bone">{toastMessage}</span>
        <button
          type="button"
          onClick={openCart}
          className="shrink-0 rounded-full bg-chili px-3.5 py-2 font-grotesk text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-chili-deep"
        >
          View
        </button>
        <button
          type="button"
          onClick={clearToast}
          aria-label="Dismiss notification"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-mist transition-colors hover:text-bone"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
