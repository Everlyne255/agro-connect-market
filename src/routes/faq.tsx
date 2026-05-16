import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "Where do you deliver?", a: "We currently deliver across Nairobi, Kiambu, Machakos and Kajiado within 24 hours. Other counties ship in 2–3 days via SGR cold cargo." },
  { q: "How fresh is the produce?", a: "Most items are harvested the same morning your order is packed. Dairy and poultry move through cold chain end-to-end." },
  { q: "What payment methods do you accept?", a: "M-Pesa, Airtel Money, Visa & Mastercard, plus Cash on Delivery for orders under KES 5,000." },
  { q: "Is there a minimum order?", a: "No minimum. Free delivery on orders above KES 2,000 — a KES 200 fee applies below that." },
  { q: "Can I return or refund?", a: "If anything arrives damaged or below standard, we'll refund or replace within 24 hours. Just message support with a photo." },
  { q: "How can I sell on AgroFresh?", a: "Apply through our Farmer Dashboard. We verify your farm, list your products, and pay out weekly via M-Pesa." },
  { q: "Do you offer bulk / wholesale pricing?", a: "Yes. Restaurants, schools and retailers get tiered pricing — contact our team for a quote." },
];

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ — AgroFresh Market" },
      { name: "description", content: "Answers to common questions about delivery, payments, freshness and selling on AgroFresh Market." },
    ],
  }),
});

function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-4xl font-semibold text-center">Frequently asked questions</h1>
        <p className="mt-3 text-center text-muted-foreground">Everything you need to know — from delivery to selling.</p>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border bg-card px-5 shadow-soft">
              <AccordionTrigger className="text-left font-serif text-lg hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-foreground/85">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
