"use client"
import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Plus, Minus, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const sections = [
  {
    title: "🛍️ Orders & Customisation",
    faqs: [
      { q: "How does the customisation process work?", a: "After placing your order, you can provide your photos, text, captions, messages, names, dates and other details. Our team will use them to create your personalised product. If we need any clarification or additional information, we'll contact you on WhatsApp." },
      { q: "What happens after I place my order?", a: "Once your order is confirmed, the PrintBloom team will contact you regarding the customisation details, usually through WhatsApp. You can then provide your photos, text and other requirements before designing begins." },
      { q: "Do I need to provide all my customisation details while placing the order?", a: "Not necessarily. You can provide the information available to you while ordering. If any details are missing, our team will contact you on WhatsApp to collect the remaining information." },
      { q: "Can I customise the magazine?", a: "Yes! You can customise your magazine with your own photos, messages, captions, paragraphs, quotes, names, dates, song details and other personal content." },
      { q: "How many photos do I need for a magazine?", a: "The number of photos depends on the number of pages and the design you choose. You can upload all the photos you want us to consider, and our team will arrange them appropriately. If we need specific or additional photos, we'll contact you." },
      { q: "Can I decide which photo goes on which page?", a: "Yes. If you want a specific photo on a specific page, simply mention the page number and the photo in your customisation details." },
      { q: "Can I send my own text for the magazine?", a: "Yes. You can provide your own messages, paragraphs, captions, quotes, song names, lyrics or other text. **Text is optional.** If you don't have your text ready while placing the order, our team can contact you on WhatsApp regarding the remaining customisation details." },
      { q: "Can I send Pinterest or other design references?", a: "Absolutely. You can share Pinterest links, screenshots or other design references with us. We'll use them as inspiration while creating your product, subject to the selected template and feasibility." },
      { q: "Can I request changes to the magazine template?", a: "Yes. You can request reasonable changes to the selected template. You can also tell us if you want a particular page or design from another PrintBloom template. We'll do our best to accommodate your request, subject to feasibility." },
      { q: "Will I see my design before it is printed?", a: "Yes. Wherever applicable, we'll share the final design with you for checking and approval before it goes for printing." },
      { q: "What should I check before approving my design?", a: "Please carefully check names, dates, spelling, messages, captions, photos and other personal details before giving your final approval. Once the design is approved, printing may begin." },
      { q: "What happens if my photos are low quality?", a: "If we notice that a photo may not print clearly, we'll contact you and ask for a better-quality version wherever possible before printing." },
      { q: "Can I order a product as a gift for someone else?", a: "Yes! You can provide the recipient's name and delivery address while placing the order. You can have your PrintBloom gift delivered directly to the person you want to surprise." }
    ]
  },
  {
    title: "📦 Shipping & Delivery",
    faqs: [
      { q: "How long does my order take?", a: "Designing and printing generally takes 2–3 working days. After dispatch, delivery usually takes 4–7 days, depending on your location and the courier service. Estimated total time: 6–10 days." },
      { q: "Do you deliver across India?", a: "Yes. PrintBloom currently delivers across India." },
      { q: "How much is shipping?", a: "Shipping charges are generally calculated separately from the product price. The shipping cost depends on factors such as your location, parcel size and weight, and the shipping service used." },
      { q: "Can the shipping charge change?", a: "Yes. The final shipping cost can sometimes vary depending on the actual weight and size of the parcel. In some cases, an additional ₹30–₹50 may be applicable. A shipping receipt can be shared with you for transparency and to confirm the actual shipping charge." },
      { q: "How can I track my order?", a: "Once your order is dispatched, tracking details will be shared with you wherever tracking is available. You can also check your order status through your PrintBloom account." },
      { q: "What happens if delivery is delayed?", a: "Delivery times are estimates and can sometimes be affected by courier delays, weather, public holidays, incorrect addresses, remote locations or other circumstances outside PrintBloom's control. We'll assist you with reasonable delivery-related issues wherever possible." }
    ]
  },
  {
    title: "↩️ Cancellation, Returns & Refunds",
    faqs: [
      { q: "Can I cancel my order?", a: "Cancellation depends on the stage of your order. Once designing, printing or production has started, cancellation may not be possible. If you need to request a cancellation, please contact us as soon as possible." },
      { q: "Can I return or exchange a personalised product?", a: "Because PrintBloom products are specially personalised and made for each customer, returns and exchanges are generally not accepted." },
      { q: "Can I get a refund?", a: "Personalised products are generally not eligible for refunds simply because you change your mind or no longer require the product. However, genuine issues such as receiving the wrong product or a significant printing/manufacturing defect may be reviewed individually." },
      { q: "What if my order arrives damaged?", a: "Please contact us as soon as possible after receiving your order and provide photos/videos of the damaged product and packaging. An unboxing video can also help us assess damage that may have occurred during delivery. We'll review the issue and provide an appropriate resolution where applicable." }
    ]
  },
  {
    title: "🎁 Rewards & Offers",
    faqs: [
      { q: "How do PrintBloom Rewards work?", a: "After your order is successfully completed, you receive PrintBloom Rewards, which can be used on a future order." },
      { q: "How does Refer & Earn work?", a: "Refer a new customer to PrintBloom and receive PrintBloom Rewards after their first qualifying order is successfully completed." },
      { q: "When will I receive my referral reward?", a: "The referral reward is credited after the referred customer's qualifying first order is successfully completed. Simply sharing or clicking a referral link does not generate the reward." },
      { q: "Can I use my rewards and a promo code together?", a: "Currently, only one applicable reward or promotional discount can be used per order. The exact terms may vary depending on the specific promotional offer." },
      { q: "Do my rewards expire?", a: "Currently, PrintBloom Rewards do not have an expiry date. We may update the rewards programme in the future if required." }
    ]
  },
  {
    title: "🤍 About Your PrintBloom Order",
    faqs: [
      { q: "Do you offer gift wrapping?", a: "Yes. PrintBloom orders are carefully packaged to make the experience feel special. Packaging may vary depending on the product." },
      { q: "Will my personal photos and messages be kept private?", a: "Yes. Customer photos, messages and other personal content are used primarily to create the customer's personalised order. PrintBloom will not intentionally use private customer content publicly for marketing without appropriate permission." },
      { q: "Can PrintBloom feature my order on Instagram or the website?", a: "We may ask for your permission to feature your product, review, unboxing, reaction or customer story on PrintBloom's social media or website. You can choose whether or not to give permission." },
      { q: "What payment methods do you accept?", a: "You can pay using the payment methods available at checkout on the PrintBloom website." },
      { q: "Do I need an account to place an order?", a: "You may create a PrintBloom account to place and manage your orders. Your account can also help you view your order information and available rewards." },
      { q: "How can I contact PrintBloom?", a: "Email: printbloom.in@gmail.com\nWhatsApp: +91 8691094045\nInstagram: @printbloom.in" }
    ]
  }
];

