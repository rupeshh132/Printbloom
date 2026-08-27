"use client";
import * as React from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { saveEnquiryAction } from "@/app/actions/enquiries";

export default function OrderPage() {
  const [product, setProduct] = React.useState("custom-magazine");
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // 1. Save enquiry to Supabase
    await saveEnquiryAction(formData);

    // 2. Build WhatsApp message
    const name = formData.get("name") as string;
    const productVal = formData.get("product") as string;
    const occasion = formData.get("occasion") as string;
    const requiredBy = formData.get("requiredBy") as string;
    const pages = formData.get("pages") as string;
    const notes = formData.get("notes") as string;

    let text = "Hi PrintBloom! I'd like to place an order:%0A%0A";
    text += "*Name:* " + name + "%0A";
    text += "*Product:* " + productVal + "%0A";
    text += "*Occasion:* " + occasion + "%0A";
    if (requiredBy) text += "*Required By:* " + requiredBy + "%0A";
    if (pages) text += "*Pages:* " + pages + "%0A";
    if (notes) text += "*Notes:* " + notes + "%0A";

    const waLink = "https://wa.me/919999999999?text=" + text;

    setLoading(false);
    setSubmitted(true);

    // Open WhatsApp
    window.open(waLink, "_blank");
  };

  if (submitted) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center pt-20 px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-6">🎉</div>
          <SectionHeading as="h1" className="mb-4">We got your order!</SectionHeading>
          <p className="text-text-muted mb-6">
            Your enquiry has been saved. WhatsApp should have opened automatically.
            If not, click below to chat with us directly.
          </p>
          <Button asChild>
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
              Open WhatsApp
            </a>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen pt-36 pb-24 px-4 md:px-8">
      <div className="container mx-auto max-w-2xl bg-surface p-8 shadow-sm">
        <SectionHeading as="h1" className="text-center mb-4">Start Your Order</SectionHeading>
        <p className="text-text-muted text-center mb-8">
          Fill out the details below. We'll connect on WhatsApp to confirm everything before you pay.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Your Name</label>
            <input
              type="text" id="name" name="name" required
              className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Rahul Verma"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="product" className="text-sm font-medium">Which product?</label>
            <select
              id="product" name="product"
              value={product} onChange={(e) => setProduct(e.target.value)}
              className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="custom-magazine">The Custom Magazine</option>
              <option value="polaroid-set">Vintage Polaroid Set</option>
              <option value="photo-frame">Classic Photo Frame</option>
            </select>
          </div>

          {product === "custom-magazine" && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="pages" className="text-sm font-medium">Page Count</label>
              <select
                id="pages" name="pages"
                className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="12">12 Pages — Most Popular</option>
                <option value="24">24 Pages</option>
                <option value="36">36 Pages</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="occasion" className="text-sm font-medium">Occasion</label>
              <input
                type="text" id="occasion" name="occasion" required
                placeholder="e.g. Birthday, Anniversary"
                className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="requiredBy" className="text-sm font-medium">Required By (Date)</label>
              <input
                type="date" id="requiredBy" name="requiredBy"
                className="h-12 border border-border-subtle bg-white px-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Any special notes? <span className="text-text-muted font-normal">(optional)</span></label>
            <textarea
              id="notes" name="notes" rows={3}
              placeholder="e.g. Theme, colour preferences, specific photos to include..."
              className="border border-border-subtle bg-white p-4 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Continue to WhatsApp →"}
          </Button>

          <p className="text-center text-xs text-text-muted">
            No payment needed now. We'll confirm all details on WhatsApp first.
          </p>
        </form>
      </div>
    </main>
  );
}