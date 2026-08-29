"use client"
import { PhoneLoginModal } from "@/components/auth/phone-login-modal"
import { SearchModal } from "@/components/marketing/search-modal"
import { CartDrawer } from "@/components/marketing/cart-drawer"

export function GlobalModals() {
  return (
    <>
      <PhoneLoginModal />
      <SearchModal />
      <CartDrawer />
    </>
  )
}
