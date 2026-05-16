import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, cartTotals, cartActions } from "@/lib/cart-store";
import { formatKES } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Smartphone, CreditCard, Banknote, Truck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => seoHead({
    title: "Checkout — AgroFresh Market",
    description: "Pay securely for your fresh produce order with M-Pesa, Airtel Money, card or cash on delivery.",
    path: "/checkout",
    noindex: true,
  }),
});

const METHODS = [
  { id: "mpesa", label: "M-Pesa", desc: "STK push to your phone", icon: Smartphone },
  { id: "airtel", label: "Airtel Money", desc: "Mobile wallet payment", icon: Smartphone },
  { id: "card", label: "Card", desc: "Visa, Mastercard", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", desc: "Pay the rider on arrival", icon: Banknote },
] as const;

function CheckoutPage() {
  const cart = useCart();
  const { rows, subtotal, delivery, total } = cartTotals(cart);
  const [method, setMethod] = useState<string>("mpesa");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  if (done) {
    const ref = "AF-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    return (
      <div className="container mx-auto px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-4 font-serif text-4xl font-semibold">Order placed!</h1>
        <p className="mt-3 text-muted-foreground">Reference <span className="font-mono font-semibold text-foreground">{ref}</span></p>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          We've sent a confirmation to your phone. Your farmer will prepare the order and you'll receive delivery updates.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild><Link to="/products">Keep shopping</Link></Button>
          <Button asChild variant="outline"><Link to="/">Go home</Link></Button>
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center sm:px-6">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <Button asChild className="mt-6"><Link to="/products">Browse products</Link></Button>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Processing payment…");
    setTimeout(() => {
      cartActions.clear();
      setDone(true);
    }, 1100);
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold">Checkout</h1>
      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Delivery details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label htmlFor="co-name">Full name</Label><Input id="co-name" required defaultValue="Jane Wanjiku" /></div>
              <div className="space-y-1.5"><Label htmlFor="co-phone">Phone (M-Pesa)</Label><Input id="co-phone" required type="tel" defaultValue="+254 7XX XXX XXX" /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="co-email">Email</Label><Input id="co-email" type="email" defaultValue="jane@example.com" /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="co-address">Delivery address</Label><Input id="co-address" required defaultValue="14 Riverside Drive, Westlands" /></div>
              <div className="space-y-1.5"><Label htmlFor="co-city">City / Town</Label><Input id="co-city" required defaultValue="Nairobi" /></div>
              <div className="space-y-1.5"><Label htmlFor="co-county">County</Label><Input id="co-county" required defaultValue="Nairobi" /></div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="font-serif text-xl font-semibold">Payment method</h2>
            <RadioGroup value={method} onValueChange={setMethod} className="mt-5 grid gap-3 sm:grid-cols-2">
              {METHODS.map((m) => (
                <label
                  key={m.id}
                  htmlFor={m.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition",
                    method === m.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "hover:border-primary/50",
                  )}
                >
                  <RadioGroupItem id={m.id} value={m.id} />
                  <m.icon className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{m.label}</div>
                    <div className="text-xs text-muted-foreground">{m.desc}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {rows.map(({ product, qty, lineTotal }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="line-clamp-1">{qty} × {product.name}</span>
                <span className="shrink-0 font-medium">{formatKES(lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 border-t" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatKES(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{delivery === 0 ? "Free" : formatKES(delivery)}</dd></div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t"><dt>Total</dt><dd>{formatKES(total)}</dd></div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 w-full">
            Pay {formatKES(total)}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Secure checkout · Encrypted payment</p>
        </aside>
      </form>
    </div>
  );
}
