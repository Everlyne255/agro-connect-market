import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, cartTotals, cartActions } from "@/lib/cart-store";
import { formatKES } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => seoHead({
    title: "Your cart — AgroFresh Market",
    description: "Review the fresh produce in your AgroFresh cart, adjust quantities, and continue to secure M-Pesa checkout.",
    path: "/cart",
    noindex: true,
  }),
});

function CartPage() {
  const cart = useCart();
  const { rows, subtotal, delivery, total } = cartTotals(cart);

  if (rows.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center sm:px-6">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 font-serif text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Start browsing fresh produce from Kenyan farms.</p>
        <Button asChild size="lg" className="mt-6"><Link to="/products">Shop now</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold">Your cart</h1>
      <p className="mt-2 text-muted-foreground">{rows.length} items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {rows.map(({ product, qty, lineTotal }) => (
            <li key={product.id} className="flex gap-4 rounded-2xl border bg-card p-4 shadow-soft">
              <Link to="/products/$id" params={{ id: product.id }} className="shrink-0">
                <img src={product.image} alt={product.name} width={120} height={120} loading="lazy" className="h-24 w-24 rounded-xl object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link to="/products/$id" params={{ id: product.id }} className="font-serif text-lg hover:text-primary">{product.name}</Link>
                <p className="text-xs text-muted-foreground">{product.unit} · {product.farmer}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="inline-flex items-center rounded-full border bg-background">
                    <button onClick={() => cartActions.setQty(product.id, qty - 1)} className="grid h-9 w-9 place-items-center hover:text-primary"><Minus className="h-4 w-4" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                    <button onClick={() => cartActions.setQty(product.id, qty + 1)} className="grid h-9 w-9 place-items-center hover:text-primary"><Plus className="h-4 w-4" /></button>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatKES(lineTotal)}</div>
                    <button onClick={() => cartActions.remove(product.id)} className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatKES(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd>{delivery === 0 ? "Free" : formatKES(delivery)}</dd></div>
            {delivery > 0 && (
              <p className="text-xs text-muted-foreground">Spend {formatKES(2000 - subtotal)} more for free delivery</p>
            )}
            <div className="my-3 border-t" />
            <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{formatKES(total)}</dd></div>
          </dl>
          <Button asChild size="lg" className="mt-6 w-full"><Link to="/checkout">Proceed to checkout</Link></Button>
          <Button asChild variant="ghost" className="mt-2 w-full"><Link to="/products">Continue shopping</Link></Button>
        </aside>
      </div>
    </div>
  );
}
