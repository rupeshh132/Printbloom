import * as React from "react"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FBF6EE] flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-24 px-4 md:px-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}
