"use client";
import * as React from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export default function OrderPage() {
  const [product, setProduct] = React.useState("custom-magazine");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // In V1, we build a WhatsApp message and handoff directly.
    let text = "Hi PrintBloom! I'd like to place an order:%0A%0A";
    text += "*Name:* " + data.name + "%0A";
    text += "*Product:* " + data.product + "%0A";
    text += "*Occasion:* " + data.occasion + "%0A";
    text += "*Required By:* " + data.requiredBy + "%0A";
    
    if (data.product === "custom-magazine") {
      text += "*Pages:* " + data.pages + "%0A";
    }
    
    if (data.notes) {
      text += "*Notes:* " + data.notes + "%0A";
    }

    const waLink = "https://wa.me/919999999999?text=" + text; // Replace with actual number
    window.open(waLink, "_blank");
  };

  return (
    <main className="flex flex-col min-h-screen py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-2xl bg-surface p-8 shadow-sm">
        <SectionHeading as="h1" className="text-center mb-8">Start Your Order</SectionHeading>
        <p className="text-text-muted text-center mb-8">
          Fill out the details below. We'll connect on WhatsApp to confirm everything before you pay.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Your Name</label>
            <input type="text" id="name" name="name" required className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent" />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="product" className="text-sm font-medium">Which product?</label>
            <select id="product" name="product" value={product} onChange={(e) => setProduct(e.target.value)} className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent">
              <option value="custom-magazine">The Custom Magazine</option>
              <option value="polaroid-set">Vintage Polaroid Set</option>
              <option value="photo-frame">Classic Photo Frame</option>
            </select>
          </div>

          {product === "custom-magazine" && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="pages" className="text-sm font-medium">Page Count</label>
              <select id="pages" name="pages" className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent">
                <option value="12">12 Pages</option>
                <option value="24">24 Pages</option>
                <option value="36">36 Pages</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="occasion" className="text-sm font-medium">Occasion</label>
              <input type="text" id="occasion" name="occasion" required className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="requiredBy" className="text-sm font-medium">Required By (Date)</label>
              <input type="date" id="requiredBy" name="requiredBy" required className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Any special notes?</label>
            <textarea id="notes" name="notes" rows={4} className="border border-border-subtle bg-white p-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"></textarea>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Continue to WhatsApp
          </Button>
        </form>
      </div>
    </main>
  );
}