"use client"
import { AuthModal } from "@/components/auth/auth-modal"
import { SearchModal } from "@/components/marketing/search-modal"
import { CartDrawer } from "@/components/marketing/cart-drawer"

export function GlobalModals() {
  return (
    <>
      <AuthModal />
      <SearchModal />
      <CartDrawer />
    </>
  )
}
