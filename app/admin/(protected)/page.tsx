import { SectionHeading } from "@/components/ui/section-heading"

export default function AdminDashboard() {
  return (
    <div>
      <SectionHeading as="h1" className="mb-8 text-ink">Dashboard Overview</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-sm border border-border-subtle rounded-sm">
          <h3 className="font-mono text-sm text-text-muted mb-2">New Enquiries</h3>
          <p className="font-serif text-4xl">12</p>
        </div>
        <div className="bg-white p-6 shadow-sm border border-border-subtle rounded-sm">
          <h3 className="font-mono text-sm text-text-muted mb-2">Total Stories</h3>
          <p className="font-serif text-4xl">8</p>
        </div>
        <div className="bg-white p-6 shadow-sm border border-border-subtle rounded-sm">
          <h3 className="font-mono text-sm text-text-muted mb-2">Active Products</h3>
          <p className="font-serif text-4xl">3</p>
        </div>
      </div>
    </div>
  )
}