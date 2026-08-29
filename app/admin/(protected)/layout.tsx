import * as React from "react"
import NextLink from "next/link"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"
import { logoutAction } from "@/app/admin/actions"

const adminNavLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/reminders", label: "Reminders" },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Middleware handles redirect but this is a safety net
  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-[#F5F0E8]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#221F1C] text-[#FBF6EE] flex flex-col fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <NextLink href="/" className="flex flex-col leading-none">
            <span className="font-serif text-2xl text-[#FBF6EE]">PrintBloom</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9A8F85] mt-0.5">
              Admin Panel
            </span>
          </NextLink>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {adminNavLinks.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm text-[#FBF6EE]/70 hover:text-[#FBF6EE] hover:bg-white/5 rounded-sm transition-colors"
            >
              {link.label}
            </NextLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-6 py-5 border-t border-white/10 pb-10">
          <p className="text-[#9A8F85] text-xs font-mono truncate mb-3">{user.email}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left text-sm text-[#9A8F85] hover:text-red-400 transition-colors py-1"
            >
              → Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}