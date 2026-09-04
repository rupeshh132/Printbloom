"use client"

import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Navbar } from "@/components/marketing/navbar"
import { Footer } from "@/components/marketing/footer"

const reactionVideos = [
  { id: 1, src: "https://res.cloudinary.com/sz2wyygq/video/upload/v1788551248/printbloom/reactions/1.mp4" },
  { id: 2, src: "https://res.cloudinary.com/sz2wyygq/video/upload/v1788551316/printbloom/reactions/2.mp4" },
  { id: 3, src: "https://res.cloudinary.com/sz2wyygq/video/upload/v1788551342/printbloom/reactions/3.mp4" },
  { id: 4, src: "https://res.cloudinary.com/sz2wyygq/video/upload/v1788551373/printbloom/reactions/4.mp4" },
  { id: 5, src: "https://res.cloudinary.com/sz2wyygq/video/upload/v1788551409/printbloom/reactions/5.mp4" },
  { id: 6, src: "https://res.cloudinary.com/sz2wyygq/video/upload/v1788551466/printbloom/reactions/6.mp4" },
]

export default function ReactionsPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EE] flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionHeading as="h1" className="text-[#2C2926] mb-6">
              Real Tears, Real Smiles
            </SectionHeading>
            <p className="text-[#6D635B] text-lg font-serif">
              See what happens when favorite memories are unboxed. The best part of what we do is witnessing these priceless reactions.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {reactionVideos.map((video) => (
              <VideoCard key={video.id} src={video.src} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function VideoCard({ src }: { src: string }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = React.useState(true)
  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {})
          setIsPlaying(true)
        } else {
          videoRef.current?.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.5 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <div 
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm break-inside-avoid bg-black"
      onClick={toggleMute}
    >
      <video
        ref={videoRef}
        src={src}
        poster={src.replace('.mp4', '.jpg')}
        preload="metadata"
        crossOrigin="anonymous"
        className="w-full h-auto opacity-90 group-hover:opacity-100 transition-all duration-500"
        loop
        muted
        playsInline
      />
      
      {/* Sound Toggle Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
        <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-[#DFBC94]/90 hover:border-[#DFBC94] transition-colors duration-300">
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path d="M12 4L8 8H4v8h4l4 4V4zm4 4v8c1.33-1.33 2-2.67 2-4s-.67-2.67-2-4zm0-4v2c2.67 2 4 4.67 4 8s-1.33 6-4 8v2c4-2.67 6-6.67 6-10s-2-7.33-6-10z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
