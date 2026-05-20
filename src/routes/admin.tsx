import { createFileRoute } from "@tanstack/react-router";
import { Users, Tractor, Package, DollarSign, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  head: () => seoHead({
    title: "Admin dashboard — Rhoda",
    description: "Platform admin console for monitoring users, farmers, orders and approvals on Rhoda.",
    path: "/admin",
    noindex: true,
  }),
});

const STATS = [
  { icon: DollarSign, label: "GMV (30d)", value: "KES 4.2M", trend: "+18%" },
  { icon: Users, label: "Active users", value: "1,284", trend: "+9%" },
  { icon: Tractor, label: "Farmers", value: "214", trend: "+12" },
  { icon: Package, label: "Orders (30d)", value: "1,837", trend: "+22%" },
];

const PENDING = [
  { name: "Wairimu Wanjiru", farm: "Wairimu Greens", county: "Kiambu", crops: "Sukuma, Spinach" },
  { name: "Joseph Kiprop", farm: "Eldoret Dairy Co-op", county: "Uasin Gishu", crops: "Milk, Yogurt" },
  { name: "Faith Achieng'", farm: "Lakeside Tilapia", county: "Kisumu", crops: "Fish, Eggs" },
];

const ORDERS = [
  { id: "AF-9101", buyer: "Sarit Centre Hotel", farmer: "Murang'a Orchards", total: 18400, status: "In transit" },
  { id: "AF-9099", buyer: "Jane W.", farmer: "Highland Dairy", total: 540, status: "Delivered" },
  { id: "AF-9095", buyer: "Achieng' O.", farmer: "Eldoret Pulses", total: 3600, status: "Packed" },
];

function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <h1 className="font-serif text-4xl font-semibold">Admin dashboard</h1>
      <p className="mt-1 text-muted-foreground">Platform health, users, farmers and orders.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-leaf text-primary-foreground"><s.icon className="h-5 w-5" /></span>
              <span className="text-xs font-semibold text-primary">{s.trend}</span>
            </div>
            <div className="mt-4 font-serif text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">Farmer approvals</h2>
          <p className="text-sm text-muted-foreground">3 pending applications</p>
          <ul className="mt-4 space-y-3">
            {PENDING.map((p) => (
              <li key={p.name} className="rounded-xl border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.farm} · {p.county}</div>
                    <div className="mt-1 text-xs">Sells: {p.crops}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Approved ${p.name}`)}><CheckCircle2 className="h-4 w-4" /> Approve</Button>
                    <Button size="sm" variant="ghost" onClick={() => toast(`Rejected ${p.name}`)}><XCircle className="h-4 w-4" /></Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border bg-card p-6 shadow-soft">
          <h2 className="font-serif text-xl font-semibold">Recent orders</h2>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
          <ul className="mt-4 space-y-3">
            {ORDERS.map((o) => (
              <li key={o.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                  <span className="text-sm font-semibold">KES {o.total.toLocaleString()}</span>
                </div>
                <div className="mt-1 text-sm"><span className="font-semibold">{o.buyer}</span> ← {o.farmer}</div>
                <div className="mt-1 text-xs text-muted-foreground">{o.status}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
