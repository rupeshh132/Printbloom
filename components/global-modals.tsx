"use client"
import { AuthModal } from "@/components/auth/auth-modal"
import { SearchModal } from "@/components/marketing/search-modal"
import { CartDrawer } from "@/components/marketing/cart-drawer"
import { useUIStore } from "@/store/use-ui-store"
import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function ModalTrigger() {
  const searchParams = useSearchParams()
  const { openAuthModal } = useUIStore()

  useEffect(() => {
    if (searchParams?.get("ref")) {
      openAuthModal()
    }
  }, [searchParams, openAuthModal])

  return null
}

export function GlobalModals() {
  return (
    <Suspense fallback={null}>
      <ModalTrigger />
      <AuthModal />
      <SearchModal />
      <CartDrawer />
    </Suspense>
  )
}
