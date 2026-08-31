import { createSupabaseServerClient } from "@/lib/supabase-server"

export async function getDashboardChartData() {
  const supabase = await createSupabaseServerClient()
  
  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select(`
      id,
      created_at,
      status,
      enquiry_items (
        products ( name )
      )
    `)

  if (error || !enquiries) return { monthlyData: [], productData: [] }

  // Process Monthly Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthlyCounts: Record<string, { total: number, converted: number }> = {}

  enquiries.forEach((enq) => {
    const date = new Date(enq.created_at)
    const monthKey = months[date.getMonth()]
    
    if (!monthlyCounts[monthKey]) {
      monthlyCounts[monthKey] = { total: 0, converted: 0 }
    }
    
    monthlyCounts[monthKey].total += 1
    if (enq.status === 'converted' || enq.status === 'completed') {
      monthlyCounts[monthKey].converted += 1
    }
  })

  const monthlyData = Object.keys(monthlyCounts).map(key => ({
    name: key,
    Enquiries: monthlyCounts[key].total,
    Converted: monthlyCounts[key].converted
  }))

  // Process Product Data
  const productCounts: Record<string, number> = {}
  enquiries.forEach((enq) => {
    if (enq.enquiry_items && enq.enquiry_items.length > 0) {
      // @ts-ignore
      const productName = enq.enquiry_items[0].products?.name || "Unknown"
      if (!productCounts[productName]) productCounts[productName] = 0
      productCounts[productName] += 1
    }
  })

  const productData = Object.keys(productCounts).map(key => ({
    name: key,
    value: productCounts[key]
  }))

  return { monthlyData, productData }
}
