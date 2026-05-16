import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import tomatoes from "@/assets/p-tomatoes.jpg";
import kale from "@/assets/p-kale.jpg";
import avocado from "@/assets/p-avocado.jpg";
import maize from "@/assets/p-maize.jpg";
import milk from "@/assets/p-milk.jpg";
import eggs from "@/assets/p-eggs.jpg";
import bananas from "@/assets/p-bananas.jpg";
import beans from "@/assets/p-beans.jpg";

export type Category = "Fruits" | "Vegetables" | "Grains" | "Dairy" | "Poultry";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  unit: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  farmer: string;
  county: string;
  description: string;
  discount?: number;
}

const IMAGE_MAP: Record<string, string> = {
  tomatoes, kale, avocado, maize, milk, eggs, bananas, beans,
};
const FALLBACK_IMG = tomatoes;

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Category,
    price: Number(row.price),
    unit: row.unit as string,
    image: IMAGE_MAP[(row.image_slug as string) ?? ""] ?? FALLBACK_IMG,
    stock: Number(row.stock),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    farmer: row.farmer as string,
    county: row.county as string,
    description: row.description as string,
    discount: row.discount == null ? undefined : Number(row.discount),
  };
}

// Module-level cache so synchronous helpers (cart totals, related lists)
// keep working after the first fetch hydrates it.
export let productsCache: Product[] = [];

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  const list = (data ?? []).map(rowToProduct);
  productsCache = list;
  return list;
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToProduct(data) : null;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });
}

export const getProduct = (id: string) => productsCache.find((p) => p.id === id);

export const categories: { name: Category; emoji: string; blurb: string }[] = [
  { name: "Fruits", emoji: "🍌", blurb: "Tree-ripened" },
  { name: "Vegetables", emoji: "🥬", blurb: "Picked daily" },
  { name: "Grains", emoji: "🌾", blurb: "Farm-cleaned" },
  { name: "Dairy", emoji: "🥛", blurb: "Cold-chain fresh" },
  { name: "Poultry", emoji: "🥚", blurb: "Free-range" },
];

export const formatKES = (n: number) =>
  "KES " + n.toLocaleString("en-KE", { maximumFractionDigits: 0 });

export const finalPrice = (p: Product) =>
  p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
