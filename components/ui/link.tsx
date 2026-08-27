import NextLink from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface LinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  variant?: "default" | "nav" | "footer" | "accent"
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <NextLink
        ref={ref}
        className={cn(
          "transition-all duration-200 ease-out",
          {
            "text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/30 hover:decoration-accent":
              variant === "default",
            "text-text-main hover:text-accent": variant === "nav",
            "text-text-muted hover:text-text-main": variant === "footer",
            "text-accent font-medium hover:text-accent-hover group": variant === "accent",
          },
          className
        )}
        {...props}
      >
        {children}
      </NextLink>
    )
  }
)
Link.displayName = "Link"