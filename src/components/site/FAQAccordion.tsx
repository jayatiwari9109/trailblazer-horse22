import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export function FAQAccordion({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-3xl">
      {items.map((f, i) => (
        <AccordionItem key={i} value={`i-${i}`} className="mb-3 overflow-hidden rounded-2xl border border-border/60 bg-card px-5 shadow-elegant">
          <AccordionTrigger className="text-left font-display text-base font-semibold text-forest hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
