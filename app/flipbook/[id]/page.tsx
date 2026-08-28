import { getFlipbook } from "@/app/actions/flipbooks"
import { notFound } from "next/navigation"
import { FlipbookViewer } from "@/components/ui/flipbook-viewer"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const flipbook = await getFlipbook(id)

  if (!flipbook) {
    return { title: 'Flipbook Not Found | PrintBloom' }
  }

  return {
    title: `${flipbook.title} - Digital Magazine | PrintBloom`,
    description: `A beautiful digital magazine memory created by PrintBloom.`,
  }
}

export default async function FlipbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const flipbook = await getFlipbook(id)

  if (!flipbook) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-neutral-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-900 to-black overflow-hidden">
      <FlipbookViewer title={flipbook.title} images={flipbook.images} />
    </div>
  )
}
