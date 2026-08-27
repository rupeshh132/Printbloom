import { HeroSection } from "@/components/marketing/hero-section"
import { SignatureProductSection } from "@/components/marketing/signature-product-section"
import { MemoryTransformationSection } from "@/components/marketing/memory-transformation-section"
import { ShopByOccasionSection } from "@/components/marketing/shop-by-occasion-section"
import { BloomJournalSection } from "@/components/marketing/bloom-journal-section"
import { CustomerReactionsSection } from "@/components/marketing/customer-reactions-section"
import { ReviewsSection } from "@/components/marketing/reviews-section"
import { BehindTheScenesSection } from "@/components/marketing/behind-the-scenes-section"
import { WhyPrintBloomSection } from "@/components/marketing/why-printbloom-section"
import { FinalCTASection } from "@/components/marketing/final-cta-section"

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroSection />
      <SignatureProductSection />
      <MemoryTransformationSection />
      <ShopByOccasionSection />
      <BloomJournalSection />
      <CustomerReactionsSection />
      <ReviewsSection />
      <BehindTheScenesSection />
      <WhyPrintBloomSection />
      <FinalCTASection />
    </main>
  )
}