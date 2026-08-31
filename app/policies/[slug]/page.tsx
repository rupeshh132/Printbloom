import * as React from "react"
import { notFound } from "next/navigation"
import { SectionHeading } from "@/components/ui/section-heading"

const policies: Record<string, { title: string; content: React.ReactNode }> = {
  shipping: {
    title: "Shipping & Delivery Policy",
    content: (
      <div className="space-y-6 text-[#6D635B] leading-relaxed">
        <p><strong>Delivery Location:</strong> PAN INDIA</p>
        <p><strong>Delivery Charges:</strong> Delivery charges are calculated according to the customer's location at checkout.</p>
        <p><strong>Estimated Processing Time:</strong> Designing + Printing takes 2–3 working days.</p>
        <p><strong>Estimated Delivery Time:</strong> 4–8 days depending on the customer's location.</p>
        <p><strong>Total Estimated Delivery Time:</strong> Approximately 6–10 days from order confirmation, depending on the order and location.</p>
        <div className="bg-[#DFBC94]/10 border-l-4 border-[#DFBC94] p-4 mt-6">
          <p className="text-[#2C2926] font-medium">Important:</p>
          <p className="mt-1">Delivery timelines are estimates and may vary depending on the courier/postal service, location, weekends, holidays or unforeseen delays.</p>
        </div>
        <h3 className="font-serif text-xl text-[#2C2926] mt-8 mb-4">Packaging & Tracking</h3>
        <p><strong>Packaging:</strong> Orders are carefully packed using protective plastic covering, cardboard protection and secure outer packaging to reduce the risk of bending or damage during shipping.</p>
        <p><strong>Tracking:</strong> Tracking Details will be provided after the package is shipped.</p>
      </div>
    )
  },
  cancellation: {
    title: "Cancellation Policy",
    content: (
      <div className="space-y-6 text-[#6D635B] leading-relaxed">
        <p>Orders may be cancelled <strong>only before designing begins</strong>. Once designing or production has started, cancellation is not possible because the product is personalized and work/materials have already been used.</p>
        <p>To request a cancellation, please contact us immediately via Instagram DM or WhatsApp.</p>
      </div>
    )
  },
  refund: {
    title: "Refund Policy",
    content: (
      <div className="space-y-6 text-[#6D635B] leading-relaxed">
        <p>Because PrintBloom creates fully personalized memory gifts, products are <strong>not eligible for returns or refunds</strong> simply because the customer changes their mind.</p>
        <h3 className="font-serif text-xl text-[#2C2926] mt-8 mb-4">Damaged or Incorrect Orders</h3>
        <ol className="list-decimal pl-5 space-y-3">
          <li>Customer should contact PrintBloom as soon as possible after receiving the package.</li>
          <li>Customer must provide clear photos and videos of the product and packaging.</li>
          <li>PrintBloom will review the issue.</li>
          <li>If the issue is determined to be a manufacturing or packaging fault by PrintBloom, an appropriate solution (replacement or refund) will be provided.</li>
        </ol>
      </div>
    )
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-6 text-[#6D635B] leading-relaxed">
        <p>Customer photos, messages, and personal information are strictly used to create the requested personalized product.</p>
        <p><strong>Your privacy is our priority:</strong> Customer information and photos will never be publicly displayed on our website or social media without explicit permission.</p>
        <h3 className="font-serif text-xl text-[#2C2926] mt-8 mb-4">Bloom Journal & Marketing</h3>
        <p>PrintBloom may ask customers for permission to feature their finished product, review, unboxing video, or reaction in our "Bloom Journal" or on Instagram.</p>
        <p>Customers can always choose not to have their content publicly featured. If permission is granted, only customer-approved memories and details are shared.</p>
      </div>
    )
  },
  terms: {
    title: "Terms & Conditions",
    content: (
      <div className="space-y-6 text-[#6D635B] leading-relaxed">
        <h3 className="font-serif text-xl text-[#2C2926] mt-8 mb-4">Design Customization</h3>
        <p>Customers can customize products (e.g., magazines) according to their occasion. This includes providing photos, captions, quotes, and layout preferences.</p>
        <p>Customers should provide their requirements and content <strong>before designing begins</strong> wherever possible. This helps avoid missing details and reduces unnecessary revisions.</p>
        <h3 className="font-serif text-xl text-[#2C2926] mt-8 mb-4">Payment Policy</h3>
        <p>Payment must be completed before designing begins. An order is considered confirmed once the required payment has been received.</p>
      </div>
    )
  }
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const policy = policies[slug]

  if (!policy) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <SectionHeading as="h1" className="text-[#2C2926] mb-12 text-center">
        {policy.title}
      </SectionHeading>
      
      <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-[#E4D9C6]">
        {policy.content}
      </div>
    </div>
  )
}
