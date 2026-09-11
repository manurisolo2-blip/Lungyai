import React, { useEffect, useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, Flame, ExternalLink } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatSpiceLabel, generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import { RESTAURANT_INFO } from "@/data/menu";

const ORDER_TYPES = ["takeout", "curbside", "dine-in-advance"] as const;
type OrderType = (typeof ORDER_TYPES)[number];

const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  takeout: "Takeout",
  curbside: "Curbside",
  "dine-in-advance": "Dine in",
};

export const CartSheet: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalItemCount, subtotal } =
    useCart();
  const [customerName, setCustomerName] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("takeout");

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const checkout = () => {
    const url = generateWhatsAppOrderUrl(
      items,
      subtotal,
      orderType,
      customerName.trim() || undefined
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink-line bg-ink-raised"
      >
        {/* Header */}
        <header className="flex items-center justify-between gap-4 border-b border-ink-line px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink-card text-turmeric">
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold leading-none text-bone">Your order</h2>
              <p className="mt-1.5 text-[11px] text-mist-2">
                {totalItemCount} {totalItemCount === 1 ? "item" : "items"} on the ticket
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close your order"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-line text-mist transition-colors hover:border-chili hover:text-bone"
          >
            <X className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-ink-line bg-ink-card text-chili">
                <Flame className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-bone">Nothing on the pass yet</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">
                Pick a few plates, set your heat level, and we will fire them together.
              </p>
              <button type="button" onClick={closeCart} className="pill pill-chili mt-7">
                Browse the menu
              </button>
            </div>
          ) : (
            <>
              <p className="flex gap-3 rounded-2xl border border-chili/35 bg-chili/10 p-4 text-xs leading-relaxed text-bone">
                <Flame className="mt-0.5 h-4 w-4 shrink-0 text-chili" aria-hidden="true" />
                <span>
                  <strong className="font-bold text-turmeric">Single order rule:</strong> every
                  dish is fired at once on the 500°F line once you confirm.
                </span>
              </p>

              <ul className="space-y-3">
                {items.map((cartItem) => (
                  <li
                    key={cartItem.cartItemId}
                    className="rounded-3xl border border-ink-line bg-ink-card p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 gap-3">
                        <img
                          src={cartItem.item.image}
                          alt=""
                          className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                        />
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-bold leading-tight text-bone">
                            {cartItem.item.name}
                          </h3>
                          <p className="mt-0.5 truncate font-thai text-[11px] text-turmeric/80">
                            {cartItem.item.thaiName}
                          </p>
                          <p className="tnum mt-1 font-mono text-sm font-bold text-turmeric">
                            ${cartItem.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(cartItem.cartItemId)}
                        aria-label={`Remove ${cartItem.item.name}`}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-mist-2 transition-colors hover:bg-ink-hi hover:text-chili"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <dl className="mt-3 space-y-1 rounded-2xl bg-ink/60 p-3 text-[11px] text-mist">
                      {cartItem.selectedProtein && (
                        <div className="flex gap-1.5">
                          <dt className="text-bone">Protein:</dt>
                          <dd className="truncate">{cartItem.selectedProtein.name}</dd>
                        </div>
                      )}
                      <div className="flex gap-1.5">
                        <dt className="text-bone">Heat:</dt>
                        <dd>{formatSpiceLabel(cartItem.selectedSpice)}</dd>
                      </div>
                      {cartItem.selectedExtras.length > 0 && (
                        <div className="flex gap-1.5">
                          <dt className="text-bone">Extras:</dt>
                          <dd>{cartItem.selectedExtras.map((e) => e.name).join(", ")}</dd>
                        </div>
                      )}
                      {cartItem.specialInstructions && (
                        <div className="flex gap-1.5">
                          <dt className="text-bone">Note:</dt>
                          <dd className="italic text-turmeric/85">
                            {cartItem.specialInstructions}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-grotesk text-[10px] font-bold uppercase tracking-[0.16em] text-mist-2">
                        Quantity
                      </span>
                      <div className="flex items-center rounded-full border border-ink-line bg-ink p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                          aria-label={`One less ${cartItem.item.name}`}
                          className="grid h-8 w-8 place-items-center rounded-full text-mist transition-colors hover:bg-ink-hi hover:text-bone"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                        </button>
                        <span className="tnum w-8 text-center font-mono text-sm font-bold text-bone">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                          aria-label={`One more ${cartItem.item.name}`}
                          className="grid h-8 w-8 place-items-center rounded-full text-mist transition-colors hover:bg-ink-hi hover:text-bone"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <fieldset>
                <legend className="eyebrow text-mist-2">How are you eating</legend>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {ORDER_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      aria-pressed={orderType === type}
                      className={`rounded-full border px-2 py-2.5 font-grotesk text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${
                        orderType === type
                          ? "border-turmeric bg-turmeric text-charcoal"
                          : "border-ink-line bg-ink-card text-mist hover:text-bone"
                      }`}
                    >
                      {ORDER_TYPE_LABELS[type]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="cart-customer-name"
                  className="eyebrow block text-mist-2"
                >
                  Name for the ticket
                </label>
                <input
                  id="cart-customer-name"
                  type="text"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Alex M."
                  className="mt-3 h-12 w-full rounded-full border border-ink-line bg-ink-card px-5 text-sm text-bone placeholder:text-mist-2 focus:border-turmeric focus:outline-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="space-y-4 border-t border-ink-line bg-ink px-6 py-5">
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between text-mist">
                <dt>Subtotal</dt>
                <dd className="tnum font-mono text-bone">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between text-mist">
                <dt>Sales tax (7%)</dt>
                <dd className="tnum font-mono text-bone">${tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-line pt-2.5 text-sm font-bold text-bone">
                <dt>Estimated total</dt>
                <dd className="tnum font-mono text-turmeric">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <button type="button" onClick={checkout} className="pill pill-chili w-full">
              Send order on WhatsApp
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="flex items-center justify-between text-[11px] text-mist-2">
              <span>Rather talk to someone?</span>
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="font-semibold text-turmeric hover:underline"
              >
                {RESTAURANT_INFO.phone}
              </a>
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
};
