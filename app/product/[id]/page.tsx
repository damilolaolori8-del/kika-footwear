import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetail key={id} product={product} />;
}
