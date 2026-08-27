import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  children: React.ReactNode
}

export function SectionHeading({
  as: Component = "h2",
  className,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <Component
      className={cn(
        "font-serif font-medium text-ink tracking-tight",
        "text-[28px] leading-[1.15] md:text-[36px] md:leading-[1.1] lg:text-[48px] lg:leading-[1.1]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}