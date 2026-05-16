import { useSyncExternalStore } from "react";
import { products, type Product, finalPrice } from "./products";

type CartItem = { id: string; qty: number };
const KEY = "agrofresh-cart-v1";
const WISH_KEY = "agrofresh-wishlist-v1";

let cart: CartItem[] = [];
let wishlist: string[] = [];
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    cart = JSON.parse(localStorage.getItem(KEY) || "[]");
    wishlist = JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
  } catch {
    cart = [];
    wishlist = [];
  }
}
function persist() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(cart));
  localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
}
function emit() {
  persist();
  listeners.forEach((l) => l());
}

load();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    () => cart,
    () => cart,
  );
}
export function useWishlist() {
  return useSyncExternalStore(
    subscribe,
    () => wishlist,
    () => wishlist,
  );
}

export const cartActions = {
  add(id: string, qty = 1) {
    const existing = cart.find((i) => i.id === id);
    if (existing) existing.qty += qty;
    else cart = [...cart, { id, qty }];
    emit();
  },
  setQty(id: string, qty: number) {
    if (qty <= 0) cart = cart.filter((i) => i.id !== id);
    else cart = cart.map((i) => (i.id === id ? { ...i, qty } : i));
    emit();
  },
  remove(id: string) {
    cart = cart.filter((i) => i.id !== id);
    emit();
  },
  clear() {
    cart = [];
    emit();
  },
};

export const wishlistActions = {
  toggle(id: string) {
    wishlist = wishlist.includes(id) ? wishlist.filter((x) => x !== id) : [...wishlist, id];
    emit();
  },
};

export function cartWithProducts(items: CartItem[]) {
  return items
    .map((i) => {
      const p = products.find((x) => x.id === i.id);
      return p ? { product: p, qty: i.qty, lineTotal: finalPrice(p) * i.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];
}

export function cartTotals(items: CartItem[]) {
  const rows = cartWithProducts(items);
  const subtotal = rows.reduce((s, r) => s + r.lineTotal, 0);
  const delivery = subtotal > 0 && subtotal < 2000 ? 200 : 0;
  const total = subtotal + delivery;
  const count = rows.reduce((s, r) => s + r.qty, 0);
  return { rows, subtotal, delivery, total, count };
}
