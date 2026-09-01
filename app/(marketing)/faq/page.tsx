import { SectionHeading } from "@/components/ui/section-heading"

const faqs = [
  {
    question: "How long does it take to receive my order?",
    answer: "Once you place your order and submit your photos, it takes us 2-3 working days to design and print your customized product. Dispatch happens immediately after, and delivery typically takes another 3-5 working days depending on your location."
  },
  {
    question: "How many photos do I need for a custom magazine?",
    answer: "For our A5 custom magazines, we recommend uploading 20-30 high-quality photos. For the A4 size, 30-45 photos work best to fill the pages beautifully without making it look crowded."
  },
  {
    question: "Can I see a preview before it gets printed?",
    answer: "Our design team carefully curates and arranges your photos. If you've requested any special customizations or added specific text/quotes, we'll ensure everything aligns perfectly with our premium templates before sending it to press."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship across India. We are working hard to bring PrintBloom to international customers very soon!"
  },
  {
    question: "What happens if my photos are low quality?",
    answer: "If any of the photos you upload are too low in resolution and might look blurry when printed, our team will reach out to you via WhatsApp or Email to ask for better quality replacements before we begin printing."
  },
  {
    question: "What is your return/refund policy?",
    answer: "Since every PrintBloom product is 100% personalized and custom-made using your own photos, we cannot accept returns or offer refunds once the printing process has started. However, if your order arrives damaged, please contact us within 24 hours of delivery with photos, and we will arrange a replacement."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is dispatched, you will receive an SMS and Email with your tracking link. You can also log into your PrintBloom account and view the real-time status of your order in the 'My Orders' section."
  }
]

export default function FAQPage() {
  return (
    <main className="flex flex-col min-h-screen pt-36 pb-24 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading as="h1" className="text-center mb-16">Common Questions</SectionHeading>
        <div className="space-y-8 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-[#E0D9CF] pb-6 last:border-0">
              <h3 className="font-serif text-xl text-[#221F1C] mb-3">{faq.question}</h3>
              <p className="text-[#6B6259] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
