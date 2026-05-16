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
  price: number; // KES
  unit: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  farmer: string;
  county: string;
  description: string;
  discount?: number; // percentage
}

export const products: Product[] = [
  { id: "tomatoes", name: "Vine-Ripened Tomatoes", category: "Vegetables", price: 120, unit: "per kg", image: tomatoes, stock: 240, rating: 4.8, reviews: 132, farmer: "Mwangi Family Farm", county: "Kiambu", description: "Hand-picked vine-ripened tomatoes, sun-grown without synthetic pesticides. Perfect for salads, stews, and pilau.", discount: 10 },
  { id: "kale", name: "Fresh Sukuma Wiki", category: "Vegetables", price: 40, unit: "per bunch", image: kale, stock: 500, rating: 4.9, reviews: 210, farmer: "Green Hills Cooperative", county: "Nyeri", description: "Crisp, tender sukuma wiki harvested this morning. Rich in vitamins A, C and K." },
  { id: "avocado", name: "Hass Avocados", category: "Fruits", price: 220, unit: "per kg (4-5 pcs)", image: avocado, stock: 180, rating: 4.7, reviews: 98, farmer: "Murang'a Orchards", county: "Murang'a", description: "Creamy Hass avocados at peak ripeness. Export grade.", discount: 15 },
  { id: "maize", name: "Sweet Yellow Maize", category: "Grains", price: 80, unit: "per 2 cobs", image: maize, stock: 320, rating: 4.6, reviews: 64, farmer: "Rift Valley Growers", county: "Nakuru", description: "Naturally sweet yellow maize, perfect for boiling or roasting." },
  { id: "milk", name: "Fresh Whole Milk", category: "Dairy", price: 90, unit: "per litre", image: milk, stock: 150, rating: 4.9, reviews: 187, farmer: "Highland Dairy", county: "Meru", description: "Cold-chain whole milk from grass-fed cows. Delivered within 24 hours of milking." },
  { id: "eggs", name: "Free-Range Eggs", category: "Poultry", price: 480, unit: "per tray (30 eggs)", image: eggs, stock: 90, rating: 4.8, reviews: 142, farmer: "Karatina Poultry", county: "Nyeri", description: "Brown, free-range eggs from pasture-raised hens. No antibiotics, no hormones." },
  { id: "bananas", name: "Sweet Ripe Bananas", category: "Fruits", price: 60, unit: "per bunch", image: bananas, stock: 280, rating: 4.7, reviews: 76, farmer: "Kisii Highlands", county: "Kisii", description: "Naturally ripened sweet bananas. Great for snacking or smoothies.", discount: 20 },
  { id: "beans", name: "Red Kidney Beans", category: "Grains", price: 180, unit: "per kg", image: beans, stock: 410, rating: 4.6, reviews: 53, farmer: "Eldoret Pulses", county: "Uasin Gishu", description: "Premium dry red kidney beans, cleaned and graded. Perfect for githeri and stews." },
];

export const categories: { name: Category; emoji: string; blurb: string }[] = [
  { name: "Fruits", emoji: "🍌", blurb: "Tree-ripened" },
  { name: "Vegetables", emoji: "🥬", blurb: "Picked daily" },
  { name: "Grains", emoji: "🌾", blurb: "Farm-cleaned" },
  { name: "Dairy", emoji: "🥛", blurb: "Cold-chain fresh" },
  { name: "Poultry", emoji: "🥚", blurb: "Free-range" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatKES = (n: number) =>
  "KES " + n.toLocaleString("en-KE", { maximumFractionDigits: 0 });

export const finalPrice = (p: Product) =>
  p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