function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-[#E0D9CF] last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <h3 className="font-serif text-lg md:text-xl text-[#221F1C] pr-8 group-hover:text-black transition-colors">{question}</h3>
        <span className="flex-shrink-0 text-[#9A8F85] group-hover:text-black transition-colors">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-[#6B6259] leading-relaxed pb-6 pr-4 md:pr-12 whitespace-pre-line text-sm md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <main className="flex flex-col min-h-screen pt-36 pb-24 px-4 md:px-8 bg-[#F5F0E8]">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <SectionHeading as="h1" className="mb-4">Common Questions</SectionHeading>
          <p className="text-[#6B6259] text-lg">Everything you need to know about PrintBloom.</p>
        </div>
        
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-[#FBF6EE] p-6 md:p-10 rounded-2xl shadow-sm border border-[#E0D9CF]/40">
              <h2 className="font-serif text-2xl md:text-3xl text-[#221F1C] mb-6 md:mb-8">{section.title}</h2>
              <div className="flex flex-col">
                {section.faqs.map((faq, i) => (
                  <AccordionItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="mt-16 bg-[#2C2926] rounded-2xl p-8 md:p-12 text-center flex flex-col items-center">
          <h3 className="font-serif text-2xl md:text-3xl text-[#FBF6EE] mb-3">Still have a question?</h3>
          <p className="text-[#9A8F85] mb-8">We're happy to help.</p>
          <a 
            href="https://wa.me/918691094045" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-medium transition-colors"
          >
            <MessageCircle size={20} />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
