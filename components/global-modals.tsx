"use client"
import { AuthModal } from "@/components/auth/auth-modal"
import { SearchModal } from "@/components/marketing/search-modal"
import { CartDrawer } from "@/components/marketing/cart-drawer"

import { Suspense } from "react"

export function GlobalModals() {
  return (
    <Suspense fallback={null}>
      <AuthModal />
      <SearchModal />
      <CartDrawer />
    </Suspense>
  )
}
