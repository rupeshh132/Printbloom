import * as React from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"

const mockReactions = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    label: "Her 25th Birthday",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    label: "Our Anniversary",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    label: "Mother's Day",
  }
]

export function CustomerReactionsSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#221F1C] text-[#FBF6EE]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionHeading as="h2" className="text-[#FBF6EE] mb-4">
            Tears, smiles, and speechless moments.
          </SectionHeading>
          <p className="text-[#9A8F85] text-lg">
            There is nothing quite like watching someone realize their entire story has been printed into a magazine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReactions.map((reaction) => (
            <div key={reaction.id} className="relative group cursor-pointer">
              <div className="relative aspect-[9/16] md:aspect-[3/4] w-full overflow-hidden bg-[#2C2926] border border-white/10 rounded-sm">
                <Image 
                  src={reaction.image}
                  alt={`Reaction for ${reaction.label}`}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:bg-[#C1502E]/80 group-hover:border-[#C1502E] transition-colors duration-300">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-serif text-xl shadow-sm">{reaction.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
