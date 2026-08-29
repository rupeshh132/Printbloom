"use client"
import * as React from "react"
import { useState } from "react"
import { useCart } from "@/store/use-cart"
import { Navbar } from "@/components/marketing/navbar"
import NextLink from "next/link"
import Image from "next/image"
import { Trash2, CheckCircle2, Circle, MapPin } from "lucide-react"

type Step = "cart" | "address" | "payment"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart()
  const [currentStep, setCurrentStep] = useState<Step>("cart")
  const [isMounted, setIsMounted] = useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const total = getCartTotal()
  const deliveryFee = total > 0 ? 60 : 0
  const orderTotal = total + deliveryFee

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] pt-28 pb-20">
        <Navbar />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] pt-28 pb-20">
      <Navbar />

      <div className="container mx-auto max-w-5xl px-4 md:px-8 mt-4">
        
        {/* Header / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="font-serif text-3xl text-[#221F1C]">The PrintBloom Store</div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center max-w-md mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 -z-10 -translate-y-1/2"></div>
          
          {/* Cart Step */}
          <div className="flex flex-col items-center flex-1 bg-[#FBF6EE]">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "cart" || currentStep === "address" || currentStep === "payment" ? "bg-[#2AAA5E] text-white" : "bg-white border-2 border-gray-300 text-gray-300"}`}>
              {currentStep !== "cart" ? <CheckCircle2 className="w-5 h-5" /> : "1"}
            </div>
            <span className="text-xs font-medium text-[#221F1C]">Cart</span>
          </div>

          {/* Address Step */}
          <div className="flex flex-col items-center flex-1 bg-[#FBF6EE]">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "address" || currentStep === "payment" ? "bg-[#2AAA5E] text-white" : "bg-white border-2 border-gray-300 text-gray-300"}`}>
              {currentStep === "payment" ? <CheckCircle2 className="w-5 h-5" /> : "2"}
            </div>
            <span className="text-xs font-medium text-gray-500">Address</span>
          </div>

          {/* Payment Step */}
          <div className="flex flex-col items-center flex-1 bg-[#FBF6EE]">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "payment" ? "bg-[#2AAA5E] text-white" : "bg-white border-2 border-gray-300 text-gray-300"}`}>
              3
            </div>
            <span className="text-xs font-medium text-gray-500">Payment</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column (Forms / Items) */}
          <div className="flex-1">
            {currentStep === "cart" && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Confirm Order</h2>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-6">
                  <span className="font-medium">Order Items</span>
                  <span className="text-sm font-medium">{items.length} Item{items.length !== 1 && 's'}</span>
                </div>
                
                {items.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">Your cart is empty.</p>
                    <NextLink href="/products" className="text-[#C1502E] underline">Continue Shopping</NextLink>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-sm relative overflow-hidden border border-gray-200">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-200"></div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm text-[#221F1C]">{item.name}</h3>
                            {item.variant && <p className="text-xs text-gray-500 mt-1">{item.variant}</p>}
                            <p className="text-sm font-medium mt-1">₹{item.price}</p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <button onClick={() => removeItem(item.id)} className="flex items-center text-xs text-gray-500 hover:text-red-500 bg-gray-100 px-3 py-1.5 rounded-sm">
                              <Trash2 className="w-3 h-3 mr-1.5" /> Remove
                            </button>
                            <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100">−</button>
                              <span className="px-3 py-1 text-sm border-x border-gray-300 min-w-[40px] text-center">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === "address" && (
              <div>
                <div className="flex bg-white rounded-sm border border-gray-200 mb-8 overflow-hidden">
                  <button className="flex-1 py-3 text-sm font-medium bg-[#221F1C] text-white">Delivery to Location</button>
                  <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">Pickup at Store</button>
                </div>
                
                <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setCurrentStep("payment"); }}>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Customer Name*</label>
                    <input required type="text" placeholder="Name" className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Mobile Number*</label>
                    <div className="flex">
                      <span className="border border-gray-300 border-r-0 rounded-l-sm p-3 bg-gray-50 text-sm text-gray-600">+91</span>
                      <input required type="tel" placeholder="Enter Input" className="w-full border border-gray-300 rounded-r-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Order updates will be sent via WhatsApp.</p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Pincode*</label>
                    <div className="relative">
                      <input required type="text" placeholder="Eg. 410055" className="w-full border border-gray-300 rounded-sm p-3 pr-12 focus:outline-none focus:border-[#221F1C] text-sm" />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#221F1C]">
                        <MapPin className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Flat, House no, Building, Company*</label>
                    <input required type="text" placeholder="House / Flat / Floor No." className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Apartment, Area, Street, Sector, Village*</label>
                    <input required type="text" placeholder="Apartment / Road / Area" className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Landmark</label>
                    <input type="text" placeholder="Near Apollo Hospital" className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Town / City*</label>
                      <input required type="text" placeholder="Enter Input" className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">State*</label>
                      <select required className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm bg-white">
                        <option value="">Select State</option>
                        <option value="MH">Maharashtra</option>
                        <option value="KA">Karnataka</option>
                        <option value="DL">Delhi</option>
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-[#9A8F85] text-white py-4 rounded-full font-medium mt-4 hover:bg-[#221F1C] transition-colors">
                    Save Address
                  </button>
                </form>
              </div>
            )}

            {currentStep === "payment" && (
              <div>
                <h2 className="font-serif text-2xl mb-6">Payment Method</h2>
                <div className="border border-gray-200 rounded-sm p-4 flex items-start gap-3 bg-white cursor-pointer border-[#221F1C]">
                  <CheckCircle2 className="w-5 h-5 text-[#221F1C] mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Pay Online</div>
                    <div className="text-xs text-gray-500 mt-1">Use UPI, Cards, Wallets or Net-banking</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Bill Details) */}
          <div className="w-full lg:w-80">
            <div className="bg-[#F6F6F6] rounded-sm p-6 border border-gray-200 sticky top-32">
              <h3 className="font-medium mb-6">Bill Details</h3>
              
              <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Item Total</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="bg-[#FFF8DD] text-[#A67F12] text-xs p-3 rounded-sm">
                  Free Pickup at store also available
                </div>
              </div>
              
              <div className="flex justify-between font-medium mb-8">
                <span>Order Total:</span>
                <span>₹{orderTotal}</span>
              </div>

              {currentStep === "cart" && (
                <button 
                  onClick={() => setCurrentStep("address")}
                  disabled={items.length === 0}
                  className="w-full bg-[#221F1C] text-white py-4 rounded-full font-medium hover:bg-black transition-colors disabled:opacity-50"
                >
                  Checkout
                </button>
              )}
              
              {currentStep === "payment" && (
                <button 
                  className="w-full bg-[#221F1C] text-white py-4 rounded-full font-medium hover:bg-black transition-colors"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
