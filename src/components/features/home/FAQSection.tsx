import { useFAQ } from "@/hooks/use-content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FAQSection() {
  const { data: faqs } = useFAQ();
  // Slice to show only first 4 on home page
  const featuredFaqs = faqs?.slice(0, 4) || [];

  return (
    <section className="py-24 container px-6 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Text & CTA */}
        <div className="lg:col-span-5">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
            Everything you need to know.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Can't find the answer you're looking for? Reach out to our support
            team directly.
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>

        {/* Right: Accordion */}
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {featuredFaqs.map((faq: any) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left font-heading font-semibold text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
