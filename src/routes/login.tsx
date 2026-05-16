import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — AgroFresh Market" }] }),
});

function LoginPage() {
  return (
    <div className="container mx-auto grid min-h-[80vh] place-items-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-card">
        <Link to="/" className="flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-leaf text-primary-foreground"><Leaf className="h-5 w-5" /></span>
          <span className="font-serif text-xl font-semibold">AgroFresh Market</span>
        </Link>

        <h1 className="mt-6 text-center font-serif text-3xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to track orders and save favorites.</p>

        <form
          onSubmit={(e) => { e.preventDefault(); toast.info("Real auth ships in Phase 2 with Lovable Cloud."); }}
          className="mt-8 space-y-4"
        >
          <div className="space-y-1.5"><Label>Email or phone</Label><Input required defaultValue="" placeholder="you@example.com" /></div>
          <div className="space-y-1.5">
            <div className="flex justify-between"><Label>Password</Label><Link to="/login" className="text-xs text-primary hover:underline">Forgot?</Link></div>
            <Input required type="password" placeholder="••••••••" />
          </div>
          <Button type="submit" size="lg" className="w-full">Sign in</Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>
        <Button variant="outline" size="lg" className="w-full">Continue with Google</Button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to AgroFresh? <Link to="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
