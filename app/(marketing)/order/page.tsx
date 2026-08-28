import * as React from "react";
import { getProducts } from "@/app/actions/products";
import { OrderForm } from "@/components/marketing/order-form";

export default async function OrderPage() {
  const products = await getProducts();

  // Extract just what we need for the dropdown to pass to client
  const productOptions = products.map((p: any) => ({
    slug: p.slug,
    name: p.name,
  }));

  return <OrderForm products={productOptions} />;
}