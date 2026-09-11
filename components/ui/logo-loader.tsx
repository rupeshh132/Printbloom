"use client"
import dynamic from 'next/dynamic'
import React from 'react'
import animationData from '@/public/logo-animation.json'

// Dynamically import Lottie to prevent SSR hydration mismatches
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export function LogoLoader({ className = "w-64" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true}
      />
    </div>
  )
}
