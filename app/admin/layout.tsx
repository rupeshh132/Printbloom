import * as React from "react"
import { Link } from "@/components/ui/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-bg">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-ink text-surface flex flex-col p-6">
        <h2 className="font-serif text-2xl mb-8">PrintBloom Admin</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/admin" className="text-surface hover:text-accent font-medium">Dashboard</Link>
          <Link href="/admin/enquiries" className="text-surface hover:text-accent font-medium">Enquiries</Link>
          <Link href="/admin/products" className="text-surface hover:text-accent font-medium">Products</Link>
          <Link href="/admin/stories" className="text-surface hover:text-accent font-medium">Stories</Link>
          <Link href="/admin/reviews" className="text-surface hover:text-accent font-medium">Reviews</Link>
        </nav>
        <div className="mt-auto">
          <button className="text-sm text-text-muted hover:text-surface">Logout</button>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}