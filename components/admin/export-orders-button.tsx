"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner";

export function ExportOrdersButton({ orders }: { orders: any[] }) {
  
  const handleExport = () => {
    if (orders.length === 0) {
      toast.error("No orders to export")
      return
    }

    // Define CSV Headers
    const headers = [
      "Order ID",
      "Date",
      "Customer Name",
      "Customer Phone",
      "Email",
      "Total Amount",
      "Status",
      "Photos Status",
      "Shipping City",
      "Shipping State"
    ]

    // Format Data Rows
    const csvRows = orders.map(order => {
      // Safely handle addresses array or object
      const addr = Array.isArray(order.addresses) ? order.addresses[0] : order.addresses;
      
      const row = [
        order.id,
        formatDate(order.created_at),
        // Escape commas in names/text by wrapping in quotes
        `"${order.customer_name || addr?.full_name || ''}"`,
        `'${order.customer_phone || addr?.phone_number || ''}`, // Prepend quote to stop Excel turning phone into scientific notation
        `"${order.user_email || ''}"`,
        order.total_amount,
        order.status,
        order.images_status === 'partial' ? 'Partial' : 'Complete',
        `"${addr?.city || ''}"`,
        `"${addr?.state || ''}"`
      ]
      return row.join(",")
    })

    // Combine headers and rows
    const csvContent = [headers.join(","), ...csvRows].join("\n")

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `printbloom_orders_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button 
      onClick={handleExport} 
      variant="outline" 
      size="sm"
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </Button>
  )
}
