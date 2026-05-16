import { createFileRoute } from "@tanstack/react-router";
import { products, formatKES } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Package, TrendingUp, ShoppingBag, DollarSign } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/farmer")({
  component: FarmerDashboard,
  head: () => ({ meta: [{ title: "Farmer Dashboard — AgroFresh Market" }] }),
});

const STATS = [
  { icon: DollarSign, label: "Revenue (30d)", value: "KES 184,200", trend: "+12%" },
  { icon: ShoppingBag, label: "Orders", value: "63", trend: "+8%" },
  { icon: Package, label: "Active listings", value: "8", trend: "—" },
  { icon: TrendingUp, label: "Avg. rating", value: "4.8", trend: "+0.1" },
];

const ORDERS = [
  { id: "AF-9023", customer: "Jane W.", items: "Tomatoes ×3, Sukuma ×5", total: 560, status: "Packed" },
  { id: "AF-9019", customer: "Hotel Acacia", items: "Avocado ×20kg", total: 4400, status: "Delivered" },
  { id: "AF-9011", customer: "Beatrice O.", items: "Eggs ×2 trays", total: 960, status: "In transit" },
  { id: "AF-9007", customer: "Peter N.", items: "Milk ×6L", total: 540, status: "Delivered" },
];

function FarmerDashboard() {
  const my = products.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-semibold">Farmer dashboard</h1>
          <p className="mt-1 text-muted-foreground">Mwangi Family Farm · Kiambu</p>
        </div>
        <Button size="lg" onClick={() => toast.info("Product editor ships in Phase 3")}>
          <Plus className="h-4 w-4" /> Add product
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-leaf text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-primary">{s.trend}</span>
            </div>
            <div className="mt-4 font-serif text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">My products</h2>
          <ul className="mt-4 divide-y">
            {my.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-4">
                <img src={p.image} alt={p.name} width={64} height={64} loading="lazy" className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{formatKES(p.price)} · {p.unit}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="number" defaultValue={p.stock} className="h-9 w-20" />
                  <span className="text-xs text-muted-foreground">in stock</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toast.info("Edit coming in Phase 3")}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => toast.info("Delete coming in Phase 3")}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">Recent orders</h2>
          <ul className="mt-4 space-y-3">
            {ORDERS.map((o) => (
              <li key={o.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    o.status === "Delivered" ? "bg-primary/10 text-primary"
                    : o.status === "Packed" ? "bg-accent/20 text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                  }`}>{o.status}</span>
                </div>
                <div className="mt-1 font-semibold">{o.customer}</div>
                <div className="text-xs text-muted-foreground">{o.items}</div>
                <div className="mt-2 text-sm font-semibold">{formatKES(o.total)}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
