import type { CartItem } from "@/types/lungyai";
import { RESTAURANT_INFO } from "@/data/menu";

export function formatSpiceLabel(level: number): string {
  switch (level) {
    case 0:
      return "No Spice";
    case 1:
      return "🌶️ Mild Spice";
    case 2:
      return "🌶️🌶️ Medium Spice";
    case 3:
      return "🌶️🌶️🌶️ Thai Hot 🔥";
    default:
      return "Regular";
  }
}

export function generateWhatsAppOrderUrl(
  items: CartItem[],
  subtotal: number,
  orderType: "takeout" | "curbside" | "dine-in-advance" = "takeout",
  customerName?: string
): string {
  const lines: string[] = [];

  lines.push(`🏮 *LUNG YAI THAI TAPAS — ORDER REQUEST* 🏮`);
  lines.push(`📍 1731 SW 8th St, Little Havana, Miami`);
  lines.push(`----------------------------------------`);
  lines.push(`*Order Type:* ${orderType.toUpperCase()}`);
  if (customerName) {
    lines.push(`*Customer Name:* ${customerName}`);
  }
  lines.push(`----------------------------------------`);
  lines.push(`*ITEMS ORDERED:*`);

  items.forEach((ci, idx) => {
    const proteinText = ci.selectedProtein ? ` [Protein: ${ci.selectedProtein.name}]` : "";
    const spiceText = ` [Spice: ${formatSpiceLabel(ci.selectedSpice)}]`;
    lines.push(`\n${idx + 1}. *${ci.quantity}x ${ci.item.name}* ($${ci.totalPrice.toFixed(2)})`);
    if (proteinText) lines.push(`   └ ${proteinText}`);
    lines.push(`   └ ${spiceText}`);
    
    if (ci.selectedExtras && ci.selectedExtras.length > 0) {
      const extrasStr = ci.selectedExtras.map((e) => `+${e.name} ($${e.price.toFixed(2)})`).join(", ");
      lines.push(`   └ Extras: ${extrasStr}`);
    }

    if (ci.specialInstructions) {
      lines.push(`   └ Notes: "${ci.specialInstructions}"`);
    }
  });

  const tax = subtotal * 0.07; // Miami-Dade sales tax 7%
  const total = subtotal + tax;

  lines.push(`\n----------------------------------------`);
  lines.push(`*Subtotal:* $${subtotal.toFixed(2)}`);
  lines.push(`*Tax (7%):* $${tax.toFixed(2)}`);
  lines.push(`*Estimated Total:* $${total.toFixed(2)}`);
  lines.push(`----------------------------------------`);
  lines.push(`⚡ *Wok Hei Notice:* All dishes are fired simultaneously over high heat for maximum freshness.`);

  const message = lines.join("\n");
  const phone = RESTAURANT_INFO.whatsapp.replace(/\+/g, "").replace(/\s/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
