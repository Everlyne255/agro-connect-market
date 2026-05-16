import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Truck, Leaf, ShieldCheck, ArrowRight, Sprout, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import heroImg from "@/assets/hero-farm.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, useProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AgroFresh Market — Fresh from Kenyan farms to your kitchen" },
      { name: "description", content: "Shop fresh fruits, vegetables, grains, dairy and poultry directly from Kenyan farmers. Pay with M-Pesa or card. Same-day delivery." },
    ],
  }),
});

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Crates of fresh Kenyan farm produce at golden hour"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="container mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-2xl text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sprout className="h-3.5 w-3.5" /> Harvested this morning
            </span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Real food, from real Kenyan farms.
            </h1>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/90 sm:text-lg">
              AgroFresh Market connects farmers and cooperatives directly to homes,
              restaurants and retailers — no middlemen, fairer prices, fresher food.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); navigate({ to: "/products", search: { q, cat: undefined } as never }); }}
              className="mt-8 flex max-w-lg gap-2 rounded-full bg-background p-2 shadow-card"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="What are you cooking today?"
                  className="h-11 border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
                />
              </div>
              <Button type="submit" size="lg" className="rounded-full">Search</Button>
            </form>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-primary-foreground/90">
              <span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Same-day delivery in Nairobi</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> M-Pesa secure</span>
              <span className="flex items-center gap-2"><Leaf className="h-4 w-4" /> Traceable to the farm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-semibold">Shop by category</h2>
            <p className="mt-2 text-muted-foreground">Five categories, hundreds of farms.</p>
          </div>
          <Link to="/products" className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex sm:items-center sm:gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/products"
              search={{ cat: c.name, q: undefined } as never}
              className="group rounded-2xl border bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-leaf text-2xl">
                <span>{c.emoji}</span>
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold group-hover:text-primary">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container mx-auto px-4 py-8 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold">This week's picks</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">See all</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20 sm:px-6">
        <div className="rounded-3xl bg-secondary/60 p-8 sm:p-12">
          <h2 className="font-serif text-3xl font-semibold text-center">How AgroFresh works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { n: "01", t: "Browse the harvest", d: "Discover what's freshly picked from farms across Kenya." },
              { n: "02", t: "Order and pay safely", d: "Checkout with M-Pesa, Airtel Money, card or cash on delivery." },
              { n: "03", t: "Delivered to your door", d: "Cold-chain logistics get produce to you within 24 hours." },
            ].map((s) => (
              <div key={s.n} className="relative rounded-2xl bg-background p-6 shadow-soft">
                <span className="font-serif text-4xl font-semibold text-primary/30">{s.n}</span>
                <h3 className="mt-2 font-serif text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-12 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-center">Loved by chefs &amp; families</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { name: "Wanjiku M.", role: "Home cook, Nairobi", q: "The sukuma stays fresh for days. I've stopped going to the market." },
            { name: "Chef Kamau", role: "Hotel kitchen, Naivasha", q: "Traceability matters to us. AgroFresh tells me exactly which farm each crate came from." },
            { name: "Achieng' O.", role: "Wholesaler, Kisumu", q: "Bulk pricing and reliable supply. My customers notice the difference." },
          ].map((t) => (
            <figure key={t.name} className="rounded-2xl border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-3 font-serif text-lg leading-snug">"{t.q}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 pb-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-leaf p-8 text-primary-foreground sm:p-12">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-semibold">Get the weekly harvest</h2>
              <p className="mt-2 text-primary-foreground/90">
                What's in season, fresh deals and farmer stories — every Friday.
              </p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="you@example.com" className="h-12 bg-background text-foreground" />
              <Button type="submit" variant="secondary" size="lg">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
