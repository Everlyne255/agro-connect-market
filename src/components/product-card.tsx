import { Link } from "@tanstack/react-router";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product, formatKES, finalPrice } from "@/lib/products";
import { cartActions, wishlistActions, useWishlist } from "@/lib/cart-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const wish = useWishlist();
  const liked = wish.includes(product.id);
  const price = finalPrice(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
      <Link to="/products/$id" params={{ id: product.id }} className="relative block aspect-square overflow-hidden bg-secondary/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
            −{product.discount}%
          </span>
        ) : null}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); wishlistActions.toggle(product.id); }}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:scale-110"
        >
          <Heart className={cn("h-4 w-4", liked ? "fill-destructive text-destructive" : "text-foreground/70")} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
          <span className="ml-auto">{product.county}</span>
        </div>
        <Link to="/products/$id" params={{ id: product.id }} className="font-serif text-lg leading-tight hover:text-primary">
          {product.name}
        </Link>
        <p className="text-xs text-muted-foreground">by {product.farmer}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="text-lg font-semibold">{formatKES(price)}</div>
            {product.discount ? (
              <div className="text-xs text-muted-foreground line-through">{formatKES(product.price)}</div>
            ) : null}
            <div className="text-xs text-muted-foreground">{product.unit}</div>
          </div>
          <Button
            size="sm"
            onClick={() => { cartActions.add(product.id); toast.success(`${product.name} added to cart`); }}
          >
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
