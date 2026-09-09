"use client"
import { useEffect, useRef } from "react"
import { useCart } from "@/store/use-cart"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

export function CartSync() {
  const items = useCart((state) => state.items)
  const isInitialMount = useRef(true)
  const isSyncingFromServer = useRef(false)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    let subscription: any

    const initializeCart = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      try {
        const { data, error } = await supabase
          .from("user_carts")
          .select("items")
          .eq("user_id", session.user.id)
          .single()

        if (data && data.items && data.items.length > 0) {
          const currentLocalItems = useCart.getState().items;
          
          if (currentLocalItems.length === 0) {
            // If local is empty, use server's cart
            isSyncingFromServer.current = true
            useCart.setState({ items: data.items })
          } else {
            // If both local and server have items, MERGE THEM
            isSyncingFromServer.current = true
            
            // Create a deep copy to avoid mutating state directly
            const mergedItems = JSON.parse(JSON.stringify(currentLocalItems));
            
            data.items.forEach((serverItem: any) => {
              const existingItem = mergedItems.find((i: any) => i.id === serverItem.id);
              if (existingItem) {
                // Add quantities if same product/variant is in both carts
                existingItem.quantity += serverItem.quantity;
              } else {
                // Add new items from server to local cart
                mergedItems.push(serverItem);
              }
            });
            
            useCart.setState({ items: mergedItems })
          }
          
          // Reset flag after state update
          setTimeout(() => {
            isSyncingFromServer.current = false
          }, 100)
        }
      } catch (err) {
        console.error("Failed to fetch cart from server:", err)
      }
    }

    initializeCart()

    // Listen for auth state changes (e.g. user logging in)
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        initializeCart()
      } else if (event === "SIGNED_OUT") {
        useCart.setState({ items: [] }) // clear cart on logout
      }
    })

    return () => {
      authSub.unsubscribe()
    }
  }, []) // Empty dependency array, only runs on mount

  // Sync to server whenever local cart changes
  useEffect(() => {
    // Don't sync on the very first mount, or if the update came from the server fetch
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (isSyncingFromServer.current) {
      return
    }

    const syncToServer = async () => {
      const supabase = createSupabaseBrowserClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      try {
        await supabase
          .from("user_carts")
          .upsert({ 
            user_id: session.user.id, 
            items: items,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' })
      } catch (err) {
        console.error("Failed to sync cart to server:", err)
      }
    }

    // Debounce the sync to avoid too many requests
    const timeoutId = setTimeout(() => {
      syncToServer()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [items])

  return null
}
