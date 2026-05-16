import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Create account — AgroFresh Market" }] }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"buyer" | "farmer">("buyer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName, phone, role },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Confirmation email sent to ${email}. Click the link to activate your account.`, { duration: 8000 });
    setSubmitted(true);
  };

  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="container mx-auto grid min-h-[80vh] place-items-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-card">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-leaf text-primary-foreground"><Leaf className="h-6 w-6" /></span>
          <h1 className="mt-6 font-serif text-2xl font-semibold">Confirm your email</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We sent a confirmation link to <span className="font-medium text-foreground">{email}</span>.
            Click it to activate your account, then sign in.
          </p>
          <Link to="/login" className="mt-6 inline-block font-semibold text-primary hover:underline">Back to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto grid min-h-[80vh] place-items-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-card">
        <Link to="/" className="flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-leaf text-primary-foreground"><Leaf className="h-5 w-5" /></span>
          <span className="font-serif text-xl font-semibold">AgroFresh Market</span>
        </Link>

        <h1 className="mt-6 text-center font-serif text-3xl font-semibold">Create your account</h1>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-1.5"><Label>Full name</Label><Input required value={fullName} onChange={(e) => setFullName(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Email</Label><Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="space-y-1.5"><Label>Phone</Label><Input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254…" /></div>
          <div className="space-y-1.5"><Label>Password</Label><Input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>

          <div className="space-y-2">
            <Label>I want to…</Label>
            <RadioGroup value={role} onValueChange={(v) => setRole(v as "buyer" | "farmer")} className="grid grid-cols-2 gap-2">
              <label htmlFor="buyer" className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 ${role === "buyer" ? "border-primary bg-primary/5" : ""}`}>
                <RadioGroupItem id="buyer" value="buyer" /> Buy produce
              </label>
              <label htmlFor="farmer" className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 ${role === "farmer" ? "border-primary bg-primary/5" : ""}`}>
                <RadioGroupItem id="farmer" value="farmer" /> Sell as a farmer
              </label>
            </RadioGroup>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
