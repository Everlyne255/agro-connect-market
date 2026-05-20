import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-farm.jpg";
import { Leaf, HandCoins, Users, Sprout } from "lucide-react";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => seoHead({
    title: "About Rhoda — Built for Kenyan farmers",
    description: "Rhoda connects Kenyan farmers and cooperatives directly to homes, restaurants and retailers. Fair prices, fresher food, traceable supply chains.",
    path: "/about",
  }),
});

function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={heroImg} alt="" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="container mx-auto px-4 py-24 sm:px-6">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="font-serif text-4xl font-semibold sm:text-5xl">A fairer food system for Kenya.</h1>
            <p className="mt-4 text-lg text-primary-foreground/90">
              We built Rhoda so smallholder farmers can sell straight to the people
              who eat their food — keeping more value on the farm and more freshness on your plate.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-semibold">Our story</h2>
          <p className="mt-4 leading-relaxed text-foreground/85">
            Founded in 2024 in Nairobi, Rhoda started as a WhatsApp group connecting
            five cooperatives in Kiambu and Nyeri to local restaurants. Today we work with
            over 200 farms across 12 counties.
          </p>
          <p className="mt-4 leading-relaxed text-foreground/85">
            Our mission is simple: pay farmers fairly, deliver food faster, and tell the
            story of every crate that arrives at your door.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { n: "200+", l: "Farms onboarded" },
            { n: "12", l: "Counties" },
            { n: "30%", l: "More farmer income" },
            { n: "<24h", l: "Farm-to-door" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-secondary/60 p-6">
              <div className="font-serif text-4xl font-semibold text-primary">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 sm:px-6">
        <h2 className="font-serif text-3xl font-semibold text-center">What we stand for</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            { icon: HandCoins, t: "Fair prices", d: "Farmers set their own prices and keep more of every shilling." },
            { icon: Sprout, t: "Real freshness", d: "Cold-chain logistics from harvest to handover." },
            { icon: Leaf, t: "Traceability", d: "Know which farm grew your food and how." },
            { icon: Users, t: "Community", d: "Cooperatives, women-led farms and youth growers." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border bg-card p-6 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-leaf text-primary-foreground">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-serif text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
