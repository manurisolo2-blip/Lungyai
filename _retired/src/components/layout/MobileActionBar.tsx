import React from "react";
import { Phone, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { RESTAURANT_INFO } from "@/data/menu";

/** Sticky order bar for handhelds — the one action that always stays reachable. */
export const MobileActionBar: React.FC = () => {
  const { openCart, totalItemCount, subtotal } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-ink/92 px-4 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <a
          href={`tel:${RESTAURANT_INFO.phoneRaw}`}
          aria-label={`Call Lung Yai at ${RESTAURANT_INFO.phone}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-line bg-ink-card text-turmeric"
        >
          <Phone className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />
        </a>

        {totalItemCount > 0 ? (
          <button
            type="button"
            onClick={openCart}
            className="pill pill-chili flex-1 justify-between px-5"
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              View order · {totalItemCount}
            </span>
            <span className="tnum font-mono text-sm">${subtotal.toFixed(2)}</span>
          </button>
        ) : (
          <a href="#menu" className="pill pill-chili flex-1">
            <UtensilsCrossed className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
            Order Now
          </a>
        )}
      </div>
    </div>
  );
};
