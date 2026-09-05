"use client"
import * as React from "react"
import { useUIStore } from "@/store/use-ui-store"
import { Search, X } from "lucide-react"
import NextLink from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type SearchResult = {
  id: string
  name: string
  slug: string
  starting_price: number
}

export function SearchModal() {
  const { isSearchModalOpen, closeSearchModal } = useUIStore()
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!isSearchModalOpen) {
      setQuery("")
      setResults([])
    }
  }, [isSearchModalOpen])

  React.useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }
      setLoading(true)
      const { data } = await supabase
        .from("products")
        .select("id, name, slug, starting_price")
        .ilike("name", `%${query}%`)
        .eq("status", "published")
        .limit(5)
      
      setResults(data || [])
      setLoading(false)
    }

    const debounce = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounce)
  }, [query])

  if (!isSearchModalOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="fixed inset-0" 
        onClick={closeSearchModal} 
      />
      
      <div className="relative bg-white w-full max-w-2xl rounded-md shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-10 duration-200">
        <div className="flex items-center border-b border-[#E0D9CF] px-4">
          <Search className="w-5 h-5 text-[#9A8F85]" />
          <input 
            type="text" 
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-14 bg-transparent border-none focus:outline-none px-4 text-lg text-[#221F1C]"
            autoFocus
          />
          <button onClick={closeSearchModal} className="text-[#9A8F85] hover:text-[#DFBC94]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {(results.length > 0 || loading) && (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {loading ? (
              <div className="p-4 text-center text-[#9A8F85] text-sm">Searching...</div>
            ) : (
              <ul className="flex flex-col gap-1">
                {results.map(product => (
                  <li key={product.id}>
                    <NextLink 
                      href={`/products/${product.slug}`}
                      onClick={closeSearchModal}
                      className="flex items-center justify-between p-3 rounded-sm hover:bg-[#FBF6EE] transition-colors group"
                    >
                      <span className="font-serif text-[#221F1C] group-hover:text-[#DFBC94]">
                        {product.name}
                      </span>
                      <span className="font-mono text-xs text-[#9A8F85]">
                        ₹{product.starting_price}
                      </span>
                    </NextLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {query.trim() && !loading && results.length === 0 && (
          <div className="p-8 text-center text-[#9A8F85]">
            No products found for "{query}"
          </div>
        )}
      </div>
    </div>
  )
}
