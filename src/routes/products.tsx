import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useProducts, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { seoHead } from "@/lib/seo";

type Search = { q?: string; cat?: Category };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    cat: typeof s.cat === "string" ? (s.cat as Category) : undefined,
  }),
  component: ProductsPage,
  head: () => seoHead({
    title: "Shop fresh produce — AgroFresh Market",
    description: "Browse fresh fruits, vegetables, grains, dairy and poultry from Kenyan farms. Filter by category and price, with same-day Nairobi delivery.",
    path: "/products",
  }),
});

function ProductsPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<Category | undefined>(search.cat);
  const [price, setPrice] = useState<[number]>([500]);
  const { data: products = [] } = useProducts();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (q && !`${p.name} ${p.farmer} ${p.county}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (p.price > price[0] * 4) return false; // rough max
      return true;
    });
  }, [q, cat, price]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-semibold">Shop the harvest</h1>
        <p className="text-muted-foreground">{filtered.length} products from farms across Kenya</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </h2>

            <div className="mt-4">
              <label htmlFor="product-search" className="text-xs font-medium text-muted-foreground">Search</label>
              <div className="relative mt-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="product-search" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" placeholder="Search…" />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCat(undefined)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs",
                    !cat ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary",
                  )}
                >All</button>
                {categories.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setCat(cat === c.name ? undefined : c.name)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs",
                      cat === c.name ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary",
                    )}
                  >{c.emoji} {c.name}</button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label className="text-xs font-medium text-muted-foreground">Max price (KES {price[0] * 4})</label>
              <Slider value={price} onValueChange={(v) => setPrice([v[0]])} min={25} max={250} step={5} className="mt-3" />
            </div>

            <Button variant="outline" size="sm" className="mt-5 w-full" onClick={() => { setQ(""); setCat(undefined); setPrice([500]); }}>
              Reset
            </Button>
          </div>
        </aside>

        {/* Grid */}
        <div>
          {(q || cat) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {q && <Badge variant="secondary">"{q}" <button aria-label={`Clear search ${q}`} className="ml-1" onClick={() => setQ("")}>×</button></Badge>}
              {cat && <Badge variant="secondary">{cat} <button aria-label={`Clear category ${cat}`} className="ml-1" onClick={() => setCat(undefined)}>×</button></Badge>}
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-12 text-center">
              <p className="text-muted-foreground">No products match your filters.</p>
              <Button variant="link" asChild><Link to="/products">Clear filters</Link></Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
