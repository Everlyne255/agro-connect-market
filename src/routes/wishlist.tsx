import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/lib/cart-store";
import { useProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => seoHead({
    title: "Your wishlist — AgroFresh Market",
    description: "Save your favourite Kenyan farm produce and reorder anytime from your AgroFresh wishlist.",
    path: "/wishlist",
    noindex: true,
  }),
});

function WishlistPage() {
  const ids = useWishlist();
  const { data: products = [] } = useProducts();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold">Your wishlist</h1>
      <p className="mt-2 text-muted-foreground">Save your favorites and come back anytime.</p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed p-16 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Nothing here yet — tap the heart on any product.</p>
          <Button asChild className="mt-6"><Link to="/products">Browse products</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
