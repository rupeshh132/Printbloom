"use client"

import * as React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const COLORS = ['#221F1C', '#DFBC94', '#9A8F85', '#E0D9CF', '#4B6B4F']

export function DashboardCharts({ monthlyData, productData }: { monthlyData: any[], productData: any[] }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-64 flex items-center justify-center text-[#9A8F85]">Loading charts...</div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
      <div className="bg-white p-6 shadow-sm border border-[#E0D9CF] rounded-sm">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[#9A8F85] mb-6">Enquiries vs Conversions</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0D9CF" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9A8F85" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9A8F85" }} />
              <Tooltip 
                cursor={{ fill: '#FBF6EE' }}
                contentStyle={{ backgroundColor: '#221F1C', color: '#FBF6EE', borderRadius: '2px', border: 'none' }} 
                itemStyle={{ color: '#FBF6EE' }}
                labelStyle={{ color: '#DFBC94' }}
              />
              <Bar dataKey="Enquiries" fill="#E0D9CF" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Converted" fill="#DFBC94" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 shadow-sm border border-[#E0D9CF] rounded-sm">
        <h3 className="font-mono text-xs uppercase tracking-widest text-[#9A8F85] mb-6">Enquiries by Product</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#221F1C', color: '#FBF6EE', borderRadius: '2px', border: 'none' }} 
                itemStyle={{ color: '#FBF6EE' }}
                labelStyle={{ color: '#DFBC94' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {productData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-[#221F1C]">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              {entry.name} ({entry.value})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
