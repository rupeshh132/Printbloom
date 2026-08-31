import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import NextLink from "next/link"

export default function PoliciesIndexPage() {
  const links = [
    { href: "/policies/shipping", title: "Shipping & Delivery Policy" },
    { href: "/policies/refund", title: "Refund Policy" },
    { href: "/policies/cancellation", title: "Cancellation Policy" },
    { href: "/policies/privacy", title: "Privacy Policy" },
    { href: "/policies/terms", title: "Terms & Conditions" },
  ]

  return (
    <div className="max-w-3xl mx-auto py-12">
      <SectionHeading as="h1" className="text-[#2C2926] mb-12 text-center">
        Website Policies
      </SectionHeading>
      
      <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-[#E4D9C6] flex flex-col gap-4">
        {links.map(link => (
          <NextLink 
            key={link.href}
            href={link.href}
            className="p-4 border border-[#E4D9C6] hover:border-[#DFBC94] hover:bg-[#DFBC94]/5 rounded-sm transition-colors text-lg text-[#2C2926] font-medium"
          >
            {link.title}
          </NextLink>
        ))}
      </div>
    </div>
  )
}
