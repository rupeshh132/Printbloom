"use client"

import * as React from "react"
import HTMLFlipBook from "react-pageflip"
import Image from "next/image"

interface FlipbookViewerProps {
  title: string
  images: string[]
}

export function FlipbookViewer({ title, images }: FlipbookViewerProps) {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // HTMLFlipBook is a class component without full TS typings for React 18, so we cast it
  const FlipBook = HTMLFlipBook as any

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 relative">
      <h1 className="font-serif text-3xl md:text-4xl text-white mb-10 tracking-wide text-center drop-shadow-md">
        {title}
      </h1>

      <div className="shadow-2xl">
        <FlipBook
          width={400}
          height={600}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="demo-book"
        >
          {images.map((url, i) => (
            <div key={i} className="page bg-white flex items-center justify-center overflow-hidden relative">
              {/* Using standard img for pageflip compatibility, next/image can have layout issues inside pageflip */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={url} 
                alt={`Page ${i+1}`} 
                className="w-full h-full object-cover" 
                draggable={false}
              />
            </div>
          ))}
          {/* Back Cover / Marketing */}
          <div className="page bg-[#221F1C] flex flex-col items-center justify-center overflow-hidden relative text-center px-8 border-l border-[#333]">
            <h2 className="font-serif text-3xl text-[#E0D9CF] mb-4">PrintBloom</h2>
            <p className="text-sm text-[#9A8F85] mb-8 font-mono tracking-widest uppercase">
              Capture Your Memories
            </p>
            <a 
              href="/"
              target="_blank"
              className="bg-[#C1502E] text-white px-6 py-3 rounded-sm hover:bg-[#A5411F] transition-colors text-sm font-medium"
            >
              Create Your Own Magazine
            </a>
          </div>
        </FlipBook>
      </div>

      <p className="mt-12 text-sm text-white/50 font-mono tracking-widest uppercase text-center animate-pulse">
        Swipe or click corners to flip pages
      </p>
    </div>
  )
}
