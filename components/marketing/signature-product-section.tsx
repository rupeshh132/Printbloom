import * as React from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"
import { PixelSwap } from "@/components/ui/pixel-swap"
import { Link } from "@/components/ui/link"

export function SignatureProductSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#FBF6EE]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 order-2 md:order-1 flex flex-col items-start space-y-6">
            <div className="uppercase tracking-widest text-xs font-mono text-text-muted">The Signature Product</div>
            <SectionHeading as="h2">
              The Custom Magazine
            </SectionHeading>
            <p className="text-text-muted text-lg leading-relaxed">
              Not a photobook. A beautifully crafted, editorial-style magazine starring your favorite people. 
              You send the photos and the story. We turn it into pages you can hold, read, and keep forever.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/products/custom-magazine-a5" variant="accent" className="text-lg">
                Explore the Magazine &rarr;
              </Link>
              <p className="text-xs text-[#DFBC94] font-mono tracking-widest uppercase mt-4 hidden md:block animate-pulse">
                &rarr; Hover image to peek inside
              </p>
            </div>
          </div>

          <div className="md:col-span-7 order-1 md:order-2 cursor-pointer shadow-sm relative w-full aspect-[4/3] md:aspect-[3/2]">
            <PixelSwap
              firstContent={
                <Image
                  src="/images/a4-1.jpg"
                  alt="Custom magazine cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              }
              secondContent={
                <Image
                  src="/images/a4-2.jpg"
                  alt="Open custom magazine spread"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              }
              pixelSize={48}
              gap={0}
              pixelRadius={0}
              pixelSpin={0}
              pixelScale={0.35}
              duration={1200}
              pixelDuration={450}
              pattern="spiral"
              randomness={0}
              fade={true}
              trigger="hover"
              className="w-full h-full bg-bg"
              style={{ aspectRatio: 'unset' }}
            />
          </div>
          
        </div>
      </div>
    </section>
  )
}
