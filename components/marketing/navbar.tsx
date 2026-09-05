"use client"
import * as React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Search, User, ShoppingCart } from "lucide-react"
import { useUIStore } from "@/store/use-ui-store"
import { useCart } from "@/store/use-cart"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/reactions", label: "Reactions" },
  { href: "/journal", label: "Stories" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
]

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const pathname = usePathname()
  
  const { openSearchModal, openAuthModal, openCartDrawer } = useUIStore()
  const cartItems = useCart((state) => state.items)

  // Auth State
  const supabase = createSupabaseBrowserClient()
  const [user, setUser] = React.useState<any>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleUserClick = () => {
    if (user) {
      router.push("/profile")
    } else {
      openAuthModal()
    }
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Only show transparent navbar on the homepage (hero has dark bg behind it)
  const isHomepage = pathname === "/"
  const isTransparent = isHomepage && !scrolled

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll lock: prevent background page from scrolling when mobile menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-[#FBF6EE]/95 backdrop-blur-sm border-b border-[#E0D9CF] shadow-sm"
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <NextLink 
          href="/" 
          onClick={handleLogoClick}
          className="flex flex-col leading-none group"
        >
          <img src="/logo.png" alt="PrintBloom" className="h-10 md:h-12 w-auto aspect-square object-contain rounded-full shadow-sm transition-transform group-hover:scale-105" />
        </NextLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-sm tracking-wide transition-colors hover:text-[#DFBC94]",
                isTransparent ? "text-white/90" : "text-[#221F1C]",
                pathname === link.href && "text-[#DFBC94] font-medium"
              )}
            >
              {link.label}
            </NextLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={openSearchModal}
            className={cn(
              "transition-colors hover:text-[#DFBC94]",
              isTransparent ? "text-white" : "text-[#221F1C]"
            )}
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={handleUserClick}
            className={cn(
              "transition-colors hover:text-[#DFBC94] flex items-center justify-center",
              isTransparent ? "text-white" : "text-[#221F1C]"
            )}
          >
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-[#E0D9CF]" />
            ) : (
              <User className="w-5 h-5" />
            )}
          </button>
          <button 
            onClick={openCartDrawer}
            className={cn(
              "relative transition-colors hover:text-[#DFBC94]",
              isTransparent ? "text-white" : "text-[#221F1C]"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
            {isMounted && cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#DFBC94] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block w-6 h-0.5 transition-all duration-300",
              isTransparent ? "bg-white" : "bg-[#221F1C]",
              menuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 transition-all duration-300",
              isTransparent ? "bg-white" : "bg-[#221F1C]",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 transition-all duration-300",
              isTransparent ? "bg-white" : "bg-[#221F1C]",
              menuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FBF6EE] border-t border-[#E0D9CF] px-4 py-6 flex flex-col gap-5 overflow-y-auto" style={{ maxHeight: 'calc(100dvh - 80px)' }}>
          <div className="flex items-center justify-between pb-4 border-b border-[#E0D9CF]">
            <button 
              onClick={() => { setMenuOpen(false); openSearchModal(); }}
              className="flex items-center gap-2 text-[#221F1C] hover:text-[#DFBC94]"
            >
              <Search className="w-5 h-5" /> Search
            </button>
            <button 
              onClick={() => { setMenuOpen(false); handleUserClick(); }}
              className="flex items-center gap-2 text-[#221F1C] hover:text-[#DFBC94]"
            >
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
              Profile
            </button>
            <button 
              onClick={() => { setMenuOpen(false); openCartDrawer(); }}
              className="flex items-center gap-2 text-[#221F1C] hover:text-[#DFBC94] relative"
            >
              <ShoppingCart className="w-5 h-5" /> 
              {isMounted && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#DFBC94] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
              Cart
            </button>
          </div>
          {navLinks.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              className="font-sans text-base text-[#221F1C] hover:text-[#DFBC94] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NextLink>
          ))}
          <Button asChild size="sm" className="w-full mt-2">
            <NextLink href="/products" onClick={() => setMenuOpen(false)}>Order Now</NextLink>
          </Button>
        </div>
      )}
    </header>
  )
}
