"use client"
import { Lottie } from 'lottie-react'
import React from 'react'
import animationData from '@/public/logo-animation.json'

export function LogoLoader({ className = "w-64" }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

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
