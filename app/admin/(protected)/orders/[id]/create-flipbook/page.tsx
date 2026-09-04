import { getAdminOrderById } from "@/app/actions/admin-orders"
import { notFound } from "next/navigation"
import { SectionHeading } from "@/components/ui/section-heading"
import NextLink from "next/link"
import { FlipbookCreator } from "@/components/admin/flipbook-creator"

export default async function OrderFlipbookCreatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const order = await getAdminOrderById(id)

  if (!order) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <NextLink href={`/admin/orders/${id}`} className="text-xs text-[#9A8F85] hover:text-[#DFBC94] mb-6 inline-block tracking-wider uppercase font-medium">
        ← Back to Order
      </NextLink>
      
      <SectionHeading as="h1" className="text-[#221F1C] mb-2">
        Create Digital Flipbook
      </SectionHeading>
      <p className="text-sm text-[#9A8F85] mb-8">
        Generate a 3D digital magazine for Order #{order.id.split('-')[0]}. You can upload the finished design pages here.
      </p>

      <FlipbookCreator token={order.id} returnUrl={`/admin/orders/${order.id}`} />
    </div>
  )
}
