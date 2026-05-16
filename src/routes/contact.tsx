import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => {
    const base = seoHead({
      title: "Contact AgroFresh Market — Nairobi support",
      description: "Get in touch with AgroFresh Market. Call, email or chat with our Nairobi team about orders, farming or wholesale supply.",
      path: "/contact",
    });
    return {
      ...base,
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "AgroFresh Market",
          email: "hello@agrofreshmarket.co.ke",
          telephone: "+254-700-123-456",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Riverside Drive, Westlands",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
        }),
      }],
    };
  },
});

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Let's talk</h1>
        <p className="mt-3 text-muted-foreground">
          Questions about an order, farming with us, or wholesale supply — we're here.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll reply within 24 hours."); (e.target as HTMLFormElement).reset(); }}
          className="rounded-2xl border bg-card p-6 shadow-soft sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5"><Label>Name</Label><Input required /></div>
            <div className="space-y-1.5"><Label>Phone</Label><Input type="tel" /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Email</Label><Input required type="email" /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Subject</Label><Input required /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Message</Label><Textarea required rows={5} /></div>
          </div>
          <Button type="submit" size="lg" className="mt-6">Send message</Button>
        </form>

        <aside className="space-y-4">
          {[
            { icon: MapPin, t: "Visit us", d: "Riverside Drive, Westlands, Nairobi" },
            { icon: Phone, t: "Call", d: "+254 700 123 456" },
            { icon: Mail, t: "Email", d: "hello@agrofreshmarket.co.ke" },
            { icon: MessageCircle, t: "WhatsApp", d: "Chat with support, 7am – 9pm daily" },
          ].map((c) => (
            <div key={c.t} className="flex gap-4 rounded-2xl border bg-card p-5 shadow-soft">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-leaf text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
