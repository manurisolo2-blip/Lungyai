import React, { createContext, useContext, useState, useEffect } from "react";
import type { CartItem, MenuItem, ProteinOption, ExtraOption, SpiceLevel } from "@/types/lungyai";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    item: MenuItem,
    quantity: number,
    spice: SpiceLevel,
    protein?: ProteinOption,
    extras?: ExtraOption[],
    notes?: string
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItemCount: number;
  subtotal: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "lungyai_cart_v1";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed reading cart from localStorage", e);
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed saving cart to localStorage", e);
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const clearToast = () => setToastMessage(null);

  const addItem = (
    item: MenuItem,
    quantity: number,
    spice: SpiceLevel,
    protein?: ProteinOption,
    extras: ExtraOption[] = [],
    notes?: string
  ) => {
    // Calculate unit price based on base item + protein extra + extras
    const proteinExtra = protein ? protein.extraPrice : 0;
    const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = item.price + proteinExtra + extrasTotal;
    const totalPrice = unitPrice * quantity;

    // Unique id based on configurations
    const extraIds = extras.map((e) => e.id).sort().join(",");
    const cartItemId = `${item.id}_${protein?.id || "base"}_spice${spice}_${extraIds}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        const updatedQty = copy[existingIndex].quantity + quantity;
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: updatedQty,
          totalPrice: copy[existingIndex].unitPrice * updatedQty,
          specialInstructions: notes || copy[existingIndex].specialInstructions,
        };
        return copy;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            quantity,
            selectedProtein: protein,
            selectedSpice: spice,
            selectedExtras: extras,
            specialInstructions: notes,
            unitPrice,
            totalPrice,
          },
        ];
      }
    });

    setToastMessage(`Added ${quantity}x ${item.name} to order`);
    setTimeout(() => {
      setToastMessage((cur) => (cur?.includes(item.name) ? null : cur));
    }, 3200);
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: ci.unitPrice * newQty,
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemCount,
        subtotal,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
