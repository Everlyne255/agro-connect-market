import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, Search, Menu, Leaf, Heart, User, LogOut } from "lucide-react";
import { useCart, cartTotals } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle,
} from "@/components/ui/sheet";
import { useAuth, signOut } from "@/hooks/use-auth";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const cart = useCart();
  const { count } = cartTotals(cart);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q, cat: undefined } as never });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-leaf text-primary-foreground shadow-soft">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight">
            AgroFresh <span className="text-primary">Market</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden flex-1 max-w-md md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tomatoes, sukuma, eggs…"
              className="pl-9 rounded-full bg-secondary/60 border-transparent focus-visible:bg-background"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link to="/wishlist"><Heart className="h-5 w-5" /></Link>
          </Button>
          <UserMenu />
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-serif text-lg">Menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    {n.label}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4">
                  <Link to="/farmer" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-secondary block">
                    Farmer Dashboard
                  </Link>
                  <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-secondary block">
                    Admin Dashboard
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-secondary/40">
      <div className="container mx-auto grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-leaf text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-serif text-lg font-semibold">AgroFresh Market</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Connecting Kenyan farmers directly to your kitchen. Fresh, fair, traceable.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-primary">All products</Link></li>
            <li><Link to="/products" className="hover:text-primary">Fruits</Link></li>
            <li><Link to="/products" className="hover:text-primary">Vegetables</Link></li>
            <li><Link to="/products" className="hover:text-primary">Dairy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/farmer" className="hover:text-primary">Sell with us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Newsletter</h4>
          <p className="mt-3 text-sm text-muted-foreground">Weekly harvest updates and offers.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="you@example.com" className="bg-background" />
            <Button type="submit">Join</Button>
          </form>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="hover:text-primary">FB</a>
            <a href="#" aria-label="Instagram" className="hover:text-primary">IG</a>
            <a href="#" aria-label="Twitter" className="hover:text-primary">TW</a>
            <a href="#" aria-label="WhatsApp" className="hover:text-primary">WA</a>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} AgroFresh Market. All rights reserved.</span>
          <span>Made in Kenya 🇰🇪 · Pay with M-Pesa, Airtel Money, Card, or COD</span>
        </div>
      </div>
    </footer>
  );
}
