import { Hero } from "@repo/ui/hero";
import { Features } from "@repo/ui/features";
import { Testimonial } from "@repo/ui/testimonial";
import { CTA } from "@repo/ui/cta";

export default function Page() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <Testimonial />
      <CTA />
    </div>
  );
}