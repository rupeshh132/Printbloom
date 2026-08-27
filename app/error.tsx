'use client'
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import * as React from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] items-center justify-center flex-col text-center px-4">
      <SectionHeading as="h1" className="mb-4">Something went wrong</SectionHeading>
      <p className="text-text-muted mb-8 max-w-md">We're sorry, but there was an error processing your request. Please try again.</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}