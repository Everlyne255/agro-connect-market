import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Create account — AgroFresh Market" }] }),
});

function RegisterPage() {
  const [role, setRole] = useState("buyer");

  return (
    <div className="container mx-auto grid min-h-[80vh] place-items-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-card">
        <Link to="/" className="flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-leaf text-primary-foreground"><Leaf className="h-5 w-5" /></span>
          <span className="font-serif text-xl font-semibold">AgroFresh Market</span>
        </Link>

        <h1 className="mt-6 text-center font-serif text-3xl font-semibold">Create your account</h1>

        <form
          onSubmit={(e) => { e.preventDefault(); toast.info("Real signup ships in Phase 2 with Lovable Cloud."); }}
          className="mt-8 space-y-4"
        >
          <div className="space-y-1.5"><Label>Full name</Label><Input required /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input required type="email" /></div>
          <div className="space-y-1.5"><Label>Phone</Label><Input required type="tel" placeholder="+254…" /></div>
          <div className="space-y-1.5"><Label>Password</Label><Input required type="password" /></div>

          <div className="space-y-2">
            <Label>I want to…</Label>
            <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-2">
              <label htmlFor="buyer" className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 ${role === "buyer" ? "border-primary bg-primary/5" : ""}`}>
                <RadioGroupItem id="buyer" value="buyer" /> Buy produce
              </label>
              <label htmlFor="farmer" className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 ${role === "farmer" ? "border-primary bg-primary/5" : ""}`}>
                <RadioGroupItem id="farmer" value="farmer" /> Sell as a farmer
              </label>
            </RadioGroup>
          </div>

          <Button type="submit" size="lg" className="w-full">Create account</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
