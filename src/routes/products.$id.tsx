import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { fetchProduct, formatKES, finalPrice, useProducts } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, Truck, ShieldCheck, Leaf, ArrowLeft, Heart } from "lucide-react";
import { cartActions, wishlistActions, useWishlist } from "@/lib/cart-store";
import { ProductCard } from "@/components/product-card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { seoHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/products/$id")({
  loader: async ({ params }) => {
    const p = await fetchProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return seoHead({ title: "Product — Rhoda", description: "Fresh produce from Kenyan farms.", path: `/products/${params.id}` });
    const base = seoHead({
      title: `${loaderData.name} — Rhoda`,
      description: loaderData.description.slice(0, 160),
      path: `/products/${params.id}`,
      image: loaderData.image,
      type: "product",
    });
    return {
      ...base,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: loaderData.name,
          image: loaderData.image,
          description: loaderData.description,
          brand: { "@type": "Brand", name: loaderData.farmer },
          aggregateRating: loaderData.reviews > 0 ? {
            "@type": "AggregateRating",
            ratingValue: loaderData.rating,
            reviewCount: loaderData.reviews,
          } : undefined,
          offers: {
            "@type": "Offer",
            price: finalPrice(loaderData),
            priceCurrency: "KES",
            availability: loaderData.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${SITE_URL}/products/${params.id}`,
          },
        }),
      }],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="font-serif text-3xl">Product not found</h1>
      <Button asChild className="mt-6"><Link to="/products">Back to shop</Link></Button>
    </div>
  ),
});

function ProductDetail() {
  const p = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const wish = useWishlist();
  const liked = wish.includes(p.id);
  const price = finalPrice(p);
  const { data: all = [] } = useProducts();
  const related = all.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border bg-secondary/40 shadow-soft">
          <img src={p.image} alt={p.name} width={800} height={800} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{p.category}</span>
            <span>·</span>
            <span>{p.county}</span>
          </div>
          <h1 className="mt-3 font-serif text-4xl font-semibold">{p.name}</h1>
          <p className="mt-1 text-muted-foreground">by {p.farmer}</p>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < Math.round(p.rating) && "fill-current")} />
              ))}
            </div>
            <span className="text-sm font-medium">{p.rating}</span>
            <span className="text-sm text-muted-foreground">({p.reviews} reviews)</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-serif text-4xl font-semibold">{formatKES(price)}</span>
            {p.discount ? (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatKES(p.price)}</span>
                <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">−{p.discount}%</span>
              </>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">{p.unit} · {p.stock} in stock</p>

          <p className="mt-6 leading-relaxed text-foreground/85">{p.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border bg-card">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center hover:text-primary"
                aria-label="Decrease"
              ><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(p.stock, q + 1))}
                className="grid h-11 w-11 place-items-center hover:text-primary"
                aria-label="Increase"
              ><Plus className="h-4 w-4" /></button>
            </div>

            <Button
              size="lg"
              onClick={() => { cartActions.add(p.id, qty); toast.success(`Added ${qty} × ${p.name}`); }}
            >Add to cart</Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => { cartActions.add(p.id, qty); navigate({ to: "/checkout" }); }}
            >Buy now</Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => wishlistActions.toggle(p.id)}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-5 w-5", liked && "fill-destructive text-destructive")} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 p-4 text-center">
              <Truck className="h-5 w-5 text-primary" />
              <span className="font-medium">Same-day in Nairobi</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 p-4 text-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-medium">Secure payment</span>
            </div>
            <div className="flex flex-col items-center gap-1 rounded-xl bg-secondary/60 p-4 text-center">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-medium">Farm-traceable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="font-serif text-2xl font-semibold">Customer reviews</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { n: "Aisha K.", r: 5, t: "Arrived super fresh, well-packed. Will order again." },
            { n: "James N.", r: 5, t: "Real farm taste. The kids actually finished the veggies!" },
            { n: "Beatrice W.", r: 4, t: "Great quality. Delivery was 30 minutes late but acceptable." },
            { n: "Peter O.", r: 5, t: "Better price than the market and saved me a trip." },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{r.n}</span>
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: r.r }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
              </div>
              <p className="mt-2 text-sm text-foreground/85">{r.t}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold">You might also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
